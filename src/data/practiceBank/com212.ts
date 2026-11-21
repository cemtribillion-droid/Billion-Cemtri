import type { Question } from '../../types';

const BASE = {
  course_id: 'course-com212',
  course_code: 'COM 212',
  department_name: 'Computer Technology',
  academic_level: 'ND2' as const,
  semester: 'First Semester' as const,
  examination_year: '2024/2025 Practice Bank',
  session_type: 'Full-Time' as const,
  source_document: 'ND2 Practice Bank',
  verification_status: 'verified' as const,
  verified_by: 'ND2 Official Practice Bank',
  created_at: '2026-01-01T00:00:00.000Z',
};

const ARCH = {
  topic_id: 'topic-com212-arch-tools',
  topic_name: 'System Architecture, Assemblers & Linkers',
};

const COMPILERS = {
  topic_id: 'topic-com212-compilers',
  topic_name: 'Compiler Phases & Translation',
};

const OS_IO = {
  topic_id: 'topic-com212-os-io',
  topic_name: 'OS Services, System Calls & I/O Handling',
};

const MCQ_ITEMS: Array<{
  num: number;
  text: string;
  options: [string, string, string, string];
  ans: 'A' | 'B' | 'C' | 'D';
  exp: string;
  topic: typeof ARCH;
}> = [
  { num: 1, text: 'Systems programming primarily involves developing software that:', options: ['Designs posters', 'Manages and supports computer system operations', 'Creates animations', 'Edits photographs'], ans: 'B', exp: 'Systems programming builds foundational software that manages and supports system operations.', topic: ARCH },
  { num: 2, text: 'Which software acts as an intermediary between users and computer hardware?', options: ['Operating system', 'Spreadsheet', 'Presentation software', 'Web browser'], ans: 'A', exp: 'The operating system manages hardware resources and provides services to users and applications.', topic: OS_IO },
  { num: 3, text: 'Which component manages the execution of processes?', options: ['Printer', 'CPU scheduler', 'Monitor', 'Keyboard'], ans: 'B', exp: 'The CPU scheduler selects ready processes for processor execution.', topic: OS_IO },
  { num: 4, text: 'What is a process?', options: ['A program stored permanently on a disk', 'A program currently executing', 'A computer network', 'A programming language'], ans: 'B', exp: 'A process is an active, executing instance of a program.', topic: OS_IO },
  { num: 5, text: 'Which of the following is a low-level programming language?', options: ['Python', 'Java', 'Assembly language', 'HTML'], ans: 'C', exp: 'Assembly language is a low-level language closely tied to hardware instructions.', topic: ARCH },
  { num: 6, text: 'Which program translates assembly language into machine code?', options: ['Compiler', 'Assembler', 'Linker', 'Loader'], ans: 'B', exp: 'An assembler converts assembly mnemonics and operands into machine code.', topic: ARCH },
  { num: 7, text: 'Which component is responsible for allocating CPU time to processes?', options: ['Scheduler', 'Text editor', 'File explorer', 'Database'], ans: 'A', exp: 'The scheduler allocates CPU execution slices across ready processes.', topic: OS_IO },
  { num: 8, text: 'What is a system call?', options: ['A request made by a program for an operating system service', 'A telephone call', 'A computer virus', 'A hardware upgrade'], ans: 'A', exp: 'System calls provide a controlled interface for programs to request OS kernel services.', topic: OS_IO },
  { num: 9, text: 'Which memory is volatile?', options: ['ROM', 'RAM', 'Hard disk', 'Flash drive'], ans: 'B', exp: 'RAM is volatile memory and loses its contents when power is removed.', topic: ARCH },
  { num: 10, text: 'Which of the following is an example of an operating system?', options: ['Microsoft Word', 'Linux', 'Adobe Photoshop', 'PowerPoint'], ans: 'B', exp: 'Linux is a widely used operating system.', topic: OS_IO },
  { num: 11, text: 'What is the main purpose of a device driver?', options: ['To create documents', 'To enable communication with hardware devices', 'To browse websites', 'To compress files'], ans: 'B', exp: 'Device drivers translate OS commands into hardware-specific device operations.', topic: OS_IO },
  { num: 12, text: 'Which process state indicates that a process is waiting for an event?', options: ['Running', 'Ready', 'Waiting', 'Terminated'], ans: 'C', exp: 'Waiting (blocked) processes await an I/O event or resource.', topic: OS_IO },
  { num: 13, text: 'What is multitasking?', options: ['Running or managing multiple tasks over the same period', 'Using multiple keyboards', 'Printing multiple documents', 'Installing multiple monitors'], ans: 'A', exp: 'Multitasking allows an OS to manage multiple concurrent tasks.', topic: OS_IO },
  { num: 14, text: 'Which of these is a common file system?', options: ['NTFS', 'HTTP', 'SMTP', 'HTML'], ans: 'A', exp: 'NTFS is a standard disk file system.', topic: OS_IO },
  { num: 15, text: 'What is deadlock?', options: ['A computer shutting down normally', 'Processes waiting indefinitely for resources held by one another', 'A successful program execution', 'A deleted file'], ans: 'B', exp: 'Deadlock occurs when processes block indefinitely waiting on resources held by each other.', topic: OS_IO },
  { num: 16, text: 'Which of the following is a command-line shell?', options: ['Bash', 'Excel', 'PowerPoint', 'Photoshop'], ans: 'A', exp: 'Bash is a Unix/Linux command-line shell interpreter.', topic: OS_IO },
  { num: 17, text: 'What does a linker do?', options: ['Combines object files and libraries into an executable', 'Deletes source code', 'Controls the monitor', 'Formats a hard disk'], ans: 'A', exp: 'A linker resolves external symbols and merges object modules and libraries.', topic: ARCH },
  { num: 18, text: 'Which memory management technique divides memory into fixed-size blocks?', options: ['Paging', 'Spooling', 'Scheduling', 'Compilation'], ans: 'A', exp: 'Paging partitions logical memory into fixed-size pages and RAM into frames.', topic: OS_IO },
  { num: 19, text: 'What is the kernel?', options: ['The core component of an operating system', 'A word-processing application', 'A network cable', 'A type of printer'], ans: 'A', exp: 'The kernel is the privileged core of the operating system.', topic: OS_IO },
  { num: 20, text: 'Which of the following is a function of an operating system?', options: ['Process management', 'Designing buildings', 'Manufacturing processors', 'Creating electricity'], ans: 'A', exp: 'Process management is a fundamental OS responsibility.', topic: OS_IO },
];

