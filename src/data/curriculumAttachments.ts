import com211Data from '../../public/assets/aistudio/com-211_d0c030ac.json';
import com212Data from '../../public/assets/aistudio/com-212_7ccabac1.json';
import com213Data from '../../public/assets/aistudio/com-213_7df3f9cf.json';
import com215Data from '../../public/assets/aistudio/com-215_7917cff4.json';
import com216Data from '../../public/assets/aistudio/com-216_39049de5.json';
import com226Data from '../../public/assets/aistudio/com-226_e2a127c3.json';
import eed216Data from '../../public/assets/aistudio/eed-216_ec4576d6.json';
import gns201Data from '../../public/assets/aistudio/gns-201_a8c6b77c.json';
import type {
  Course,
  CurriculumCourseAttachment,
  Department,
  Question,
  Semester,
  Topic,
} from '../types';

export const DEPARTMENT_GNS: Department = {
  id: 'dept-gns',
  code: 'GNS',
  name: 'General Studies & Entrepreneurship',
  school: 'School of Liberal & General Studies',
  description:
    'ND2 Use of English, communication skills, and entrepreneurship development courses aligned with NBTE ND2 specifications.',
  academic_level: 'ND2',
  created_at: '2026-01-01T00:00:00.000Z',
};

export const CURRICULUM_ATTACHMENTS: CurriculumCourseAttachment[] = [
  com211Data as CurriculumCourseAttachment,
  com212Data as CurriculumCourseAttachment,
  com213Data as CurriculumCourseAttachment,
  com215Data as CurriculumCourseAttachment,
  com216Data as CurriculumCourseAttachment,
  com226Data as CurriculumCourseAttachment,
  eed216Data as CurriculumCourseAttachment,
  gns201Data as CurriculumCourseAttachment,
];

export const CURRICULUM_BY_CODE: Record<string, CurriculumCourseAttachment> = Object.fromEntries(
  CURRICULUM_ATTACHMENTS.map((c) => [c.code.toUpperCase(), c])
);

export const ATTACHMENT_COURSES: Course[] = [
  {
    id: 'course-com211',
    code: 'COM 211',
    title: com211Data.title,
    department_id: 'dept-com',
    department_name: 'Computer Technology',
    academic_level: 'ND2',
    semester: 'First Semester',
    credit_units: 3,
    exam_duration_minutes: 60,
    description: com211Data.description.trim(),
    sessions_available: ['2024/2025 Practice Bank', '2024/2025 Curriculum'],
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'course-com212',
    code: 'COM 212',
    title: com212Data.title,
    department_id: 'dept-com',
    department_name: 'Computer Technology',
    academic_level: 'ND2',
    semester: 'First Semester',
    credit_units: 3,
    exam_duration_minutes: 60,
    description: com212Data.description.trim(),
    sessions_available: ['2024/2025 Practice Bank', '2024/2025 Curriculum'],
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'course-com213',
    code: 'COM 213',
    title: com213Data.title,
    department_id: 'dept-com',
    department_name: 'Computer Technology',
    academic_level: 'ND2',
    semester: 'First Semester',
    credit_units: 2,
    exam_duration_minutes: 60,
    description: com213Data.description.trim(),
    sessions_available: ['2024/2025 Curriculum'],
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'course-com215',
    code: 'COM 215',
    title: com215Data.title,
    department_id: 'dept-com',
    department_name: 'Computer Technology',
    academic_level: 'ND2',
    semester: 'First Semester',
    credit_units: 3,
    exam_duration_minutes: 60,
    description: com215Data.description.trim(),
    sessions_available: ['2024/2025 Curriculum'],
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'course-com216',
    code: 'COM 216',
    title: com216Data.title,
    department_id: 'dept-com',
    department_name: 'Computer Technology',
    academic_level: 'ND2',
    semester: 'First Semester',
    credit_units: 2,
    exam_duration_minutes: 60,
    description: com216Data.description.split('\n')[0].trim(),
    sessions_available: ['2024/2025 Curriculum'],
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'course-eed216',
    code: 'EED 216',
    title: eed216Data.title,
    department_id: 'dept-gns',
    department_name: 'General Studies & Entrepreneurship',
    academic_level: 'ND2',
    semester: 'Second Semester',
    credit_units: 2,
    exam_duration_minutes: 60,
    description: eed216Data.description.trim(),
    sessions_available: ['2024/2025 Practice Bank', '2024/2025 Curriculum'],
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'course-gns201',
    code: 'GNS 201',
    title: gns201Data.title,
    department_id: 'dept-gns',
    department_name: 'General Studies & Entrepreneurship',
    academic_level: 'ND2',
    semester: 'First Semester',
    credit_units: 2,
    exam_duration_minutes: 60,
    description: gns201Data.description.trim(),
    sessions_available: ['2024/2025 Practice Bank', '2024/2025 Curriculum'],
    created_at: '2026-01-01T00:00:00.000Z',
  },
];

