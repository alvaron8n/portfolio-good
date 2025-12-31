export const content = {
  // ============================================
  // GLOBAL
  // ============================================
  site: {
    name: 'Álvaro Fernández',
    role: 'Automatización & Desarrollo de Software',
    tagline: 'Tecnología que trabaja por ti.',
    availability: 'Disponible para nuevos proyectos',
    whatsappUrl: 'https://wa.me/34684005952',
    email: 'alferpri@gmail.com',
    phone: '+34 684 005 952',
    location: 'España',
    calendarUrl: 'https://cal.com/alvarofp/15min',
    social: {
      linkedin: 'https://linkedin.com/in/alvarofp',
      github: 'https://github.com/alvarofp',
      behance: 'https://behance.net/alvarofp',
    },
  },

  // ============================================
  // NAVEGACIÓN
  // ============================================
  nav: [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Contacto', href: '/contacto' },
  ],

  // ============================================
  // HOME
  // ============================================
  home: {
    hero: {
      badge: 'Disponible Q1 2025',
      line1: 'Sistemas que te',
      line2: 'devuelven el tiempo.',
      subheadline: 'Ayudo a empresas a eliminar el trabajo manual repetitivo mediante automatización inteligente y desarrollo a medida.',
      cta: {
        label: 'Ver cómo trabajo',
        href: '/proyectos/crm-automatizacion',
      },
      secondaryCta: {
        label: 'Hablemos',
        href: 'https://cal.com/alvarofp/15min',
      },
      techStack: 'n8n ✦ React ✦ Supabase ✦ OpenAI ✦ TypeScript',
    },

    socialProof: {
      intro: 'Colaborando con empresas que valoran la eficiencia',
      logos: [
        { name: 'Flama Studio' },
        { name: 'Bohemian' },
        { name: 'Alba Plata' },
        { name: 'Urban 33' },
      ],
      quote: {
        text: 'Álvaro transformó un proceso de 4 horas semanales en algo que ocurre automáticamente en segundos. La tranquilidad mental que eso nos da es invaluable.',
        author: 'Director de Operaciones, Agencia de Marketing',
      },
    },

    about: {
      headline: 'No es magia, es ingeniería.',
      description: 'Vengo del mundo del marketing, donde vi de primera mano cuánto talento se desperdicia en tareas administrativas. Hoy, combino esa visión de negocio con desarrollo técnico para crear sistemas que funcionan de verdad, sin promesas vacías.',
      cta: {
        label: 'Conoce mi historia',
        href: '/sobre-mi',
      },
    },

    services: {
      title: 'Cómo puedo ayudarte',
      subtitle: 'Soluciones técnicas diseñadas para resolver problemas de negocio reales.',
      items: [
        {
          id: 'automatizacion',
          number: '01',
          title: 'Automatización de Procesos',
          description: 'Conecto tus herramientas actuales para que los datos fluyan solos. Facturación, onboarding de clientes o reportes, sin intervención humana.',
          tags: ['n8n', 'Make', 'APIs'],
        },
        {
          id: 'desarrollo-ia',
          number: '02',
          title: 'Desarrollo & IA',
          description: 'Creo herramientas a medida cuando el software estándar se queda corto. Potenciadas con IA para hacerlas más inteligentes y fáciles de usar.',
          tags: ['React', 'Node.js', 'LLMs'],
        },
        {
          id: 'web',
          number: '03',
          title: 'Desarrollo Web',
          description: 'Sitios web rápidos y optimizados que no solo se ven bien, sino que están construidos para convertir visitantes en clientes.',
          tags: ['Next.js', 'Tailwind', 'SEO'],
        },
        {
          id: 'consultoria',
          number: '04',
          title: 'Consultoría Técnica',
          description: 'Auditoría de tus procesos actuales y hoja de ruta para digitalizar tu negocio sin gastar en herramientas innecesarias.',
          tags: ['Estrategia', 'Arquitectura'],
        },
      ],
      cta: {
        label: 'Explorar todos los servicios',
        href: '/servicios',
      },
    },

    projects: {
      title: 'Trabajo Reciente',
      subtitle: 'Resultados tangibles en entornos reales.',
      items: [
        {
          slug: 'crm-automatizacion',
          title: 'Automatización CRM Inmobiliario',
          category: 'Automatización',
          result: 'Ahorro de 20h/semana en gestión administrativa',
        },
        {
          slug: 'webs-locales',
          title: 'Plataforma de Reservas',
          category: 'Desarrollo Web',
          result: '+60% en conversión de reservas directas',
        },
        {
          slug: 'branding',
          title: 'Identidad Corporativa Tech',
          category: 'Branding',
          result: 'Rediseño completo de marca y sistema visual',
        },
      ],
      cta: {
        label: 'Ver portafolio completo',
        href: '/proyectos',
      },
    },

    cta: {
      headline: '¿Empezamos?',
      subheadline: 'Si sientes que tu empresa podría ser más eficiente, probablemente tengas razón. Tengamos una charla breve para explorar posibilidades.',
      button: {
        label: 'Agendar llamada exploratoria',
        href: 'https://cal.com/alvarofp/15min',
      },
      emailText: 'O escríbeme directamente a',
      email: 'alferpri@gmail.com',
    },
  },

  // ============================================
  // FOOTER
  // ============================================
  footer: {
    tagline: 'Diseñando el futuro del trabajo.',
    copyright: '© 2025 Álvaro Fernández. Todos los derechos reservados.',
    links: [
      { label: 'LinkedIn', href: 'https://linkedin.com/in/alvarofp' },
      { label: 'GitHub', href: 'https://github.com/alvarofp' },
      { label: 'Email', href: 'mailto:alferpri@gmail.com' },
    ],
  },

  // ============================================
  // SERVICIOS PAGE
  // ============================================
  services: {
    hero: {
      title: 'Servicios',
      subtitle: 'Soluciones técnicas para escalar tu negocio sin aumentar el caos.',
    },
    items: [
      {
        id: 'automatizacion',
        number: '01',
        title: 'Automatización de Procesos',
        tagline: 'Deja que los robots hagan el trabajo repetitivo.',
        description: 'Diseño e implemento flujos de trabajo automatizados que conectan tus aplicaciones existentes. El objetivo es eliminar el error humano y liberar a tu equipo de tareas de bajo valor.',
        benefits: [
          { text: 'Reducción drástica de errores manuales', icon: 'check' },
          { text: 'Procesos operativos 24/7', icon: 'clock' },
          { text: 'Escalabilidad sin contratar más personal', icon: 'growth' },
        ],
        tags: ['n8n', 'Make', 'Webhooks', 'APIs'],
        stats: { value: '20h+', label: 'ahorradas por semana (media)' },
        cta: { label: 'Ver ejemplo', href: '/proyectos/crm-automatizacion' },
      },
      {
        id: 'desarrollo-ia',
        number: '02',
        title: 'Desarrollo de Software & IA',
        tagline: 'Herramientas a medida para problemas específicos.',
        description: 'Desarrollo aplicaciones web internas y externas integrando Inteligencia Artificial para potenciar sus capacidades. Desde dashboards de gestión hasta asistentes inteligentes.',
        benefits: [
          { text: 'Software adaptado 100% a tu flujo', icon: 'target' },
          { text: 'Integración con modelos LLM (GPT, Claude)', icon: 'cpu' },
          { text: 'Propiedad total del código y los datos', icon: 'lock' },
        ],
        tags: ['React', 'TypeScript', 'Node.js', 'Supabase', 'OpenAI'],
        stats: { value: '100%', label: 'adaptado a tu negocio' },
        cta: { label: 'Ver ejemplo', href: '/proyectos/crm-automatizacion' },
      },
      {
        id: 'web',
        number: '03',
        title: 'Desarrollo Web de Alto Rendimiento',
        tagline: 'Tu presencia digital, optimizada.',
        description: 'Sitios web corporativos y landing pages diseñados para la velocidad y la conversión. Código limpio, SEO técnico impecable y una experiencia de usuario fluida.',
        benefits: [
          { text: 'Carga instantánea y optimización Core Web Vitals', icon: 'speed' },
          { text: 'Estructura optimizada para SEO', icon: 'search' },
          { text: 'Diseño responsive y accesible', icon: 'mobile' },
        ],
        tags: ['Next.js', 'Astro', 'Tailwind CSS', 'Framer Motion'],
        stats: { value: '< 1s', label: 'tiempo de carga' },
        cta: { label: 'Ver ejemplo', href: '/proyectos/webs-locales' },
      },
    ],
    cta: {
      title: '¿Dudas sobre qué necesitas?',
      subtitle: 'A veces el problema no es evidente. Analicemos tu caso sin compromiso.',
      button: { label: 'Solicitar auditoría breve', href: 'https://cal.com/alvarofp/15min' },
    },
  },

  // ============================================
  // PROYECTOS PAGE
  // ============================================
  projects: {
    hero: {
      title: 'Proyectos',
      subtitle: 'Una selección de trabajos recientes y casos de éxito.',
    },
    categories: [
      { id: 'all', label: 'Todos' },
      { id: 'automatizacion', label: 'Automatización' },
      { id: 'web', label: 'Web' },
      { id: 'branding', label: 'Branding' },
    ],
    items: [
      {
        slug: 'crm-automatizacion',
        title: 'Automatización CRM Inmobiliario',
        category: 'automatizacion',
        categoryLabel: 'Automatización',
        shortDesc: 'Gestión automática de leads y contratos.',
        featured: true,
      },
      {
        slug: 'webs-locales',
        title: 'Plataforma de Reservas',
        category: 'web',
        categoryLabel: 'Web App',
        shortDesc: 'Sistema de reservas para negocios locales.',
        featured: true,
      },
      {
        slug: 'branding',
        title: 'Rebranding Tech Startup',
        category: 'branding',
        categoryLabel: 'Branding',
        shortDesc: 'Identidad visual para empresa SaaS.',
        featured: true,
      },
    ],
  },

  // ============================================
  // CONTACTO PAGE
  // ============================================
  contact: {
    hero: {
      title: 'Contacto',
      subtitle: 'Inicia la conversación.',
    },
    methods: [
      { type: 'calendar', label: 'Agendar videollamada', href: 'https://cal.com/alvarofp/15min', primary: true, description: 'La forma más rápida de conocernos.' },
      { type: 'email', label: 'Enviar email', href: 'mailto:alferpri@gmail.com', primary: false, description: 'Para consultas detalladas.' },
      { type: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/34684005952', primary: false, description: 'Mensajes directos.' },
    ],
  },

  // ============================================
  // ABOUT PAGE
  // ============================================
  about: {
    hero: {
      title: 'Sobre mí',
      subtitle: 'Ingeniería, diseño y negocio.',
    },
    intro: {
      line1: 'Desarrollador Full Stack &',
      line2: 'Especialista en Automatización.',
      headline: 'Mi objetivo es simplificar lo complejo.',
      paragraphs: [
        'Comencé mi carrera en el marketing digital, gestionando campañas y analizando métricas. Rápidamente me di cuenta de que la verdadera ventaja competitiva no estaba en gastar más en anuncios, sino en operar de manera más eficiente.',
        'Esa frustración con las tareas manuales y repetitivas me llevó al mundo del código. Aprendí a programar para construir las herramientas que yo mismo necesitaba. Lo que empezó como scripts sencillos evolucionó hacia sistemas complejos de automatización y desarrollo de software completo.',
        'Hoy, ayudo a empresas a implementar esa misma eficiencia. No soy solo un desarrollador que recibe tickets; soy un consultor técnico que entiende tus objetivos de negocio y construye la tecnología necesaria para alcanzarlos.',
      ],
    },
    skills: {
      title: 'Stack Tecnológico',
      categories: [
        {
          name: 'Core',
          items: ['JavaScript/TypeScript', 'React', 'Node.js', 'Python'],
        },
        {
          name: 'Automatización',
          items: ['n8n', 'Make', 'Zapier', 'Webhooks', 'REST APIs'],
        },
        {
          name: 'Base de Datos & Backend',
          items: ['Supabase', 'PostgreSQL', 'Firebase', 'Serverless Functions'],
        },
        {
          name: 'Herramientas',
          items: ['Git', 'Docker', 'Figma', 'VS Code', 'Cursor'],
        },
      ],
    },
    experience: {
      title: 'Trayectoria',
      items: [
        {
          period: '2023 - Presente',
          role: 'Consultor Independiente',
          company: 'Freelance',
          description: 'Desarrollo de soluciones a medida y automatización para PYMES y Startups.',
        },
        {
          period: '2021 - 2023',
          role: 'Responsable de Tecnología & Marketing',
          company: 'Agencia Digital',
          description: 'Lideré la transformación digital interna e implementación de CRM.',
        },
      ],
    },
    education: {
      title: 'Formación',
      items: [
        {
          period: '2019',
          title: 'Grado en Marketing e Investigación de Mercados',
          institution: 'Universidad de Málaga',
        },
      ],
    },
    cta: {
      title: '¿Trabajamos juntos?',
      text: 'Estoy siempre abierto a escuchar sobre nuevos retos y proyectos interesantes.',
      buttons: [
        { label: 'Agendar reunión', href: 'https://cal.com/alvarofp/15min', variant: 'primary' },
        { label: 'Ver mi trabajo', href: '/proyectos', variant: 'secondary' },
      ],
    },
  },
} as const

export type Content = typeof content
