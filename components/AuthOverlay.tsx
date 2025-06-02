"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import React from "react";

const AuthOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-background/20">
      <Card className="w-full max-w-sm shadow-lg border-border border mx-4 animate-in fade-in-0 zoom-in-95">
        <CardHeader>
          <CardTitle>Bienvenue !</CardTitle>
          <CardDescription>
            Connectez-vous ou inscrivez-vous pour continuer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInButton mode="modal">
            <Button className="w-full" type="button">
              {"Se connecter / S'inscrire"}
            </Button>
          </SignInButton>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthOverlay;
