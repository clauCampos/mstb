import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/products')
})

test('Header "Logo link" has "Logo icon" image and redirects to /products', async ({
  page,
}) => {
  await expect(page.getByTestId('logo-link')).toBeVisible()
  await expect(page.getByTestId('Logo link')).toBeVisible()
  await page.getByTestId('Logo link').click()
  await expect(page).toHaveURL('/products')
})

test('Header "Cart link" redirects to /cart', async ({ page }) => {
  await expect(page.getByTestId('cart-link')).toBeVisible()
  await page.getByTestId('cart-link').click()
  await expect(page).toHaveURL('/cart')
})

test('Cart icon updates after adding product', async ({ page }) => {
  await expect(page.getByTestId('cart-link')).toBeVisible()
  await expect(page.getByTestId('Basket empty icon')).toBeVisible()
  await expect(page.getByTestId('cart-count')).toHaveText('0')

  await page.getByTestId('product-card-link').first().click()

  const storageOption = await page.getByTestId('storage-option').first()
  if (storageOption) await storageOption.click()

  const colorOption = await page.getByTestId('color-option').first()
  if (colorOption) await colorOption.click()

  await page.getByTestId('add-to-cart-btn').click()

  await expect(page.getByTestId('cart-count')).toHaveText('1')

  await expect(page.getByTestId('cart-link')).toBeVisible()
  await expect(page.getByTestId('Basket full icon')).toBeVisible()
  await expect(page.getByTestId('cart-count')).toHaveText('1')
})