const TF_ITEMS: Array<{ num: number; text: string; ans: 'True' | 'False'; exp: string; topic: typeof ARCH }> = [
  { num: 21, text: 'Systems programming deals with software closely related to computer hardware and operating systems.', ans: 'True', exp: 'Systems software operates close to hardware and OS abstractions.', topic: ARCH },
  { num: 22, text: 'An operating system manages computer resources.', ans: 'True', exp: 'The OS allocates CPU, memory, I/O devices, and storage.', topic: OS_IO },
  { num: 23, text: 'A process and a program are exactly the same thing.', ans: 'False', exp: 'False: A program is passive code on disk; a process is an active running instance.', topic: OS_IO },
  { num: 24, text: 'RAM retains its contents permanently after power is switched off.', ans: 'False', exp: 'False: RAM is volatile and loses stored data on power loss.', topic: ARCH },
  { num: 25, text: 'A compiler translates source code into another form, often machine or intermediate code.', ans: 'True', exp: 'Compilers translate high-level source into target machine code or bytecode.', topic: COMPILERS },
  { num: 26, text: 'An assembler translates assembly instructions into machine code.', ans: 'True', exp: 'Assemblers produce machine-level object code from assembly source.', topic: ARCH },
  { num: 27, text: 'The kernel is a central component of an operating system.', ans: 'True', exp: 'The kernel mediates hardware access and system scheduling.', topic: OS_IO },
  { num: 28, text: 'A device driver helps the operating system communicate with hardware.', ans: 'True', exp: 'Drivers abstract hardware registers and protocols for the OS.', topic: OS_IO },
  { num: 29, text: 'Deadlock can occur when processes compete for resources.', ans: 'True', exp: 'Resource contention under circular wait and hold-and-wait can cause deadlock.', topic: OS_IO },
  { num: 30, text: 'A scheduler helps determine which process gets CPU time.', ans: 'True', exp: 'CPU schedulers implement policies like FCFS, SJF, and Round Robin.', topic: OS_IO },
  { num: 31, text: 'Paging is a memory management technique.', ans: 'True', exp: 'Paging maps fixed-size virtual pages onto physical frames.', topic: OS_IO },
  { num: 32, text: 'A system call allows a program to request operating system services.', ans: 'True', exp: 'Applications use system calls to request I/O, process control, or memory services.', topic: OS_IO },
  { num: 33, text: 'Linux is an operating system kernel.', ans: 'True', exp: 'Linux is the core OS kernel used across distributions.', topic: OS_IO },
  { num: 34, text: 'A linker is responsible for translating every high-level language statement directly into machine code.', ans: 'False', exp: 'False: Compilers translate high-level code; linkers combine compiled object files and libraries.', topic: ARCH },
  { num: 35, text: 'A process in the ready state is waiting for CPU allocation.', ans: 'True', exp: 'Ready processes reside in the ready queue awaiting CPU dispatch.', topic: OS_IO },
  { num: 36, text: 'An interrupt can signal an event that requires processor attention.', ans: 'True', exp: 'Hardware/software interrupts alert the CPU to handle urgent events.', topic: OS_IO },
  { num: 37, text: 'Multitasking means a computer can only execute one program during its lifetime.', ans: 'False', exp: 'False: Multitasking enables concurrent execution of multiple tasks.', topic: OS_IO },
  { num: 38, text: 'File permissions can control access to files.', ans: 'True', exp: 'Read, write, and execute permissions enforce file security.', topic: OS_IO },
  { num: 39, text: 'Virtual memory can allow programs to use an address space larger than available physical RAM.', ans: 'True', exp: 'Virtual memory combines RAM with secondary storage backing via paging.', topic: OS_IO },
  { num: 40, text: 'A loader places a program into memory for execution.', ans: 'True', exp: 'The loader copies the executable image into main memory and starts execution.', topic: ARCH },
];

