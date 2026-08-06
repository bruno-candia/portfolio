import { test, expect } from '@playwright/test';

test.describe('Internationalization (i18n)', () => {
  test('should switch language from EN to PT', async ({ page, isMobile }) => {
    await page.goto('/');

    await page
      .getByRole('button', { name: /Recusar opcionais|Reject optional/i })
      .click();

    await expect(page.getByText("Hi! I'm Bruno").first()).toBeVisible();

    if (isMobile) {
      await page.getByRole('button', { name: /Open menu|Abrir menu/i }).click();

      await page.getByRole('link', { name: /Portuguese|Português/i }).click();
    } else {
      await page.getByRole('link', { name: 'pt', exact: true }).click();
    }

    await expect(page.getByText('Olá! Eu sou Bruno').first()).toBeVisible();

    await expect(page).toHaveURL(/\/pt/);
  });
});
