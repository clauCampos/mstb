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

test('API /products/{id} returns 200valid response', async ({ request }) => {
  const response = await request.get(
    'https://prueba-tecnica-api-tienda-moviles.onrender.com/products/SMG-S24U',
    { headers }
  )
  expect(response.ok()).toBeTruthy()
  const data = await response.json()
  expect(typeof data).toBe('object')
  expect(data).toHaveProperty('id')
  expect(data).toHaveProperty('specs')
  expect(data.specs).toHaveProperty('screen')
  expect(data.specs).toHaveProperty('resolution')
  expect(data.specs).toHaveProperty('processor')
  expect(data.specs).toHaveProperty('mainCamera')
  expect(data.specs).toHaveProperty('selfieCamera')
  expect(data.specs).toHaveProperty('battery')
  expect(data.specs).toHaveProperty('os')
  expect(data.specs).toHaveProperty('screenRefreshRate')
  expect(data).toHaveProperty('colorOptions')
  expect(Array.isArray(data.colorOptions)).toBe(true)
  if (data.colorOptions.length > 0) {
    expect(data.colorOptions[0]).toHaveProperty('name')
    expect(data.colorOptions[0]).toHaveProperty('hexCode')
    expect(data.colorOptions[0]).toHaveProperty('imageUrl')
  }
  expect(data).toHaveProperty('storageOptions')
  expect(Array.isArray(data.storageOptions)).toBe(true)
  if (data.storageOptions.length > 0) {
    expect(data.storageOptions[0]).toHaveProperty('capacity')
    expect(data.storageOptions[0]).toHaveProperty('price')
  }
  expect(data).toHaveProperty('similarProducts')
  expect(Array.isArray(data.similarProducts)).toBe(true)
  if (data.similarProducts.length > 0) {
    expect(data.similarProducts[0]).toHaveProperty('id')
    expect(data.similarProducts[0]).toHaveProperty('brand')
    expect(data.similarProducts[0]).toHaveProperty('name')
    expect(data.similarProducts[0]).toHaveProperty('basePrice')
    expect(data.similarProducts[0]).toHaveProperty('imageUrl')
  }
})

test('API returns 401 error for invalid endpoint', async ({ request }) => {
  const invalidHeaders = {
    'x-api-key': 'invalid-api-key',
    'Content-Type': 'application/json',
  }

  const response = await request.get(
    'https://prueba-tecnica-api-tienda-moviles.onrender.com/products/SMG-S24U',
    { headers: invalidHeaders }
  )
  expect(response.ok()).toBeFalsy()
  expect(response.status()).toEqual(401)
  const errorResponse = await response.json()
  expect(errorResponse).toHaveProperty('error', 'UNAUTHORIZED')
})

test('API returns 404 error for not found endpoint', async ({ request }) => {
  const response = await request.get(
    'https://prueba-tecnica-api-tienda-moviles.onrender.com/not-found-endpoint',
    { headers }
  )
  expect(response.ok()).toBeFalsy()
  expect(response.status()).toEqual(404)
  expect(await response.text()).toContain('Cannot GET /not-found-endpoint')
})
