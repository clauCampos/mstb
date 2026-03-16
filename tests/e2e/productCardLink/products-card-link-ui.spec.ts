import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/products')
})

test('First product card displays image, brand, name, and price correctly', async ({
  page,
}) => {
  await page.waitForSelector('[data-testid="product-card-link"]')
  await expect(page.getByTestId('product-card-link').first()).toBeVisible()
  const firstCard = page.getByTestId('product-card-link').first()

  const img = await firstCard.getByTestId('product-card-image')
  await expect(img).toBeVisible()
  const imgSrc = await img.getAttribute('src')
  expect(imgSrc && imgSrc.length > 0).toBe(true)

  const brand = await firstCard.getByTestId('product-card-brand')
  await expect(brand).toBeVisible()
  const brandText = await brand.textContent()
  expect(brandText && brandText.trim().length > 0).toBe(true)

  const name = await firstCard.getByTestId('product-card-name')
  await expect(name).toBeVisible()
  const nameText = await name.textContent()
  expect(nameText && nameText.trim().length > 0).toBe(true)

  const price = await firstCard.getByTestId('product-card-price')
  await expect(price).toBeVisible()
  const priceText = await price.textContent()
  expect(priceText && priceText.match(/\d+ eur/)).not.toBeNull()
})
