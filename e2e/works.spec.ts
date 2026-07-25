import { test, expect } from '@playwright/test';

test.describe('Works Section', () => {
  test('should open and close project details modal', async ({ page }) => {
    await page.goto('/');

    await page
      .getByRole('button', { name: /Recusar opcionais|Reject optional/i })
      .click();

    const worksSection = page.locator('#works');
    const projectImage = worksSection.getByRole('img', { name: 'Aurem' });
    const projectCard = worksSection
      .getByRole('button', { name: /Aurem/i })
      .first();

    await expect(projectImage).toBeVisible();
    await projectCard.click();

    const modalTitle = page.getByRole('heading', { name: 'Aurem', level: 2 });
    await expect(modalTitle).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(modalTitle).not.toBeVisible();
  });
});
