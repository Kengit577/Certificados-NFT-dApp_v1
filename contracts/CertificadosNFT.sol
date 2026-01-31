// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CertificadosNFT is ERC721, ERC721URIStorage, Ownable {
    // Contador/Índice de Certificados Imitidos en el Instituto NFT
    uint256 private _nextCertificadoID;

    // Estructura para un Certificados NFT
    struct TipoCertificado {
        string nombre;
        string uri;
        uint256 precio;
    }
    // Galería de todos los Certificados Disponibles
    TipoCertificado[] public galeriaCertificados;
    
    // Mapping para registrar si el Estudiante está inscrito
    // Es minimalista para que ocupe menos espacio, los datos del Estudiante se guardan en Eventos
    mapping(address => bool) public esEstudianteRegistrado;

    // Evento para registrar la adición de un Nuevo Certificado NFT
    event NuevoTipoCertificado(
        uint256 indexed tipoID,
        string nombre
    );
    // Evento para registrar la Ficha de los estudiantes inscritos
    event EstudianteRegistrado(
        address indexed estudiante,
        uint256 indexed idPersona,
        string nombres,
        string apellidos
    );
    // Evento para registrar la Entrega de un Certificado a un Estudiante
    event CertificadoAsignado(
        address indexed estudiante, 
        uint256 indexed certificadoID, 
        uint256 tipoID, 
        string nombreCertificado, 
        uint256 fecha
    );

    constructor(address initialOwner) ERC721("CertificadoInstituto", "ICERT") Ownable(initialOwner) {
        // Constructor limpio, para evitar problemas deployando con "transferencia muy grande"
    }

    // --- LÓGICA DE LA GESTIÓN DEL ADMINISTRADOR ---

    // --- Agregar Certificado --
    function agregarTipoCertificado(string memory _nombre, string memory _uri, uint256 _precio) external onlyOwner {
        // Agrego el Certificado Nuevo al Array
        galeriaCertificados.push(TipoCertificado(_nombre, _uri, _precio));
        // Emito el evento de registrar la adición de un Nuevo Certificado NFT
        emit NuevoTipoCertificado(galeriaCertificados.length - 1, _nombre);
    }
    // --- Asignar Certificados ---
    function asignarCertificado(address _estudiante, uint256 _tipoID) external onlyOwner {
        // Compruebo si se están entrando valores válidos
        require(esEstudianteRegistrado[_estudiante], "El estudiante debe registrarse primero en el contrato");
        require(_tipoID < galeriaCertificados.length, "El tipo de certificado no existe");

        // Creo y Minteo un Nuevo NFT/Certificado y se lo asigno al Estudiante
        uint256 _idActual = _nextCertificadoID++;
        _mint(_estudiante, _idActual);
        
        TipoCertificado storage tipo = galeriaCertificados[_tipoID];
        _setTokenURI(_idActual, tipo.uri);

        // Emitimos el Evento que Registra la Asignación del Certificado
        emit CertificadoAsignado(
            _estudiante, 
            _idActual, 
            _tipoID, 
            tipo.nombre, 
            block.timestamp
        );
    }


    // --- LÓGICA DE ESTUDIANTE ---

    // --- Regstro del Estudiante --
    function registrarEstudiante(uint256 _id, string memory _nombres, string memory _apellidos) external {
        // Verificamos que el Estudiante no esté ya registrado
        require(!esEstudianteRegistrado[msg.sender], "Ya estas registrado");
        
        // Marcamos al Estudiante como registrado
        esEstudianteRegistrado[msg.sender] = true;
        // La data pesada (nombres/apellidos) se va a los logs
        emit EstudianteRegistrado(msg.sender, _id, _nombres, _apellidos);
    }

    // --- SOULBOUND & OVERRIDES ---
    // Bloqueamos transferencias para que sea un Certificado personal
    function _update(address to, uint256 tokenId, address auth) internal override(ERC721) returns (address) {
        address from = _ownerOf(tokenId);
        // Permitimos el mint (from == address(0)) pero bloqueamos transferencias entre usuarios
        if (from != address(0) && to != address(0)) {
            revert("Err: Token Soulbound. No transferible.");
        }
        return super._update(to, tokenId, auth);
    }

    // Overrides obligatorios por ERC721URIStorage
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
