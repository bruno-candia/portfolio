import { test, expect } from '@playwright/test';

test.describe('Internationalization (i18n)', () => {
  test('should switch language from EN to PT', async ({ page, isMobile }) => {
    await page.goto('/');

    await expect(page.getByText("Hi! I'm Bruno")).toBeVisible();

    if (isMobile) {
      const menuToggle = page.locator('label[for="menu-toggle"]').first();
      await menuToggle.click();

      await page.getByRole('link', { name: /Portuguese|Português/i }).click();
    } else {
      await page.getByRole('link', { name: 'pt', exact: true }).click();
    }

    await expect(page.getByText('Olá! Eu sou Bruno')).toBeVisible();

    await expect(page).toHaveURL(/\/pt/);
  });
});