export const ATTACHMENT_TOPICS: Topic[] = [
  // COM 211
  {
    id: 'topic-com211-arrays-collections',
    course_id: 'course-com211',
    course_code: 'COM 211',
    title: 'Java Platform, Arrays & Collections',
    summary: 'JDK/JVM bytecode workflow, 1D/2D arrays, ArrayList, Set, Map, and Java generics.',
    order_index: 1,
  },
  {
    id: 'topic-com211-oop-events',
    course_id: 'course-com211',
    course_code: 'COM 211',
    title: 'OOP Principles, Exceptions & Swing Events',
    summary: 'Encapsulation, inheritance, polymorphism, abstraction, try/catch, and GUI listeners.',
    order_index: 2,
  },
  {
    id: 'topic-com211-web-jdbc',
    course_id: 'course-com211',
    course_code: 'COM 211',
    title: 'Servlets, JSP & JDBC Database Connectivity',
    summary: 'HTTP request-response cycle, Servlet lifecycle, PreparedStatement CRUD, and transactions.',
    order_index: 3,
  },

  // COM 212
  {
    id: 'topic-com212-arch-tools',
    course_id: 'course-com212',
    course_code: 'COM 212',
    title: 'System Architecture, Assemblers & Linkers',
    summary: 'ALU/CU/registers, language levels, two-pass assemblers, symbol tables, linkers, and loaders.',
    order_index: 1,
  },
  {
    id: 'topic-com212-compilers',
    course_id: 'course-com212',
    course_code: 'COM 212',
    title: 'Compiler Phases & Translation',
    summary: 'Lexical, syntax, semantic analysis, intermediate code generation, optimisation, and machine code.',
    order_index: 2,
  },
  {
    id: 'topic-com212-os-io',
    course_id: 'course-com212',
    course_code: 'COM 212',
    title: 'OS Services, System Calls & I/O Handling',
    summary: 'Programs vs processes/threads, system calls vs libraries, polling, interrupts, DMA, and buffering.',
    order_index: 3,
  },

  // COM 213
  {
    id: 'topic-com213-structural',
    course_id: 'course-com213',
    course_code: 'COM 213',
    title: 'UML Foundations & Structural Diagrams',
    summary: 'Classes, attributes, multiplicity, generalisation, aggregation/composition, objects, and components.',
    order_index: 1,
  },
  {
    id: 'topic-com213-behavioural',
    course_id: 'course-com213',
    course_code: 'COM 213',
    title: 'Use-Case, Activity, Sequence & State Diagrams',
    summary: 'Actors, <<include>>/<<extend>>, swimlanes, lifelines/messages, and state transitions.',
    order_index: 2,
  },

  // COM 215
  {
    id: 'topic-com215-design-cad',
    course_id: 'course-com215',
    course_code: 'COM 215',
    title: 'Graphics, DTP & CAD Fundamentals',
    summary: 'Raster vs vector, RGB/CMYK, CRAP principles, bleed/gutter/master pages, and orthographic/isometric CAD.',
    order_index: 1,
  },
  {
    id: 'topic-com215-dbms-sql',
    course_id: 'course-com215',
    course_code: 'COM 215',
    title: 'DBMS Packages, Keys, Normalization & SQL',
    summary: 'Tables/forms/queries/reports, primary/foreign keys, 1NF–3NF, integrity rules, and SQL CRUD.',
    order_index: 2,
  },

  // COM 216
  {
    id: 'topic-com216-descriptive-prob',
    course_id: 'course-com216',
    course_code: 'COM 216',
    title: 'Descriptive Statistics, Sampling & Probability',
    summary: 'Measurement scales, sampling designs, mean/median/mode, variance/SD, and probability distributions.',
    order_index: 1,
  },
  {
    id: 'topic-com216-inference-reg',
    course_id: 'course-com216',
    course_code: 'COM 216',
    title: 'Hypothesis Testing, t-Tests, Chi-Square & Regression',
    summary: 'Confidence intervals, p-values, Type I/II errors, parametric/non-parametric tests, SPSS, and regression.',
    order_index: 2,
  },

  // COM 226 additional File Organisation topics
  {
    id: 'topic-com226-fileorg',
    course_id: 'course-com226',
    course_code: 'COM 226',
    title: 'Data Hierarchy, Storage & File Structures',
    summary: 'Bit-to-database hierarchy, file operations, sequential/indexed/hashed files, and blocking factor math.',
    order_index: 3,
  },
  {
    id: 'topic-com226-safety',
    course_id: 'course-com226',
    course_code: 'COM 226',
    title: 'Buffering, Transactions & File Security',
    summary: 'Single vs double buffering, master/transaction files, CIA triad, and RPO/RTO backup recovery.',
    order_index: 4,
  },

  // EED 216
  {
    id: 'topic-eed216-ventures',
    course_id: 'course-eed216',
    course_code: 'EED 216',
    title: 'Entrepreneurship, Market Research & Ownership',
    summary: 'Entrepreneur traits, opportunity screening, feasibility studies, business plans, and Nigerian registration.',
    order_index: 1,
  },
  {
    id: 'topic-eed216-finance-risk',
    course_id: 'course-eed216',
    course_code: 'EED 216',
    title: 'Marketing, Costing, Finance & IP Protection',
    summary: '4 Ps, break-even analysis, bookkeeping, cash flow vs profit, risk registers, and IP protection.',
    order_index: 2,
  },

  // GNS 201
  {
    id: 'topic-gns201-grammar',
    course_id: 'course-gns201',
    course_code: 'GNS 201',
    title: 'Grammar, Clauses, Concord & Semantics',
    summary: 'Parts of speech, phrases/clauses, sentence structure, concord rules, denotation, and register.',
    order_index: 1,
  },
  {
    id: 'topic-gns201-writing-lit',
    course_id: 'course-gns201',
    course_code: 'GNS 201',
    title: 'Comprehension, Summary, Essays & Literature',
    summary: 'Skimming/scanning, summary reduction, argumentative essays, reports, and dramatic terms/genres.',
    order_index: 2,
  },
];

interface CourseMeta {
  courseId: string;
  departmentName: string;
  semester: Semester;
  sourceDoc: string;
  defaultTopicId: string;
  defaultTopicName: string;
  topicMatcher: (qText: string, index: number) => { topicId: string; topicName: string };
}

