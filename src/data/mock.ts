// Мок-дані студентської частини, зняті з макета Figma («диплом»).
// TODO(backend): кожен export нижче — майбутній ендпоінт/таблиця.

export type SubjectColor = "lime" | "lavender" | "pink" | "yellow" | "blue";

// Чип предмета (списки завдань) і блок у розкладі.
export const SUBJECT_CHIP: Record<SubjectColor, string> = {
  lime: "bg-lime-100 text-lime-800",
  lavender: "bg-indigo-100 text-indigo-700",
  pink: "bg-pink-100 text-pink-700",
  yellow: "bg-amber-100 text-amber-700",
  blue: "bg-blue-100 text-blue-700",
};

export const SUBJECT_BLOCK: Record<SubjectColor, string> = {
  lime: "bg-lime-200/70 text-lime-900",
  lavender: "bg-indigo-100 text-indigo-800",
  pink: "bg-pink-100 text-pink-800",
  yellow: "bg-amber-100 text-amber-800",
  blue: "bg-blue-100 text-blue-800",
};

export interface Lesson {
  id: string;
  title: string;
  day: number; // 0 = Пн … 6 = Нд
  start: string; // "08:20"
  end: string;
  color: SubjectColor;
}

export const WEEK_LESSONS: Lesson[] = [
  { id: "l1", title: "Веб-дизайн", day: 0, start: "08:20", end: "10:30", color: "lime" },
  { id: "l2", title: "Рисунок", day: 0, start: "10:40", end: "12:10", color: "lavender" },
  { id: "l3", title: "Живопис", day: 0, start: "12:20", end: "13:20", color: "lime" },
  { id: "l4", title: "Живопис", day: 1, start: "09:10", end: "09:40", color: "lavender" },
  { id: "l5", title: "Дизайн проєктування", day: 1, start: "09:45", end: "12:20", color: "pink" },
  { id: "l6", title: "Графічні техніки", day: 1, start: "12:20", end: "14:00", color: "yellow" },
  { id: "l7", title: "Графічні техніки", day: 2, start: "09:30", end: "12:10", color: "yellow" },
  { id: "l8", title: "Англ. мова", day: 2, start: "12:25", end: "13:10", color: "pink" },
  { id: "l9", title: "Філософія", day: 3, start: "08:00", end: "09:50", color: "blue" },
  { id: "l10", title: "Рисунок", day: 3, start: "10:10", end: "13:40", color: "lavender" },
  { id: "l11", title: "Англ. мова", day: 3, start: "14:50", end: "15:30", color: "pink" },
  { id: "l12", title: "Графічні техніки", day: 4, start: "08:10", end: "09:40", color: "lavender" },
  { id: "l13", title: "Право", day: 4, start: "09:40", end: "12:50", color: "pink" },
  { id: "l14", title: "Дизайн проєктування", day: 4, start: "13:10", end: "14:30", color: "yellow" },
];

export interface Course {
  id: string;
  title: string;
  teacher: string;
  progress: number; // 0..100
}

export const COURSES: Course[] = [
  { id: "ux-ui-design", title: "UX-UI дизайн", teacher: "Вакуленко О. В.", progress: 43 },
  { id: "painting", title: "Живопис", teacher: "Грицько Н. А.", progress: 38 },
  { id: "drawing", title: "Рисунок", teacher: "Запісочна С. В.", progress: 73 },
  { id: "design-projection", title: "Дизайн проєктування", teacher: "Гудзима В. М.", progress: 93 },
  { id: "graphic-techniques", title: "Графічні техніки", teacher: "Пушкаренко Ф. Г.", progress: 84 },
  { id: "calligraphy", title: "Каліграфія", teacher: "Руденко З. Х.", progress: 61 },
  { id: "rhetoric", title: "Риторика", teacher: "Приходько П. М.", progress: 92 },
  { id: "ethics", title: "Етика ділового спілкування", teacher: "Федоренко О. К.", progress: 23 },
  { id: "photographics", title: "Фотографіка", teacher: "Каракай Є. З.", progress: 56 },
];

