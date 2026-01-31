# Sistema de Diseño - Gestor de Certificados NFT

## Paleta de Colores Institucional

### Colores Primarios
- **Primary (Azul Oscuro Institucional)**: `oklch(0.25 0.1 260)`
  - Usado en headers, botones principales, badges de admin
  - Representa profesionalismo y confianza
  
- **Accent (Azul Brillante)**: `oklch(0.6 0.2 265)`
  - Usado en llamadas a acción, iconos destacados, elementos interactivos
  - Proporciona contraste y energía

- **Background**: `oklch(0.98 0.001 260)` (Blanco con tinte azul)
  - Fondo limpio y profesional

### Colores Neutrales
- **Foreground**: `oklch(0.15 0.01 260)` (Azul muy oscuro/Negro)
- **Muted**: `oklch(0.88 0.01 260)` (Gris claro)
- **Border**: `oklch(0.92 0.01 260)` (Gris muy claro)

### Modo Oscuro
- **Background Oscuro**: `oklch(0.12 0.01 260)` (Azul muy oscuro)
- **Card Oscuro**: `oklch(0.18 0.02 260)` (Azul oscuro)
- **Primary Oscuro**: `oklch(0.7 0.2 265)` (Azul brillante)

## Iconografía

### Iconos Utilizados (Lucide React)
- **Award** - Certificados, logros
- **Users** - Estudiantes, grupo
- **Settings** - Panel de administrador
- **Send** - Asignar certificados
- **BookOpen** - Educación, registro
- **User** - Perfil, estudiante
- **Plus** - Agregar, nuevo
- **Tag** - Etiquetas, identificadores
- **LinkIcon** - URLs, enlaces
- **DollarSign** - Precios, valores
- **Hash** - Identificadores, IDs
- **Copy** - Copiar dirección
- **LogOut** - Desconectar
- **CheckCircle** - Confirmación

## Componentes Mejorados

### Header
- Fondo gradiente con colores institucionales
- Sticky positioning para acceso rápido
- Logo con icono Award
- Badges con iconos para roles (Admin/Estudiante)
- Dirección de cartera con botón copiar

### Tarjetas NFT
- Borde superior gradiente de colores
- Icono Award prominente
- Información con iconos (Hash para IDs, DollarSign para precios)
- Fondo semi-transparente con backdrop blur
- Transiciones suaves y efecto hover

### Formularios
- Encabezados con iconos descriptivos
- Campos de entrada con bordes en color primary
- Mensajes de error con iconos de advertencia
- Botones de envío con color accent

### Paneles
- Tarjetas de estadísticas con iconos
- Grid responsivo (1 columna móvil, 2-3 escritorio)
- Tabs con iconos para mejor navegación

## Tipografía
- **Font-sans**: Geist (moderna y legible)
- **Font-mono**: Geist Mono (direcciones Ethereum)
- Escala de tamaños consistente
- Line-height: 1.4-1.6 para legibilidad

## Espaciado y Layout
- Flexbox como método principal
- Gap classes para espaciado consistente
- Padding y margin en múltiplos de 0.5rem
- Responsive design mobile-first
- Container max-width para grandes pantallas

## Efectos Visuales
- Backdrop blur en elementos flotantes
- Transiciones suaves (hover, scale)
- Gradientes sutiles (fondos, bordes)
- Sombras elevadas en tarjetas
- Focus states claros para accesibilidad

## Accesibilidad
- Alto contraste entre texto y fondo
- Iconos con alt text (sr-only cuando necesario)
- Elementos interactivos con focus visible
- Mensajes de error claros con iconos
- Estructura semántica HTML correcta