const COURSE_META_BY_CODE: Record<string, CourseMeta> = {
  'COM 211': {
    courseId: 'course-com211',
    departmentName: 'Computer Technology',
    semester: 'First Semester',
    sourceDoc: 'ND2 Curriculum',
    defaultTopicId: 'topic-com211-arrays-collections',
    defaultTopicName: 'Java Platform, Arrays & Collections',
    topicMatcher: (text) => {
      const t = text.toLowerCase();
      if (t.includes('servlet') || t.includes('jdbc') || t.includes('sql') || t.includes('transaction') || t.includes('preparedstatement')) {
        return { topicId: 'topic-com211-web-jdbc', topicName: 'Servlets, JSP & JDBC Database Connectivity' };
      }
      if (t.includes('encapsulation') || t.includes('overload') || t.includes('swing') || t.includes('event') || t.includes('exception')) {
        return { topicId: 'topic-com211-oop-events', topicName: 'OOP Principles, Exceptions & Swing Events' };
      }
      return { topicId: 'topic-com211-arrays-collections', topicName: 'Java Platform, Arrays & Collections' };
    },
  },
  'COM 212': {
    courseId: 'course-com212',
    departmentName: 'Computer Technology',
    semester: 'First Semester',
    sourceDoc: 'ND2 Curriculum',
    defaultTopicId: 'topic-com212-arch-tools',
    defaultTopicName: 'System Architecture, Assemblers & Linkers',
    topicMatcher: (text) => {
      const t = text.toLowerCase();
      if (t.includes('lexical') || t.includes('syntax') || t.includes('semantic') || t.includes('compiler')) {
        return { topicId: 'topic-com212-compilers', topicName: 'Compiler Phases & Translation' };
      }
      if (t.includes('process') || t.includes('operating system') || t.includes('system call') || t.includes('dma') || t.includes('buffering')) {
        return { topicId: 'topic-com212-os-io', topicName: 'OS Services, System Calls & I/O Handling' };
      }
      return { topicId: 'topic-com212-arch-tools', topicName: 'System Architecture, Assemblers & Linkers' };
    },
  },
  'COM 213': {
    courseId: 'course-com213',
    departmentName: 'Computer Technology',
    semester: 'First Semester',
    sourceDoc: 'ND2 Curriculum',
    defaultTopicId: 'topic-com213-structural',
    defaultTopicName: 'UML Foundations & Structural Diagrams',
    topicMatcher: (text) => {
      const t = text.toLowerCase();
      if (t.includes('use-case') || t.includes('use case') || t.includes('actor') || t.includes('activity') || t.includes('sequence') || t.includes('state-machine')) {
        return { topicId: 'topic-com213-behavioural', topicName: 'Use-Case, Activity, Sequence & State Diagrams' };
      }
      return { topicId: 'topic-com213-structural', topicName: 'UML Foundations & Structural Diagrams' };
    },
  },
  'COM 215': {
    courseId: 'course-com215',
    departmentName: 'Computer Technology',
    semester: 'First Semester',
    sourceDoc: 'ND2 Curriculum',
    defaultTopicId: 'topic-com215-design-cad',
    defaultTopicName: 'Graphics, DTP & CAD Fundamentals',
    topicMatcher: (text) => {
      const t = text.toLowerCase();
      if (t.includes('dbms') || t.includes('key') || t.includes('1nf') || t.includes('sql') || t.includes('integrity')) {
        return { topicId: 'topic-com215-dbms-sql', topicName: 'DBMS Packages, Keys, Normalization & SQL' };
      }
      return { topicId: 'topic-com215-design-cad', topicName: 'Graphics, DTP & CAD Fundamentals' };
    },
  },
  'COM 216': {
    courseId: 'course-com216',
    departmentName: 'Computer Technology',
    semester: 'First Semester',
    sourceDoc: 'ND2 Curriculum',
    defaultTopicId: 'topic-com216-descriptive-prob',
    defaultTopicName: 'Descriptive Statistics, Sampling & Probability',
    topicMatcher: (text, index) => {
      if (index >= 8) {
        return { topicId: 'topic-com216-inference-reg', topicName: 'Hypothesis Testing, t-Tests, Chi-Square & Regression' };
      }
      const t = text.toLowerCase();
      if (t.includes('h₀') || t.includes('t-test') || t.includes('chi-square') || t.includes('regression') || t.includes('spss')) {
        return { topicId: 'topic-com216-inference-reg', topicName: 'Hypothesis Testing, t-Tests, Chi-Square & Regression' };
      }
      return { topicId: 'topic-com216-descriptive-prob', topicName: 'Descriptive Statistics, Sampling & Probability' };
    },
  },
  'COM 226': {
    courseId: 'course-com226',
    departmentName: 'Computer Technology',
    semester: 'Second Semester',
    sourceDoc: 'ND2 Curriculum',
    defaultTopicId: 'topic-com226-fileorg',
    defaultTopicName: 'Data Hierarchy, Storage & File Structures',
    topicMatcher: (_text, index) => {
      if (index >= 10) {
        return { topicId: 'topic-com226-safety', topicName: 'Buffering, Transactions & File Security' };
      }
      return { topicId: 'topic-com226-fileorg', topicName: 'Data Hierarchy, Storage & File Structures' };
    },
  },
  'EED 216': {
    courseId: 'course-eed216',
    departmentName: 'General Studies & Entrepreneurship',
    semester: 'Second Semester',
    sourceDoc: 'ND2 Curriculum',
    defaultTopicId: 'topic-eed216-ventures',
    defaultTopicName: 'Entrepreneurship, Market Research & Ownership',
    topicMatcher: (_text, index) => {
      if (index >= 7) {
        return { topicId: 'topic-eed216-finance-risk', topicName: 'Marketing, Costing, Finance & IP Protection' };
      }
      return { topicId: 'topic-eed216-ventures', topicName: 'Entrepreneurship, Market Research & Ownership' };
    },
  },
  'GNS 201': {
    courseId: 'course-gns201',
    departmentName: 'General Studies & Entrepreneurship',
    semester: 'First Semester',
    sourceDoc: 'ND2 Curriculum',
    defaultTopicId: 'topic-gns201-grammar',
    defaultTopicName: 'Grammar, Clauses, Concord & Semantics',
    topicMatcher: (_text, index) => {
      if (index >= 6) {
        return { topicId: 'topic-gns201-writing-lit', topicName: 'Comprehension, Summary, Essays & Literature' };
      }
      return { topicId: 'topic-gns201-grammar', topicName: 'Grammar, Clauses, Concord & Semantics' };
    },
  },
};

