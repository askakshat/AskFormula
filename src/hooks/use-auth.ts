import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active session and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session?.user);
      setIsLoading(false);
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session?.user);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (provider?: unknown) => {
    // Basic wrapper to avoid breaking current calls if any
    return await supabase.auth.signInWithOAuth({ provider: (provider as "github" | "google") || 'github' });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    isLoading,
    isAuthenticated,
    user,
    signIn,
    signOut,
  };
}
