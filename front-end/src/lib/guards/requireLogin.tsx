import { useAuth } from "@lib/hooks/useAuth";
import { CircularProgress } from "@mui/material";
import { Navigate } from "react-router";

interface RequireLoginProps {
  children: React.ReactNode;
}

export function RequireLogin({ children }: RequireLoginProps) {
  const auth = useAuth();
  if (auth.loading) {
    return <CircularProgress />;
  }
  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
}
