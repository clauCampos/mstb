import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/products/SMG-S24U')
})

test('Name field displays correctly', async ({ page }) => {
  await expect(page.getByTestId('specs-item-name-title')).toBeVisible()
  await expect(page.getByTestId('specs-item-name-title')).toHaveText('Name')
  await expect(page.getByTestId('specs-item-name-value')).toBeVisible()
  await expect(page.getByTestId('specs-item-name-value')).toHaveText(
    'Galaxy S24 Ultra'
  )
})

test('Description field displays correctly', async ({ page }) => {
  await expect(page.getByTestId('specs-item-description-title')).toBeVisible()
  await expect(page.getByTestId('specs-item-description-title')).toHaveText(
    'Description'
  )
  await expect(page.getByTestId('specs-item-description-value')).toBeVisible()
  const descriptionText = await page
    .getByTestId('specs-item-description-value')
    .textContent()
  expect(descriptionText?.trim()).toBe(
    'El Samsung Galaxy S24 Ultra es un smartphone de gama alta con una pantalla Dynamic AMOLED 2X de 6.8 pulgadas, procesador Qualcomm Snapdragon 8 Gen 3 for Galaxy, y un avanzado sistema de cámara con inteligencia artificial.'
  )
})

test('Screen field displays correctly', async ({ page }) => {
  await expect(page.getByTestId('specs-item-screen-title')).toBeVisible()
  await expect(page.getByTestId('specs-item-screen-title')).toHaveText('Screen')
  await expect(page.getByTestId('specs-item-screen-value')).toBeVisible()
  const screenText = await page
    .getByTestId('specs-item-screen-value')
    .textContent()
  expect(screenText?.trim()).toBe('6.8" Dynamic AMOLED 2X')
})

test('Resolution field displays correctly', async ({ page }) => {
  await expect(page.getByTestId('specs-item-resolution-title')).toBeVisible()
  await expect(page.getByTestId('specs-item-resolution-title')).toHaveText(
    'Resolution'
  )
  await expect(page.getByTestId('specs-item-resolution-value')).toBeVisible()
  const resolutionText = await page
    .getByTestId('specs-item-resolution-value')
    .textContent()
  expect(resolutionText?.trim()).toBe('3120 x 1440 pixels')
})

test('Processor field displays correctly', async ({ page }) => {
  await expect(page.getByTestId('specs-item-processor-title')).toBeVisible()
  await expect(page.getByTestId('specs-item-processor-title')).toHaveText(
    'Processor'
  )
  await expect(page.getByTestId('specs-item-processor-value')).toBeVisible()
  const processorText = await page
    .getByTestId('specs-item-processor-value')
    .textContent()
  expect(processorText?.trim()).toBe(
    'Qualcomm Snapdragon 8 Gen 3 for Galaxy Octa-Core'
  )
})

test('Main camera field displays correctly', async ({ page }) => {
  await expect(page.getByTestId('specs-item-camera-title')).toBeVisible()
  await expect(page.getByTestId('specs-item-camera-title')).toHaveText(
    'Main camera'
  )
  await expect(page.getByTestId('specs-item-camera-value')).toBeVisible()
  const cameraText = await page
    .getByTestId('specs-item-camera-value')
    .textContent()
  expect(cameraText?.trim()).toBe(
    '200 MP (F1.7) Principal, OIS + 10 MP (F2.4) Zoom x3, OIS + 12 MP (F2.2) Ultra gran angular + 50 MP (F3.4) Zoom x5, OIS'
  )
})

test('Selfie camera field displays correctly', async ({ page }) => {
  await expect(page.getByTestId('specs-item-selfieCamera-title')).toBeVisible()
  await expect(page.getByTestId('specs-item-selfieCamera-title')).toHaveText(
    'Selfie camera'
  )
  await expect(page.getByTestId('specs-item-selfieCamera-value')).toBeVisible()
  const selfieCameraText = await page
    .getByTestId('specs-item-selfieCamera-value')
    .textContent()
  expect(selfieCameraText?.trim()).toBe('12 MP')
})

test('Battery field displays correctly', async ({ page }) => {
  await expect(page.getByTestId('specs-item-battery-title')).toBeVisible()
  await expect(page.getByTestId('specs-item-battery-title')).toHaveText(
    'Battery'
  )
  await expect(page.getByTestId('specs-item-battery-value')).toBeVisible()
  const batteryText = await page
    .getByTestId('specs-item-battery-value')
    .textContent()
  expect(batteryText?.trim()).toBe('5000 mAh')
})

test('OS field displays correctly', async ({ page }) => {
  await expect(page.getByTestId('specs-item-os-title')).toBeVisible()
  await expect(page.getByTestId('specs-item-os-title')).toHaveText('Os')
  await expect(page.getByTestId('specs-item-os-value')).toBeVisible()
  const osText = await page.getByTestId('specs-item-os-value').textContent()
  expect(osText?.trim()).toBe('Android 14')
})

test('Screen refresh rate field displays correctly', async ({ page }) => {
  await expect(
    page.getByTestId('specs-item-screenRefreshRate-title')
  ).toBeVisible()
  await expect(
    page.getByTestId('specs-item-screenRefreshRate-title')
  ).toHaveText('Screen refresh rate')
  await expect(
    page.getByTestId('specs-item-screenRefreshRate-value')
  ).toBeVisible()
  const refreshRateText = await page
    .getByTestId('specs-item-screenRefreshRate-value')
    .textContent()
  expect(refreshRateText?.trim()).toBe('120 Hz')
})
