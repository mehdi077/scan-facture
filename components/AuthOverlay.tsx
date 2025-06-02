"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import React from "react";

interface AuthOverlayProps {
  isLoading: boolean;
}

const AuthOverlay: React.FC<AuthOverlayProps> = ({ isLoading }) => {
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
            <Button className="w-full" type="button" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center w-full">
                  <svg className="animate-spin h-5 w-5 text-blue-900 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M12 2a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 15a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1zm10-5a1 1 0 0 1-1 1h-3a1 1 0 1 1 0-2h3a1 1 0 0 1 1 1zM7 12a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h3a1 1 0 0 1 1 1zm12.071 7.071a1 1 0 0 1-1.414 0l-2.121-2.121a1 1 0 1 1 1.414-1.414l2.121 2.121a1 1 0 0 1 0 1.414zM8.464 8.464a1 1 0 0 1-1.414 0L4.93 6.344a1 1 0 0 1 1.414-1.415L8.464 7.05a1 1 0 0 1 0 1.414zM4.93 19.071a1 1 0 0 1 0-1.414l2.121-2.121a1 1 0 1 1 1.414 1.414l-2.121 2.121a1 1 0 0 1-1.414 0zM15.536 8.464a1 1 0 0 1 0-1.414l2.121-2.121a1 1 0 0 1 1.414 1.415L16.95 8.464a1 1 0 0 1-1.414 0z"></path>
                  </svg>
                  <span>Chargement...</span>
                </span>
              ) : (
                <span>Se connecter / S'inscrire</span>
              )}
            </Button>
          </SignInButton>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthOverlay;