export type TaskStatus = "done" | "not_done" | "checking" | "rework";

export interface TaskRow {
  id: string;
  subject: string;
  color: SubjectColor;
  title: string;
  date: string;
  homework: string | null; // "10/10" | null
  needsRework?: boolean;
  test: string | null;
  status: TaskStatus;
  deadline?: string;
}

export const TASKS: TaskRow[] = [
  {
    id: "t1", subject: "UX-UI Дизайн", color: "lime",
    title: "Тема 3: Створення мудборду", date: "9 вересня",
    homework: "10/10", test: "10/10", status: "done",
  },
  {
    id: "t2", subject: "Живопис", color: "yellow",
    title: "Тема 2: Теорія кольору", date: "24 жовтня",
    homework: "0/10", test: null, status: "not_done",
  },
  {
    id: "t3", subject: "Дизайн проєктування", color: "pink",
    title: "Тема 2: Створення логотипу для торгової марки", date: "12 жовтня",
    homework: null, needsRework: true, test: "0/10", status: "rework",
    deadline: "25 жовтня, 23:59",
  },
  {
    id: "t4", subject: "Рисунок", color: "blue",
    title: "Тема 3: М'язи рук", date: "23 листопада",
    homework: "0/10", test: "0/10", status: "checking",
  },
  {
    id: "t5", subject: "Графічні техніки", color: "pink",
    title: "Тема 1: Створення ескізу", date: "30 вересня",
    homework: "10/10", test: "10/10", status: "done",
  },
  {
    id: "t6", subject: "UX-UI Дизайн", color: "lime",
    title: "Тема 5: Розробка прототипу", date: "4 листопада",
    homework: "10/10", test: "10/10", status: "done",
  },
];

export interface SubjectGrade {
  id: string;
  subject: string;
  teacher: string;
  score: number;
  max: number;
  progress: number;
}

export const SUBJECT_GRADES: SubjectGrade[] = [
  { id: "g1", subject: "UX-UI дизайн", teacher: "Вакуленко О. В.", score: 78, max: 100, progress: 84 },
  { id: "g2", subject: "Живопис", teacher: "Грицько Н. А.", score: 45, max: 100, progress: 50 },
  { id: "g3", subject: "Рисунок", teacher: "Запісочна С. В.", score: 88, max: 100, progress: 90 },
  { id: "g4", subject: "Дизайн проєктування", teacher: "Гудзима В. М.", score: 92, max: 100, progress: 95 },
];

export interface RecentGrade {
  value: string;
  subject: string;
  highlighted?: boolean;
}

export const RECENT_GRADES_RANGE = "03.02.2025 - 10.02.2025";

export const RECENT_GRADES: RecentGrade[] = [
  { value: "+8", subject: "Дизайн проєктування", highlighted: true },
  { value: "+5", subject: "Живопис" },
  { value: "+4", subject: "Рисунок" },
  { value: "+15", subject: "UX-UI дизайн" },
  { value: "8", subject: "Риторика" },
];

export type CalendarMarker = "hw" | "test" | "exam";

// Маркери на міні-календарі «Домашні завдання та тести» (лютий 2025)
export const ASSESSMENT_MARKERS: Record<number, CalendarMarker> = {
  8: "hw",
  10: "hw",
  21: "exam",
  24: "test",
  25: "exam",
};

export interface NewsPost {
  id: string;
  author: string;
  role: string;
  timeAgo: string;
  body: string;
  hasImage?: boolean;
}

