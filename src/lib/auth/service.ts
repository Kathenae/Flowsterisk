import api from '../../api';

const AUTH_TOKEN_KEY = "auth_token"

export interface AuthUser {
   username: string
   [key: string]: unknown
}

export interface LoginCredentials {
   username: string
   password: string
}

export interface AuthResponse {
   token_type: 'jwt'
   token: string
}

class AuthService {
   /**
    * Login with username and password
    */
   async login(credentials: LoginCredentials): Promise<AuthUser | null> {
      try {
         const response = await api.post<AuthResponse>('/auth', credentials)
         
         if (response.status === 'failure') {
            console.error('Login failed:', response.code, response.errors)
            return null
         }

         const { token } = response.data
         this.setToken(token)
         
         // Decode JWT to get user info (without verification, since we trust our server)
         const user = this.decodeToken(token)
         if (user) {
            return user
         }
         
         return null
      } catch (error) {
         console.error('Login error:', error)
         return null
      }
   }

   /**
    * Logout and clear stored auth data
    */
   logout(): void {
      localStorage.removeItem(AUTH_TOKEN_KEY)
   }

   /**
    * Get stored auth token
    */
   getToken(): string | null {
      return localStorage.getItem(AUTH_TOKEN_KEY)
   }

   /**
    * Store auth token 
    */
   private setToken(token: string): void {
      localStorage.setItem(AUTH_TOKEN_KEY, token)
   }

   /**
    * Get current user from the stored JWT token.
    */
   getCurrentUser(): AuthUser | null {
      const token = this.getToken()
      if (!token) return null
      return this.decodeToken(token)
   }

   /**
    * Check if user is authenticated
    */
   isAuthenticated(): boolean {
      return this.getToken() !== null
   }

   /**
    * Decode JWT token (payload only, no verification)
    */
   private decodeToken(token: string): AuthUser | null {
      try {
         const parts = token.split('.')
         if (parts.length !== 3) return null
         
         const payload = JSON.parse(atob(parts[1]))
         return payload as AuthUser
      } catch (error) {
         console.error('Failed to decode token:', error)
         return null
      }
   }
}

export default new AuthService()

