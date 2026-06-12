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
