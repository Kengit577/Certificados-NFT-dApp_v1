## Especificaciones del Proyecto:

### Backend:

**Tecnologías:** Solidity.

**Funcionamiento Clave:**
El Contrato trata de Certificados (NFT) que se entregan al Estudiante que haya cumplido con el requerimiento del Administrador.

1. El Contrato lleva el registro de los Estudiantes participantes, con su Número de identificación, Nombres, Apellidos y Address.
Esto se hace mediante el evento EstudianteRegistrado.

2. Cada Estudiante participante se puede registrar por sí mismo, mediante la función registrarEstudiante().

3. El Administrador Asigna un Certificado al Estudiante, lo que se hace Minteando el NFT respectivo y se lo asigna al Participante. Esto se hace mediante la función asignarCertificado().

4. Además lleva el registro de cada Certificado NFT que se ha asignado a cada Estudiante mediante el evento CertificadoAsignado.

5. El Administrador puede agregar Certificados NFT a la Galería mediante la función agregarTipoCertificado().

6. Además se lleva el registro de todos los Certificados agregados/disponibles mediante el evento NuevoTipoCertificado.

7. Finalmente se hizo que los Certificados NFT sean Soulbound osea no transferibles.

### Frontend:

1. **Tecnologías:** React.js, Tailwind CSS y **ethers.js (v6)**.

2. **Funcionalidades Implementadas:**

**Para Estudiantes:**

- ✅ **Registro de Estudiantes:** Un formulario para que los Participantes/Estudiantes se registren en el Instituto (Contrato), sólo una vez.

- ✅ **Galería de Certificados:** Galería con los Certificados NFT que ha obtenido, en caso de haber obtenido alguno.

**Administrador:**

- ✅ **Autologin:** Muestra el área de Administrador automáticamente si detecta que es el Deployer.

- ✅ **Registro de Nuevo Certificado:** Un formulario para agregar un nuevo Certificado NFT en la galería: nombre, URI, precio referencial/simbólico.

- ✅ **Galería de Certificados:** Asignación de Certificados a estudiantes según su address.

**Generales:**

- ✅ Detección automática de cambios de cuenta en MetaMask
- ✅ Conversión correcta de Wei a Ether con `ethers.formatEther`
- ✅ Espera a confirmación de bloques antes de actualizar UI
- ✅ Sistema de roles automático (Admin/Estudiante)
- ✅ Interfaz responsiva y moderna

## Estructura de Roles

```
┌─────────────────────────────────────┐
│      Usuario conectado              │
├─────────────────────────────────────┤
│  ¿Es propietario del contrato?      │
│  └─ Sí → Admin Dashboard            │
│  └─ No → ¿Está registrado?          │
│       └─ Sí → Student Dashboard     │
│       └─ No → Mostrar registro      │
└─────────────────────────────────────┘
```

## Funciones Principales

### Admin
```
┌─ Panel Admin
│  ├─ Gestionar Certificados
│  │  └─ Ver todos, Asignar a estudiante
│  └─ Agregar Certificado
│     └─ Nombre, URI, Precio
```

### Estudiante
```
┌─ Dashboard Estudiante
│  ├─ Registrarse (1ra vez)
│  │  └─ ID, Nombres, Apellidos
│  └─ Mis Certificados
│     └─ Ver galería de certificados
```

## Flujo de la Aplicación

### Para Nuevos Usuarios
1. Usuario accede a la aplicación
2. Si MetaMask no está conectado, ve la pantalla "Conectar Cartera"
3. Hace clic en "Conectar MetaMask"
4. Se le pide que confirme la conexión en MetaMask
5. Se cambia automáticamente a la red Sepolia
6. Se redirige al dashboard apropiado

### Para Estudiantes Nuevos
1. Visualiza un formulario de registro
2. Completa: ID, Nombres, Apellidos
3. Realiza la transacción (gas)
4. Una vez confirmada, ve su dashboard con certificados
5. Inicialmente el dashboard muestra "No hay certificados"
6. El administrador puede asignarle certificados