function extractKeywordsFromPrompt(questionText: string): string[] {
  const stopWords = new Set([
    'explain', 'define', 'state', 'differentiate', 'distinguish', 'compare', 'describe',
    'what', 'when', 'where', 'which', 'between', 'using', 'three', 'four', 'five', 'eight',
    'with', 'their', 'from', 'that', 'this', 'into', 'give', 'example', 'examples', 'write',
    'calculate', 'would', 'should', 'include', 'suitable', 'common', 'roles', 'steps',
  ]);
  const words = questionText
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 4 && !stopWords.has(w));
  const unique = Array.from(new Set(words)).slice(0, 4);
  return unique.length > 0 ? unique : ['concept definition', 'academic explanation'];
}

function buildRevisionQuestions(): Question[] {
  const results: Question[] = [];

  for (const attachment of CURRICULUM_ATTACHMENTS) {
    const meta = COURSE_META_BY_CODE[attachment.code.toUpperCase()];
    if (!meta) continue;

    const revModule = attachment.modules.find((m) =>
      m.title.toLowerCase().includes('revision question')
    );
    const revLesson = revModule?.lessons[0];
    if (!revLesson) continue;

    const lines = revLesson.contentMarkdown.split('\n');
    const questionTexts: string[] = [];
    const notes: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (/^1\.\s+/.test(trimmed)) {
        questionTexts.push(trimmed.replace(/^1\.\s+/, '').trim());
      } else if (
        trimmed &&
        !trimmed.startsWith('Final examination') &&
        !trimmed.startsWith('How to answer') &&
        !trimmed.startsWith('|') &&
        !trimmed.startsWith('Final self-check') &&
        !trimmed.startsWith('- ') &&
        !trimmed.startsWith('Glossary') &&
        !trimmed.startsWith('Reference base') &&
        !trimmed.startsWith('Suggested textbooks')
      ) {
        notes.push(trimmed);
      }
    }

    const answerSummaryNote =
      notes.slice(0, 3).join('\n') ||
      `Review ${attachment.code} curriculum modules and worked examples.`;

    const codeSlug = attachment.code.toLowerCase().replace(/\s+/g, '');

    questionTexts.forEach((qText, idx) => {
      const { topicId, topicName } = meta.topicMatcher(qText, idx);
      results.push({
        id: `q-${codeSlug}-rev-${idx + 1}`,
        course_id: meta.courseId,
        course_code: attachment.code,
        topic_id: topicId,
        topic_name: topicName,
        department_name: meta.departmentName,
        academic_level: 'ND2',
        semester: meta.semester,
        examination_year: '2024/2025 Curriculum',
        session_type: 'Full-Time',
        question_number: `Rev.${idx + 1}`,
        question_type: 'theory',
        question_text: qText,
        official_solution_excerpt: answerSummaryNote,
        marking_scheme: extractKeywordsFromPrompt(qText),
        marks: 10,
        difficulty: qText.toLowerCase().includes('calculate') ? 'challenging' : 'standard',
        source_document: meta.sourceDoc,
        source_page: idx + 1,
        verification_status: 'verified',
        verified_by: `${attachment.code} Curriculum Attachment`,
        created_at: '2026-01-01T00:00:00.000Z',
      });
    });
  }

  return results;
}

