import { create } from 'zustand';
import authService, { AuthUser, LoginCredentials } from './service';

interface AuthStore {
   // State
   isAuthenticated: boolean;
   user: AuthUser | null;
   isLoading: boolean;
   error: string | null;

   // Actions
   login: (credentials: LoginCredentials) => Promise<boolean>;
   logout: () => void;
   setUser: (user: AuthUser | null) => void;
   setError: (error: string | null) => void;
   refreshUser: () => void;
   getToken: () => string | null;
}

export const useAuthStore = create<AuthStore>((set) => ({
   // Initial state
   isAuthenticated: authService.isAuthenticated(),
   user: authService.getCurrentUser(),
   isLoading: false,
   error: null,

   // Get stored token
   getToken: () => {
      return authService.getToken()
   },

   // Login action
   login: async (credentials: LoginCredentials) => {
      set({ isLoading: true, error: null });
      const user = await authService.login(credentials);

      if (user) {
         set({
            isAuthenticated: true,
            user,
            isLoading: false,
            error: null,
         });
         return true;
      } else {
         set({
            isLoading: false,
            error: 'Invalid username or password',
         });
         return false;
      }
   },

   // Logout action
   logout: () => {
      authService.logout();
      set({
         isAuthenticated: false,
         user: null,
         error: null,
      });
   },

   // Set user action
   setUser: (user: AuthUser | null) => {
      set({ user });
   },

   // Set error action
   setError: (error: string | null) => {
      set({ error });
   },

   // Refresh user from token (get latest from JWT)
   refreshUser: () => {
      const user = authService.getCurrentUser();
      set({ user });
   },
}));

