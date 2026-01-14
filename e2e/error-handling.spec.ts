import { test, expect } from '@playwright/test';

test.describe('Error Handling (404)', () => {
  test('should display custom 404 page for non-existent routes', async ({
    page,
  }) => {
    // 1. Navigate to a random bad URL
    // Note: Next.js dev server sometimes shows an overlay error first in development, but 404 should render.
    // In production build it works perfectly. In dev, we might see the 404 page underneath or processed.
    // We navigate to a path that definitely doesn't exist.
    await page.goto('/unknown-dimension-xyz');

    // 2. Verify glitched 404 text
    const heading = page.locator('h1', { hasText: '404' });
    await expect(heading).toBeVisible();

    // 3. Verify message
    await expect(page.getByText('System Failure')).toBeVisible();

    // 4. Verify Return Button
    const returnBtn = page.getByRole('link', { name: /Return to Base/i });
    await expect(returnBtn).toBeVisible();

    // 5. Navigate back
    await returnBtn.click();
    await expect(page).toHaveURL(/\/en$/);
  });
});