const ATTACHMENT_CBT_QUESTIONS: Question[] = [
  // COM 211 CBT
  {
    id: 'q-com211-cbt-1',
    course_id: 'course-com211',
    course_code: 'COM 211',
    topic_id: 'topic-com211-arrays-collections',
    topic_name: 'Java Platform, Arrays & Collections',
    department_name: 'Computer Technology',
    academic_level: 'ND2',
    semester: 'First Semester',
    examination_year: '2024/2025 Curriculum',
    session_type: 'Full-Time',
    question_number: 'CBT.1',
    question_type: 'mcq',
    question_text: 'Which Java Collections Framework class stores unique elements in sorted order?',
    options: [
      { label: 'A', text: 'ArrayList<E>' },
      { label: 'B', text: 'TreeSet<E>' },
      { label: 'C', text: 'LinkedList<E>' },
      { label: 'D', text: 'HashMap<K, V>' },
    ],
    correct_answer: 'B',
    official_solution_excerpt: 'Module 4 (Collections and generics): TreeSet<E> stores unique elements in sorted order.',
    marks: 2,
    difficulty: 'foundation',
    source_document: 'ND2 Curriculum',
    source_page: 4,
    verification_status: 'verified',
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'q-com211-cbt-2',
    course_id: 'course-com211',
    course_code: 'COM 211',
    topic_id: 'topic-com211-oop-events',
    topic_name: 'OOP Principles, Exceptions & Swing Events',
    department_name: 'Computer Technology',
    academic_level: 'ND2',
    semester: 'First Semester',
    examination_year: '2024/2025 Curriculum',
    session_type: 'Full-Time',
    question_number: 'CBT.2',
    question_type: 'mcq',
    question_text: 'Which statement accurately describes method overloading versus method overriding in Java?',
    options: [
      { label: 'A', text: 'Overloading requires a different return type only' },
      { label: 'B', text: 'Overloading uses different parameter lists; overriding replaces an inherited instance method' },
      { label: 'C', text: 'Overriding can only occur within the same class' },
      { label: 'D', text: 'Overloading enables runtime dynamic method dispatch across unrelated classes' },
    ],
    correct_answer: 'B',
    official_solution_excerpt: 'Module 5 & 12: Overloading changes parameter lists; overriding replaces inherited behaviour in a subclass.',
    marks: 2,
    difficulty: 'standard',
    source_document: 'ND2 Curriculum',
    source_page: 5,
    verification_status: 'verified',
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'q-com211-cbt-3',
    course_id: 'course-com211',
    course_code: 'COM 211',
    topic_id: 'topic-com211-web-jdbc',
    topic_name: 'Servlets, JSP & JDBC Database Connectivity',
    department_name: 'Computer Technology',
    academic_level: 'ND2',
    semester: 'First Semester',
    examination_year: '2024/2025 Curriculum',
    session_type: 'Full-Time',
    question_number: 'CBT.3',
    question_type: 'mcq',
    question_text: 'Why is PreparedStatement preferred over concatenating user input into a JDBC Statement?',
    options: [
      { label: 'A', text: 'It bypasses the JDBC driver completely' },
      { label: 'B', text: 'It separates SQL structure from parameter values and helps prevent SQL injection' },
      { label: 'C', text: 'It automatically creates database tables' },
      { label: 'D', text: 'It eliminates the need for Connection objects' },
    ],
    correct_answer: 'B',
    official_solution_excerpt: 'Module 9 (JDBC): PreparedStatement separates SQL structure from parameter values and helps prevent SQL injection.',
    marks: 2,
    difficulty: 'foundation',
    source_document: 'ND2 Curriculum',
    source_page: 9,
    verification_status: 'verified',
    created_at: '2026-01-01T00:00:00.000Z',
  },

  // COM 212 CBT
  {
    id: 'q-com212-cbt-1',
    course_id: 'course-com212',
    course_code: 'COM 212',
    topic_id: 'topic-com212-arch-tools',
    topic_name: 'System Architecture, Assemblers & Linkers',
    department_name: 'Computer Technology',
    academic_level: 'ND2',
    semester: 'First Semester',
    examination_year: '2024/2025 Curriculum',
    session_type: 'Full-Time',
    question_number: 'CBT.1',
    question_type: 'mcq',
    question_text: 'Which systems-programming tool resolves external references between separate object modules into an executable?',
    options: [
      { label: 'A', text: 'Preprocessor' },
      { label: 'B', text: 'Linker' },
      { label: 'C', text: 'Assembler' },
      { label: 'D', text: 'Lexical analyser' },
    ],
    correct_answer: 'B',
    official_solution_excerpt: 'Module 4 & 12: Linking resolves references between compiled/assembled units; loading prepares an executable to run.',
    marks: 2,
    difficulty: 'foundation',
    source_document: 'ND2 Curriculum',
    source_page: 4,
    verification_status: 'verified',
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'q-com212-cbt-2',
    course_id: 'course-com212',
    course_code: 'COM 212',
    topic_id: 'topic-com212-compilers',
    topic_name: 'Compiler Phases & Translation',
    department_name: 'Computer Technology',
    academic_level: 'ND2',
    semester: 'First Semester',
    examination_year: '2024/2025 Curriculum',
    session_type: 'Full-Time',
    question_number: 'CBT.2',
    question_type: 'mcq',
    question_text: 'In compilation, which phase checks grammar rules and builds a parse or syntax tree from tokens?',
    options: [
      { label: 'A', text: 'Lexical analysis' },
      { label: 'B', text: 'Syntax analysis (parsing)' },
      { label: 'C', text: 'Semantic analysis' },
      { label: 'D', text: 'Code linking' },
    ],
    correct_answer: 'B',
    official_solution_excerpt: 'Module 6 (The compilation and translation process): Syntax analysis (parsing) groups tokens according to grammar rules.',
    marks: 2,
    difficulty: 'foundation',
    source_document: 'ND2 Curriculum',
    source_page: 6,
    verification_status: 'verified',
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'q-com212-cbt-3',
    course_id: 'course-com212',
    course_code: 'COM 212',
    topic_id: 'topic-com212-os-io',
    topic_name: 'OS Services, System Calls & I/O Handling',
    department_name: 'Computer Technology',
    academic_level: 'ND2',
    semester: 'First Semester',
    examination_year: '2024/2025 Curriculum',
    session_type: 'Full-Time',
    question_number: 'CBT.3',
    question_type: 'mcq',
    question_text: 'Which I/O technique transfers blocks of data directly between devices and main memory with reduced CPU involvement?',
    options: [
      { label: 'A', text: 'Busy-wait polling' },
      { label: 'B', text: 'Direct Memory Access (DMA)' },
      { label: 'C', text: 'Single-pass assembly' },
      { label: 'D', text: 'Manual interrupt polling' },
    ],
    correct_answer: 'B',
    official_solution_excerpt: 'Module 9 & 12: DMA transfers blocks directly between I/O and memory with minimal CPU intervention.',
    marks: 2,
    difficulty: 'foundation',
    source_document: 'ND2 Curriculum',
    source_page: 9,
    verification_status: 'verified',
    created_at: '2026-01-01T00:00:00.000Z',
  },

  // COM 213 CBT
  {
    id: 'q-com213-cbt-1',
    course_id: 'course-com213',
    course_code: 'COM 213',
    topic_id: 'topic-com213-behavioural',
    topic_name: 'Use-Case, Activity, Sequence & State Diagrams',
    department_name: 'Computer Technology',
    academic_level: 'ND2',
    semester: 'First Semester',
    examination_year: '2024/2025 Curriculum',
    session_type: 'Full-Time',
    question_number: 'CBT.1',
    question_type: 'mcq',
    question_text: 'In a UML use-case diagram, what does the <<include>> relationship represent?',
    options: [
      { label: 'A', text: 'An optional extension triggered only on error' },
      { label: 'B', text: 'A base use case unconditionally incorporates a shared behaviour' },
      { label: 'C', text: 'Two actors competing for one system boundary' },
      { label: 'D', text: 'Physical deployment of hardware nodes' },
    ],
    correct_answer: 'B',
    official_solution_excerpt: 'Module 3 (Use-case diagrams): <<include>> indicates mandatory shared sub-behaviour invoked by the base use case.',
    marks: 2,
    difficulty: 'foundation',
    source_document: 'ND2 Curriculum',
    source_page: 3,
    verification_status: 'verified',
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'q-com213-cbt-2',
    course_id: 'course-com213',
    course_code: 'COM 213',
    topic_id: 'topic-com213-structural',
    topic_name: 'UML Foundations & Structural Diagrams',
    department_name: 'Computer Technology',
    academic_level: 'ND2',
    semester: 'First Semester',
    examination_year: '2024/2025 Curriculum',
    session_type: 'Full-Time',
    question_number: 'CBT.2',
    question_type: 'mcq',
    question_text: 'Which UML relationship represents strong whole-part ownership where the part cannot normally exist independently of the whole?',
    options: [
      { label: 'A', text: 'Dependency' },
      { label: 'B', text: 'Aggregation' },
      { label: 'C', text: 'Composition' },
      { label: 'D', text: 'Realisation' },
    ],
    correct_answer: 'C',
    official_solution_excerpt: 'Module 2 & 5: Composition (filled diamond) indicates strong ownership and coupled lifetime between whole and part.',
    marks: 2,
    difficulty: 'standard',
    source_document: 'ND2 Curriculum',
    source_page: 5,
    verification_status: 'verified',
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'q-com213-cbt-3',
    course_id: 'course-com213',
    course_code: 'COM 213',
    topic_id: 'topic-com213-behavioural',
    topic_name: 'Use-Case, Activity, Sequence & State Diagrams',
    department_name: 'Computer Technology',
    academic_level: 'ND2',
    semester: 'First Semester',
    examination_year: '2024/2025 Curriculum',
    session_type: 'Full-Time',
    question_number: 'CBT.3',
    question_type: 'mcq',
    question_text: 'Which UML diagram specifically shows the time-ordered exchange of messages along object lifelines?',
    options: [
      { label: 'A', text: 'Deployment diagram' },
      { label: 'B', text: 'Sequence diagram' },
      { label: 'C', text: 'Object diagram' },
      { label: 'D', text: 'Component diagram' },
    ],
    correct_answer: 'B',
    official_solution_excerpt: 'Module 7 (Interaction diagrams): Sequence diagrams depict lifelines and time-ordered message exchanges.',
    marks: 2,
    difficulty: 'foundation',
    source_document: 'ND2 Curriculum',
    source_page: 7,
    verification_status: 'verified',
    created_at: '2026-01-01T00:00:00.000Z',
  },

  // COM 215 CBT
  {
    id: 'q-com215-cbt-1',
    course_id: 'course-com215',
    course_code: 'COM 215',
    topic_id: 'topic-com215-design-cad',
    topic_name: 'Graphics, DTP & CAD Fundamentals',
    department_name: 'Computer Technology',
    academic_level: 'ND2',
    semester: 'First Semester',
    examination_year: '2024/2025 Curriculum',
    session_type: 'Full-Time',
    question_number: 'CBT.1',
    question_type: 'mcq',
    question_text: 'Which colour model is typically used for printed publications and commercial offset printing rather than on-screen display?',
    options: [
      { label: 'A', text: 'RGB' },
      { label: 'B', text: 'CMYK' },
      { label: 'C', text: 'HSB' },
      { label: 'D', text: 'RGBA' },
    ],
    correct_answer: 'B',
    official_solution_excerpt: 'Module 2 (Graphics packages): RGB is additive for screens; CMYK (Cyan, Magenta, Yellow, Key/Black) is subtractive for print.',
    marks: 2,
    difficulty: 'foundation',
    source_document: 'ND2 Curriculum',
    source_page: 2,
    verification_status: 'verified',
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'q-com215-cbt-2',
    course_id: 'course-com215',
    course_code: 'COM 215',
    topic_id: 'topic-com215-dbms-sql',
    topic_name: 'DBMS Packages, Keys, Normalization & SQL',
    department_name: 'Computer Technology',
    academic_level: 'ND2',
    semester: 'First Semester',
    examination_year: '2024/2025 Curriculum',
    session_type: 'Full-Time',
    question_number: 'CBT.2',
    question_type: 'mcq',
    question_text: 'Which normal form requires tables to have atomic values in every cell with no repeating groups?',
    options: [
      { label: 'A', text: 'First Normal Form (1NF)' },
      { label: 'B', text: 'Second Normal Form (2NF)' },
      { label: 'C', text: 'Third Normal Form (3NF)' },
      { label: 'D', text: 'Referential Normal Form' },
    ],
    correct_answer: 'A',
    official_solution_excerpt: 'Module 5 (Database management packages): 1NF eliminates repeating groups so every attribute holds atomic values.',
    marks: 2,
    difficulty: 'foundation',
    source_document: 'ND2 Curriculum',
    source_page: 5,
    verification_status: 'verified',
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'q-com215-cbt-3',
    course_id: 'course-com215',
    course_code: 'COM 215',
    topic_id: 'topic-com215-design-cad',
    topic_name: 'Graphics, DTP & CAD Fundamentals',
    department_name: 'Computer Technology',
    academic_level: 'ND2',
    semester: 'First Semester',
    examination_year: '2024/2025 Curriculum',
    session_type: 'Full-Time',
    question_number: 'CBT.3',
    question_type: 'mcq',
    question_text: 'In Desktop Publishing (DTP), what is "bleed"?',
    options: [
      { label: 'A', text: 'The blank space around page margins' },
      { label: 'B', text: 'Artwork or background extending slightly past the trim edge so no white border remains after cutting' },
      { label: 'C', text: 'Automatic hyphenation of body paragraphs' },
      { label: 'D', text: 'Conversion from vector curves to pixels' },
    ],
    correct_answer: 'B',
    official_solution_excerpt: 'Module 3 (Desktop publishing): Bleed extends printed ink beyond the trim line to prevent white edges after trimming.',
    marks: 2,
    difficulty: 'foundation',
    source_document: 'ND2 Curriculum',
    source_page: 3,
    verification_status: 'verified',
    created_at: '2026-01-01T00:00:00.000Z',
  },

  // COM 216 CBT
  {
    id: 'q-com216-cbt-1',
    course_id: 'course-com216',
    course_code: 'COM 216',
    topic_id: 'topic-com216-descriptive-prob',
    topic_name: 'Descriptive Statistics, Sampling & Probability',
    department_name: 'Computer Technology',
    academic_level: 'ND2',
    semester: 'First Semester',
    examination_year: '2024/2025 Curriculum',
    session_type: 'Full-Time',
    question_number: 'CBT.1',
    question_type: 'mcq',
    question_text: 'For the sample response times 4, 6, 6, 8, 11 (ms), what is the sample standard deviation?',
    options: [
      { label: 'A', text: '√7 ≈ 2.65 ms' },
      { label: 'B', text: '√5.6 ≈ 2.37 ms' },
      { label: 'C', text: '7.00 ms' },
      { label: 'D', text: '6.00 ms' },
    ],
    correct_answer: 'A',
    official_solution_excerpt: 'Module 6 & 14: Mean = 7; sum of squared deviations = 28; sample variance s² = 28/(5-1) = 7; sample SD = √7 ≈ 2.65 ms.',
    marks: 2,
    difficulty: 'standard',
    source_document: 'ND2 Curriculum',
    source_page: 6,
    verification_status: 'verified',
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'q-com216-cbt-2',
    course_id: 'course-com216',
    course_code: 'COM 216',
    topic_id: 'topic-com216-inference-reg',
    topic_name: 'Hypothesis Testing, t-Tests, Chi-Square & Regression',
    department_name: 'Computer Technology',
    academic_level: 'ND2',
    semester: 'First Semester',
    examination_year: '2024/2025 Curriculum',
    session_type: 'Full-Time',
    question_number: 'CBT.2',
    question_type: 'mcq',
    question_text: 'A lecturer measures the same 20 students\' typing speed before and after training. Which test compares the paired means when difference assumptions hold?',
    options: [
      { label: 'A', text: 'Independent-samples t-test' },
      { label: 'B', text: 'Paired-samples t-test' },
      { label: 'C', text: 'Chi-square goodness-of-fit test' },
      { label: 'D', text: 'One-way ANOVA' },
    ],
    correct_answer: 'B',
    official_solution_excerpt: 'Module 10 & 14 Example B: Pre/post observations on the same students are paired, so a paired-samples t-test applies.',
    marks: 2,
    difficulty: 'foundation',
    source_document: 'ND2 Curriculum',
    source_page: 14,
    verification_status: 'verified',
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'q-com216-cbt-3',
    course_id: 'course-com216',
    course_code: 'COM 216',
    topic_id: 'topic-com216-inference-reg',
    topic_name: 'Hypothesis Testing, t-Tests, Chi-Square & Regression',
    department_name: 'Computer Technology',
    academic_level: 'ND2',
    semester: 'First Semester',
    examination_year: '2024/2025 Curriculum',
    session_type: 'Full-Time',
    question_number: 'CBT.3',
    question_type: 'mcq',
    question_text: 'What is a Type I error in hypothesis testing?',
    options: [
      { label: 'A', text: 'Failing to reject a false null hypothesis' },
      { label: 'B', text: 'Rejecting a true null hypothesis (false positive)' },
      { label: 'C', text: 'Calculating standard error instead of standard deviation' },
      { label: 'D', text: 'Choosing Pearson r when data is linear' },
    ],
    correct_answer: 'B',
    official_solution_excerpt: 'Module 9 (Hypothesis testing): Type I error rejects a true null hypothesis H₀.',
    marks: 2,
    difficulty: 'foundation',
    source_document: 'ND2 Curriculum',
    source_page: 9,
    verification_status: 'verified',
    created_at: '2026-01-01T00:00:00.000Z',
  },

  // COM 226 File Organisation CBT
  {
    id: 'q-com226-fileorg-cbt-1',
    course_id: 'course-com226',
    course_code: 'COM 226',
    topic_id: 'topic-com226-fileorg',
    topic_name: 'Data Hierarchy, Storage & File Structures',
    department_name: 'Computer Technology',
    academic_level: 'ND2',
    semester: 'Second Semester',
    examination_year: '2024/2025 Curriculum',
    session_type: 'Full-Time',
    question_number: 'File.10',
    question_type: 'mcq',
    question_text: 'A block is 8,192 bytes and each unspanned record is 200 bytes (no overhead). What are the blocking factor and total blocks required for 1,500 records?',
    options: [
      { label: 'A', text: '40 records/block; 37 blocks' },
      { label: 'B', text: '40 records/block; 38 blocks' },
      { label: 'C', text: '41 records/block; 37 blocks' },
      { label: 'D', text: '42 records/block; 36 blocks' },
    ],
    correct_answer: 'B',
    official_solution_excerpt: 'Module 14 worked answer: Blocking factor = floor(8192/200) = 40 records/block; blocks = ceil(1500/40) = ceil(37.5) = 38 blocks.',
    marks: 2,
    difficulty: 'standard',
    source_document: 'ND2 Curriculum',
    source_page: 14,
    verification_status: 'verified',
    created_at: '2026-01-01T00:00:00.000Z',
  },

  // EED 216 CBT
  {
    id: 'q-eed216-cbt-1',
    course_id: 'course-eed216',
    course_code: 'EED 216',
    topic_id: 'topic-eed216-finance-risk',
    topic_name: 'Marketing, Costing, Finance & IP Protection',
    department_name: 'General Studies & Entrepreneurship',
    academic_level: 'ND2',
    semester: 'Second Semester',
    examination_year: '2024/2025 Curriculum',
    session_type: 'Full-Time',
    question_number: 'CBT.1',
    question_type: 'mcq',
    question_text: 'A venture has fixed cost ₦90,000, selling price ₦600/unit, and variable cost ₦300/unit. What is its break-even output?',
    options: [
      { label: 'A', text: '150 units' },
      { label: 'B', text: '300 units' },
      { label: 'C', text: '450 units' },
      { label: 'D', text: '600 units' },
    ],
    correct_answer: 'B',
    official_solution_excerpt: 'Module 18: Contribution/unit = ₦600 − ₦300 = ₦300; Break-even = ₦90,000 / ₦300 = 300 units.',
    marks: 2,
    difficulty: 'standard',
    source_document: 'ND2 Curriculum',
    source_page: 18,
    verification_status: 'verified',
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'q-eed216-cbt-2',
    course_id: 'course-eed216',
    course_code: 'EED 216',
    topic_id: 'topic-eed216-ventures',
    topic_name: 'Entrepreneurship, Market Research & Ownership',
    department_name: 'General Studies & Entrepreneurship',
    academic_level: 'ND2',
    semester: 'Second Semester',
    examination_year: '2024/2025 Curriculum',
    session_type: 'Full-Time',
    question_number: 'CBT.2',
    question_type: 'mcq',
    question_text: 'Which Nigerian corporate body handles formal business name and company registration?',
    options: [
      { label: 'A', text: 'CAC (Corporate Affairs Commission)' },
      { label: 'B', text: 'NAFDAC' },
      { label: 'C', text: 'NBTE' },
      { label: 'D', text: 'CBN' },
    ],
    correct_answer: 'A',
    official_solution_excerpt: 'Module 9 (Starting and registering a business in Nigeria): CAC registers business names and limited liability companies.',
    marks: 2,
    difficulty: 'foundation',
    source_document: 'ND2 Curriculum',
    source_page: 9,
    verification_status: 'verified',
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'q-eed216-cbt-3',
    course_id: 'course-eed216',
    course_code: 'EED 216',
    topic_id: 'topic-eed216-finance-risk',
    topic_name: 'Marketing, Costing, Finance & IP Protection',
    department_name: 'General Studies & Entrepreneurship',
    academic_level: 'ND2',
    semester: 'Second Semester',
    examination_year: '2024/2025 Curriculum',
    session_type: 'Full-Time',
    question_number: 'CBT.3',
    question_type: 'mcq',
    question_text: 'Which form of intellectual property protects distinctive brand names, logos, and slogans used to identify goods or services?',
    options: [
      { label: 'A', text: 'Patent' },
      { label: 'B', text: 'Trademark' },
      { label: 'C', text: 'Copyright' },
      { label: 'D', text: 'Trade credit' },
    ],
    correct_answer: 'B',
    official_solution_excerpt: 'Module 15: Patents protect inventions; copyright protects creative/literary works; trademarks protect brand marks and logos.',
    marks: 2,
    difficulty: 'foundation',
    source_document: 'ND2 Curriculum',
    source_page: 15,
    verification_status: 'verified',
    created_at: '2026-01-01T00:00:00.000Z',
  },

  // GNS 201 CBT
  {
    id: 'q-gns201-cbt-1',
    course_id: 'course-gns201',
    course_code: 'GNS 201',
    topic_id: 'topic-gns201-grammar',
    topic_name: 'Grammar, Clauses, Concord & Semantics',
    department_name: 'General Studies & Entrepreneurship',
    academic_level: 'ND2',
    semester: 'First Semester',
    examination_year: '2024/2025 Curriculum',
    session_type: 'Full-Time',
    question_number: 'CBT.1',
    question_type: 'mcq',
    question_text: 'Choose the grammatically correct revision of: "The list of equipment are on the table."',
    options: [
      { label: 'A', text: 'The list of equipment are on the tables.' },
      { label: 'B', text: 'The list of equipment is on the table.' },
      { label: 'C', text: 'The list of equipments are on the table.' },
      { label: 'D', text: 'The list of equipment were on the table.' },
    ],
    correct_answer: 'B',
    official_solution_excerpt: 'Module 4 & 11: The singular head noun "list" governs the verb ("is"), not "equipment".',
    marks: 2,
    difficulty: 'foundation',
    source_document: 'ND2 Curriculum',
    source_page: 11,
    verification_status: 'verified',
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'q-gns201-cbt-2',
    course_id: 'course-gns201',
    course_code: 'GNS 201',
    topic_id: 'topic-gns201-grammar',
    topic_name: 'Grammar, Clauses, Concord & Semantics',
    department_name: 'General Studies & Entrepreneurship',
    academic_level: 'ND2',
    semester: 'First Semester',
    examination_year: '2024/2025 Curriculum',
    session_type: 'Full-Time',
    question_number: 'CBT.2',
    question_type: 'mcq',
    question_text: 'Which sentence corrects the error of proximity concord in "Neither the lecturer nor the students was present."?',
    options: [
      { label: 'A', text: 'Neither the lecturer nor the students were present.' },
      { label: 'B', text: 'Neither the lecturer nor the students is present.' },
      { label: 'C', text: 'Neither the lecturer or the students was present.' },
      { label: 'D', text: 'Neither the lecturers nor the student were present.' },
    ],
    correct_answer: 'A',
    official_solution_excerpt: 'Module 4 & 11: With "neither ... nor", the verb agrees with the nearer subject ("the students" -> plural "were").',
    marks: 2,
    difficulty: 'standard',
    source_document: 'ND2 Curriculum',
    source_page: 11,
    verification_status: 'verified',
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'q-gns201-cbt-3',
    course_id: 'course-gns201',
    course_code: 'GNS 201',
    topic_id: 'topic-gns201-writing-lit',
    topic_name: 'Comprehension, Summary, Essays & Literature',
    department_name: 'General Studies & Entrepreneurship',
    academic_level: 'ND2',
    semester: 'First Semester',
    examination_year: '2024/2025 Curriculum',
    session_type: 'Full-Time',
    question_number: 'CBT.3',
    question_type: 'mcq',
    question_text: 'In drama, what is a "soliloquy"?',
    options: [
      { label: 'A', text: 'A humorous interruption during a tragedy' },
      { label: 'B', text: 'A speech delivered by a character alone on stage revealing private thoughts directly to the audience' },
      { label: 'C', text: 'The final resolution of plot tension' },
      { label: 'D', text: 'A brief remark directed at one other character' },
    ],
    correct_answer: 'B',
    official_solution_excerpt: 'Module 10 (Introduction to literature and drama): A soliloquy expresses a lone character\'s inner thoughts aloud.',
    marks: 2,
    difficulty: 'foundation',
    source_document: 'ND2 Curriculum',
    source_page: 10,
    verification_status: 'verified',
    created_at: '2026-01-01T00:00:00.000Z',
  },
];

export const ATTACHMENT_QUESTIONS: Question[] = [
  ...buildRevisionQuestions(),
  ...ATTACHMENT_CBT_QUESTIONS,
];
