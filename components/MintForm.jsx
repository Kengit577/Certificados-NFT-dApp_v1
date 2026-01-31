'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, User, Tag, Link as LinkIcon, DollarSign } from 'lucide-react';

export default function MintForm({ 
  onSubmit, 
  formType = 'certificate', 
  loading = false 
}) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { toast } = useToast();

  const onFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      reset();
      toast({
        title: 'Éxito',
        description: 'Operación completada correctamente',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Ocurrió un error',
        variant: 'destructive',
      });
    }
  };

  if (formType === 'certificate') {
    return (
      <Card className="w-full max-w-2xl mx-auto border-primary/20 bg-card/50 backdrop-blur-sm">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 h-1" />
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-accent" />
            <div>
              <CardTitle>Agregar Nuevo Certificado</CardTitle>
              <CardDescription>Crea un nuevo tipo de certificado NFT para la institución</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Certificate Name */}
            <div className="space-y-2">
              <Label htmlFor="nombre" className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-accent" />
                Nombre del Certificado
              </Label>
              <Input
                id="nombre"
                placeholder="ej. Certificado de Programación Python"
                className="border-primary/20 focus:border-accent"
                {...register('nombre', { 
                  required: 'El nombre es requerido',
                  minLength: { value: 3, message: 'Mínimo 3 caracteres' }
                })}
                disabled={loading}
              />
              {errors.nombre && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <span>⚠</span> {errors.nombre.message}
                </p>
              )}
            </div>

            {/* Certificate URI */}
            <div className="space-y-2">
              <Label htmlFor="uri" className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4 text-accent" />
                URI de Imagen o Metadata
              </Label>
              <Input
                id="uri"
                placeholder="https://example.com/certificate.png"
                className="border-primary/20 focus:border-accent"
                {...register('uri', { 
                  required: 'El URI es requerido',
                  pattern: { 
                    value: /^https?:\/\//i, 
                    message: 'Debe ser una URL válida' 
                  }
                })}
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground">Proporciona un enlace HTTPS válido a la imagen o metadata del certificado</p>
              {errors.uri && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <span>⚠</span> {errors.uri.message}
                </p>
              )}
            </div>

            {/* Price in ETH */}
            <div className="space-y-2">
              <Label htmlFor="precio" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-accent" />
                Precio (en ETH)
              </Label>
              <Input
                id="precio"
                type="number"
                step="0.001"
                min="0"
                placeholder="0.1"
                className="border-primary/20 focus:border-accent"
                {...register('precio', { 
                  required: 'El precio es requerido',
                  min: { value: 0, message: 'El precio debe ser positivo' }
                })}
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground">Define el precio en ETH para este certificado</p>
              {errors.precio && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <span>⚠</span> {errors.precio.message}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner className="h-4 w-4" /> Procesando...
                </>
              ) : (
                <>
                  <BookOpen className="h-4 w-4" />
                  Agregar Certificado
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  // Student Registration Form
  return (
    <Card className="w-full max-w-2xl mx-auto border-primary/20 bg-card/50 backdrop-blur-sm">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 h-1" />
      <CardHeader>
        <div className="flex items-center gap-2">
          <User className="h-6 w-6 text-accent" />
          <div>
            <CardTitle>Registrarse como Estudiante</CardTitle>
            <CardDescription>Completa tu información para acceder a tus certificados</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* ID Number */}
          <div className="space-y-2">
            <Label htmlFor="idPersona" className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-accent" />
              Número de Identificación
            </Label>
            <Input
              id="idPersona"
              placeholder="ej. 123456789"
              className="border-primary/20 focus:border-accent"
              {...register('idPersona', { 
                required: 'El ID es requerido',
                pattern: { 
                  value: /^\d+$/, 
                  message: 'Solo se permiten números' 
                }
              })}
              disabled={loading}
            />
            {errors.idPersona && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <span>⚠</span> {errors.idPersona.message}
              </p>
            )}
          </div>

          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor="nombres" className="flex items-center gap-2">
              <User className="h-4 w-4 text-accent" />
              Nombres
            </Label>
            <Input
              id="nombres"
              placeholder="ej. Juan"
              className="border-primary/20 focus:border-accent"
              {...register('nombres', { 
                required: 'Los nombres son requeridos',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
              })}
              disabled={loading}
            />
            {errors.nombres && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <span>⚠</span> {errors.nombres.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label htmlFor="apellidos" className="flex items-center gap-2">
              <User className="h-4 w-4 text-accent" />
              Apellidos
            </Label>
            <Input
              id="apellidos"
              placeholder="ej. Pérez"
              className="border-primary/20 focus:border-accent"
              {...register('apellidos', { 
                required: 'Los apellidos son requeridos',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
              })}
              disabled={loading}
            />
            {errors.apellidos && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <span>⚠</span> {errors.apellidos.message}
              </p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner className="h-4 w-4" /> Registrando...
              </>
            ) : (
              <>
                <User className="h-4 w-4" />
                Registrarse
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
