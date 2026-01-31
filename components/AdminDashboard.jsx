'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import MintForm from '@/components/MintForm';
import NFTCard from '@/components/NFTCard';
import {
  agregarTipoCertificado,
  getCertificateTypes,
  asignarCertificado,
} from '@/lib/contractIntegration';
import { useToast } from '@/hooks/use-toast';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Settings, Send, Users } from 'lucide-react';

export default function AdminDashboard({ account }) {
  const [certificateTypes, setCertificateTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [certificatesLoading, setCertificatesLoading] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [studentAddress, setStudentAddress] = useState('');
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const { toast } = useToast();

  // Load certificate types on mount
  useEffect(() => {
    loadCertificateTypes();
  }, []);

  const loadCertificateTypes = async () => {
    setCertificatesLoading(true);
    try {
      const types = await getCertificateTypes();
      setCertificateTypes(types);
    } catch (error) {
      console.error('[v0] Error loading certificate types:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los tipos de certificados',
        variant: 'destructive',
      });
    } finally {
      setCertificatesLoading(false);
    }
  };

  const handleAddCertificate = async (data) => {
    setLoading(true);
    try {
      await agregarTipoCertificado(data.nombre, data.uri, data.precio);
      
      // Reload certificates after a brief delay
      setTimeout(async () => {
        await loadCertificateTypes();
        setLoading(false);
        toast({
          title: 'Éxito',
          description: 'Certificado agregado correctamente',
        });
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error('[v0] Error adding certificate:', error);
      
      const errorMsg = error.message || 'Error al agregar certificado';
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });
    }
  };

  const handleSelectCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setAssignDialogOpen(true);
  };

  const handleAssignCertificate = async () => {
    if (!selectedCertificate || !studentAddress.trim()) {
      toast({
        title: 'Error',
        description: 'Selecciona un certificado e ingresa la dirección del estudiante',
        variant: 'destructive',
      });
      return;
    }

    // Validate address format
    if (!studentAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      toast({
        title: 'Error',
        description: 'Ingresa una dirección Ethereum válida (0x...)',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await asignarCertificado(studentAddress, selectedCertificate.id);
      
      setTimeout(() => {
        setLoading(false);
        setAssignDialogOpen(false);
        setSelectedCertificate(null);
        setStudentAddress('');
        toast({
          title: 'Éxito',
          description: 'Certificado asignado correctamente',
        });
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error('[v0] Error assigning certificate:', error);
      
      const errorMsg = error.message || 'Error al asignar certificado';
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Settings className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-bold">Panel de Administrador</h1>
        </div>
        <p className="text-muted-foreground ml-11">
          Gestiona los certificados NFT y asígnalos a estudiantes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4 text-accent" />
              Certificados Disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{certificateTypes.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Tipos de certificados creados</p>
          </CardContent>
        </Card>
        <Card className="border-accent/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Send className="h-4 w-4 text-primary" />
              Nuevas Asignaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Listo</div>
            <p className="text-xs text-muted-foreground mt-1">Asigna certificados seleccionando abajo</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="manage" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted">
          <TabsTrigger value="manage" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Gestionar</span>
            ({certificateTypes.length})
          </TabsTrigger>
          <TabsTrigger value="add" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Agregar</span>
          </TabsTrigger>
        </TabsList>

        {/* Manage Certificates Tab */}
        <TabsContent value="manage" className="space-y-4">
          {certificatesLoading ? (
            <div className="flex items-center justify-center py-12">
              <Spinner />
              <span className="ml-2">Cargando certificados...</span>
            </div>
          ) : certificateTypes.length === 0 ? (
            <Alert>
              <AlertDescription>
                No hay certificados disponibles. Agrega uno desde la pestaña "Agregar Certificado"
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificateTypes.map((cert) => (
                <div key={cert.id} className="relative">
                  <NFTCard
                    certificate={cert}
                    isSelectable={true}
                    onSelectCertificate={handleSelectCertificate}
                    actionLabel="Asignar a Estudiante"
                  />
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Add Certificate Tab */}
        <TabsContent value="add" className="space-y-4">
          <MintForm 
            onSubmit={handleAddCertificate} 
            formType="certificate"
            loading={loading}
          />
        </TabsContent>
      </Tabs>

      {/* Assign Certificate Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-accent" />
              Asignar Certificado
            </DialogTitle>
            <DialogDescription>
              {selectedCertificate && (
                <span className="block mt-2">
                  Asigna <strong className="text-foreground">{selectedCertificate.nombre}</strong> a un estudiante
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Student Address Input */}
            <div className="space-y-2">
              <Label htmlFor="studentAddress">Dirección del Estudiante</Label>
              <Input
                id="studentAddress"
                placeholder="0x..."
                value={studentAddress}
                onChange={(e) => setStudentAddress(e.target.value)}
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground">
                Ingresa la dirección de cartera Ethereum del estudiante
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setAssignDialogOpen(false);
                  setSelectedCertificate(null);
                  setStudentAddress('');
                }}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAssignCertificate}
                disabled={loading}
                className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
              >
                {loading ? (
                  <>
                    <Spinner className="h-4 w-4" /> Asignando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Asignar
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