const FILL_ITEMS: Array<{ num: number; text: string; ans: string; exp: string; topic: typeof ARCH }> = [
  { num: 41, text: 'The core component of an operating system is called the __________.', ans: 'Kernel', exp: 'The kernel manages CPU, memory, and hardware interrupts directly.', topic: OS_IO },
  { num: 42, text: 'A program that is currently executing is known as a __________.', ans: 'Process', exp: 'A process represents an executing program with its own state and memory.', topic: OS_IO },
  { num: 43, text: 'The software that translates assembly language into machine code is an __________.', ans: 'Assembler', exp: 'An assembler translates assembly language statements to object/machine code.', topic: ARCH },
  { num: 44, text: 'The process of assigning CPU time to processes is called CPU __________.', ans: 'Scheduling | CPU scheduling', exp: 'CPU scheduling decides which ready process runs next.', topic: OS_IO },
  { num: 45, text: 'A request made by an application for an operating system service is called a system __________.', ans: 'Call | System call', exp: 'System calls transition safely from user mode to kernel mode.', topic: OS_IO },
  { num: 46, text: 'The memory that loses its contents when power is removed is __________.', ans: 'RAM | Random Access Memory', exp: 'RAM is volatile main memory.', topic: ARCH },
  { num: 47, text: 'A software component that controls communication between an operating system and a hardware device is a device __________.', ans: 'Driver | Device driver', exp: 'Device drivers bridge the OS kernel and specific peripherals.', topic: OS_IO },
  { num: 48, text: 'The condition in which processes wait indefinitely for resources is called __________.', ans: 'Deadlock', exp: 'Deadlocked processes wait permanently in a circular dependency.', topic: OS_IO },
  { num: 49, text: 'The process of dividing memory into fixed-size pages is called __________.', ans: 'Paging', exp: 'Paging reduces external fragmentation by using fixed-size pages.', topic: OS_IO },
  { num: 50, text: 'A program that combines object files and libraries is called a __________.', ans: 'Linker', exp: 'The linker binds object modules into an executable binary.', topic: ARCH },
];

