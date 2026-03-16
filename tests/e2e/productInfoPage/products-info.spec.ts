import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/products/SMG-S24U')
})

test('Product info fields display correctly', async ({ page }) => {
  const image = page.getByTestId('product-info-image')
  const title = page.getByTestId('product-info-title')
  const price = page.getByTestId('product-info-price')

  await expect(image).toBeVisible()
  await expect(title).toBeVisible()
  await expect(price).toBeVisible()

  const imageSrc = await image.getAttribute('src')
  expect(imageSrc).toBe(
    'https://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp'
  )

  const titleText = await title.textContent()
  expect(titleText).not.toBeNull()
  expect(titleText?.trim()).toBe('Samsung Galaxy S24 Ultra')

  const priceText = await price.textContent()
  expect(priceText).not.toBeNull()
  expect(priceText?.trim()).toBe('1329 eur')

  const storageList = page.getByTestId('storage-options-list')
  await expect(storageList).toBeVisible()

  const storageText = await storageList.textContent()
  expect(storageText).toContain('256 GB')
  expect(storageText).toContain('512 GB')
  expect(storageText).toContain('1 TB')

  const colorNameElement = page.getByTestId('color-name')
  await expect(colorNameElement).toBeVisible()

  const colorNames = [
    'Titanium Violet',
    'Titanium black',
    'Titanium grey',
    'Titanium yellow',
  ]
  const colorNameText = await colorNameElement.textContent()
  let found = false
  for (const colorName of colorNames) {
    if (colorNameText?.includes(colorName)) {
      found = true
      break
    }
  }
  expect(found).toBe(true)
})

test('Add to cart button enables after selecting storage and color, redirects to cart, and cart-list contains item', async ({
  page,
}) => {
  const addToCartBtn = page.getByTestId('add-to-cart-btn')
  await expect(addToCartBtn).toBeVisible()
  await expect(addToCartBtn).toBeDisabled()

  const storageOptions = page
    .getByTestId('storage-options-list')
    .locator('[data-testid="storage-option"]')
  await storageOptions.nth(0).click()

  const colorOptions = page.getByTestId('color-options-list').locator('button')
  await colorOptions.nth(0).click()

  await expect(addToCartBtn).toBeEnabled()
  await addToCartBtn.click()

  await page.waitForURL('**/cart')

  const cartList = page.getByTestId('cart-list')
  await expect(cartList).toBeVisible()
  const cartItem = cartList.locator('.cart-item')
  await expect(cartItem).toHaveCount(1)
  const cartItemTitle = cartItem.nth(0).locator('.cart-info-title')
  const cartItemTitleText = await cartItemTitle.textContent()
  expect(cartItemTitleText).toContain('SMG-S24U')
  await expect(page.getByTestId('cart-count')).toHaveText('1')
})
