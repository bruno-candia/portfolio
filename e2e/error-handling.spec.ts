import { test, expect } from '@playwright/test';

test.describe('Error Handling (404)', () => {
  test('should display custom 404 page for non-existent routes', async ({
    page,
  }) => {
    await page.goto('/unknown-dimension-xyz');

    const heading = page.locator('h1', { hasText: '404' });
    await expect(heading).toBeVisible();

    await expect(page.getByText('System Failure')).toBeVisible();

    const returnBtn = page.getByRole('link', { name: /Return to Base/i });
    await expect(returnBtn).toBeVisible();

    await returnBtn.click();
    await expect(page).toHaveURL(/\/en$/);
  });
});
