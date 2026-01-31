# Gestor de Certificados NFT - Resumen del Proyecto

## Descripción General

Una aplicación descentralizada (dApp) completa para gestionar certificados NFT (ERC-721) destinados a estudiantes. La aplicación permite que administradores creen, gestionen y asignen certificados a estudiantes, mientras que los estudiantes pueden registrarse y ver sus certificados obtenidos.

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

## Características Principales

### Para Estudiantes
✅ Conectar cartera MetaMask  
✅ Registrarse como estudiante (una sola vez)  
✅ Ver galería de certificados obtenidos  
✅ Ver detalles de cada certificado (ID, URI, imagen)  

### Para Administradores
✅ Dashboard administrativo exclusivo  
✅ Agregar nuevos tipos de certificados (nombre, URI, precio)  
✅ Gestionar galería de certificados disponibles  
✅ Asignar certificados a estudiantes por dirección  
✅ Ver todos los certificados creados  

### Funcionalidades Generales
✅ Detección automática de cambios de cuenta en MetaMask  
✅ Conversión correcta de unidades (Wei ↔ Ether) con ethers.formatEther  
✅ Espera a confirmación de bloques antes de actualizar UI  
✅ Certificados no transferibles (Soulbound)  
✅ Sistema de roles (Administrador vs Estudiante)  
✅ Interfaz responsiva (mobile y desktop)  
✅ Sistema de validación de formularios  
✅ Notificaciones en tiempo real  

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
├── .env.example                      # Ejemplo de variables de entorno
└── package.json                      # Dependencias del proyecto

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

## Funciones Principales

### contractIntegration.js
- `initializeWeb3()` - Inicializa conexión Web3
- `getCurrentAccount()` - Obtiene cuenta conectada
- `switchToSepolia()` - Cambia a red Sepolia
- `registrarEstudiante()` - Registra estudiante
- `esEstudianteRegistrado()` - Verifica si está registrado
- `getCertificatesForStudent()` - Obtiene certificados del estudiante
- `getCertificateTypes()` - Obtiene tipos de certificados disponibles
- `agregarTipoCertificado()` - Crea nuevo tipo (admin)
- `asignarCertificado()` - Asigna a estudiante (admin)
- `onAccountsChanged()` - Escucha cambios de cuenta

### Contrato Inteligente
```solidity
// Funciones principales
function registrarEstudiante(uint256 _id, string _nombres, string _apellidos)
function asignarCertificado(address _estudiante, uint256 _tipoID)
function agregarTipoCertificado(string _nombre, string _uri, uint256 _precio)

// Getters
function galeriaCertificados(uint256 index)
function esEstudianteRegistrado(address)
function balanceOf(address owner)
function tokenOfOwnerByIndex(address owner, uint256 index)
function tokenURI(uint256 tokenId)
```

## Configuración Requerida

### 1. Desplegar Contrato
- Usa Remix, Hardhat o Foundry
- Despliega `CertificadosNFT.sol` en Sepolia
- Copia la dirección del contrato

### 2. Variables de Entorno
Crea `.env.local`:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=0x... # Tu dirección de contrato
NEXT_PUBLIC_CONTRACT_OWNER=0x...   # (Opcional) Tu dirección admin
```

### 3. Configurar Admin
En `/lib/adminConfig.ts`, agrega direcciones admin:
```typescript
export const ADMIN_ADDRESSES = [
  '0x1234567890abcdef...',  // Tu dirección admin
];
```

## Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Crear .env.local con tu dirección de contrato
cp .env.example .env.local
# Edita .env.local con tu dirección de contrato

# 3. Ejecutar servidor de desarrollo
npm run dev

# 4. Abre http://localhost:3000
```

## Validaciones Implementadas

### Formulario de Registro de Estudiante
- ✓ ID: Solo números, requerido
- ✓ Nombres: Mínimo 2 caracteres, requerido
- ✓ Apellidos: Mínimo 2 caracteres, requerido

### Formulario de Certificado
- ✓ Nombre: Mínimo 3 caracteres, requerido
- ✓ URI: URL válida (http/https), requerido
- ✓ Precio: Número positivo, requerido

### Asignación de Certificado
- ✓ Dirección Ethereum válida (0x...)
- ✓ Certificado seleccionado
- ✓ Estudiante registrado en contrato

## Manejo de Errores

- Errores de conexión a MetaMask
- Errores de transacción con detalles
- Validación de campos en formularios
- Notificaciones al usuario en cada acción
- Logs con `[v0]` para debugging

## Seguridad

- ✓ Certificados Soulbound (no transferibles)
- ✓ Acceso protegido para funciones admin (onlyOwner)
- ✓ Validación de datos de entrada
- ✓ Confirmación de bloques antes de UI updates
- ✓ Roles basados en dirección (admin/estudiante)

## Mejoras Futuras

- [ ] Historial de transacciones
- [ ] Sistema de revocación de certificados
- [ ] Búsqueda y filtrado de certificados
- [ ] Exportación de certificados
- [ ] Integración con sistemas de identidad
- [ ] Pagos en cripto para certificados premium
- [ ] Galería pública de certificados
- [ ] Sistema de comentarios/reseñas
- [ ] Integración con LinkedIn
- [ ] Multisig para administración

## Troubleshooting

**P: ¿Cómo sé si soy admin?**  
R: La aplicación muestra "Administrador" en el encabezado si tu dirección está configurada como admin.

**P: ¿Qué pasa si no tengo ETH de prueba?**  
R: Ve a [sepoliafaucet.com](https://sepoliafaucet.com) y solicita ETH de prueba.

**P: ¿Por qué mi transacción no se confirma?**  
R: Puede tardar 1-5 minutos. Verifica el estado en [sepolia.etherscan.io](https://sepolia.etherscan.io)

**P: ¿Cómo veo mi dirección de contrato?**  
R: Después de desplegar en Remix, copia desde "Deployed Contracts" o busca tu transacción en Etherscan.

## Recursos Útiles

- [Remix IDE](https://remix.ethereum.org)
- [Sepolia Faucet](https://sepoliafaucet.com)
- [Etherscan Sepolia](https://sepolia.etherscan.io)
- [MetaMask](https://metamask.io)
- [OpenZeppelin Docs](https://docs.openzeppelin.com)
- [ethers.js Docs](https://docs.ethers.org/v6)
- [Next.js Docs](https://nextjs.org/docs)

## Licencia

MIT

## Contacto

Para preguntas o soporte, contacta al equipo de desarrollo.

---

**Versión:** 1.0.0  
**Última actualización:** Enero 2026  
**Estado:** Producción (Testnet)