const PRACTICAL_THEORY_ITEMS: Array<{
  num: number;
  text: string;
  solution: string;
  scheme: string[];
  topic: typeof ARCH;
}> = [
  {
    num: 51,
    text: 'Practical — Linux File and Directory Management:\nWrite the Linux terminal commands to: display current working directory, create directory COM212, enter it, create notes.txt, display its contents, copy it to backup.txt, rename backup.txt to final_notes.txt, and list all files.',
    solution: `pwd
mkdir COM212
cd COM212
touch notes.txt
cat notes.txt
cp notes.txt backup.txt
mv backup.txt final_notes.txt
ls -l`,
    scheme: ['pwd and mkdir COM212', 'cd and touch notes.txt', 'cat and cp backup.txt', 'mv final_notes.txt and ls'],
    topic: OS_IO,
  },
  {
    num: 52,
    text: 'Practical — C Program for Process Information:\nWrite a simple C program that displays a process identification number using getpid(), the parent process identification number using getppid(), and a message indicating that the program is running.',
    solution: `#include <stdio.h>
#include <unistd.h>

int main() {
    printf("Process ID: %d\\n", getpid());
    printf("Parent Process ID: %d\\n", getppid());
    printf("The program is running.\\n");
    return 0;
}`,
    scheme: ['#include <unistd.h>', 'getpid()', 'getppid()', 'printf output'],
    topic: OS_IO,
  },
  {
    num: 53,
    text: 'Practical — Basic Shell Script:\nWrite a shell script that accepts a user\'s name, displays a welcome message, accepts two numbers, calculates and displays their sum, and displays whether the sum is even or odd.',
    solution: `#!/bin/bash
echo "Enter your name:"
read name
echo "Welcome, $name"

echo "Enter first number:"
read a
echo "Enter second number:"
read b

sum=$((a + b))
echo "Sum = $sum"

if [ $((sum % 2)) -eq 0 ]; then
    echo "The sum is even"
else
    echo "The sum is odd"
fi`,
    scheme: ['read name and welcome', 'read two numbers and sum', 'modulo even/odd check'],
    topic: OS_IO,
  },
  {
    num: 54,
    text: 'Define systems programming and explain five areas in which it is applied.',
    solution:
      'Systems programming is the development of low-level software that manages computer hardware and supports application execution. Five application areas: (1) Operating system kernels and resource managers, (2) Device drivers, (3) Compilers and assemblers, (4) Linkers, loaders, and debuggers, (5) System utilities and file/network servers.',
    scheme: ['Systems programming definition', 'Operating systems and drivers', 'Compilers/assemblers/linkers', 'System utilities'],
    topic: ARCH,
  },
  {
    num: 55,
    text: 'Explain the functions of an operating system and discuss its major components.',
    solution:
      'Core OS functions: process management, memory management, file system management, I/O and device management, security/access control, and user/program interfaces. Major components include the kernel, command-line shell/GUI, file system manager, device drivers, and system utilities.',
    scheme: ['Process and memory management', 'File and device management', 'Security and interface', 'Kernel shell drivers'],
    topic: OS_IO,
  },
  {
    num: 56,
    text: 'Differentiate between a program and a process. Explain the common states of a process.',
    solution:
      'A program is a passive set of stored instructions on disk, whereas a process is an active executing instance with allocated CPU state, registers, and address space. Common process states: New (being created), Ready (awaiting CPU), Running (executing instructions), Waiting/Blocked (awaiting I/O or event), and Terminated (finished execution).',
    scheme: ['Passive program vs active process', 'New and Ready states', 'Running and Waiting/Blocked states', 'Terminated state'],
    topic: OS_IO,
  },
  {
    num: 57,
    text: 'Explain the functions of a compiler, assembler, linker and loader.',
    solution:
      '- Compiler: translates high-level source code into assembly, intermediate, or machine code.\n- Assembler: converts assembly mnemonics into machine-code object files.\n- Linker: resolves external references and merges object files and libraries into an executable.\n- Loader: places the executable into main memory, sets up execution context, and begins execution.',
    scheme: ['Compiler translates high-level code', 'Assembler converts assembly', 'Linker combines object files/libraries', 'Loader loads into memory'],
    topic: COMPILERS,
  },
  {
    num: 58,
    text: 'Discuss process scheduling and explain First Come First Served, Shortest Job First and Round Robin scheduling.',
    solution:
      'Process scheduling decides which ready process receives CPU time to maximise utilisation, throughput, and responsiveness.\n- FCFS: non-preemptive queue serving processes in arrival order.\n- SJF: prioritises the process with the shortest estimated CPU burst.\n- Round Robin: assigns each ready process a fixed time quantum in cyclic rotation.',
    scheme: ['Scheduling objectives', 'FCFS arrival order', 'SJF shortest CPU burst', 'Round Robin time quantum'],
    topic: OS_IO,
  },
  {
    num: 59,
    text: 'Explain memory management and discuss paging, segmentation and virtual memory.',
    solution:
      'Memory management tracks, allocates, protects, and reclaims main memory across processes.\n- Paging: divides logical memory into fixed-size pages and RAM into frames to eliminate external fragmentation.\n- Segmentation: divides memory into logical variable-sized regions (code, stack, data).\n- Virtual memory: abstracts RAM using disk backing so processes enjoy larger isolated address spaces.',
    scheme: ['Memory allocation and protection', 'Paging fixed-size frames', 'Segmentation logical units', 'Virtual memory disk backing'],
    topic: OS_IO,
  },
  {
    num: 60,
    text: 'Define deadlock. Explain its four necessary conditions and describe ways of preventing or avoiding it.',
    solution:
      'Deadlock is a state where processes wait indefinitely for resources held by one another. Four necessary conditions: (1) Mutual exclusion, (2) Hold and wait, (3) No preemption, (4) Circular wait. Prevention breaks at least one necessary condition (e.g., strict resource ordering); avoidance checks allocation safety (e.g., Banker\'s algorithm) before granting resources.',
    scheme: ['Deadlock definition', 'Mutual exclusion and Hold and wait', 'No preemption and Circular wait', 'Prevention and avoidance'],
    topic: OS_IO,
  },
];