export const NEWS_POSTS: NewsPost[] = [
  {
    id: "n1",
    author: "Андрій Сергійович Гордієнко",
    role: "Відповідальний секретар приймальної комісії",
    timeAgo: "4 дні назад",
    body: "Навчання стартує 2 вересня 2025 року. Розклад, курси та викладачі вже доступні на платформі. У разі питань — звертайтеся до деканату або підтримки.",
  },
  {
    id: "n2",
    author: "Богдан Віталійович Шинко",
    role: "Президент студентської ради",
    timeAgo: "7 днів назад",
    body: "Учора відбулася відкрита лекція від Катерини Литвиненко, директорки маркетингового відділу компанії BrightNova. Студенти дізналися про нові тренди у брендбудуванні, реальні кейси та тонкощі роботи в креативній індустрії. Дякуємо всім, хто приєднався — було цікаво, динамічно і дуже по-справжньому!",
    hasImage: true,
  },
];

export const STUDENT_PROFILE = {
  fullName: "Монько Софія Леонідівна",
  roleLabel: "Студентка групи 1Д-21",
  email: "fr0gg0cat1@gmail.com",
  firstName: "Софія",
  lastName: "Монько",
  middleName: "Леонідівна",
  phone: "+ (380) 93 109 18 03",
  speciality: "022 Дизайн",
  group: "1Д-21",
  registeredAt: "11 вересня 2020 року",
};

export const COURSE_DETAILS = {
  "ux-ui-design": {
    title: "UI/UX дизайн",
    chips: [
      { label: "25 тем", className: "bg-lime-100 text-lime-800" },
      { label: "50 лекцій", className: "bg-pink-100 text-pink-700" },
      { label: "72 години", className: "bg-amber-100 text-amber-700" },
      { label: "Залік", className: "bg-emerald-100 text-emerald-700" },
    ],
    sections: [
      { title: "Силабус", content: "Опис курсу, цілі та результати навчання." },
      { title: "Теоретичні відомості", content: "Конспекти лекцій і додаткові матеріали." },
      { title: "Практичні та індивідуальні завдання", content: "Завдання до кожної теми з дедлайнами." },
      { title: "Контроль", content: "Форми контролю: тести, перегляди, залік." },
    ],
    teacher: {
      name: "Вакуленко О. В.",
      contacts: ["Email", "Telegram", "Viber"],
    },
    consultations: [
      { kind: "Офлайн:", text: "Кожен понеділок 18:10 - 19:10, аудиторія №219", hasLink: false },
      { kind: "Онлайн:", text: "Кожен понеділок 16:40 - 18:00", hasLink: true },
    ],
  },
} as const;

export const DASHBOARD = {
  semesterDaysLeft: 0,
  semesterCountdown: "Днів 40 хвилин 12 секунд",
  coursesCount: 8,
  undoneTasks: 5,
  announcement: {
    author: "А. С. Гордієнко",
    text: "Цього тижня 14.04.2025 в коледжі відбуватиметься день відкритих дверей.",
  },
};

// ── Дані сторінки теми курсу (матеріали + домашнє завдання) ──

export interface Topic {
  id: number;
  title: string;
  done: boolean;
}

export const TOPICS: Topic[] = Array.from({ length: 11 }, (_, i) => ({
  id: i + 1,
  title: `Тема ${i + 1}: Назва`,
  done: true,
}));

export type MaterialKind = "file" | "video" | "text" | "test";

export interface Material {
  id: string;
  kind: MaterialKind;
  title: string;
  subtitle: string;
  action: "import" | "view";
}

export const TOPIC_MATERIALS: Material[] = [
  { id: "m1", kind: "file", title: "Презентація Назва", subtitle: "Файл", action: "import" },
  { id: "m2", kind: "video", title: "Назва", subtitle: "Відео", action: "view" },
  { id: "m3", kind: "text", title: "Назва", subtitle: "Текст", action: "view" },
  { id: "m4", kind: "test", title: "Назва", subtitle: "Тест", action: "view" },
];

