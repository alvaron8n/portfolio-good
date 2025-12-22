export const content = {
  // ============================================
  // CONFIGURACIÓN GLOBAL DEL SITIO
  // ============================================
  site: {
    title: 'Álvaro Fernández — Portfolio 2026',
    name: 'Álvaro Fernández',
    role: 'Especialista en Automatización, IA y Desarrollo Web',
    tagline: 'Transformo procesos manuales en sistemas que trabajan solos.',
    availability: 'Disponible para proyectos',
    whatsappUrl: 'https://wa.me/34684005952',
    email: 'alferpri@gmail.com',
    phone: '+34 684 005 952',
    location: 'Plasencia / Málaga, España',
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
    { label: 'Sobre mí', href: '/sobre-mi' },
    { label: 'Contacto', href: '/contacto' },
  ],

  // ============================================
  // PÁGINA: INICIO
  // ============================================
  home: {
    hero: {
      headline: 'Portfolio',
      year: '2026',
      subtitle: 'Automatización & IA para negocios que quieren escalar sin multiplicar su equipo.',
      cta: {
        primary: { label: 'Ver proyectos', href: '/proyectos' },
        secondary: { label: 'Hablemos', href: '/contacto' },
      },
    },

    intro: {
      text: 'Diseño sistemas que eliminan tareas repetitivas, construyo webs que convierten visitas en clientes, y aplico IA donde realmente aporta valor. Sin humo, solo resultados.',
    },

    servicesPreview: {
      title: 'Lo que hago',
      subtitle: 'Soluciones técnicas con visión de negocio',
      items: [
        {
          id: 'automatizacion',
          title: 'Automatización',
          shortDesc: 'Flujos que trabajan 24/7 sin intervención humana.',
          icon: 'workflow',
        },
        {
          id: 'desarrollo-ia',
          title: 'Desarrollo con IA',
          shortDesc: 'Software a medida en semanas, no meses.',
          icon: 'cpu',
        },
        {
          id: 'web',
          title: 'Diseño Web',
          shortDesc: 'Webs que venden, no solo que "quedan bonitas".',
          icon: 'layout',
        },
        {
          id: 'branding',
          title: 'Branding',
          shortDesc: 'Identidades visuales que inspiran confianza.',
          icon: 'palette',
        },
      ],
      cta: { label: 'Ver todos los servicios', href: '/servicios' },
    },

    featuredProjects: {
      title: 'Proyectos destacados',
      subtitle: 'Algunos trabajos que explican mejor lo que hago',
      items: [
        {
          slug: 'crm-automatizacion',
          title: 'CRM & Automatización',
          category: 'Automatización · IA',
          shortDesc: 'Sistema completo para una agencia de marketing con facturación automática y gestión de comerciales.',
          highlight: '85% menos tiempo en facturación',
          image: '/projects/crm-preview.jpg',
        },
        {
          slug: 'webs-locales',
          title: 'Webs para Negocios Locales',
          category: 'Diseño Web · UI/UX',
          shortDesc: 'Colección de webs diseñadas para convertir: hostelería, retail y servicios profesionales.',
          highlight: '+60% reservas online',
          image: '/projects/webs-locales-preview.jpg',
        },
        {
          slug: 'branding',
          title: 'Branding & Identidad Visual',
          category: 'Branding · Diseño',
          shortDesc: 'Desde conserveras tradicionales hasta startups tech. Marcas que se ven profesionales desde el día uno.',
          highlight: 'Sistemas visuales completos',
          image: '/projects/branding-preview.jpg',
        },
      ],
      cta: { label: 'Ver todos los proyectos', href: '/proyectos' },
    },

    cta: {
      title: '¿Tienes un proyecto en mente?',
      subtitle: 'Cuéntame qué necesitas y vemos cómo puedo ayudarte. Sin compromiso.',
      primaryButton: { label: 'Escribir por WhatsApp', href: 'https://wa.me/34684005952' },
      secondaryButton: { label: 'Enviar email', href: 'mailto:alferpri@gmail.com' },
    },
  },

  // ============================================
  // PÁGINA: SERVICIOS
  // ============================================
  services: {
    hero: {
      title: 'Servicios',
      subtitle: 'Soluciones técnicas con visión de negocio. Cada servicio está diseñado para generar resultados medibles.',
    },

    items: [
      {
        id: 'automatizacion',
        number: '01',
        title: 'Ingeniería de Automatización',
        tagline: 'Deja de trabajar como un robot. Deja que los robots trabajen para ti.',
        description: 'Tu negocio está perdiendo decenas de horas semanales en tareas repetitivas: copiar datos entre Excel y el CRM, enviar emails de confirmación manuales, actualizar estados de pedidos. Yo diseño ecosistemas con n8n y webhooks que conectan todas tus herramientas y funcionan sin supervisión.',
        benefits: [
          'Escalabilidad sin aumentar personal',
          'Eliminación de errores humanos',
          'Procesos funcionando 24/7',
          'ROI medible desde el primer mes',
        ],
        tools: ['n8n', 'Make/Integromat', 'API Integrations', 'Google Workspace', 'Webhooks'],
        tags: ['No-code', 'Productividad', 'Escalabilidad'],
        cta: { label: 'Ver proyecto relacionado', href: '/proyectos/crm-automatizacion' },
      },
      {
        id: 'desarrollo-ia',
        number: '02',
        title: 'Desarrollo Asistido por IA',
        tagline: 'Herramientas internas y SaaS a medida en semanas, no meses.',
        description: 'El desarrollo tradicional es lento y caro. Utilizo programación asistida por IA (Cursor, Lovable, Claude) para construir software personalizado a velocidad sin precedentes. Desde CRMs a medida hasta paneles de control o herramientas de facturación. Obtienes exactamente lo que necesitas, funcionando antes de que una agencia tradicional termine la fase de presupuestos.',
        benefits: [
          'Tiempo de desarrollo reducido un 70%',
          'Coste significativamente menor',
          'Iteraciones rápidas según feedback',
          'Funcionalidad exacta, sin features de relleno',
        ],
        tools: ['Lovable.dev', 'Cursor IDE', 'Claude Sonnet/Opus', 'React/TypeScript', 'Supabase'],
        tags: ['AI', 'Innovación', 'Vibe Coding'],
        cta: { label: 'Ver proyecto relacionado', href: '/proyectos/crm-automatizacion' },
      },
      {
        id: 'web',
        number: '03',
        title: 'Diseño Web de Alto Rendimiento',
        tagline: 'No diseño sitios "bonitos". Diseño máquinas de conversión.',
        description: 'Tener una web es fácil; tener una web que venda es ciencia. Mi enfoque combina estética premium con psicología de ventas. Analizo el recorrido de tu cliente y estructuro cada sección (hero, prueba social, llamadas a la acción) para guiar al usuario hacia la compra o el contacto.',
        benefits: [
          'Estructura optimizada para conversión (CRO)',
          'Tiempos de carga rápidos',
          'Diseño responsive impecable',
          'SEO técnico desde el inicio',
        ],
        tools: ['Figma', 'WordPress', 'Elementor', 'HTML/CSS/JS', 'React'],
        tags: ['UI/UX', 'CRO', 'Performance'],
        cta: { label: 'Ver proyectos web', href: '/proyectos/webs-locales' },
      },
      {
        id: 'branding',
        number: '04',
        title: 'Branding & Identidad Visual',
        tagline: 'La percepción lo es todo. Haz que tu tecnología parezca premium.',
        description: 'Vengo del mundo de la publicidad y sé que la mejor tecnología falla si parece amateur. Para vender servicios de alto valor necesitas una identidad que inspire confianza instantánea. Desarrollo sistemas visuales completos: logotipos versátiles, paletas coherentes, tipografía y activos para redes que aseguran que tu marca se vea profesional en cualquier punto de contacto.',
        benefits: [
          'Identidad memorable y diferenciada',
          'Sistema visual escalable',
          'Consistencia en todos los canales',
          'Activos listos para usar',
        ],
        tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'Brand Guidelines'],
        tags: ['Estrategia', 'Diseño', 'Comunicación'],
        cta: { label: 'Ver proyectos de branding', href: '/proyectos/branding' },
      },
    ],

    cta: {
      title: '¿No sabes qué servicio necesitas?',
      subtitle: 'Hablemos y te ayudo a identificar qué solución encaja mejor con tu situación.',
      button: { label: 'Agendar llamada', href: '/contacto' },
    },
  },

  // ============================================
  // PÁGINA: PROYECTOS (ÍNDICE)
  // ============================================
  projects: {
    hero: {
      title: 'Proyectos',
      subtitle: 'Una selección de trabajos que muestran cómo aplico automatización, desarrollo e identidad visual para resolver problemas reales.',
    },

    categories: [
      { id: 'all', label: 'Todos' },
      { id: 'automatizacion', label: 'Automatización' },
      { id: 'web', label: 'Diseño Web' },
      { id: 'branding', label: 'Branding' },
      { id: 'ecommerce', label: 'E-commerce' },
    ],

    items: [
      {
        slug: 'crm-automatizacion',
        title: 'CRM & Automatización',
        category: 'automatizacion',
        categoryLabel: 'Automatización · IA',
        shortDesc: 'Centro de comando para agencia de marketing con automatizaciones 24/7.',
        image: '/projects/crm-thumb.jpg',
        featured: true,
      },
      {
        slug: 'webs-locales',
        title: 'Webs para Negocios Locales',
        category: 'web',
        categoryLabel: 'Diseño Web · UI/UX',
        shortDesc: 'Colección de webs enfocadas en conversión para hostelería, retail y servicios.',
        image: '/projects/webs-thumb.jpg',
        featured: true,
      },
      {
        slug: 'branding',
        title: 'Branding & Ecosistemas Visuales',
        category: 'branding',
        categoryLabel: 'Branding · Identidad',
        shortDesc: 'Desde conserveras tradicionales hasta startups tech.',
        image: '/projects/branding-thumb.jpg',
        featured: true,
      },
      {
        slug: 'ecommerce-propio',
        title: 'Mis E-commerce: Pikete & Impale',
        category: 'ecommerce',
        categoryLabel: 'E-commerce · Emprendimiento',
        shortDesc: 'Dos marcas que fundé y escalé: streetwear y zapatillas urbanas.',
        image: '/projects/ecommerce-thumb.jpg',
        featured: false,
      },
    ],
  },

  // ============================================
  // PÁGINA: PROYECTO - CRM & AUTOMATIZACIÓN
  // ============================================
  projectCrmAutomation: {
    meta: {
      slug: 'crm-automatizacion',
      title: 'CRM & Automatización',
      category: 'Automatización · IA · Software',
    },

    hero: {
      title: 'Custom CRM & Automation',
      subtitle: 'Centro de comando para agencia de marketing con automatizaciones 24/7.',
      tags: ['Lovable', 'Supabase', 'n8n', 'Tally Forms'],
    },

    overview: {
      challenge: {
        title: 'El problema',
        text: 'La agencia gestionaba clientes en Excel, facturas manuales en Word, y los comerciales comunicaban ventas por WhatsApp. Horas perdidas en tareas que no generaban valor, errores frecuentes y cero visibilidad del estado real del negocio.',
      },
      solution: {
        title: 'La solución',
        text: 'Un CRM construido con Lovable + Supabase que centraliza toda la información, y automatizaciones n8n que eliminan las tareas repetitivas por completo. Todo en un solo lugar, funcionando sin intervención humana.',
      },
    },

    features: [
      {
        title: 'CRM Personalizado',
        description: 'Gestión completa de clientes, proyectos activos, servicios contratados y facturación integrada. Diseñado exactamente para el flujo de trabajo de la agencia.',
      },
      {
        title: 'Facturación Automática',
        description: 'Un clic genera PDF estructurado con los datos del cliente, lo guarda en Supabase y envía email automáticamente. De 30 minutos a 10 segundos.',
      },
      {
        title: 'Sync Formularios → CRM',
        description: 'Los comerciales registran ventas extra en Tally y el sistema actualiza deals en tiempo real, calcula comisiones y notifica al equipo.',
      },
    ],

    workflows: [
      {
        number: '01',
        title: 'Generación de Facturas',
        type: 'n8n Automation',
        steps: [
          'Trigger: Clic en "Generar Factura" desde el CRM',
          'Proceso: n8n genera PDF estructurado con datos del cliente',
          'Storage: Guarda en Supabase + actualiza estado en CRM',
          'Notificación: Email automático al cliente con factura adjunta',
        ],
      },
      {
        number: '02',
        title: 'Registro de Comerciales',
        type: 'Forms Sync',
        steps: [
          'Input: Comercial rellena formulario Tally con venta extra',
          'Webhook: n8n recibe datos y valida información',
          'Update: Crea nuevo deal en CRM vinculado al cliente',
          'Cálculo: Sistema calcula comisión y actualiza totales',
        ],
      },
    ],

    results: [
      { metric: '85%', label: 'Reducción en tiempo de facturación' },
      { metric: '100%', label: 'Datos centralizados' },
      { metric: '24/7', label: 'Automatizaciones activas' },
      { metric: '0', label: 'Errores humanos en facturas' },
    ],

    gallery: [
      { src: '/projects/crm/dashboard.jpg', alt: 'Dashboard principal del CRM', caption: 'Vista principal con métricas y accesos rápidos' },
      { src: '/projects/crm/workflow-facturas.jpg', alt: 'Workflow de facturación en n8n', caption: 'Flujo automatizado de generación de facturas' },
      { src: '/projects/crm/workflow-comerciales.jpg', alt: 'Workflow de registro de ventas', caption: 'Sincronización automática desde formularios' },
    ],

    techStack: ['Lovable.dev', 'Supabase', 'n8n', 'Tally Forms', 'React', 'TypeScript'],

    cta: {
      title: '¿Necesitas algo similar?',
      text: 'Si tu negocio pierde tiempo en tareas manuales, hablemos de cómo automatizarlo.',
      button: { label: 'Hablemos', href: '/contacto' },
    },

    nextProject: {
      slug: 'webs-locales',
      title: 'Webs para Negocios Locales',
    },
  },

  // ============================================
  // PÁGINA: PROYECTO - WEBS LOCALES
  // ============================================
  projectWebsLocales: {
    meta: {
      slug: 'webs-locales',
      title: 'Webs para Negocios Locales',
      category: 'Diseño Web · UI/UX · CRO',
    },

    hero: {
      title: 'Local Business Web Collection',
      subtitle: 'Experiencias digitales para negocios locales, enfocadas en conversión. No son solo webs bonitas; son herramientas de venta.',
      tags: ['HTML/CSS', 'JavaScript', 'Figma', 'WordPress', 'SEO'],
    },

    intro: {
      text: 'Cada negocio local tiene necesidades únicas. Estas webs no usan plantillas genéricas: están diseñadas desde cero para reflejar la identidad del negocio y, sobre todo, para convertir visitantes en clientes.',
    },

    cases: [
      {
        id: 'bohemian',
        name: 'Bohemian Bar',
        type: 'Hostelería',
        location: 'Plasencia',
        description: 'Web premium para coctelería de autor. Diseño oscuro y elegante que transmite la esencia del local.',
        keyFeature: 'Sistema de reservas online integrado',
        result: 'Redujo las llamadas telefónicas un 60% y aumentó las reservas de grupos.',
        tags: ['Reservas', 'Menú Digital', 'Responsive'],
        url: 'bohemianbar.es',
        images: [
          { src: '/projects/webs/bohemian-hero.jpg', label: 'Hero' },
          { src: '/projects/webs/bohemian-menu.jpg', label: 'Menú' },
          { src: '/projects/webs/bohemian-rrss.jpg', label: 'Redes' },
        ],
      },
      {
        id: 'alba-plata',
        name: 'Alba Plata',
        type: 'Comercio Local / Retail',
        location: 'Plasencia',
        description: 'Tienda gourmet especializada en productos de la tierra. Diseño cálido y artesanal que refleja la calidad de sus productos.',
        keyFeature: 'Catálogo digital con sistema de pedidos',
        result: 'Permitió expandir las ventas más allá de la tienda física.',
        tags: ['Catálogo', 'Pedidos', 'SEO Local'],
        url: 'albaplata.es',
        images: [
          { src: '/projects/webs/alba-hero.jpg', label: 'Hero' },
          { src: '/projects/webs/alba-carta.jpg', label: 'Carta' },
          { src: '/projects/webs/alba-opiniones.jpg', label: 'Opiniones' },
        ],
      },
      {
        id: 'urban33',
        name: 'Urban 33',
        type: 'Servicios Profesionales',
        location: 'Plasencia',
        description: 'Asesoría fiscal y contable moderna. Diseño profesional que transmite confianza y cercanía.',
        keyFeature: 'Formulario de contacto optimizado',
        result: 'Triplicó las consultas online y redujo la barrera de entrada para nuevos clientes.',
        tags: ['Corporativa', 'Lead Gen', 'Forms'],
        url: 'urban33.es',
        images: [
          { src: '/projects/webs/urban-hero.jpg', label: 'Hero' },
          { src: '/projects/webs/urban-contacto.jpg', label: 'Contacto' },
          { src: '/projects/webs/urban-concepto.jpg', label: 'Concepto' },
        ],
      },
      {
        id: 'health-clinic',
        name: 'Health Clinic',
        type: 'Sector Salud',
        location: 'Plasencia',
        description: 'Clínica de fisioterapia y rehabilitación. Diseño limpio y profesional que inspira confianza.',
        keyFeature: 'Perfil de equipo médico y sistema de citas',
        result: 'Humanizó la marca y facilitó la conversión de visitantes en pacientes.',
        tags: ['Citas Online', 'Equipo', 'Servicios'],
        url: 'healthclinic.es',
        images: [
          { src: '/projects/webs/health-hero.jpg', label: 'Hero' },
          { src: '/projects/webs/health-espacio.jpg', label: 'Espacio' },
          { src: '/projects/webs/health-servicios.jpg', label: 'Servicios' },
        ],
      },
    ],

    approach: {
      title: 'Mi enfoque',
      points: [
        'Análisis del cliente ideal y su recorrido de compra',
        'Estructura de página optimizada para conversión',
        'Diseño único que refleja la personalidad del negocio',
        'Desarrollo rápido y profesional',
        'SEO local desde el primer día',
      ],
    },

    cta: {
      title: '¿Tienes un negocio local?',
      text: 'Hablemos de cómo una web bien diseñada puede traerte más clientes.',
      button: { label: 'Contactar', href: '/contacto' },
    },

    nextProject: {
      slug: 'branding',
      title: 'Branding & Ecosistemas Visuales',
    },
  },

  // ============================================
  // PÁGINA: PROYECTO - BRANDING
  // ============================================
  projectBranding: {
    meta: {
      slug: 'branding',
      title: 'Branding & Ecosistemas Visuales',
      category: 'Branding · Identidad Visual · Diseño',
    },

    hero: {
      title: 'Branding & Visual Ecosystems',
      subtitle: 'Desde identidad corporativa hasta activos de conversión. Marcas memorables que venden.',
      tags: ['Adobe Illustrator', 'Photoshop', 'Figma', 'Brand Guidelines'],
    },

    cases: [
      {
        id: 'conservas-lolin',
        name: 'Conservas Lolín',
        type: 'Social Media Revamp',
        industry: 'Conservera tradicional · Cantabria',
        description: 'Modernizar la presencia digital de una conservera tradicional sin perder la esencia artesanal. Estrategia de Stories, publicaciones y propuestas comerciales que conectan con audiencias jóvenes.',
        challenge: 'Transformar una marca tradicional de conservas en una presencia digital atractiva para un público exclusivo.',
        deliverables: ['Estrategia de contenido', 'Templates de Stories', 'Publicaciones para feed', 'Propuestas B2B interactivas'],
        result: 'Las propuestas B2B interactivas ayudaron a cerrar acuerdos con distribuidores premium.',
        images: [
          { src: '/projects/branding/lolin-stories.jpg', label: 'Stories' },
          { src: '/projects/branding/lolin-feed.jpg', label: 'Feed' },
          { src: '/projects/branding/lolin-propuesta.jpg', label: 'Propuesta B2B' },
        ],
      },
      {
        id: 'flama-aerials',
        name: 'Flama Aerials',
        type: 'Tech Branding',
        industry: 'Videografía aérea con drones',
        description: 'Identidad visual completa para empresa de videografía aérea. Sistema de logos adaptables y lenguaje visual tech-premium.',
        challenge: 'Crear una identidad que transmita profesionalismo y tecnología de vanguardia.',
        deliverables: ['Sistema de 3 logos (principal, isotipo, alternativo)', 'Carrusel de Instagram', 'Guidelines de uso', 'Paleta y tipografía'],
        result: 'Sistema visual flexible que funciona en documentos, redes sociales y fondos variados.',
        images: [
          { src: '/projects/branding/flama-logos.jpg', label: 'Sistema de logos' },
          { src: '/projects/branding/flama-carrusel.jpg', label: 'Carrusel IG' },
          { src: '/projects/branding/flama-aplicaciones.jpg', label: 'Aplicaciones' },
        ],
      },
      {
        id: 'logofolio',
        name: 'Logofolio',
        type: 'Experimentos de Diseño',
        industry: 'Proyectos ficticios',
        description: 'Colección de logos y experimentos visuales que demuestran versatilidad en diferentes industrias y estilos.',
        logos: [
          { name: 'Nexus', industry: 'Tech Startup', style: 'Minimalista B2B' },
          { name: 'Pulse', industry: 'Fitness Brand', style: 'Energético' },
          { name: 'Solstice', industry: 'Lifestyle Brand', style: 'Cálido y artesanal' },
        ],
        philosophy: 'Cada logo es un ejercicio de síntesis: transmitir la esencia de una marca en un símbolo memorable.',
        images: [
          { src: '/projects/branding/logo-nexus.jpg', label: 'Nexus' },
          { src: '/projects/branding/logo-pulse.jpg', label: 'Pulse' },
          { src: '/projects/branding/logo-solstice.jpg', label: 'Solstice' },
        ],
      },
      {
        id: 'adidas-stellar',
        name: 'Adidas × Stellar Sports',
        type: 'Event Design · Proyecto Universitario',
        industry: 'Evento deportivo ficticio · IFEMA Madrid',
        description: 'Proyecto universitario integral: diseño de un evento deportivo ficticio para el lanzamiento de camisetas icónicas de selecciones nacionales reimaginadas con Adidas.',
        deliverables: ['Diseño de evento completo', 'Rediseño de 3 camisetas (Alemania, Francia, Argentina)', 'Sistema de logos Stellar × Adidas', 'Materiales de evento (cartel, plano, invitación VIP)'],
        note: 'Proyecto académico desarrollado como ejercicio de diseño integral de eventos deportivos.',
        images: [
          { src: '/projects/branding/adidas-jerseys.jpg', label: 'Legacy Jerseys' },
          { src: '/projects/branding/adidas-logos.jpg', label: 'Sistema de logos' },
          { src: '/projects/branding/adidas-collaterals.jpg', label: 'Materiales' },
        ],
      },
    ],

    cta: {
      title: '¿Necesitas una identidad visual?',
      text: 'Hablemos de cómo hacer que tu marca se vea tan profesional como tus servicios.',
      button: { label: 'Contactar', href: '/contacto' },
    },

    nextProject: {
      slug: 'ecommerce-propio',
      title: 'Mis E-commerce: Pikete & Impale',
    },
  },

  // ============================================
  // PÁGINA: PROYECTO - E-COMMERCE PROPIO
  // ============================================
  projectEcommerce: {
    meta: {
      slug: 'ecommerce-propio',
      title: 'Mis E-commerce: Pikete & Impale',
      category: 'E-commerce · Emprendimiento · Community Management',
    },

    hero: {
      title: 'Pikete Lowcost & Impale Clothing',
      subtitle: 'Dos marcas que fundé, escalé y gestioné íntegramente. Mi escuela práctica de emprendimiento digital.',
      tags: ['Shopify', 'Meta Ads', 'Community Management', 'Branding', 'Logística'],
    },

    intro: {
      text: 'Antes de especializarme en automatización y desarrollo, emprendí con dos marcas de e-commerce. Estas experiencias me enseñaron el valor del tiempo, la importancia de la eficiencia operativa y cómo gestionar una comunidad desde cero. Todo lo que sé de procesos, lo aprendí haciendo.',
    },

    brands: [
      {
        id: 'pikete',
        name: 'Pikete Lowcost',
        tagline: 'E-commerce de Zapatillas & Cultura Urbana',
        period: '2019 – 2022',
        description: 'Fundé y escalé este e-commerce desde cero, gestionando un catálogo de +50 referencias. No fue solo dropshipping; creé una marca. Gestioné la logística internacional, la atención al cliente, y desarrollé estrategias de Meta Ads que generaron una comunidad de 6.000 seguidores fieles.',
        stats: [
          { value: '6K+', label: 'Seguidores' },
          { value: '50+', label: 'Referencias' },
          { value: '3', label: 'Años activo' },
        ],
        skills: ['Shopify', 'Meta Ads', 'Logística internacional', 'Growth hacking'],
        highlights: [
          'Web en Shopify como complemento al Instagram',
          'Sorteos virales (+500 participantes)',
          'Gestión integral: desde compra hasta envío',
        ],
        images: [
          { src: '/projects/ecommerce/pikete-web.jpg', label: 'Web' },
          { src: '/projects/ecommerce/pikete-feed.jpg', label: 'Feed Instagram' },
          { src: '/projects/ecommerce/pikete-sorteo.jpg', label: 'Sorteo viral' },
        ],
      },
      {
        id: 'impale',
        name: 'Impale Clothing',
        tagline: 'Brand Identity & Streetwear',
        period: '2019 – 2021',
        description: 'Más que ropa, una identidad visual. Diseñé cada prenda y logotipo, dirigí las sesiones de fotos y gestioné la venta directa a través de Instagram (D2C). Organicé eventos y sorteos virales que posicionaron la marca en el nicho local del streetwear extremeño.',
        stats: [
          { value: '1K+', label: 'Seguidores' },
          { value: '20+', label: 'Diseños propios' },
          { value: '2', label: 'Eventos patrocinados' },
        ],
        skills: ['Branding', 'Adobe Illustrator', 'Instagram Marketing', 'Organización de eventos'],
        highlights: [
          'Colaboraciones con grupos de rap locales',
          'Patrocinio de batallas de gallos',
          'Comunidad "movimiento Impale"',
        ],
        images: [
          { src: '/projects/ecommerce/impale-disenos.jpg', label: 'Diseños' },
          { src: '/projects/ecommerce/impale-eventos.jpg', label: 'Eventos' },
          { src: '/projects/ecommerce/impale-clientes.jpg', label: 'Clientes' },
        ],
      },
    ],

    learnings: {
      title: 'Lo que aprendí',
      items: [
        'Gestión integral de un negocio: desde producto hasta postventa',
        'Community management real: construir audiencia desde cero',
        'El tiempo es el recurso más valioso (por eso ahora automatizo)',
        'Meta Ads y estrategias de crecimiento orgánico',
        'Logística y atención al cliente',
      ],
    },

    cta: {
      title: '¿Tienes un e-commerce?',
      text: 'Puedo ayudarte a automatizar procesos y escalar sin multiplicar tu carga de trabajo.',
      button: { label: 'Hablemos', href: '/contacto' },
    },

    nextProject: {
      slug: 'crm-automatizacion',
      title: 'CRM & Automatización',
    },
  },

  // ============================================
  // PÁGINA: SOBRE MÍ
  // ============================================
  about: {
    hero: {
      title: 'Sobre mí',
      subtitle: 'De la publicidad a la automatización. Del emprendimiento al desarrollo.',
    },

    intro: {
      headline: '¡Hola!',
      paragraphs: [
        'Soy un profesional de la Publicidad y el Marketing que ha evolucionado hacia la Automatización y la IA. Mi experiencia emprendiendo con marcas propias como Impale Clothing y Pikete Lowcost me enseñó el valor del tiempo y la eficiencia en los negocios.',
        'Ahora combino mi base creativa y estratégica con herramientas de IA y automatización para transformar tareas manuales en procesos eficientes que impulsan el crecimiento y generan resultados medibles.',
        'Basado entre Plasencia y Málaga, colaboro con clientes de toda España y remotamente con equipos internacionales.',
      ],
    },

    skills: {
      title: 'Habilidades técnicas',
      categories: [
        {
          name: 'Automatización & IA',
          items: ['n8n Expert', 'Make/Integromat', 'API Integrations', 'Google Workspace', 'Claude/GPT'],
        },
        {
          name: 'Desarrollo',
          items: ['Lovable.dev', 'Cursor IDE', 'React/TypeScript', 'HTML/CSS/JS', 'Supabase'],
        },
        {
          name: 'Diseño & Web',
          items: ['Figma', 'WordPress', 'Elementor', 'UI/UX', 'CRO'],
        },
        {
          name: 'Branding & Marketing',
          items: ['Adobe Illustrator', 'Adobe Photoshop', 'Meta Ads', 'SEO', 'Copywriting'],
        },
      ],
    },

    experience: {
      title: 'Experiencia',
      items: [
        {
          period: '2019 – 2024',
          role: 'Emprendedor & Gestor de Proyectos',
          company: 'Impale Clothing & Pikete Lowcost',
          description: 'Creación y gestión integral de dos marcas de e-commerce. Branding, estrategia de contenidos, gestión de comunidades (+10k seguidores combinados) y ventas directas.',
        },
        {
          period: '2021',
          role: 'Asistente de Publicidad (Prácticas)',
          company: 'Rommel & Montgomery — Cáceres',
          description: 'Diseño de campañas y materiales gráficos, creación de contenido, copywriting, y uso de Figma para prototipos.',
        },
        {
          period: '2020',
          role: 'Asistente de Marketing Digital (Prácticas)',
          company: 'Publimark — Cáceres',
          description: 'Gestión de redes sociales, diseño de publicaciones, redacción de copys persuasivos y seguimiento de resultados.',
        },
      ],
    },

    education: {
      title: 'Educación',
      items: [
        {
          period: '2022 – Actualidad',
          title: 'Grado en Publicidad y RR.PP.',
          institution: 'Universidad de Valladolid',
        },
        {
          period: '2021 – 2022',
          title: 'Grado Superior en Gestión de Ventas y Espacios Comerciales',
          institution: 'I.E.S. Ágora — Cáceres',
        },
        {
          period: '2019 – 2021',
          title: 'Grado Superior en Marketing y Publicidad',
          institution: 'I.E.S. Ágora — Cáceres',
        },
      ],
    },

    languages: {
      title: 'Idiomas',
      items: [
        { language: 'Español', level: 'Nativo' },
        { language: 'Inglés', level: 'Intermedio-Avanzado (B2)' },
      ],
    },

    interests: {
      title: 'Intereses',
      items: ['Automatización', 'Inteligencia Artificial', 'Marketing Digital', 'E-commerce', 'Branding', 'Innovación'],
    },

    cta: {
      title: '¿Quieres saber más?',
      text: 'Descarga mi CV o hablemos directamente sobre tu proyecto.',
      buttons: [
        { label: 'Descargar CV', href: '/cv-alvaro-fernandez.pdf', variant: 'secondary' },
        { label: 'Contactar', href: '/contacto', variant: 'primary' },
      ],
    },
  },

  // ============================================
  // PÁGINA: CONTACTO
  // ============================================
  contact: {
    hero: {
      title: 'Contacto',
      subtitle: 'Estoy aquí para ayudarte con tu próximo proyecto.',
    },

    intro: {
      text: 'Ya sea que tengas una idea clara o necesites orientación, podemos empezar con una conversación sin compromiso. Cuéntame qué necesitas y te respondo en menos de 24 horas.',
    },

    methods: [
      {
        type: 'whatsapp',
        label: 'WhatsApp',
        value: '+34 684 005 952',
        href: 'https://wa.me/34684005952',
        description: 'La forma más rápida de contactar',
        primary: true,
      },
      {
        type: 'email',
        label: 'Email',
        value: 'alferpri@gmail.com',
        href: 'mailto:alferpri@gmail.com',
        description: 'Para propuestas detalladas',
        primary: false,
      },
      {
        type: 'linkedin',
        label: 'LinkedIn',
        value: 'linkedin.com/in/alvarofp',
        href: 'https://linkedin.com/in/alvarofp',
        description: 'Conectemos profesionalmente',
        primary: false,
      },
    ],

    info: {
      location: {
        label: 'Ubicación',
        value: 'Plasencia / Málaga, España',
        note: 'Trabajo remoto con clientes de toda España',
      },
      availability: {
        label: 'Disponibilidad',
        value: 'Disponible para nuevos proyectos',
        note: 'A partir de enero 2026',
      },
    },

    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          question: '¿Cuánto cuesta un proyecto?',
          answer: 'Depende del alcance. Una web sencilla puede empezar desde 800€, mientras que un sistema de automatización personalizado varía según la complejidad. Siempre doy presupuesto cerrado antes de empezar.',
        },
        {
          question: '¿Cuánto tiempo tarda un proyecto?',
          answer: 'Una landing page puede estar lista en 1-2 semanas. Un CRM con automatizaciones, entre 3-6 semanas. Te doy plazos realistas desde el principio.',
        },
        {
          question: '¿Trabajas con empresas de fuera de España?',
          answer: 'Sí, trabajo remotamente con clientes de cualquier lugar. La comunicación fluida es lo único importante.',
        },
      ],
    },
  },

  // ============================================
  // FOOTER
  // ============================================
  footer: {
    copyright: '© 2026 Álvaro Fernández. Todos los derechos reservados.',
    tagline: 'Hecho con IA + Estrategia',
    links: [
      { label: 'LinkedIn', href: 'https://linkedin.com/in/alvarofp' },
      { label: 'GitHub', href: 'https://github.com/alvarofp' },
      { label: 'Behance', href: 'https://behance.net/alvarofp' },
    ],
    location: 'Based in Spain (Remote)',
  },
} as const;

// ============================================
// TIPOS (para TypeScript)
// ============================================
export type Content = typeof content;
export type NavItem = Content['nav'][number];
export type Service = Content['services']['items'][number];
export type ProjectIndex = Content['projects']['items'][number];