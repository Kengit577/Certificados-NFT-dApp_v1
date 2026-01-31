# Guía de Despliegue - Gestor de Certificados NFT

## Opción 1: Desplegar con Remix (Recomendado para principiantes)

### Paso 1: Preparar Remix
1. Abre [remix.ethereum.org](https://remix.ethereum.org) en tu navegador
2. Asegúrate de tener MetaMask instalado y conectado a Sepolia

### Paso 2: Cargar el Contrato
1. En la sección de archivos (izquierda), haz clic en "File Explorer"
2. Crea una nueva carpeta llamada "contracts"
3. Crea un nuevo archivo: `CertificadosNFT.sol`
4. Copia todo el contenido de `/contracts/CertificadosNFT.sol` de este proyecto
5. Pégalo en el archivo de Remix

### Paso 3: Compilar
1. Ve a la sección "Solidity Compiler" (ícono del compilador)
2. Selecciona la versión `0.8.20`
3. Haz clic en "Compile CertificadosNFT.sol"
4. Espera a que compile (debe haber un ✓ verde)

### Paso 4: Desplegar
1. Ve a la sección "Deploy & Run Transactions"
2. Asegúrate de que el Environment sea "Injected Provider - MetaMask"
3. MetaMask debe mostrar que estás conectado a Sepolia
4. Selecciona "CertificadosNFT" en el dropdown de contratos
5. En el campo "initialOwner", ingresa tu dirección Ethereum (la que está en MetaMask)
6. Haz clic en el botón "Deploy"
7. Confirma la transacción en MetaMask
8. Espera a que se confirme la transacción

### Paso 5: Obtener la Dirección del Contrato
1. Una vez desplegado, verás el contrato en la sección "Deployed Contracts"
2. Copia la dirección del contrato (aparecerá en los logs o puedes hacer clic en el ícono de copiar)

### Paso 6: Configurar la Aplicación
1. En la raíz del proyecto, copia `.env.example` a `.env.local`
2. Reemplaza `0x0000000000000000000000000000000000000000` con tu dirección de contrato
3. Guarda el archivo

## Opción 2: Desplegar con Hardhat (Más avanzado)

### Paso 1: Instalar Hardhat
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox dotenv
npx hardhat
```

### Paso 2: Crear Configuración
Crea `hardhat.config.js`:
```javascript
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
```

### Paso 3: Crear Script de Despliegue
Crea `scripts/deploy.js`:
```javascript
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Desplegando contrato con:", deployer.address);

  const CertificadosNFT = await ethers.getContractFactory("CertificadosNFT");
  const contract = await CertificadosNFT.deploy(deployer.address);
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("Contrato desplegado en:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### Paso 4: Desplegar
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## Verificación del Despliegue

Después de desplegar, puedes verificar tu contrato:

1. Ve a [sepolia.etherscan.io](https://sepolia.etherscan.io)
2. Busca tu dirección de contrato
3. Verifica que aparezcan las funciones:
   - `registrarEstudiante`
   - `asignarCertificado`
   - `agregarTipoCertificado`
   - `galeriaCertificados`
   - `esEstudianteRegistrado`

## Verificación en Etherscan (Opcional)

Para que otros vean el código del contrato en Etherscan:

1. Ve a tu contrato en Etherscan
2. Haz clic en "Contract"
3. Desplázate hasta "Code" y haz clic en "Verify and Publish"
4. Selecciona el compilador (Solidity)
5. Ingresa el código del contrato
6. Selecciona la licencia (MIT)
7. Verifica los términos y publica

## Troubleshooting de Despliegue

### Error: "Insufficient funds"
- Necesitas ETH de prueba en Sepolia. Ve a [sepoliafaucet.com](https://sepoliafaucet.com)

### Error: "Network not configured"
- Asegúrate de que MetaMask esté conectado a Sepolia
- Haz clic en la red en MetaMask → Agregar red Sepolia si no la ves

### Error: "Invalid address"
- La dirección debe ser válida y estar en formato 0x...
- Verifica que copiaste correctamente

### Transacción pendiente
- Espera unos minutos. Las transacciones en Sepolia pueden tardar
- Verifica el estado en Etherscan

## Próximos Pasos

1. Configura la variable de entorno con la dirección del contrato
2. Ejecuta la aplicación con `npm run dev`
3. Prueba registrando un estudiante
4. Prueba agregando un certificado
5. Prueba asignando un certificado a un estudiante

## URLs Útiles

- **Sepolia Testnet**: https://sepolia.etherscan.io
- **Faucet**: https://sepoliafaucet.com
- **MetaMask**: https://metamask.io
- **Remix**: https://remix.ethereum.org
- **Hardhat**: https://hardhat.org

¡Tu dApp de certificados NFT está lista para usar!
