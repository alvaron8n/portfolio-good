export const content = {
  // ============================================
  // GLOBAL
  // ============================================
  site: {
    name: 'Álvaro Fernández',
    role: 'Automatización, IA & Desarrollo Web',
    tagline: 'Tecnología que trabaja por ti.',
    availability: 'Disponible para nuevos proyectos',
    whatsappUrl: 'https://wa.me/34684005952',
    email: 'alferpri@gmail.com',
    phone: '+34 684 005 952',
    location: 'España (trabajo en remoto)',
    calendarUrl: 'https://cal.com/alvarofp/15min',
    social: {
      linkedin: 'https://linkedin.com/in/alvarofp',
      github: 'https://github.com/alvarofp',
    },
  },

  // ============================================
  // NAVEGACIÓN
  // ============================================
  nav: [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Sobre mí', href: '/sobre-mi' },
    { label: 'Contacto', href: '/contacto' },
  ],

  // ============================================
  // HOME - NUEVO COPY FINAL 2026
  // ============================================
  home: {
    hero: {
      eyebrow: 'Disponible para nuevos proyectos',
      headline: {
        line1: 'Tecnología que trabaja por ti.',
        line2: 'Menos caos. Mejor ROI.',
      },
      subheadline: 'Automatizo procesos, construyo herramientas con IA y diseño webs que convierten. Sin vender humo: si no aporta, no se hace.',
      cta: {
        label: 'Ver proyectos reales',
        href: '/proyectos',
      },
      secondaryCta: {
        label: 'Cuéntame tu caso',
        href: 'https://wa.me/34684005952',
      },
      microcopy: 'Dame contexto por WhatsApp o email y te preparo una propuesta clara. Sin compromiso, sin llamada fría.',
    },

    socialProof: {
      text: 'Actualmente colaboro con Flama Studios y trabajo con equipos que valoran la eficiencia y el trabajo bien hecho.',
      quote: {
        text: 'La IA no te va a quitar el trabajo. Lo hará alguien que sepa usarla.',
        author: 'Álvaro Fernández',
      },
    },

    whatIDo: {
      title: 'Lo que hago (sin palabras vacías)',
      items: [
        {
          id: 'menos-trabajo',
          number: '01',
          title: 'Menos trabajo manual',
          description: 'Si algo se repite, lo automatizo. Si no se puede automatizar, lo simplifico. El objetivo: que tu equipo deje de pegar datos y copiar excels.',
        },
        {
          id: 'mas-claridad',
          number: '02',
          title: 'Más claridad para decidir',
          description: 'Datos organizados, procesos limpios y sistemas que no se rompen cuando el negocio crece.',
        },
        {
          id: 'diseno-convierte',
          number: '03',
          title: 'Diseño que convierte',
          description: 'Bonito sí, pero sobre todo: que se entienda, que dé confianza y que convierta visitas en clientes.',
        },
      ],
    },

    aboutMini: {
      title: 'No es magia. Es experiencia (y obsesión por hacerlo bien).',
      paragraphs: [
        'Antes de dedicarme a esto, tuve dos negocios propios: una marca de ropa (Impale Clothing, 1.800 seguidores) y un ecommerce de zapatillas que llevé 4 años (6.800 seguidores, facturación real).',
        'Eso me enseñó algo que no se aprende en ningún curso: la tecnología solo vale si mejora el negocio.',
        'Hoy mezclo esa visión con código, IA y diseño para construir sistemas que ahorran tiempo, reducen errores y ayudan a vender más.',
      ],
      cta: {
        label: 'Mi historia completa',
        href: '/sobre-mi',
      },
    },

    services: {
      title: 'Cómo puedo ayudarte',
      subtitle: 'Soluciones enfocadas a impacto real: tiempo, dinero y retorno de inversión.',
      items: [
        {
          id: 'automatizacion',
          number: '01',
          title: 'Automatización',
          description: 'Conecto tus herramientas para que los datos fluyan solos. Leads, facturas, onboarding... sin copiar y pegar.',
          tags: ['n8n', 'Make', 'APIs'],
        },
        {
          id: 'software-ia',
          number: '02',
          title: 'Software & IA a medida',
          description: 'Herramientas internas, dashboards o asistentes inteligentes adaptados a tu negocio.',
          tags: ['React', 'Node.js', 'LLMs'],
        },
        {
          id: 'webs',
          number: '03',
          title: 'Webs que convierten',
          description: 'Sitios rápidos, claros y optimizados para SEO. Diseño + código, sin plantillas genéricas.',
          tags: ['Next.js', 'Tailwind', 'SEO'],
        },
        {
          id: 'branding',
          number: '04',
          title: 'Diseño & Branding',
          description: 'Identidad visual coherente: logos, sistemas visuales y piezas gráficas que refuerzan tu marca.',
          tags: ['Figma', 'Branding', 'UI'],
        },
      ],
      cta: {
        label: 'Ver todos los servicios',
        href: '/servicios',
      },
    },

    fit: {
      title: 'Antes de escribirme, mira si encajamos',
      fits: [
        'Tienes un negocio en marcha y quieres optimizar (tiempo, ventas, procesos)',
        'Valoras la calidad y prefieres hacerlo bien a hacerlo "ya"',
        'Quieres claridad: qué hacer, por qué y cómo medir si funciona',
        'Te interesa la IA aplicada de verdad, no por moda',
      ],
      notFits: [
        'Buscas "barato" por encima de todo',
        'Necesitas urgencias constantes cada semana',
        'Quieres features por capricho sin objetivo de negocio',
      ],
    },

    projects: {
      title: 'Trabajo reciente',
      subtitle: 'Casos reales, problemas concretos, resultados que importan.',
      items: [
        {
          slug: 'crm-social-path',
          title: 'CRM Social Path',
          category: 'Automatización',
          result: 'De información dispersa a control total del negocio',
        },
        {
          slug: 'web-bohemian',
          title: 'Web Bohemian Málaga',
          category: 'Web + SEO',
          result: 'De 0 web a mejor imagen y más reservas',
        },
        {
          slug: 'web-pillarbox',
          title: 'Web Pillarbox',
          category: 'Web B2B',
          result: 'Multipágina clara para vender servicios a empresas',
        },
      ],
      cta: {
        label: 'Ver portafolio completo',
        href: '/proyectos',
      },
    },

    cta: {
      headline: 'Si tu negocio va a mil... tu sistema debería ayudarte, no frenarte.',
      subheadline: 'Cuéntame qué haces y dónde se te va el tiempo. Te digo en claro si puedo ayudarte y por dónde empezaría.',
      whatsapp: {
        label: 'Escríbeme por WhatsApp',
        href: 'https://wa.me/34684005952',
      },
      calendar: {
        label: 'O agenda 15 min',
        href: 'https://cal.com/alvarofp/15min',
      },
      emailText: '¿Prefieres email?',
      email: 'alferpri@gmail.com',
    },

    // Legacy sections (for other components)
    forWho: {
      title: '¿Para quién trabajo?',
      intro: 'Empresas y profesionales que quieren usar tecnología para crecer.',
      items: [
        'Negocios locales que quieren digitalizar procesos',
        'Startups que necesitan herramientas internas',
        'Agencias que buscan apoyo técnico',
        'Profesionales que quieren automatizar tareas repetitivas',
      ],
    },

    howIWork: {
      title: 'Cómo trabajo',
      steps: [
        { number: '01', title: 'Escucho', description: 'Entiendo tu negocio y tus objetivos.' },
        { number: '02', title: 'Propongo', description: 'Te presento opciones claras con pros y contras.' },
        { number: '03', title: 'Ejecuto', description: 'Desarrollo la solución con comunicación constante.' },
        { number: '04', title: 'Entrego', description: 'Te dejo todo documentado y funcionando.' },
      ],
    },

    whatMakesMeDifferent: {
      title: 'Qué me diferencia',
      items: [
        { title: 'Visión de negocio', description: 'Vengo del mundo real, no solo de tutoriales.' },
        { title: 'Comunicación clara', description: 'Te explico todo sin jerga técnica.' },
        { title: 'Sistemas ordenados', description: 'Lo que hago queda documentado y usable.' },
      ],
      notDo: {
        title: 'Lo que no hago',
        items: [
          'Proyectos urgentes sin planificación',
          'Trabajos sin contrato ni briefing claro',
          'Diseños "que ya veremos sobre la marcha"',
        ],
      },
    },
  },

  // ============================================
  // FOOTER
  // ============================================
  footer: {
    tagline: 'Sistemas que te devuelven el tiempo.',
    copyright: '© 2026 Álvaro Fernández. Todos los derechos reservados.',
    links: [
      { label: 'LinkedIn', href: 'https://linkedin.com/in/alvarofp' },
      { label: 'GitHub', href: 'https://github.com/alvarofp' },
      { label: 'Email', href: 'mailto:alferpri@gmail.com' },
    ],
  },

  // ============================================
  // SERVICIOS PAGE (se mantiene similar)
  // ============================================
  services: {
    hero: {
      title: 'Servicios',
      subtitle: 'Menos caos. Más claridad. Mejor retorno.',
    },
    items: [
      {
        id: 'automatizacion',
        number: '01',
        title: 'Automatización de Procesos',
        tagline: 'Deja que los robots hagan el trabajo repetitivo.',
        description: 'Diseño e implemento flujos de trabajo automatizados que conectan tus aplicaciones existentes. El objetivo es eliminar el error humano y liberar a tu equipo de tareas de bajo valor.',
        benefits: [
          { text: 'Menos tareas manuales y menos errores', icon: 'check' },
          { text: 'Procesos operativos 24/7', icon: 'clock' },
          { text: 'Escalas sin tener que meter más manos', icon: 'growth' },
        ],
        tags: ['n8n', 'Make', 'Webhooks', 'APIs'],
        stats: { value: '20h+', label: 'ahorradas por semana (media)' },
        cta: { label: 'Ver caso: CRM Social Path', href: '/proyectos/crm-social-path' },
      },
      {
        id: 'software-ia',
        number: '02',
        title: 'Software & IA a medida',
        tagline: 'Herramientas hechas para TU flujo (no al revés).',
        description: 'Construyo aplicaciones y herramientas internas o externas con IA aplicada: asistentes, clasificación de leads, dashboards, extracción de datos... Siempre con un objetivo medible.',
        benefits: [
          { text: 'Software adaptado a tu forma de trabajar', icon: 'target' },
          { text: 'IA integrada (GPT, Claude) donde realmente aporta', icon: 'cpu' },
          { text: 'Código y datos bajo tu control', icon: 'lock' },
        ],
        tags: ['React', 'TypeScript', 'Node.js', 'Supabase', 'OpenAI'],
        stats: { value: '100%', label: 'adaptado a tu negocio' },
        cta: { label: 'Ver ejemplo', href: '/proyectos' },
      },
      {
        id: 'web',
        number: '03',
        title: 'Desarrollo Web de alto rendimiento',
        tagline: 'Tu web tiene que dar confianza y convertir.',
        description: 'Web corporativa o landing: clara, rápida, responsive y con una narrativa que vende sin gritar. Diseño con intención + código limpio + SEO técnico.',
        benefits: [
          { text: 'Carga rápida y experiencia fluida', icon: 'speed' },
          { text: 'Estructura pensada para SEO', icon: 'search' },
          { text: 'Diseño responsive y accesible', icon: 'mobile' },
        ],
        tags: ['Next.js', 'Astro', 'Tailwind CSS', 'Framer Motion'],
        stats: { value: '< 1s', label: 'tiempo de carga' },
        cta: { label: 'Ver caso: Bohemian Málaga', href: '/proyectos/web-bohemian' },
      },
      {
        id: 'branding',
        number: '04',
        title: 'Diseño & Branding',
        tagline: 'Tu marca tiene que verse tan profesional como tu trabajo.',
        description: 'Creo identidades visuales coherentes y piezas gráficas que refuerzan la percepción de tu negocio. Desde logos hasta sistemas visuales completos.',
        benefits: [
          { text: 'Imagen profesional y memorable', icon: 'star' },
          { text: 'Coherencia visual en todos los puntos de contacto', icon: 'grid' },
          { text: 'Materiales listos para usar (digital y print)', icon: 'folder' },
        ],
        tags: ['Identidad visual', 'Logos', 'Diseño gráfico', 'Branding'],
        stats: { value: '∞', label: 'aplicaciones de marca' },
        cta: { label: 'Ver proyectos de diseño', href: '/proyectos' },
      },
      {
        id: 'diagnostico',
        number: '05',
        title: 'Diagnóstico & Roadmap',
        tagline: 'Si no sabes qué necesitas, lo aterrizamos juntos.',
        description: 'A veces el problema no es "hacer una automatización": es ordenar prioridades. Esto es una sesión práctica para identificar cuellos de botella y sacar un plan por fases.',
        benefits: [
          { text: 'Claridad: qué hacer primero', icon: 'target' },
          { text: 'Plan realista por fases', icon: 'list' },
          { text: 'Herramientas justas (sin comprar por comprar)', icon: 'check' },
        ],
        tags: ['Estrategia', 'Consultoría', 'Roadmap'],
        stats: { value: '1h', label: 'sesión de diagnóstico' },
        cta: { label: 'Hablemos', href: 'https://cal.com/alvarofp/15min' },
      },
    ],
    cta: {
      title: '¿Dudas sobre qué necesitas?',
      subtitle: 'Cuéntame tu caso y te digo por dónde empezaría. Sin compromiso.',
      button: { label: 'Escríbeme por WhatsApp', href: 'https://wa.me/34684005952' },
    },
  },

  // ============================================
  // PROYECTOS PAGE
  // ============================================
  projects: {
    hero: {
      title: 'Proyectos',
      subtitle: 'Casos reales, problemas concretos, resultados que importan.',
    },
    categories: [
      { id: 'all', label: 'Todos' },
      { id: 'automatizacion', label: 'Automatización' },
      { id: 'web', label: 'Web' },
      { id: 'branding', label: 'Branding' },
    ],
    items: [
      {
        slug: 'crm-social-path',
        title: 'CRM Social Path',
        category: 'automatizacion',
        categoryLabel: 'Automatización',
        shortDesc: 'De información dispersa a control total del negocio.',
        featured: true,
      },
      {
        slug: 'web-bohemian',
        title: 'Web Bohemian Málaga',
        category: 'web',
        categoryLabel: 'Web + SEO',
        shortDesc: 'De 0 web a mejor imagen y más reservas.',
        featured: true,
      },
      {
        slug: 'web-pillarbox',
        title: 'Web Pillarbox',
        category: 'web',
        categoryLabel: 'Web B2B',
        shortDesc: 'Multipágina clara para vender servicios a empresas.',
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
      subtitle: 'Cuéntame qué estás construyendo (o qué te está frenando).',
    },
    methods: [
      { type: 'whatsapp', label: 'Escribir por WhatsApp', href: 'https://wa.me/34684005952', primary: true, description: 'La forma más rápida. Me das contexto y te respondo directo.' },
      { type: 'email', label: 'alferpri@gmail.com', href: 'mailto:alferpri@gmail.com', primary: false, description: 'Si prefieres explicarte con más detalle o adjuntar info.' },
      { type: 'calendar', label: 'Agendar llamada', href: 'https://cal.com/alvarofp/15min', primary: false, description: 'Si ya tienes claro lo que necesitas y quieres ir al grano.' },
    ],
  },

  // ============================================
  // ABOUT PAGE
  // ============================================
  about: {
    hero: {
      eyebrow: 'SOBRE MÍ',
      title: 'Negocio, diseño y tecnología.',
      titleAccent: 'Con IA aplicada de verdad.',
      subtitle: 'Perfil híbrido que combina la creatividad publicitaria con la eficiencia técnica. Tras fundar dos e-commerce propios y formarme en agencias de marketing, he evolucionado hacia la Automatización de Procesos y la Inteligencia Artificial.',
    },
    intro: {
      headline: 'La versión corta: vengo del negocio real, no solo de tutoriales.',
      paragraphs: [
        'Con 18 años monté mi primera marca de ropa: Impale Clothing. Diseñaba todo en Photoshop, gestionaba pedidos, trataba con clientes y colaboraba con grupos de rap y batallas de gallos por Extremadura. Llegué a 1.800 seguidores y una comunidad fiel. Lo dejé cuando empecé segundo de bachillerato porque no podía con todo.',
        'Un año después arranqué un ecommerce de zapatillas. Dropshipping con Shopify, proveedores, atención al cliente, contenido, promociones... Lo llevé yo solo durante 4 años (2020-2024). Creé una comunidad de 6.800 seguidores haciendo batallas de outfits, sorteos y colaboraciones con influencers. Facturé bien. Aprendí mejor.',
        'Esos dos negocios me enseñaron algo que no viene en ningún curso: la tecnología solo vale si mejora el negocio. No se trata de usar herramientas bonitas, se trata de vender más, perder menos tiempo y tener control.',
        'Hoy combino esa visión de negocio con código, IA y diseño. No soy el típico perfil técnico que solo sabe programar. Vengo de ventas, de marketing, de diseño gráfico. Y eso me permite ver lo que muchos devs no ven: el problema real del cliente.',
      ],
    },
    vision: {
      title: 'Visión y valores',
      items: [
        'La tecnología solo vale si mejora el negocio.',
        'Menos features, más impacto.',
        'Diseño, código y estrategia con propósito.',
        'La IA no reemplaza el criterio humano, lo potencia.',
      ],
    },
    skills: {
      title: 'Herramientas con las que trabajo',
      categories: [
        { name: 'Automatización', items: ['n8n', 'Make', 'Zapier', 'OpenAI API', 'Notion API', 'Webhooks'] },
        { name: 'Desarrollo', items: ['React', 'TypeScript', 'Node.js', 'Supabase', 'HTML/CSS'] },
        { name: 'IA', items: ['GPT-4', 'Claude', 'Llama', 'Prompt Engineering', 'Integraciones LLM'] },
        { name: 'Web', items: ['Next.js', 'Astro', 'WordPress', 'Elementor', 'Tailwind CSS', 'Framer Motion'] },
        { name: 'Diseño', items: ['Figma', 'Photoshop', 'Illustrator', 'Premiere Pro', 'Diseño UI/UX'] },
        { name: 'Otras', items: ['Git', 'Notion', 'Shopify', 'Google Analytics', 'SEO On-Page', 'CRM Automation'] },
      ],
    },
    experience: {
      title: 'Trayectoria',
      items: [
        { 
          period: '2024 - Presente', 
          role: 'Consultor de Automatización & Web', 
          company: 'Freelance', 
          location: 'Málaga',
          description: 'Automatización, desarrollo web e IA para empresas y agencias. Colaboración activa con Flama Studios.',
          highlights: ['Flujos n8n para facturación y leads', 'Web WordPress + SEO (hostelería)', 'IA para atención al cliente'],
        },
        { 
          period: '2020 - 2024', 
          role: 'Fundador & Growth Manager', 
          company: 'Pikete Lowcost (Ecommerce)', 
          location: '',
          description: 'Gestión integral del negocio: logística, ventas, marketing y comunidad.',
          highlights: ['7.500 seguidores orgánicos', 'Contenido viral y sorteos', '4 años de operación'],
        },
        { 
          period: '2019', 
          role: 'Fundador & Director Creativo', 
          company: 'Impale Clothing', 
          location: '',
          description: 'Diseño de identidad corporativa, branding y diseño textil.',
          highlights: ['1.500 seguidores', 'Ventas recurrentes', 'Colaboraciones locales'],
        },
        { 
          period: '2021', 
          role: 'Asistente de Publicidad (Prácticas)', 
          company: 'Rommel & Montgomery', 
          location: 'Cáceres',
          description: 'Apoyo en campañas publicitarias 360° y prototipado en Figma.',
          highlights: [],
        },
        { 
          period: '2020', 
          role: 'Asistente de Marketing Digital (Prácticas)', 
          company: 'Publimark', 
          location: 'Cáceres',
          description: 'Gestión de redes sociales y diseño de piezas gráficas.',
          highlights: [],
        },
      ],
    },
    education: {
      title: 'Formación',
      items: [
        { period: '2022 - Actualidad', title: 'Grado en Publicidad y RR.PP.', institution: 'Universidad de Valladolid', note: 'TFG enfocado en aplicaciones de IA en publicidad' },
        { period: '2021 - 2022', title: 'G.S. Gestión de Ventas y Espacios Comerciales', institution: 'I.E.S. Ágora (Cáceres)', note: '' },
        { period: '2019 - 2021', title: 'G.S. Marketing y Publicidad', institution: 'I.E.S. Ágora (Cáceres)', note: '' },
      ],
    },
    languages: {
      title: 'Idiomas',
      items: [
        { language: 'Español', level: 'Nativo' },
        { language: 'Inglés', level: 'B2 - Profesional' },
      ],
    },
    extras: {
      title: 'Otros',
      items: ['Carnet de Conducir B', 'Vehículo Propio', 'Disponibilidad Geográfica'],
    },
    cta: {
      title: '¿Trabajamos juntos?',
      text: 'Si tienes un proyecto interesante o quieres explorar cómo optimizar tu negocio, escríbeme. Sin compromiso, sin llamada fría.',
      buttons: [
        { label: 'Escríbeme por WhatsApp', href: 'https://wa.me/34684005952', variant: 'primary' },
        { label: 'Ver proyectos', href: '/proyectos', variant: 'secondary' },
      ],
    },
  },
} as const

export type Content = typeof content