export const TOPIC_HOMEWORK = {
  description:
    "Розробіть інтерактивний прототип мобільного додатку для замовлення кави в собою. Необхідно створити кілька основних екранів, зокрема головний екран, меню замовлення та екран підтвердження. У завданні слід звернути увагу на логіку взаємодії користувача з інтерфейсом, зручність навігації та відповідність дизайну принципам сучасного UI/UX.",
  maxScore: 10,
  maxFileSize: "100 мб",
};

// ── Налаштування кабінету ──

export const NOTIFICATION_SETTINGS = [
  "Сповіщення про зміни в розкладі",
  "Про нові завдання",
  "Про оцінювання надісланих завдань",
  "Про нові повідомлення у чатах",
  "Про новини коледжу",
];

export const CONNECTED_ACCOUNTS = [
  { id: "google", name: "Google", email: "fr0gg0cat1@gmail.com", connected: true },
  { id: "facebook", name: "Facebook", email: "Софія Монько", connected: false },
];

// ── Месенджер (messager_main / messager_chat / messager_search) ──

export interface ChatPreview {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread?: number;
}

export const CHAT_LIST: ChatPreview[] = [
  { id: "c1", name: "Афанасьєва Дар'я Олександрівна", preview: "Фото", time: "13:24" },
  { id: "c2", name: "Конопенко Віталій Олександрович", preview: "Є конспект із вчорашньої лекції? Не встиг записати", time: "Сб" },
  { id: "c3", name: "Гордієнко Андрій Сергійович", preview: "Не знаєш, коли буде передача з матану?", time: "Пт" },
  { id: "c4", name: "Макарова Ольга Степанівна", preview: "Я не бачу завдання на платформі. Це тільки в мене так?", time: "Вт", unread: 6 },
  { id: "c5", name: "Дорошенко Іван Ігорович", preview: "Хто вже здав есе з соціофілософії? Що питали?", time: "Пн", unread: 2 },
  { id: "c6", name: "Приходько Миколай Григорович", preview: "Нагадую, завтра здача есе до 18:00. Не затягуйте :)", time: "05 квіт.", unread: 3 },
  { id: "c7", name: "Гущенко Марія Владиславівна", preview: "Чи треба роздруковувати завдання, чи можна просто скину…", time: "30 трав." },
  { id: "c8", name: "Верещук Наталія Максимівна", preview: "Нам точно казали до понеділка здати?", time: "24 бер." },
  { id: "c9", name: "Калач Вікторія Іванівна", preview: "Доброго ранку! Завантажила презентацію до сьогоднішньої…", time: "12 лют." },
  { id: "c10", name: "Абраменко Данііл Юрійович", preview: "Це вже третій дедлайн за тиждень", time: "02 січ." },
];

export interface ChatMessage {
  id: string;
  mine: boolean;
  text: string;
  time: string;
  dateChip?: string; // показати чип дати перед цим повідомленням
}

export const CHAT_MESSAGES: ChatMessage[] = [
  { id: "m1", mine: false, text: "Слухай, пам'ятаєш ти розповідала про лекцію з права?", time: "16:32", dateChip: "11 квітня" },
  { id: "m2", mine: false, text: "Можеш, будь ласка, її скинути?", time: "16:34" },
  { id: "m3", mine: true, text: "Заціни", time: "18:32" },
  { id: "m4", mine: true, text: "https://youtu.be/kce5HTWmecs — Лекція з правознавства. Права на інтелектуальну власність", time: "18:33" },
  { id: "m5", mine: false, text: "Ти вже робила вже те есе з цінностей суспільства?", time: "16:33", dateChip: "13 квітня" },
  { id: "m6", mine: false, text: "Бо я от відкрила — і взагалі не розумію, що вони хочуть", time: "16:34" },
  { id: "m7", mine: true, text: "Ага, вчора ввечері трохи почала. Там треба просто на прикладі якогось фільму/ситуації описати цінність", time: "16:32" },
  { id: "m8", mine: true, text: "Я писала про взаємоповагу і навела \"Слугу народу\"", time: "16:32" },
];

// ── Журнал викладача (my groups / group list / grades / attendance) ──

