# Gestor de Certificados NFT - Guía de Configuración

## Requisitos Previos

- Node.js v20.19.2 o superior
- npm 9.2.0 o superior
- MetaMask instalado en tu navegador
- ETH de prueba en la red Sepolia

## Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0x... # Reemplaza con tu dirección del contrato
```

### 3. Desplegar el contrato Solidity

1. Usa Hardhat, Foundry o Remix para desplegar `CertificadosNFT.sol` en Sepolia
2. Copia la dirección del contrato desplegado
3. Pégala en la variable de entorno `NEXT_PUBLIC_CONTRACT_ADDRESS`

Ejemplo con Remix:
- Abre [remix.ethereum.org](https://remix.ethereum.org)
- Carga `CertificadosNFT.sol`
- Compila el contrato
- Selecciona Sepolia en MetaMask
- Despliega el contrato

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Uso de la Aplicación

### Para Estudiantes

1. **Conecta tu cartera**: Haz clic en "Conectar MetaMask" en la página de inicio
2. **Regístrate**: Completa el formulario con tu información
3. **Ve tus certificados**: Una vez registrado, verás los certificados que te hayan asignado

### Para Administradores

1. **Conecta como admin**: Usa la dirección que desplegó el contrato (propietario)
2. **Agregar Certificados**: Ve a la pestaña "Agregar Certificado"
   - Nombre: Ej. "Certificado de Programación"
   - URI: Link a la imagen/metadata del certificado
   - Precio: Valor en ETH (puede ser 0)
3. **Asignar a Estudiantes**: 
   - Ve a "Gestionar Certificados"
   - Selecciona un certificado y haz clic en "Asignar a Estudiante"
   - Ingresa la dirección Ethereum del estudiante
   - Confirma la transacción en MetaMask

## Estructura del Proyecto

```
.
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página de inicio
│   └── globals.css         # Estilos globales
├── components/
│   ├── AdminDashboard.jsx  # Panel del administrador
│   ├── StudentDashboard.jsx# Panel del estudiante
│   ├── ConnectWallet.jsx   # Conectar MetaMask
│   ├── Header.jsx          # Encabezado
│   ├── MintForm.jsx        # Formularios
│   ├── NFTCard.jsx         # Tarjeta de certificado
│   └── ui/                 # Componentes shadcn/ui
├── lib/
│   └── contractIntegration.js  # Funciones del contrato
├── CertificadosNFT.sol     # Contrato Solidity
└── package.json
```

## Funciones Principales

### contractIntegration.js

- `initializeWeb3()`: Inicializa la conexión a Web3
- `getCurrentAccount()`: Obtiene la cuenta actual conectada
- `registrarEstudiante(id, nombres, apellidos)`: Registra un estudiante
- `esEstudianteRegistrado(address)`: Verifica si un estudiante está registrado
- `getCertificatesForStudent(address)`: Obtiene certificados del estudiante
- `getCertificateTypes()`: Obtiene todos los tipos de certificados
- `agregarTipoCertificado(nombre, uri, precio)`: Agrega un nuevo tipo de certificado (admin)
- `asignarCertificado(studentAddress, tipoCertificadoID)`: Asigna certificado a estudiante (admin)
- `switchToSepolia()`: Cambia a la red Sepolia

## Características Clave

✅ **Registro de estudiantes**: Los estudiantes se registran a sí mismos
✅ **NFTs no transferibles**: Los certificados son Soulbound (no se pueden transferir)
✅ **Gestión de tipos**: Los administradores pueden crear nuevos tipos de certificados
✅ **Asignación de certificados**: Administradores asignan certificados a estudiantes
✅ **Conversión de unidades**: Manejo correcto de Wei a Ether
✅ **Confirmación de bloques**: Espera a que se confirmen las transacciones antes de actualizar la UI
✅ **Detección de cambios de cuenta**: Detecta cambios en MetaMask automáticamente
✅ **Interfaz responsiva**: Funciona en desktop y mobile

## Troubleshooting

### "MetaMask no está instalado"
- Descarga MetaMask desde [metamask.io](https://metamask.io)

### "El estudiante debe registrarse primero"
- El estudiante debe completar el registro antes de recibir certificados

### "Transacción rechazada"
- Verifica que tengas suficiente ETH de prueba en Sepolia
- Asegúrate de estar conectado a la red Sepolia correctamente

### "Contract address not defined"
- Configura la variable de entorno `NEXT_PUBLIC_CONTRACT_ADDRESS` con la dirección de tu contrato

## Obtener ETH de Prueba en Sepolia

1. Ve a [sepoliafaucet.com](https://sepoliafaucet.com)
2. Ingresa tu dirección Ethereum
3. Recibirás ETH de prueba en algunos minutos

## Próximos Pasos

- Implementar pagos (si el precio es > 0)
- Agregar sistema de revocación de certificados
- Crear galería pública de certificados
- Integrar con un sistema de verificación de identidad

## Soporte

Para reportar errores o sugerencias, abre un issue en el repositorio o contacta al equipo de desarrollo.
