'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, LogOut, Award, Users } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function Header({ account, isAdmin, isStudent }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyAddress = async () => {
    await navigator.clipboard.writeText(account);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: 'Copiado',
      description: 'Dirección copiada al portapapeles',
    });
  };

  const handleDisconnect = () => {
    // Clear local state and reload
    window.location.reload();
  };

  return (
    <header className="border-b border-border bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
            <Award className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="text-xl font-bold text-foreground hidden sm:block">
            Certificados NFT
          </div>
        </div>

        {/* Account Info and Status */}
        <div className="flex items-center gap-3 flex-wrap justify-end">
          {/* Status Badges */}
          <div className="flex gap-2">
            {isAdmin && (
              <Badge className="bg-accent text-accent-foreground flex items-center gap-1.5">
                <Award className="h-3 w-3" />
                Administrador
              </Badge>
            )}
            {isStudent && (
              <Badge variant="secondary" className="flex items-center gap-1.5">
                <Users className="h-3 w-3" />
                Estudiante
              </Badge>
            )}
          </div>

          {/* Account Address */}
          <div className="flex items-center gap-2 bg-card border border-border px-3 py-2 rounded-lg shadow-sm">
            <span className="text-xs sm:text-sm font-mono text-muted-foreground">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={copyAddress}
              className="h-6 w-6 p-0 hover:bg-muted"
              title={copied ? 'Copiado!' : 'Copiar dirección'}
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Disconnect Button */}
          <Button
            size="sm"
            onClick={handleDisconnect}
            className="gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Desconectar</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
