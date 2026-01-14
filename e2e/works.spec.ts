import { test, expect } from '@playwright/test';

test.describe('Works Section', () => {
  test('should open and close project details modal', async ({ page }) => {
    await page.goto('/');

    const projectCard = page.getByText('Aurem', { exact: true }).first();

    await projectCard.scrollIntoViewIfNeeded();
    await expect(projectCard).toBeVisible();

    await projectCard.click();

    const modalTitle = page.getByRole('heading', { name: 'Aurem', level: 2 });
    await expect(modalTitle).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(modalTitle).not.toBeVisible();
  });
});
