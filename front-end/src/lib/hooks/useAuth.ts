import { AuthContext, type AuthContextType } from "@lib/providers/authProvider";
import { useContext } from "react";

export const useAuth = (): AuthContextType => useContext(AuthContext);