export const COM212_PRACTICE_QUESTIONS: Question[] = [
  ...MCQ_ITEMS.map((item) => ({
    ...BASE,
    id: `q-com212-pb-${item.num}`,
    topic_id: item.topic.topic_id,
    topic_name: item.topic.topic_name,
    question_number: String(item.num),
    question_type: 'mcq' as const,
    question_text: item.text,
    options: [
      { label: 'A' as const, text: item.options[0] },
      { label: 'B' as const, text: item.options[1] },
      { label: 'C' as const, text: item.options[2] },
      { label: 'D' as const, text: item.options[3] },
    ],
    correct_answer: item.ans,
    official_solution_excerpt: item.exp,
    marks: 1,
    difficulty: 'foundation' as const,
    source_page: 1,
  })),
  ...TF_ITEMS.map((item) => ({
    ...BASE,
    id: `q-com212-pb-${item.num}`,
    topic_id: item.topic.topic_id,
    topic_name: item.topic.topic_name,
    question_number: String(item.num),
    question_type: 'true_false' as const,
    question_text: item.text,
    options: [
      { label: 'A' as const, text: 'True' },
      { label: 'B' as const, text: 'False' },
    ],
    correct_answer: item.ans,
    official_solution_excerpt: item.exp,
    marks: 1,
    difficulty: 'foundation' as const,
    source_page: 2,
  })),
  ...FILL_ITEMS.map((item) => ({
    ...BASE,
    id: `q-com212-pb-${item.num}`,
    topic_id: item.topic.topic_id,
    topic_name: item.topic.topic_name,
    question_number: String(item.num),
    question_type: 'fill_gap' as const,
    question_text: item.text,
    correct_answer: item.ans,
    official_solution_excerpt: item.exp,
    marks: 1,
    difficulty: 'standard' as const,
    source_page: 3,
  })),
  ...PRACTICAL_THEORY_ITEMS.map((item) => ({
    ...BASE,
    id: `q-com212-pb-${item.num}`,
    topic_id: item.topic.topic_id,
    topic_name: item.topic.topic_name,
    question_number: String(item.num),
    question_type: 'theory' as const,
    question_text: item.text,
    official_solution_excerpt: item.solution,
    marking_scheme: item.scheme,
    marks: 10,
    difficulty: item.num <= 53 ? ('challenging' as const) : ('standard' as const),
    source_page: 4,
  })),
];
