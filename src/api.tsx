import { authService } from './lib/auth'

const BASE_URL = "http://localhost:8080/"

/**
 * Get the current auth token, with fallback to hardcoded token for development
 */
function getAuthToken(): string {
   const token = authService.getToken()
   if (token) {
      return `Bearer ${token}`
   }
   // Fallback for development/testing
   return "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2OTExNTU2MjIsImlzcyI6ImxvY2FsaG9zdCIsIm5iZiI6MTY5MTE1NTYyMiwiZXhwIjoxNzIyNzc4MDIyLCJ1c2VyTmFtZSI6ImFkbWluIiwicG9ydGFsVXNlciI6ZmFsc2UsInN1cGVyQWRtaW4iOnRydWV9.fz2GwWSM--7waoUbZY8mHqoulUc0X425mRHgvgdN5F32DJd9rgc6aCRtsb84Z4DfBDqIJG9rZmCSHsbhYmsyjQ"
}

/**
 * Represents a successful API response
 */
export interface ApiSuccessResponse<T = Record<string, unknown>> {
   status: 'success'
   data: T
}

/**
 * Represents a failed API response
 */
export interface ApiErrorResponse {
   status: 'failure'
   code: string
   errors?: Record<string, unknown> | null
}

/**
 * Union type for all possible API responses
 */
export type ApiResponse<T = Record<string, unknown>> = ApiSuccessResponse<T> | ApiErrorResponse

async function request<T = Record<string, unknown>>(
   url: string,
   options?: RequestInit
): Promise<ApiResponse<T>> {
   const response = await fetch(BASE_URL + url, {
      headers: {
         "Content-Type": "application/json",
         "Authentication": getAuthToken(),
         "Tenant-ID": "1",
      },
      mode: "cors",
      method: "GET",
      ...options,
   })

   return await response.json() as ApiResponse<T>
}

async function get<T = Record<string, unknown>>(url: string): Promise<ApiResponse<T>> {
   return await request<T>(url)
}

async function post<T = Record<string, unknown>>(url: string, data?: unknown): Promise<ApiResponse<T>> {
   return await request<T>(url, {
      method: "POST",
      body: JSON.stringify(data)
   })
}

async function put<T = Record<string, unknown>>(url: string, data?: unknown): Promise<ApiResponse<T>> {
   return await request<T>(url, {
      method: "PUT",
      body: JSON.stringify(data)
   })
}

async function destroy<T = Record<string, unknown>>(url: string): Promise<ApiResponse<T>> {
   return await request<T>(url, {
      method: "DELETE",
   })
}

export default {
   get,
   post,
   put,
   destroy
}