export interface TeacherGroup {
  id: string;
  subject: string;
  chipClass: string;
  name: string;
  members: number;
  membersChipClass: string;
  range: string;
}

export const TEACHER_GROUPS: TeacherGroup[] = [
  { id: "1d-21", subject: "UX-UI Дизайн", chipClass: "bg-lime-100 text-lime-800", name: "1Д-21", members: 24, membersChipClass: "bg-lime-100 text-lime-800", range: "03.09.2024 - 12.05.2025" },
  { id: "3d-23", subject: "Живопис", chipClass: "bg-amber-100 text-amber-700", name: "3Д-23", members: 16, membersChipClass: "bg-amber-100 text-amber-700", range: "02.09.2024 - 23.05.2025" },
  { id: "2d-20", subject: "Дизайн проєктування", chipClass: "bg-emerald-100 text-emerald-700", name: "2Д-20", members: 9, membersChipClass: "bg-emerald-100 text-emerald-700", range: "01.09.2024 - 12.05.2025" },
  { id: "1d-24", subject: "Рисунок", chipClass: "bg-cyan-100 text-cyan-700", name: "1Д-24", members: 12, membersChipClass: "bg-cyan-100 text-cyan-700", range: "04.09.2024 - 21.05.2025" },
  { id: "2d-22", subject: "Графічні техніки", chipClass: "bg-pink-100 text-pink-700", name: "2Д-22", members: 14, membersChipClass: "bg-pink-100 text-pink-700", range: "09.09.2024 - 24.05.2025" },
];

export interface GroupStudent {
  id: string;
  name: string;
  speciality: string;
  email: string;
  phone: string;
}

export const GROUP_STUDENTS: GroupStudent[] = [
  { id: "s1", name: "Афанасьєва Дар'я Олександрівна", speciality: "022 Дизайн", email: "fr0gg0cat1@gmail.com", phone: "+(380) 93 109 18 03" },
  { id: "s2", name: "Конопенко Віталій Олександрович", speciality: "022 Дизайн", email: "konop@gmail.com", phone: "+(380) 98 121 12 43" },
  { id: "s3", name: "Гордієнко Андрій Сергійович", speciality: "022 Дизайн", email: "gordienko@gmail.com", phone: "+(380) 93 219 56 92" },
  { id: "s4", name: "Макарова Ольга Степанівна", speciality: "022 Дизайн", email: "olyamak@gmail.com", phone: "+(380) 98 173 24 35" },
  { id: "s5", name: "Дорошенко Іван Ігорович", speciality: "022 Дизайн", email: "doroshiv@gmail.com", phone: "+(380) 93 923 16 32" },
  { id: "s6", name: "Приходько Миколай Григорович", speciality: "022 Дизайн", email: "prih0dniok@gmail.com", phone: "+(380) 96 962 94 03" },
  { id: "s7", name: "Гущенко Марія Владиславівна", speciality: "022 Дизайн", email: "guschenko@gmail.com", phone: "+(380) 93 109 18 03" },
  { id: "s8", name: "Верещук Наталія Максимівна", speciality: "022 Дизайн", email: "natali93@gmail.com", phone: "+(380) 93 734 92 43" },
  { id: "s9", name: "Абраменко Данііл Юрійович", speciality: "022 Дизайн", email: "abramenko@gmail.com", phone: "+(380) 93 109 18 03" },
];

// Оцінки: змістовий модуль 1, теми з максимумами
export const GRADE_TOPICS = [
  { title: "Тема 1. Назва", max: 12 },
  { title: "Тема 2. Назва", max: 20 },
  { title: "Тема 3. Назва", max: 15 },
  { title: "Тема 4. Назва", max: 30 },
  { title: "Тема 5. Назва", max: 10 },
];

