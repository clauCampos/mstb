import dotenv from 'dotenv'
dotenv.config()
import { test, expect } from '@playwright/test'

let headers: Record<string, string>

test.beforeEach(() => {
  headers = {
    'x-api-key': process.env.VITE_API_KEY ?? '',
    'Content-Type': 'application/json',
  }
})

test('API /products returns 200 valid response', async ({ request }) => {
  const response = await request.get(
    'https://prueba-tecnica-api-tienda-moviles.onrender.com/products',
    { headers }
  )
  expect(response.ok()).toBeTruthy()
  const data = await response.json()
  expect(Array.isArray(data)).toBe(true)
  expect(data.length).toBeGreaterThan(0)
  expect(data[0]).toHaveProperty('id')
  expect(data[0]).toHaveProperty('name')
  expect(data[0]).toHaveProperty('brand')
  expect(data[0]).toHaveProperty('basePrice')
  expect(data[0]).toHaveProperty('imageUrl')
})

test('API returns 401 error for invalid endpoint', async ({ request }) => {
  const invalidHeaders = {
    'x-api-key': 'invalid-api-key',
    'Content-Type': 'application/json',
  }

  const response = await request.get(
    'https://prueba-tecnica-api-tienda-moviles.onrender.com/products/',
    { headers: invalidHeaders }
  )
  expect(response.ok()).toBeFalsy()
  expect(response.status()).toEqual(401)
  const errorResponse = await response.json()
  expect(errorResponse).toHaveProperty('error', 'UNAUTHORIZED')
})
