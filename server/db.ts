import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import type {
  AiLearningHistory,
  AuditLog,
  Course,
  Department,
  ExamAttempt,
  PdfImportRecord,
  PlatformSettings,
  Question,
  SavedQuestion,
  StudentAnswer,
  StudentProgress,
  Topic,
  UserProfile,
} from '../src/types';
import {
  DEFAULT_PLATFORM_SETTINGS,
  SEED_COURSES,
  SEED_DEPARTMENTS,
  SEED_QUESTIONS,
  SEED_TOPICS,
} from '../src/data/nd2QuestionBank';

export interface StoredUserRecord extends UserProfile {
  password_hash: string;
}

export interface PrepWiseDatabase {
  departments: Department[];
  courses: Course[];
  topics: Topic[];
  questions: Question[];
  users: StoredUserRecord[];
  exam_attempts: ExamAttempt[];
  student_answers: StudentAnswer[];
  student_progress: StudentProgress[];
  saved_questions: SavedQuestion[];
  ai_learning_history: AiLearningHistory[];
  pdf_imports: PdfImportRecord[];
  audit_logs: AuditLog[];
  platform_settings: PlatformSettings;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'prepwise-db.json');

function createInitialDb(): PrepWiseDatabase {
  return {
    departments: structuredClone(SEED_DEPARTMENTS),
    courses: structuredClone(SEED_COURSES),
    topics: structuredClone(SEED_TOPICS),
    questions: structuredClone(SEED_QUESTIONS),
    users: [],
    exam_attempts: [],
    student_answers: [],
    student_progress: [],
    saved_questions: [],
    ai_learning_history: [],
    pdf_imports: [],
    audit_logs: [],
    platform_settings: structuredClone(DEFAULT_PLATFORM_SETTINGS),
  };
}

let cachedDb: PrepWiseDatabase | null = null;

export function readDb(): PrepWiseDatabase {
  if (cachedDb) {
    return cachedDb;
  }
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initial = createInitialDb();
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf8');
      cachedDb = initial;
      return cachedDb;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const parsed = JSON.parse(raw) as Partial<PrepWiseDatabase>;
    const initial = createInitialDb();

    const mergeById = <T extends { id: string }>(existing: T[] | undefined, seeded: T[]): { list: T[]; changed: boolean } => {
      if (!existing?.length) return { list: seeded, changed: false };
      const seen = new Set(existing.map((item) => item.id));
      const additions = seeded.filter((item) => !seen.has(item.id));
      return {
        list: additions.length > 0 ? [...existing, ...additions] : existing,
        changed: additions.length > 0,
      };
    };

    const deptMerge = mergeById(parsed.departments, initial.departments);
    const courseMerge = mergeById(parsed.courses, initial.courses);
    const topicMerge = mergeById(parsed.topics, initial.topics);
    const questionMerge = mergeById(parsed.questions, initial.questions);

    // Keep seeded course metadata and past-paper question bank synchronized cleanly
    const seedCourseById = new Map(initial.courses.map((c) => [c.id, c]));
    let coursesUpdated = false;
    const syncedCourses = courseMerge.list.map((c) => {
      const freshCourse = seedCourseById.get(c.id);
      if (
        freshCourse &&
        (c.title !== freshCourse.title ||
          c.description !== freshCourse.description ||
          JSON.stringify(c.sessions_available) !== JSON.stringify(freshCourse.sessions_available))
      ) {
        coursesUpdated = true;
        return {
          ...c,
          title: freshCourse.title,
          description: freshCourse.description,
          sessions_available: freshCourse.sessions_available,
        };
      }
      return c;
    });

    const seedQuestionById = new Map(initial.questions.map((q) => [q.id, q]));
    let questionsUpdated = false;
    const syncedQuestions = questionMerge.list.map((q) => {
      const fresh = seedQuestionById.get(q.id);
      if (!fresh) return q;

      const isAdminOverridden = q.verified_by === 'Admin Verified';
      const hasLegacyFilename =
        Boolean(q.source_document?.toLowerCase().endsWith('.json')) ||
        Boolean(q.official_solution_excerpt?.includes('.json')) ||
        Boolean(q.verified_by?.includes('PDF'));

      if (hasLegacyFilename) {
        questionsUpdated = true;
        return {
          ...fresh,
          verification_status: isAdminOverridden ? q.verification_status : fresh.verification_status,
          verified_by: isAdminOverridden ? q.verified_by : fresh.verified_by,
        };
      }

      if (!isAdminOverridden && JSON.stringify(q) !== JSON.stringify(fresh)) {
        questionsUpdated = true;
        return fresh;
      }

      return q;
    });

    const loadedSettings = parsed.platform_settings ?? initial.platform_settings;
    const settingsMigrated =
      loadedSettings.platform_name === 'PrepWise' ||
      loadedSettings.platform_name === 'QuietDesk' ||
      loadedSettings.platform_name === 'divshinastudy';
    const syncedSettings = settingsMigrated
      ? { ...loadedSettings, platform_name: 'Divshinastudy' }
      : loadedSettings;

    cachedDb = {
      departments: deptMerge.list,
      courses: syncedCourses,
      topics: topicMerge.list,
      questions: syncedQuestions,
      users: parsed.users ?? [],
      exam_attempts: parsed.exam_attempts ?? [],
      student_answers: parsed.student_answers ?? [],
      student_progress: parsed.student_progress ?? [],
      saved_questions: parsed.saved_questions ?? [],
      ai_learning_history: parsed.ai_learning_history ?? [],
      pdf_imports: parsed.pdf_imports ?? [],
      audit_logs: parsed.audit_logs ?? [],
      platform_settings: syncedSettings,
    };
    if (deptMerge.changed || courseMerge.changed || topicMerge.changed || questionMerge.changed || coursesUpdated || questionsUpdated || settingsMigrated) {
      writeDb(cachedDb);
    }
    return cachedDb;
  } catch {
    const initial = createInitialDb();
    cachedDb = initial;
    return cachedDb;
  }
}

export function writeDb(db: PrepWiseDatabase): void {
  cachedDb = db;
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const tmpFile = `${DB_FILE}.tmp`;
  fs.writeFileSync(tmpFile, JSON.stringify(db, null, 2), 'utf8');
  fs.renameSync(tmpFile, DB_FILE);
}

export function stripSensitiveUserFields(user: StoredUserRecord): UserProfile {
  const {
    password_hash: _ph,
    ...rest
  } = user as StoredUserRecord & Record<string, unknown>;
  delete rest.email_verified;
  delete rest.email_verification_token;
  delete rest.email_verification_code_hash;
  delete rest.email_verification_expires_at;
  delete rest.email_verification_attempts;
  delete rest.email_verification_sent_at;
  delete rest.reset_code_hash;
  delete rest.reset_code_expires_at;
  delete rest.reset_code_attempts;
  delete rest.reset_code_sent_at;
  delete rest.reset_token;
  delete rest.reset_token_expires_at;
  return rest as UserProfile;
}

export function recordAuditLog(
  db: PrepWiseDatabase,
  actor: { id: string; email: string },
  action: string,
  entity_type: string,
  entity_id: string,
  details: string
): void {
  db.audit_logs.unshift({
    id: `audit-${crypto.randomUUID()}`,
    actor_id: actor.id,
    actor_email: actor.email,
    action,
    entity_type,
    entity_id,
    details,
    created_at: new Date().toISOString(),
  });
  if (db.audit_logs.length > 500) {
    db.audit_logs = db.audit_logs.slice(0, 500);
  }
}

export function isSupabaseServerConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
