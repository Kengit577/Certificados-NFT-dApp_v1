'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';

export default function ConnectWallet({ onConnect, loading }) {
  const hasMetaMask = typeof window !== 'undefined' && window.ethereum;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Gestor de Certificados NFT</CardTitle>
          <CardDescription>
            Conecta tu cartera MetaMask para empezar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Info Alert */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Esta dApp funciona en la red Sepolia (Testnet). Asegúrate de tener ETH de prueba.
            </AlertDescription>
          </Alert>

          {!hasMetaMask ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                MetaMask no está instalado. Por favor, instala la extensión de navegador MetaMask.
              </AlertDescription>
            </Alert>
          ) : null}

          {/* Connect Button */}
          <Button 
            onClick={onConnect} 
            disabled={!hasMetaMask || loading}
            className="w-full h-12 text-base"
            size="lg"
          >
            {loading ? (
              <>
                <Spinner className="mr-2" />
                Conectando...
              </>
            ) : (
              <>
                🦊 Conectar MetaMask
              </>
            )}
          </Button>

          {/* Instructions */}
          <div className="text-sm text-muted-foreground space-y-2">
            <p className="font-semibold">¿Cómo empezar?</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Instala la extensión MetaMask si no la tienes</li>
              <li>Crea una cuenta o importa una existente</li>
              <li>Cambia a la red Sepolia</li>
              <li>Haz clic en "Conectar MetaMask"</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
