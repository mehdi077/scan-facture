"use client"

import { useUser } from "@clerk/nextjs";
import AuthOverlay from "@/components/AuthOverlay";

const ClientAuthOverlayGate = () => {
  const { user, isLoaded } = useUser();
  const isLoading = !isLoaded;
  if (isLoading || !user || Object.keys(user).length === 0) {
    return <AuthOverlay isLoading={isLoading} />;
  }
  return null;
};

export default ClientAuthOverlayGate;
