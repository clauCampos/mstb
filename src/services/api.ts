import type { RequestInit } from '../types/FetchTypes'
const API_URL = 'https://prueba-tecnica-api-tienda-moviles.onrender.com'
const API_KEY = import.meta.env.VITE_API_KEY

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const headers = {
    ...(options.headers || {}),
    'x-api-key': API_KEY,
    'Content-Type': 'application/json',
  }
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })
  if (!response.ok) {
    let message = 'Unknown error'
    try {
      const text = await response.text()
      message = text || message
    } catch {
      // intentionally empty: ignore errors from response.text()
    }
    return { error: true, status: response.status, message }
  }
  return response.json()
}
