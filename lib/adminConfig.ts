/**
 * Admin Configuration
 * 
 * To enable admin features for your address, add it to this array.
 * The contract owner (deployer) is always the admin by default in the smart contract.
 */

// Add your admin addresses here
// Format: lowercase Ethereum addresses
export const ADMIN_ADDRESSES = [
    '0xd8B6DF1E8243e9107432A034Bc2eEfd21821a6eA',
  // Example: '0x1234567890abcdef1234567890abcdef12345678',
];

/**
 * Check if an address is an admin
 * @param address - The Ethereum address to check
 * @returns true if the address is an admin
 */
export function isAdminAddress(address: string | null | undefined): boolean {
  if (!address) return false;
  
  return ADMIN_ADDRESSES.some(
    (adminAddr) => adminAddr.toLowerCase() === address.toLowerCase()
  );
}

/**
 * Get the contract owner (set this after deployment)
 * This should be the address that deployed the contract
 */
export const CONTRACT_OWNER = process.env.NEXT_PUBLIC_CONTRACT_OWNER || '';

/**
 * Check if the address is the contract owner
 */
export function isContractOwner(address: string | null | undefined): boolean {
  if (!address || !CONTRACT_OWNER) return false;
  return address.toLowerCase() === CONTRACT_OWNER.toLowerCase();
}

/**
 * Verify admin status (either in ADMIN_ADDRESSES or is contract owner)
 */
export function verifyAdminStatus(address: string | null | undefined): boolean {
  return isAdminAddress(address) || isContractOwner(address);
}
