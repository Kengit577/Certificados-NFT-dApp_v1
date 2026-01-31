'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import StudentDashboard from '@/components/StudentDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import ConnectWallet from '@/components/ConnectWallet';
import {
  getCurrentAccount,
  esEstudianteRegistrado,
  onAccountsChanged,
  removeAccountsChanged,
  switchToSepolia,
  initializeWeb3,
} from '@/lib/contractIntegration';
import { verifyAdminStatus } from '@/lib/adminConfig';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [account, setAccount] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  // Initialize Web3 connection
  useEffect(() => {
    const initializeConnection = async () => {
      try {
        if (typeof window !== 'undefined' && window.ethereum) {
          await switchToSepolia();
          const connectedAccount = await getCurrentAccount();
          if (connectedAccount) {
            setAccount(connectedAccount);
            setIsConnected(true);
            
            // Check if account is admin
            const admin = verifyAdminStatus(connectedAccount);
            setIsAdmin(admin);
            
            // Check if account is registered as student
            const registered = await esEstudianteRegistrado(connectedAccount);
            setIsStudent(registered);
          }
        }
      } catch (error) {
        console.error('[v0] Error initializing Web3:', error);
        toast({
          title: 'Error',
          description: 'No se pudo conectar a MetaMask',
          variant: 'destructive',
        });
      }
    };

    initializeConnection();

    // Handle account changes
    const handleAccountsChanged = async (newAccounts) => {
      console.log('[v0] Accounts changed:', newAccounts);
      if (newAccounts.length > 0) {
        const newAccount = newAccounts[0];
        setAccount(newAccount);
        
        // Check admin status
        const admin = verifyAdminStatus(newAccount);
        setIsAdmin(admin);
        
        // Check student registration
        const registered = await esEstudianteRegistrado(newAccount);
        setIsStudent(registered);
      } else {
        setAccount(null);
        setIsAdmin(false);
        setIsStudent(false);
        setIsConnected(false);
      }
    };

    if (typeof window !== 'undefined' && window.ethereum) {
      onAccountsChanged(handleAccountsChanged);
      return () => removeAccountsChanged(handleAccountsChanged);
    }
  }, [toast]);

  const handleConnect = async () => {
    setLoading(true);
    try {
      await switchToSepolia();
      const connectedAccount = await getCurrentAccount();
      if (connectedAccount) {
        setAccount(connectedAccount);
        setIsConnected(true);
        
        // Check admin status
        const admin = verifyAdminStatus(connectedAccount);
        setIsAdmin(admin);
        
        // Check student registration
        const registered = await esEstudianteRegistrado(connectedAccount);
        setIsStudent(registered);
        
        toast({
          title: 'Conectado',
          description: `Conectado con ${connectedAccount.slice(0, 6)}...${connectedAccount.slice(-4)}`,
        });
      }
    } catch (error) {
      console.error('[v0] Connection error:', error);
      toast({
        title: 'Error',
        description: 'No se pudo conectar a MetaMask',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSetAdmin = (adminAddress) => {
    if (adminAddress.toLowerCase() === account?.toLowerCase()) {
      setIsAdmin(true);
      toast({
        title: 'Modo Admin',
        description: 'Estás conectado como Administrador',
      });
    }
  };

  if (!isConnected || !account) {
    return <ConnectWallet onConnect={handleConnect} loading={loading} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        account={account} 
        isAdmin={isAdmin}
        isStudent={isStudent}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {isAdmin ? (
            <AdminDashboard account={account} />
          ) : isStudent ? (
            <StudentDashboard account={account} />
          ) : (
            <StudentDashboard account={account} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Gestor de Certificados NFT</h3>
              <p className="text-sm text-muted-foreground">Plataforma descentralizada para gestionar certificados digitales.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Red</h4>
              <p className="text-sm text-muted-foreground">Sepolia Testnet</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Tecnología</h4>
              <p className="text-sm text-muted-foreground">Smart Contracts ERC-721</p>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 Gestor de Certificados NFT. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
