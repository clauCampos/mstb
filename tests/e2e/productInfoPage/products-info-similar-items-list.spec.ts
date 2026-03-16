import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/products/SMG-S24U')
})

test('Similar items list displays correct ProductsCardLinks', async ({
  page,
}) => {
  await page.waitForSelector('[data-testid="similar-items-list"]')
  const similarItemsList = page.getByTestId('similar-items-list')
  await expect(similarItemsList).toBeVisible()

  const expectedIds = [
    'SMG-S24U',
    'XMI-R13C',
    'SMG-S23FE',
    'SNY-XPERIA1V',
    'SMG-A15',
    'SMG-A05S',
  ]

  const itemsLocator = page.locator(
    '[data-testid="similar-items-list"] .similar-items-list-item'
  )
  await expect(itemsLocator).toHaveCount(expectedIds.length)

  for (let i = 0; i < expectedIds.length; i++) {
    const cardLink = itemsLocator
      .nth(i)
      .locator('[data-testid="product-card-link"]')
    await expect(cardLink).toBeVisible()
  }
})
