import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/products')
})

test('ProductsList renders 23 products', async ({ page }) => {
  await expect(page.getByTestId('product-card-link')).toHaveCount(23, {
    timeout: 10000,
  })
})

test('Products list and results count updates when searching for a product', async ({
  page,
}) => {
  await expect(page.getByTestId('product-card-link')).toHaveCount(23, {
    timeout: 10000,
  })

  await page.getByTestId('search-input').fill('iPhone')

  await expect(page.getByTestId('product-card-link')).not.toHaveCount(23)

  const filteredCards = await page.getByTestId('product-card-link').all()
  expect(filteredCards.length).toEqual(2)

  await expect(page.getByTestId('results-count')).toHaveText('2 results')
})

test('Products list resets after clearing search input', async ({ page }) => {
  await expect(page.getByTestId('product-card-link')).toHaveCount(23, {
    timeout: 10000,
  })

  await page.getByTestId('search-input').fill('iPhone')
  await expect(page.getByTestId('product-card-link')).not.toHaveCount(23)

  await page.getByTestId('clear-input-button').click()

  await expect(page.getByTestId('product-card-link')).toHaveCount(23, {
    timeout: 10000,
  })

  await expect(page.getByTestId('search-input')).toHaveValue('')
})

test('Filter modal appears and shows not implemented message after selecting a color', async ({
  page,
}) => {
  await expect(page.getByTestId('product-card-link')).toHaveCount(23, {
    timeout: 10000,
  })

  await page.getByTestId('filter-button').click()

  await expect(page.getByTestId('color-options-list')).toBeVisible()

  const colorButtons = await page.getByTestId('color-option').all()
  await colorButtons[0].click()

  await expect(page.getByTestId('modal-overlay')).toBeVisible()
  await expect(page.getByTestId('modal-content')).toContainText(
    'Filtering feature not implemented yet!'
  )
})

test('Selecting a color updates color name and filter count after closing modal', async ({
  page,
}) => {
  await expect(page.getByTestId('product-card-link')).toHaveCount(23, {
    timeout: 10000,
  })

  await page.getByTestId('filter-button').click()

  await expect(page.getByTestId('color-options-list')).toBeVisible()

  const colorButtons = await page
    .getByTestId('color-options-list')
    .locator('button')
  const firstColorBtn = colorButtons.first()
  await firstColorBtn.click()

  await expect(page.getByTestId('modal-overlay')).toBeVisible()

  await page.getByTestId('modal-close').click()

  await page.locator('.filters-list-close-btn').click()

  await expect(page.getByTestId('selected-color-count')).toBeVisible({
    timeout: 10000,
  })

  await expect(page.getByTestId('selected-color-count')).toHaveText('(1)', {
    timeout: 10000,
  })
})

test('Clicking first product card link redirects to correct product detail page', async ({
  page,
}) => {
  await expect(page.getByTestId('product-card-link')).toHaveCount(23, {
    timeout: 10000,
  })

  const firstCard = page.getByTestId('product-card-link').first()
  const href = await firstCard.getAttribute('href')
  const idMatch = href && href.match(/\/products\/(.+)$/)
  const productId = idMatch ? idMatch[1] : null
  expect(productId).not.toBeNull()

  await firstCard.click()

  await expect(page).toHaveURL(`/products/${productId}`)
})
