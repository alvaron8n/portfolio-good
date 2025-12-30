export const content = {
  // ============================================
  // GLOBAL
  // ============================================
  site: {
    name: 'Álvaro Fernández',
    role: 'Automatización & Desarrollo IA',
    tagline: 'Sistemas que trabajan solos.',
    availability: '2 slots en Enero',
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
  // HOME - COPY REDUCIDO
  // ============================================
  home: {
    hero: {
      badge: '2 slots en Enero',
      line1: 'Automatizo lo que',
      line2: 'tu equipo odia hacer.',
      accent: 'en serio',
      proof: {
        metric: '85%',
        text: 'menos tiempo en facturación',
      },
      cta: {
        label: 'Ver cómo',
        href: '/proyectos/crm-automatizacion',
      },
      techStack: 'n8n ✦ React ✦ Supabase ✦ Claude AI ✦ Automatización ✦ ',
    },

    socialProof: {
      logos: [
        { name: 'Flama Studio' },
        { name: 'Bohemian' },
        { name: 'Alba Plata' },
        { name: 'Urban 33' },
      ],
      quote: {
        text: 'De 4 horas a 12 segundos.',
        author: 'Agencia de Marketing',
        accent: 'literalmente',
      },
    },

    about: {
      line1: 'Mientras tu competencia',
      line2: 'copia datos a mano,',
      line3: 'tus sistemas trabajan',
      accent: 'solos',
      cta: {
        label: 'Sobre mí',
        href: '/sobre-mi',
      },
    },

    services: {
      title: 'Qué hago',
      items: [
        {
          id: 'automatizacion',
          number: '01',
          title: 'Automatización',
          result: '20h/semana recuperadas',
          accent: 'tu CRM duerme, yo no',
        },
        {
          id: 'desarrollo-ia',
          number: '02',
          title: 'Desarrollo IA',
          result: 'Software en semanas',
          accent: null,
        },
        {
          id: 'web',
          number: '03',
          title: 'Webs que venden',
          result: '+60% conversiones',
          accent: null,
        },
        {
          id: 'branding',
          number: '04',
          title: 'Branding Tech',
          result: 'Confianza instantánea',
          accent: null,
        },
      ],
      cta: {
        label: 'Ver servicios',
        href: '/servicios',
      },
    },

    projects: {
      title: 'Proyectos',
      subtitle: 'No es teoría. Funcionan ahora.',
      items: [
        {
          slug: 'crm-automatizacion',
          title: 'CRM Automatizado',
          category: 'Automatización',
          result: '85% menos tiempo',
        },
        {
          slug: 'webs-locales',
          title: 'Webs Locales',
          category: 'Web',
          result: '+60% reservas',
        },
        {
          slug: 'branding',
          title: 'Branding Tech',
          category: 'Identidad',
          result: 'Premium desde día 1',
        },
      ],
      cta: {
        label: 'Ver todos',
        href: '/proyectos',
      },
    },

    cta: {
      question: '¿Listo?',
      accent: 'hablemos',
      button: {
        label: 'Reservar 15 min',
        href: 'https://cal.com/alvarofp/15min',
      },
      fallback: {
        label: 'alferpri@gmail.com',
        href: 'mailto:alferpri@gmail.com',
      },
    },
  },

  // ============================================
  // FOOTER
  // ============================================
  footer: {
    cta: {
      line: '¿Aún aquí?',
      accent: 'bien',
      button: {
        label: 'Hablemos',
        href: 'https://cal.com/alvarofp/15min',
      },
    },
    copyright: '© 2025 Álvaro Fernández',
    links: [
      { label: 'LinkedIn', href: 'https://linkedin.com/in/alvarofp' },
      { label: 'GitHub', href: 'https://github.com/alvarofp' },
    ],
  },

  // ============================================
  // SERVICIOS PAGE
  // ============================================
  services: {
    hero: {
      title: 'Servicios',
      subtitle: 'Cada hora que tu equipo pierde en tareas manuales es dinero que regalas.',
    },
    items: [
      {
        id: 'automatizacion',
        number: '01',
        title: 'Automatización',
        tagline: 'El Excel te roba horas. Yo las recupero.',
        description: 'Diseño flujos con n8n que conectan todas tus herramientas y trabajan 24/7. Sin intervención humana, sin errores, sin límites de horario.',
        benefits: [
          { text: '72h hasta tu primer workflow', icon: 'clock' },
          { text: 'Cero errores humanos', icon: 'check' },
          { text: 'Escalas sin contratar', icon: 'growth' },
        ],
        tags: ['n8n', 'Make', 'APIs', 'Webhooks', 'Zapier'],
        stats: { value: '20h', label: 'recuperadas/semana' },
        cta: { label: 'Ver caso real', href: '/proyectos/crm-automatizacion' },
      },
      {
        id: 'desarrollo-ia',
        number: '02',
        title: 'Desarrollo con IA',
        tagline: 'Tu CRM en 3 semanas. No en 6 meses.',
        description: 'Desarrollo software a medida usando IA como copiloto. El resultado: proyectos más rápidos, más baratos y exactamente lo que necesitas.',
        benefits: [
          { text: '70% más rápido que desarrollo tradicional', icon: 'speed' },
          { text: 'Coste significativamente menor', icon: 'money' },
          { text: 'Sin features de relleno', icon: 'target' },
        ],
        tags: ['Claude', 'Cursor', 'Supabase', 'React', 'TypeScript'],
        stats: { value: '70%', label: 'más rápido' },
        cta: { label: 'Ver caso real', href: '/proyectos/crm-automatizacion' },
      },
      {
        id: 'web',
        number: '03',
        title: 'Webs que venden',
        tagline: 'No "bonitas". Máquinas de conversión.',
        description: 'Diseño webs que guían al usuario hacia la acción. Cada elemento tiene un propósito: que el visitante contacte, reserve o compre.',
        benefits: [
          { text: 'CRO integrado desde el diseño', icon: 'chart' },
          { text: 'Carga ultrarrápida < 2s', icon: 'speed' },
          { text: 'SEO técnico incluido', icon: 'search' },
        ],
        tags: ['React', 'Next.js', 'WordPress', 'Figma', 'Tailwind'],
        stats: { value: '+60%', label: 'conversiones' },
        cta: { label: 'Ver casos', href: '/proyectos/webs-locales' },
      },
      {
        id: 'branding',
        number: '04',
        title: 'Branding Tech',
        tagline: 'Si pareces amateur, no vendes premium.',
        description: 'Identidades visuales que inspiran confianza desde el primer vistazo. Porque tu marca es la primera impresión que das.',
        benefits: [
          { text: 'Sistema visual completo', icon: 'palette' },
          { text: 'Consistencia en todos los canales', icon: 'grid' },
          { text: 'Activos listos para usar', icon: 'folder' },
        ],
        tags: ['Illustrator', 'Figma', 'Brand Guidelines', 'Logo'],
        stats: { value: '100%', label: 'consistencia visual' },
        cta: { label: 'Ver casos', href: '/proyectos/branding' },
      },
    ],
    cta: {
      title: '¿No sabes qué necesitas?',
      subtitle: 'Normal. Hablemos 15 min y lo descubrimos juntos.',
      button: { label: 'Reservar llamada', href: 'https://cal.com/alvarofp/15min' },
    },
  },

  // ============================================
  // PROYECTOS PAGE
  // ============================================
  projects: {
    hero: {
      title: 'Proyectos',
      subtitle: 'Sistemas funcionando ahora mismo.',
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
        title: 'CRM & Automatización',
        category: 'automatizacion',
        categoryLabel: 'Automatización',
        shortDesc: 'De 4 horas a 12 segundos.',
        featured: true,
      },
      {
        slug: 'webs-locales',
        title: 'Webs Locales',
        category: 'web',
        categoryLabel: 'Web',
        shortDesc: 'Webs que triplicaron consultas.',
        featured: true,
      },
      {
        slug: 'branding',
        title: 'Branding Tech',
        category: 'branding',
        categoryLabel: 'Branding',
        shortDesc: 'Marcas premium desde día 1.',
        featured: true,
      },
    ],
  },

  // ============================================
  // CONTACTO PAGE
  // ============================================
  contact: {
    hero: {
      title: 'Hablemos',
      subtitle: '15 minutos. Sin compromiso.',
    },
    methods: [
      { type: 'calendar', label: 'Reservar llamada', href: 'https://cal.com/alvarofp/15min', primary: true },
      { type: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/34684005952', primary: false },
      { type: 'email', label: 'Email', href: 'mailto:alferpri@gmail.com', primary: false },
    ],
  },

  // ============================================
  // ABOUT PAGE
  // ============================================
  about: {
    hero: {
      title: 'Sobre mí',
      subtitle: 'Del marketing a la automatización.',
    },
    intro: {
      line1: 'Vengo del marketing.',
      line2: 'Ahora construyo los sistemas que el marketing necesita.',
      headline: 'Construyo sistemas que trabajan mientras duermes',
      paragraphs: [
        'Empecé en marketing digital hace más de 5 años. Campañas, embudos, automatizaciones básicas. Pero me frustraba ver cómo el 80% del tiempo se iba en tareas repetitivas.',
        'Así que aprendí a programar. No para ser developer, sino para eliminar fricciones. Para que los negocios funcionen solos.',
        'Hoy combino visión de negocio con capacidad técnica. Entiendo qué necesitas y sé cómo construirlo.',
      ],
    },
    skills: {
      title: 'Lo que domino',
      categories: [
        {
          name: 'Automatización',
          items: ['n8n', 'Make', 'Zapier', 'APIs', 'Webhooks'],
        },
        {
          name: 'Desarrollo',
          items: ['React', 'TypeScript', 'Node.js', 'Supabase', 'PostgreSQL'],
        },
        {
          name: 'IA & LLMs',
          items: ['Claude', 'GPT-4', 'Prompt Engineering', 'RAG', 'Fine-tuning'],
        },
        {
          name: 'Marketing',
          items: ['SEO', 'CRO', 'Analytics', 'Funnels', 'Email Marketing'],
        },
      ],
    },
    experience: {
      title: 'Mi trayectoria',
      items: [
        {
          period: '2023 - Presente',
          role: 'Founder',
          company: 'Flama Studio',
          description: 'Automatización, desarrollo con IA y webs que convierten.',
        },
        {
          period: '2021 - 2023',
          role: 'Marketing Manager',
          company: 'Agencia Digital',
          description: 'Estrategia digital y automatización de procesos.',
        },
        {
          period: '2019 - 2021',
          role: 'Digital Marketing Specialist',
          company: 'Startup Tech',
          description: 'SEO, SEM, Social Media y Email Marketing.',
        },
      ],
    },
    education: {
      title: 'Formación',
      items: [
        {
          period: '2023',
          title: 'AI & Automation',
          institution: 'Autodidacta + Cursos especializados',
        },
        {
          period: '2019',
          title: 'Marketing Digital',
          institution: 'Universidad de Málaga',
        },
        {
          period: '2018',
          title: 'Publicidad y RRPP',
          institution: 'Universidad de Málaga',
        },
      ],
    },
    languages: {
      title: 'Idiomas',
      items: [
        { language: 'Español', level: 'Nativo' },
        { language: 'Inglés', level: 'Profesional' },
      ],
    },
    interests: {
      title: 'Intereses',
      items: ['Automatización', 'Inteligencia Artificial', 'Startups', 'Productividad', 'Diseño', 'Música'],
    },
    cta: {
      title: '¿Conectamos?',
      text: 'Si buscas automatizar tu negocio o desarrollar algo con IA, hablemos.',
      buttons: [
        { label: 'Reservar llamada', href: 'https://cal.com/alvarofp/15min', variant: 'primary' },
        { label: 'Ver proyectos', href: '/proyectos', variant: 'secondary' },
      ],
    },
  },
} as const

export type Content = typeof content
