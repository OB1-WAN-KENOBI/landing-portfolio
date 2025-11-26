import type { ApiProject, ApiProfile } from "./http/types";

export interface HeroData {
  name: string;
  role: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  year: number;
  status: string;
  images?: string[];
}

export type SkillCategory = "frontend" | "backend" | "tooling" | "other";
export type SkillLevel = "beginner" | "middle" | "advanced";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
}

// Default profile data with ru/en
export const defaultProfile: ApiProfile = {
  name: "John Doe",
  role: {
    ru: "Full Stack Разработчик",
    en: "Full Stack Developer",
  },
  description: {
    ru: "Увлеченный разработчик, создающий современные веб-приложения с React, TypeScript и Node.js. Сосредоточен на чистом коде и пользовательском опыте.",
    en: "Passionate developer creating modern web applications with React, TypeScript, and Node.js. Focused on clean code and user experience.",
  },
  aboutTexts: {
    ru: [
      "Я увлеченный full-stack разработчик с более чем 5-летним опытом создания веб-приложений. Мой путь в разработке программного обеспечения начался с любопытства о том, как работают веб-сайты, и превратился в карьеру, сосредоточенную на создании значимых цифровых впечатлений.",
      "Я специализируюсь на современных JavaScript фреймворках, особенно React и TypeScript, и всегда изучаю новые технологии и лучшие практики. Я верю в написание чистого, поддерживаемого кода и в важность пользовательского дизайна.",
      "Когда я не программирую, мне нравится вносить вклад в проекты с открытым исходным кодом, писать технические статьи и наставлять младших разработчиков. Я всегда рад принять новые вызовы и работать над проектами, которые имеют значение.",
    ],
    en: [
      "I'm a passionate full-stack developer with over 5 years of experience building web applications. My journey in software development started with a curiosity about how websites work, and it has evolved into a career focused on creating meaningful digital experiences.",
      "I specialize in modern JavaScript frameworks, particularly React and TypeScript, and I'm always exploring new technologies and best practices. I believe in writing clean, maintainable code and in the importance of user-centered design.",
      "When I'm not coding, I enjoy contributing to open-source projects, writing technical articles, and mentoring junior developers. I'm always excited to take on new challenges and work on projects that make a difference.",
    ],
  },
};

// Default projects data with ru/en
export const defaultProjects: ApiProject[] = [
  {
    id: "1",
    title: {
      ru: "E-Commerce Платформа",
      en: "E-Commerce Platform",
    },
    description: {
      ru: "Полнофункциональное e-commerce решение, построенное на React и Node.js. Включает аутентификацию пользователей, обработку платежей и админ-панель. Платформа поддерживает несколько способов оплаты, управление инвентарем и отслеживание заказов в реальном времени.",
      en: "A full-stack e-commerce solution built with React and Node.js. Features include user authentication, payment processing, and admin dashboard. The platform supports multiple payment methods, inventory management, and real-time order tracking.",
    },
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Stripe",
    ],
    year: 2024,
    status: "Completed",
  },
  {
    id: "2",
    title: {
      ru: "Приложение для Управления Задачами",
      en: "Task Management App",
    },
    description: {
      ru: "Коллаборативное приложение для управления задачами с обновлениями в реальном времени. Построено с использованием React, TypeScript и WebSocket для живой синхронизации. Включает командное сотрудничество, назначение задач, дедлайны и отслеживание прогресса.",
      en: "A collaborative task management application with real-time updates. Built using React, TypeScript, and WebSocket for live synchronization. Features include team collaboration, task assignments, deadlines, and progress tracking.",
    },
    techStack: ["React", "TypeScript", "WebSocket", "Node.js", "PostgreSQL"],
    year: 2023,
    status: "Completed",
  },
  {
    id: "3",
    title: {
      ru: "Погодная Панель",
      en: "Weather Dashboard",
    },
    description: {
      ru: "Адаптивная погодная панель, отображающая текущие условия и прогнозы. Интегрируется с несколькими погодными API и включает интерактивные карты. Пользователи могут просматривать детальные прогнозы, погодные предупреждения и исторические данные.",
      en: "A responsive weather dashboard that displays current conditions and forecasts. Integrates with multiple weather APIs and features interactive maps. Users can view detailed forecasts, weather alerts, and historical data.",
    },
    techStack: ["React", "JavaScript", "Chart.js", "OpenWeather API"],
    year: 2023,
    status: "Completed",
  },
  {
    id: "4",
    title: {
      ru: "Аналитика Социальных Сетей",
      en: "Social Media Analytics",
    },
    description: {
      ru: "Платформа аналитики для метрик социальных сетей. Предоставляет инсайты, графики и отчеты для отслеживания вовлеченности и производительности. Включает визуализацию данных, функциональность экспорта и генерацию пользовательских отчетов.",
      en: "Analytics platform for social media metrics. Provides insights, charts, and reports for tracking engagement and performance. Features include data visualization, export functionality, and custom report generation.",
    },
    techStack: ["React", "TypeScript", "D3.js", "Node.js", "Redis"],
    year: 2024,
    status: "In Progress",
  },
  {
    id: "5",
    title: {
      ru: "Система Управления Обучением",
      en: "Learning Management System",
    },
    description: {
      ru: "Образовательная платформа для онлайн-курсов. Включает видеотрансляции, викторины, отслеживание прогресса и генерацию сертификатов. Поддерживает нескольких инструкторов, зачисление студентов и комплексную аналитику.",
      en: "Educational platform for online courses. Includes video streaming, quizzes, progress tracking, and certificate generation. Features support for multiple instructors, student enrollment, and comprehensive analytics.",
    },
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS S3"],
    year: 2024,
    status: "Completed",
  },
];

export const skills: Skill[] = [
  {
    id: "1",
    name: "React",
    category: "frontend",
    level: "advanced",
  },
  {
    id: "2",
    name: "TypeScript",
    category: "frontend",
    level: "advanced",
  },
  {
    id: "3",
    name: "Vue.js",
    category: "frontend",
    level: "middle",
  },
  {
    id: "4",
    name: "SCSS",
    category: "frontend",
    level: "advanced",
  },
  {
    id: "5",
    name: "HTML/CSS",
    category: "frontend",
    level: "advanced",
  },
  {
    id: "6",
    name: "Node.js",
    category: "backend",
    level: "advanced",
  },
  {
    id: "7",
    name: "Express",
    category: "backend",
    level: "advanced",
  },
  {
    id: "8",
    name: "PostgreSQL",
    category: "backend",
    level: "middle",
  },
  {
    id: "9",
    name: "MongoDB",
    category: "backend",
    level: "middle",
  },
  {
    id: "10",
    name: "REST API",
    category: "backend",
    level: "advanced",
  },
  {
    id: "11",
    name: "Git",
    category: "tooling",
    level: "advanced",
  },
  {
    id: "12",
    name: "Docker",
    category: "tooling",
    level: "middle",
  },
  {
    id: "13",
    name: "Webpack",
    category: "tooling",
    level: "middle",
  },
  {
    id: "14",
    name: "Vite",
    category: "tooling",
    level: "advanced",
  },
  {
    id: "15",
    name: "Jest",
    category: "tooling",
    level: "middle",
  },
  {
    id: "16",
    name: "Figma",
    category: "other",
    level: "middle",
  },
  {
    id: "17",
    name: "Agile",
    category: "other",
    level: "middle",
  },
  {
    id: "18",
    name: "CI/CD",
    category: "tooling",
    level: "beginner",
  },
];
