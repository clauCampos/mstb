import axe from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

async function scanPageAccessibility(page: Page) {
  return await new axe({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()
}

test.describe('Accessibility', () => {
  test('Products page should have no detectable a11y violations', async ({
    page,
  }) => {
    await page.goto('/products')
    const results = await scanPageAccessibility(page)
    expect(results.violations).toEqual([])
  })

  test('Products info page should have no detectable a11y violations', async ({
    page,
  }) => {
    await page.goto('/products/SMG-S24U')
    const results = await scanPageAccessibility(page)
    expect(results.violations).toEqual([])
  })

  test('Cart page should have no detectable a11y violations', async ({
    page,
  }) => {
    await page.goto('/cart')
    const results = await new axe({ page }).analyze()
    expect(results.violations).toEqual([])
  })
})
