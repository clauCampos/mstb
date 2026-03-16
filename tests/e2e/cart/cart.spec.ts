import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/cart')
})

test('Cart flow: empty cart, add product, cart updates', async ({ page }) => {
  const cartList = page.getByTestId('cart-list')
  await expect(cartList).toBeAttached()
  await expect(cartList.getByTestId('cart-item')).toHaveCount(0)

  const cartCount = page.getByTestId('cart-title')
  await expect(cartCount).toHaveText(/Cart \(0\)/)

  const continueBtn = page.getByTestId('continue-shopping-btn')
  await continueBtn.click()
  await page.waitForURL('**/products')
  await page.waitForSelector('[data-testid="product-card-link"]')
  const productCardLink = page.getByTestId('product-card-link').first()
  await expect(productCardLink).toBeVisible()
  await productCardLink.click()
  await page.waitForURL(/\/products\/[^/]+/)

  const storageOption = page.getByTestId('storage-option').first()
  await expect(storageOption).toBeVisible()
  await storageOption.click()

  await page.waitForTimeout(100)

  const colorOption = page.getByTestId('color-option').first()
  await expect(colorOption).toBeVisible()
  await colorOption.click()

  await page.waitForTimeout(100)

  const addToCartBtn = page.getByTestId('add-to-cart-btn')
  await expect(addToCartBtn).toBeEnabled()
  await addToCartBtn.click()
  await page.waitForURL('**/cart')

  await expect(cartCount).toHaveText(/Cart \(1\)/)
  await expect(cartList).toBeVisible()
  await expect(cartList.getByTestId('cart-item')).toHaveCount(1)

  const cartItemTitle = cartList.getByTestId('cart-info-title').first()
  const cartItemTitleText = await cartItemTitle.textContent()
  expect(cartItemTitleText).not.toBeNull()
  expect(cartItemTitleText).toContain('SMG-S24U')

  const totalPrice = page.getByTestId('total-price')
  await expect(totalPrice).toHaveText('1329 Eur')
})

test('Cart flow: add two products, total-price updates', async ({ page }) => {
  await page.goto('/cart')

  const continueBtn = page.getByTestId('continue-shopping-btn')
  await continueBtn.click()
  await page.waitForURL('**/products')

  const productCardLink1 = page.getByTestId('product-card-link').first()
  await expect(productCardLink1).toBeVisible()
  await productCardLink1.click()
  await page.waitForURL(/\/products\/[^/]+/)

  const storageOption1 = page.getByTestId('storage-option').first()
  await expect(storageOption1).toBeVisible()
  await storageOption1.click()
  await page.waitForTimeout(100)

  const colorOption1 = page.getByTestId('color-option').first()
  await expect(colorOption1).toBeVisible()
  await colorOption1.click()
  await page.waitForTimeout(100)

  const addToCartBtn1 = page.getByTestId('add-to-cart-btn')
  await expect(addToCartBtn1).toBeEnabled()
  await addToCartBtn1.click()
  await page.waitForURL('**/cart')

  const continueBtn2 = page.getByTestId('continue-shopping-btn')
  await continueBtn2.click()
  await page.waitForURL('**/products')

  const productCardLink2 = page.getByTestId('product-card-link').nth(1)
  await productCardLink2.click()
  await page.waitForURL(/\/products\/[^/]+/)

  const storageOption2 = page.getByTestId('storage-option').first()
  await storageOption2.click()

  const colorOption2 = page.getByTestId('color-option').first()
  await colorOption2.click()

  const addToCartBtn2 = page.getByTestId('add-to-cart-btn')
  await expect(addToCartBtn2).toBeEnabled()
  await addToCartBtn2.click()
  await page.waitForURL('**/cart')

  const cartList = page.getByTestId('cart-list')
  await expect(cartList.getByTestId('cart-item')).toHaveCount(2)

  const totalPrice = page.getByTestId('total-price')
  await expect(totalPrice).toHaveText('1568 Eur')
})

test('Cart and header remove flow', async ({ page }) => {
  await page.goto('/cart')

  const continueBtn = page.getByTestId('continue-shopping-btn')
  await continueBtn.click()
  await page.waitForURL('**/products')

  const productCardLink = page.getByTestId('product-card-link').first()
  await expect(productCardLink).toBeVisible()
  await productCardLink.click()
  await page.waitForURL(/\/products\/[^/]+/)

  const storageOption = page.getByTestId('storage-option').first()
  await expect(storageOption).toBeVisible()
  await storageOption.click()
  await page.waitForTimeout(100)

  const colorOption = page.getByTestId('color-option').first()
  await expect(colorOption).toBeVisible()
  await colorOption.click()
  await page.waitForTimeout(100)

  const addToCartBtn = page.getByTestId('add-to-cart-btn')
  await expect(addToCartBtn).toBeEnabled()
  await addToCartBtn.click()
  await page.waitForURL('**/cart')

  const cartTitle = page.getByTestId('cart-title')
  await expect(cartTitle).toHaveText(/Cart \(1\)/)
  const cartCount = page.getByTestId('cart-count')
  await expect(cartCount).toHaveText('1')

  const removeBtn = page.getByTestId('cart-remove-btn-0')
  await removeBtn.click()

  const cartList = page.getByTestId('cart-list')
  await expect(cartList.getByTestId('cart-item')).toHaveCount(0)

  await expect(cartTitle).toHaveText(/Cart \(0\)/)
  await expect(cartCount).toHaveText('0')
})
