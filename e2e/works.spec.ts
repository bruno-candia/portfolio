import { test, expect } from '@playwright/test';

test.describe('Works Section', () => {
  test('should open and close project details modal', async ({ page }) => {
    await page.goto('/');

    await page
      .getByRole('button', { name: /Recusar opcionais|Reject optional/i })
      .click();

    const projectImage = page
      .locator('#works')
      .getByRole('img', { name: 'Aurem' });
    const projectCard = projectImage.locator(
      'xpath=ancestor::div[contains(@class, "group")][1]'
    );

    await expect(projectImage).toBeVisible();

    await projectCard.click({ position: { x: 10, y: 10 } });

    const modalTitle = page.getByRole('heading', { name: 'Aurem', level: 2 });
    await expect(modalTitle).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(modalTitle).not.toBeVisible();
  });
});
