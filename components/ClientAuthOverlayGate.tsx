"use client"

import { useUser } from "@clerk/nextjs";
import AuthOverlay from "@/components/AuthOverlay";

const ClientAuthOverlayGate = () => {
  const { user } = useUser();
  if (!user || Object.keys(user).length === 0) {
    return <AuthOverlay />;
  }
  return null;
};

export default ClientAuthOverlayGate;