### Para Administradores
1. Se detecta automáticamente si es el propietario del contrato
2. Ve el panel administrativo con dos pestañas:
   - "Gestionar Certificados" - Ver todos los certificados creados
   - "Agregar Certificado" - Crear nuevos tipos
3. Para asignar:
   - Haz clic en "Asignar a Estudiante" en un certificado
   - Ingresa la dirección del estudiante (0x...)
   - Confirma en MetaMask
   - El NFT se mintea y se asigna


## Estructura del Proyecto

```
.
├── contracts/
│   └── CertificadosNFT.sol           # Contrato inteligente ERC-721
├── app/
│   ├── page.tsx                      # Página principal (lógica de roles)
│   ├── layout.tsx                    # Layout global
│   └── globals.css                   # Estilos globales
├── components/
│   ├── Header.jsx                    # Encabezado con info de cuenta
│   ├── ConnectWallet.jsx             # Pantalla de conexión inicial
│   ├── StudentDashboard.jsx          # Dashboard para estudiantes
│   ├── AdminDashboard.jsx            # Dashboard para administradores
│   ├── NFTCard.jsx                   # Componente para mostrar certificados
│   ├── MintForm.jsx                  # Formularios (registro y creación)
│   └── ui/                           # Componentes shadcn/ui
├── lib/
│   ├── contractIntegration.js        # Funciones de interacción con contrato
│   ├── adminConfig.ts                # Configuración de roles admin
│   └── utils.ts                      # Utilidades generales
├── hooks/
│   ├── use-toast.ts                  # Hook para notificaciones
│   └── use-mobile.ts                 # Hook para detectar móvil
├── public/                           # Archivos públicos
├── SETUP.md                          # Guía de instalación
├── DEPLOY.md                         # Guía de despliegue
├── .example.env.local                # Ejemplo de variables de entorno
└── package.json                      # Dependencias del proyecto

```

## Tecnología Utilizada

### Frontend
- **React 19.2.0** - Framework de interfaz de usuario
- **Next.js 16** - Framework de aplicación React con SSR
- **TypeScript/JavaScript** - Lenguaje de programación
- **Tailwind CSS v4** - Sistema de estilos
- **shadcn/ui** - Componentes de UI reutilizables
- **ethers.js v6** - Librería para interactuar con Ethereum
- **React Hook Form** - Gestión de formularios
- **Sonner** - Sistema de notificaciones

### Backend
- **Solidity ^0.8.20** - Lenguaje del contrato inteligente
- **OpenZeppelin ERC721** - Estándar NFT
- **OpenZeppelin Ownable** - Control de acceso

### Red
- **Sepolia Testnet** - Red de prueba para desarrollo

### Componentes utilizados:

- **NFTCard.jsx** - Tarjetas para mostrar certificados con imagen, ID y precio
- **MintForm.jsx** - Formularios con validación robusta (registro y creación)
- **contractIntegration.js** - Utilidad completa para interacción con el contrato

### Componentes adicionales:

- **Header.jsx** - Encabezado con dirección conectada y estado
- **ConnectWallet.jsx** - Pantalla de conexión a MetaMask
- **StudentDashboard.jsx** - Panel completo para estudiantes
- **AdminDashboard.jsx** - Panel completo para administradores
- **app/page.tsx** - Lógica principal con gestión de roles

### Documentación Incluida

1. **QUICKSTART.md** - Inicio en 5 minutos
2. **SETUP.md** - Instalación detallada
3. **DEPLOY.md** - Guía de despliegue (2 opciones: Remix y Hardhat)
4. **PROJECT_SUMMARY.md** - Documentación técnica completa
5. **BUILD_CHECKLIST.md** - Verificación de todos los requisitos
6. **.env.example** - Plantilla de configuración


### Para Empezar

```shellscript
npm install
cp .example.env.local .env.local
# Edita .env.local con tu dirección de contrato
npm run dev
```

