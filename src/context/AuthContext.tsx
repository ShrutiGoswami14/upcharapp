import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { UserRole, UserProfile, PatientRegistrationData } from '../types/auth';
import { DEMO_USERS } from '../constants/roleConfig';
import {
  signInPatient,
  signUpPatient,
  signOutUser,
  getCurrentUser,
  resetPassword,
} from '../services/supabase/auth';
import { supabase } from '../services/supabase/client';

export interface AuthError {
  message: string;
}

interface AuthContextType {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  rememberDevice: boolean;
  setRememberDevice: (remember: boolean) => void;
  /** Real Supabase sign-in (email + password) */
  signInWithEmail: (email: string, password: string) => Promise<AuthError | null>;
  /** Real Supabase sign-up (email + password + name) */
  signUpWithEmail: (email: string, password: string, fullName: string, phone?: string) => Promise<AuthError | null>;
  /** Demo / mock sign-in – keeps backward-compat with non-patient roles */
  signIn: (roleOverride?: UserRole) => void;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<AuthError | null>;
  registerPatient: (data: PatientRegistrationData) => Promise<AuthError | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<UserRole>('patient');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [rememberDevice, setRememberDevice] = useState<boolean>(true);

  // ── Restore Supabase session on app start ─────────────────────────────────
  useEffect(() => {
    let mounted = true;

    const restoreSession = async () => {
      const currentUser = await getCurrentUser();
      if (mounted && currentUser) {
        setUser(currentUser);
        setActiveRole(currentUser.role);
        setIsAuthenticated(true);
      }
      if (mounted) setIsLoading(false);
    };

    restoreSession();

    // Listen to Supabase auth state changes (token refresh, sign-out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        if (event === 'SIGNED_OUT' || !session) {
          setUser(null);
          setIsAuthenticated(false);
          setIsLoading(false);
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          const currentUser = await getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
            setActiveRole(currentUser.role);
            setIsAuthenticated(true);
          }
          setIsLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // ── Real Supabase sign-in (patients) ─────────────────────────────────────
  const signInWithEmail = useCallback(
    async (email: string, password: string): Promise<AuthError | null> => {
      setIsLoading(true);
      const result = await signInPatient({ email, password });
      if (result.error) {
        setIsLoading(false);
        return { message: result.error };
      }
      if (result.user) {
        setUser(result.user);
        setActiveRole(result.user.role);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
      return null;
    },
    []
  );

  // ── Real Supabase sign-up (patients) ─────────────────────────────────────
  const signUpWithEmail = useCallback(
    async (
      email: string,
      password: string,
      fullName: string,
      phone?: string
    ): Promise<AuthError | null> => {
      setIsLoading(true);
      const result = await signUpPatient({ email, password, fullName, phone });
      if (result.error) {
        setIsLoading(false);
        return { message: result.error };
      }
      if (result.user) {
        setUser(result.user);
        setActiveRole('patient');
        setIsAuthenticated(true);
      }
      setIsLoading(false);
      return null;
    },
    []
  );

  // ── Password reset ────────────────────────────────────────────────────────
  const sendPasswordReset = useCallback(
    async (email: string): Promise<AuthError | null> => {
      const result = await resetPassword(email);
      if (result.error) return { message: result.error };
      return null;
    },
    []
  );

  // ── Demo / mock sign-in (Doctor, Clinic, Lab roles) ──────────────────────
  const signIn = useCallback((roleOverride?: UserRole) => {
    const roleToLogin = roleOverride || activeRole;
    setActiveRole(roleToLogin);
    setUser(DEMO_USERS[roleToLogin]);
    setIsAuthenticated(true);
  }, [activeRole]);

  // ── Sign out ──────────────────────────────────────────────────────────────
  const signOut = useCallback(async () => {
    await signOutUser();
    setIsAuthenticated(false);
    setUser(null);
    setActiveRole('patient');
  }, []);

  // ── Patient Registration (Supabase + fallback) ───────────────────────────
  const registerPatient = useCallback(async (data: PatientRegistrationData): Promise<AuthError | null> => {
    setIsLoading(true);

    if (data.email && data.password) {
      const result = await signUpPatient({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        phone: data.mobileNumber,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        bloodGroup: data.bloodGroup,
        address: data.address,
        avatarUrl: data.avatarUri,
      });

      if (result.error) {
        setIsLoading(false);
        return { message: result.error };
      }

      if (result.user) {
        setUser(result.user);
        setActiveRole('patient');
        setIsAuthenticated(true);
      }
      setIsLoading(false);
      return null;
    }

    // Fallback if no password provided (e.g. mock registration)
    const randomUHID = `UPC-PAT-${Math.floor(100000 + Math.random() * 900000)}`;
    const newProfile: UserProfile = {
      id: `pat-${Date.now()}`,
      name: data.fullName,
      role: 'patient',
      identifier: randomUHID,
      email: data.email ?? `${data.fullName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      phone: `+91 ${data.mobileNumber}`,
      avatarUrl:
        data.avatarUri ??
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      specialtyOrTagline: `UHID: ${randomUHID} • Blood Group ${data.bloodGroup || 'O+'}`,
      bloodGroup: data.bloodGroup,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      address: data.address,
      isVerified: true,
    };
    setActiveRole('patient');
    setUser(newProfile);
    setIsAuthenticated(true);
    setIsLoading(false);
    return null;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        activeRole,
        setActiveRole,
        isAuthenticated,
        isLoading,
        user,
        rememberDevice,
        setRememberDevice,
        signInWithEmail,
        signUpWithEmail,
        signIn,
        signOut,
        sendPasswordReset,
        registerPatient,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
