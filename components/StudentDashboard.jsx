'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MintForm from '@/components/MintForm';
import NFTCard from '@/components/NFTCard';
import {
  registrarEstudiante,
  esEstudianteRegistrado,
  getCertificatesForStudent,
} from '@/lib/contractIntegration';
import { useToast } from '@/hooks/use-toast';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, BookOpen, Award } from 'lucide-react';

export default function StudentDashboard({ account }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [certificatesLoading, setCertificatesLoading] = useState(false);
  const { toast } = useToast();

  // Check registration status and load certificates
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const registered = await esEstudianteRegistrado(account);
        setIsRegistered(registered);

        if (registered) {
          await loadCertificates();
        }
      } catch (error) {
        console.error('[v0] Error checking registration status:', error);
      }
    };

    checkStatus();
  }, [account]);

  const loadCertificates = async () => {
    setCertificatesLoading(true);
    try {
      const studentCerts = await getCertificatesForStudent(account);
      setCertificates(studentCerts);
    } catch (error) {
      console.error('[v0] Error loading certificates:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los certificados',
        variant: 'destructive',
      });
    } finally {
      setCertificatesLoading(false);
    }
  };

  const handleRegister = async (data) => {
    setLoading(true);
    try {
      const idPersona = BigInt(data.idPersona);
      await registrarEstudiante(idPersona, data.nombres, data.apellidos);
      
      // Wait a bit for the transaction to settle
      setTimeout(async () => {
        const registered = await esEstudianteRegistrado(account);
        setIsRegistered(registered);
        setLoading(false);
        
        toast({
          title: 'Éxito',
          description: 'Te has registrado correctamente como estudiante',
        });
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error('[v0] Registration error:', error);
      
      const errorMsg = error.message || 'Error al registrarse';
      toast({
        title: 'Error en el registro',
        description: errorMsg,
        variant: 'destructive',
      });
    }
  };

  if (!isRegistered) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 p-6 bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/30 rounded-lg">
          <div className="flex items-start gap-3">
            <BookOpen className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Registro Pendiente</h3>
              <p className="text-sm text-muted-foreground">
                Completa tu registro como estudiante para acceder a tus certificados
              </p>
            </div>
          </div>
        </div>
        <MintForm 
          onSubmit={handleRegister} 
          formType="student"
          loading={loading}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Award className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-bold">Mis Certificados</h1>
        </div>
        <p className="text-muted-foreground ml-11">
          Visualiza todos los certificados que has obtenido
        </p>
      </div>

      <Tabs defaultValue="certificates" className="w-full">
        <TabsList>
          <TabsTrigger value="certificates">
            Mis Certificados ({certificates.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="certificates" className="space-y-4">
          {certificatesLoading ? (
            <div className="flex items-center justify-center py-12">
              <Spinner />
              <span className="ml-2">Cargando certificados...</span>
            </div>
          ) : certificates.length === 0 ? (
            <Alert>
              <AlertDescription>
                Aún no tienes ningún certificado. El administrador puede asignarte uno.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <NFTCard
                  key={cert.tokenId}
                  certificate={cert}
                  isSelectable={false}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
