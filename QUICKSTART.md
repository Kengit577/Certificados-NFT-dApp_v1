# Quick Start - Gestor de Certificados NFT

## 5 Minutos para Empezar

### 1. Preparar el Contrato (2 minutos)
```bash
# Opción A: Desplegar con Remix (Recomendado)
1. Ve a https://remix.ethereum.org
2. Carga el archivo contracts/CertificadosNFT.sol
3. Compila (Ctrl+S)
4. Conecta MetaMask a Sepolia
5. Haz clic en Deploy
6. Copia la dirección del contrato desplegado
```

### 2. Configurar la Aplicación (1 minuto)
```bash
# Instalar dependencias
npm install

# Crear archivo de configuración
cp .env.example .env.local

# Editar .env.local
NEXT_PUBLIC_CONTRACT_ADDRESS=0x... # Pega aquí tu dirección
```

### 3. Ejecutar la Aplicación (1 minuto)
```bash
npm run dev
# Abre http://localhost:3000
```

### 4. Probar la Aplicación (1 minuto)
```
✓ Conecta MetaMask
✓ Regístrate como estudiante
✓ En otra pestaña, cambia a tu dirección admin
✓ Agrega un certificado
✓ Asigna a un estudiante
✓ Ve el certificado en el dashboard del estudiante
```

## Necesitas ETH de Prueba?

1. Ve a https://sepoliafaucet.com
2. Ingresa tu dirección Ethereum
3. Recibirás 0.05 ETH en minutos

## URLs Importantes

| Recurso | URL |
|---------|-----|
| Remix IDE | https://remix.ethereum.org |
| Sepolia Faucet | https://sepoliafaucet.com |
| Block Explorer | https://sepolia.etherscan.io |
| MetaMask | https://metamask.io |

## Comandos Útiles

```bash
# Desarrollo
npm run dev           # Ejecutar servidor local
npm run build         # Compilar para producción
npm start             # Ejecutar en producción
npm run lint          # Verificar código

# Ver logs de debug
# En console del navegador: [v0] ...
```

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

## Errores Comunes

| Error | Solución |
|-------|----------|
| "MetaMask no instalado" | Descarga MetaMask en metamask.io |
| "Red no soportada" | Cambia a Sepolia en MetaMask |
| "Fondos insuficientes" | Solicita ETH en sepoliafaucet.com |
| "Contrato no encontrado" | Verifica NEXT_PUBLIC_CONTRACT_ADDRESS |
| "Transacción pendiente" | Espera 1-5 minutos, verifica en Etherscan |

## Próximos Pasos

Después de probar:
1. Personaliza los estilos en `app/globals.css`
2. Agrega más tipos de certificados
3. Invita a otros a probar como estudiantes
4. Explora las funciones avanzadas en `DEPLOY.md`

## ¿Necesitas Ayuda?

- Lee `SETUP.md` para instalación detallada
- Lee `DEPLOY.md` para más opciones de despliegue
- Lee `PROJECT_SUMMARY.md` para documentación completa
- Revisa los logs con `[v0]` en la consola del navegador

---

¡Ya estás listo! 🚀 Conecta tu cartera y comienza a usar tu dApp.