export const GRADES_TABLE: Record<string, number[]> = {
  s1: [8, 19, 8, 19, 9],
  s2: [4, 12, 3, 27, 3],
  s3: [3, 8, 10, 12, 5],
  s4: [10, 11, 9, 23, 6],
  s5: [12, 10, 12, 15, 3],
  s6: [8, 18, 14, 14, 8],
  s7: [8, 14, 6, 27, 7],
  s8: [11, 5, 13, 22, 8],
  s9: [9, 19, 10, 26, 5],
};

export const ATTENDANCE_DATES = [
  "03.09.2024", "10.09.2024", "17.09.2024", "24.09.2024", "01.10.2024",
  "08.10.2024", "15.10.2024", "22.10.2024", "29.10.2024",
];

export const ATTENDANCE_RANGE = "03.09.2024 - 29.10.2024";

const v = true, x = false;
export const ATTENDANCE_TABLE: Record<string, boolean[]> = {
  s1: [v, v, v, v, v, v, v, v, x],
  s2: [v, v, v, x, v, x, v, v, v],
  s3: [v, x, v, v, v, v, v, v, v],
  s4: [x, v, x, v, v, v, v, x, v],
  s5: [v, v, v, v, v, v, v, v, v],
  s6: [v, v, v, v, x, v, v, v, v],
  s7: [v, v, v, v, v, v, v, v, v],
  s8: [v, v, v, v, v, v, v, v, v],
  s9: [x, x, v, v, v, v, v, v, v],
};

// ── Адмінка: користувачі (users_students/teachers/admins — wireframe) ──

export type AdminRole = "student" | "teacher" | "admin";

export interface AdminUser {
  id: string;
  name: string;
  detail: string; // група / кафедра / роль
  email: string;
  phone: string;
}

export const ADMIN_USERS: Record<AdminRole, AdminUser[]> = {
  student: GROUP_STUDENTS.map((s, i) => ({
    id: `as${i}`,
    name: s.name,
    detail: "1Д-21",
    email: s.email,
    phone: s.phone,
  })),
  teacher: COURSES.slice(0, 6).map((c, i) => ({
    id: `at${i}`,
    name: c.teacher,
    detail: c.title,
    email: `teacher${i + 1}@might.edu`,
    phone: "+(380) 93 000 00 00",
  })),
  admin: [
    { id: "aa1", name: "Гончар Олександр Вікторович", detail: "Кафедра дизайну", email: "admin@might.edu", phone: "+(380) 93 111 11 11" },
    { id: "aa2", name: "Шевченко Ірина Петрівна", detail: "Кафедра живопису", email: "i.shevchenko@might.edu", phone: "+(380) 93 222 22 22" },
  ],
};

// ── Новини курсу (course news student user) ──

export interface CourseNewsPost {
  id: string;
  title: string;
  author: string;
  timeAgo: string;
  body: string;
}

export const COURSE_NEWS: CourseNewsPost[] = [
  {
    id: "cn1",
    title: "Оновлено дедлайн для домашнього завдання №2",
    author: "Вакуленко Ольга Вікторівна",
    timeAgo: "6 годин тому",
    body: "Шановні студенти! Звертаю вашу увагу, що термін здачі домашнього завдання №2 продовжено до п'ятниці, 21:00. Будь ласка, використовуйте цей час для доопрацювання прототипів та врахування моїх коментарів з попереднього обговорення. Якщо виникнуть питання — пишіть у чат або на пошту.",
  },
  {
    id: "cn2",
    title: "Запрошення на відкриту лекцію про дизайн мобільних застосунків",
    author: "Вакуленко Ольга Вікторівна",
    timeAgo: "8 годин тому",
    body: "Друзі, хочу повідомити, що в середу о 17:00 відбудеться відкрита гостьова лекція від запрошеного дизайнера з компанії Readdle. Тема: «Особливості проектування інтерфейсів для iOS та Android». Лекція пройде онлайн, посилання додам у день події. Дуже рекомендую долучитися — буде цікаво і корисно для ваших проєктів!",
  },
];
