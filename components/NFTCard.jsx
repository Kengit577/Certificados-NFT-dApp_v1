'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Award, Hash, DollarSign } from 'lucide-react';

export default function NFTCard({ 
  certificate, 
  onSelectCertificate, 
  actionLabel = null, 
  isSelectable = false 
}) {
  const handleClick = () => {
    if (onSelectCertificate && isSelectable) {
      onSelectCertificate(certificate);
    }
  };

  return (
    <Card 
      className={`overflow-hidden transition-all border-primary/20 bg-card/50 backdrop-blur-sm ${
        isSelectable ? 'cursor-pointer hover:shadow-xl hover:border-accent/50 hover:scale-105' : ''
      }`}
      onClick={handleClick}
    >
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 h-1" />
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-accent" />
              {certificate.nombre}
            </CardTitle>
            {certificate.tokenId && (
              <CardDescription className="flex items-center gap-1.5 mt-2">
                <Hash className="h-3.5 w-3.5" />
                ID: {certificate.tokenId}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Display certificate image from URI */}
        <div className="relative w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden border border-primary/20">
          {certificate.uri ? (
            <Image
              src={certificate.uri || "/placeholder.svg"}
              alt={certificate.nombre}
              fill
              className="object-cover"
              unoptimized={true}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <Award className="h-12 w-12 text-muted opacity-30" />
            </div>
          )}
        </div>

        {/* Certificate details */}
        <div className="space-y-2 pt-2">
          {/* Certificate price (if available) */}
          {certificate.precio && (
            <div className="flex items-center gap-2 text-sm p-2 rounded bg-primary/5 border border-primary/20">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground">{certificate.precio}</span> ETH
              </span>
            </div>
          )}

          {/* ID display for gallery items */}
          {certificate.id !== undefined && (
            <div className="flex items-center gap-2 text-sm p-2 rounded bg-accent/5 border border-accent/20">
              <Hash className="h-4 w-4 text-accent" />
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground">ID:</span> {certificate.id}
              </span>
            </div>
          )}
        </div>

        {/* Action button */}
        {actionLabel && isSelectable && (
          <Button 
            onClick={handleClick}
            className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
