import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers';

// Contract ABI - ERC721 functions needed for our dApp
const CONTRACT_ABI = [
  'function registrarEstudiante(uint256 _id, string _nombres, string _apellidos) external',
  'function asignarCertificado(address _estudiante, uint256 _tipoID) external',
  'function agregarTipoCertificado(string _nombre, string _uri, uint256 _precio) external',
  'function galeriaCertificados(uint256) view returns (string nombre, string uri, uint256 precio)',
  'function esEstudianteRegistrado(address) view returns (bool)',
  'function balanceOf(address) view returns (uint256)',
  'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)',
  'function tokenURI(uint256 tokenId) view returns (string)',
  'event EstudianteRegistrado(indexed address estudiante, indexed uint256 idPersona, string nombres, string apellidos)',
  'event CertificadoAsignado(indexed address estudiante, indexed uint256 certificadoID, uint256 tipoID, string nombreCertificado, uint256 fecha)',
  'event NuevoTipoCertificado(indexed uint256 tipoID, string nombre)',
];

// Contract configuration - Update with your contract address
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x'; // Set via env var
export const SEPOLIA_CHAIN_ID = '0xaa36a7'; // Sepolia chain ID

let provider = null;
let signer = null;
let contract = null;

// Initialize Web3 provider and contract
export async function initializeWeb3() {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask no está instalado');
  }

  provider = new BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  return { provider, signer, contract };
}

// Get current account
export async function getCurrentAccount() {
  if (!provider) await initializeWeb3();
  try {
    const accounts = await provider.send('eth_requestAccounts', []);
    return accounts[0];
  } catch (error) {
    console.error('[v0] Error getting current account:', error);
    throw error;
  }
}

// Register student
export async function registrarEstudiante(idPersona, nombres, apellidos) {
  if (!contract) await initializeWeb3();
  
  try {
    const tx = await contract.registrarEstudiante(idPersona, nombres, apellidos);
    const receipt = await tx.wait(); // Wait for block confirmation
    console.log('[v0] Estudiante registrado:', receipt);
    return receipt;
  } catch (error) {
    console.error('[v0] Error registrando estudiante:', error);
    throw error;
  }
}

// Get if student is registered
export async function esEstudianteRegistrado(address) {
  if (!contract) await initializeWeb3();
  
  try {
    return await contract.esEstudianteRegistrado(address);
  } catch (error) {
    console.error('[v0] Error checking student registration:', error);
    throw error;
  }
}

// Get student certificates (NFTs)
export async function getCertificatesForStudent(address) {
  if (!contract) await initializeWeb3();
  
  try {
    const balance = await contract.balanceOf(address);
    const certificates = [];

    for (let i = 0; i < balance; i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(address, i);
      const tokenURI = await contract.tokenURI(tokenId);
      certificates.push({
        tokenId: tokenId.toString(),
        uri: tokenURI,
      });
    }

    return certificates;
  } catch (error) {
    console.error('[v0] Error getting certificates:', error);
    throw error;
  }
}

// Get certificate types gallery
export async function getCertificateTypes() {
  if (!contract) await initializeWeb3();
  
  try {
    const certificateTypes = [];
    let index = 0;

    // Get certificate types until we hit an error
    while (true) {
      try {
        const cert = await contract.galeriaCertificados(index);
        certificateTypes.push({
          id: index,
          nombre: cert.nombre,
          uri: cert.uri,
          precio: formatEther(cert.precio),
        });
        index++;
      } catch {
        break; // No more certificates
      }
    }

    return certificateTypes;
  } catch (error) {
    console.error('[v0] Error getting certificate types:', error);
    throw error;
  }
}

// Add new certificate type (admin only)
export async function agregarTipoCertificado(nombre, uri, precio) {
  if (!contract) await initializeWeb3();
  
  try {
    const precioInWei = parseEther(precio);
    const tx = await contract.agregarTipoCertificado(nombre, uri, precioInWei);
    const receipt = await tx.wait();
    console.log('[v0] Tipo de certificado agregado:', receipt);
    return receipt;
  } catch (error) {
    console.error('[v0] Error agregando tipo de certificado:', error);
    throw error;
  }
}

// Assign certificate to student (admin only)
export async function asignarCertificado(studentAddress, tipoCertificadoID) {
  if (!contract) await initializeWeb3();
  
  try {
    const tx = await contract.asignarCertificado(studentAddress, tipoCertificadoID);
    const receipt = await tx.wait();
    console.log('[v0] Certificado asignado:', receipt);
    return receipt;
  } catch (error) {
    console.error('[v0] Error asignando certificado:', error);
    throw error;
  }
}

// Switch network to Sepolia
export async function switchToSepolia() {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask no está instalado');
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: SEPOLIA_CHAIN_ID }],
    });
  } catch (error) {
    if (error.code === 4902) {
      // Chain not added, try to add it
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: SEPOLIA_CHAIN_ID,
            chainName: 'Sepolia',
            rpcUrls: ['https://sepolia.infura.io/v3/'],
            blockExplorerUrls: ['https://sepolia.etherscan.io'],
          },
        ],
      });
    } else {
      throw error;
    }
  }
}

// Listen to account changes
export function onAccountsChanged(callback) {
  if (typeof window === 'undefined' || !window.ethereum) {
    console.warn('MetaMask no está disponible');
    return;
  }

  window.ethereum.on('accountsChanged', callback);
}

// Remove account change listener
export function removeAccountsChanged(callback) {
  if (typeof window === 'undefined' || !window.ethereum) {
    return;
  }

  window.ethereum.removeListener('accountsChanged', callback);
}
