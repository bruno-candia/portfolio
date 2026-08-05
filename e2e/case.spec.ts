import { test, expect } from '@playwright/test';

test.describe('Case page', () => {
  test('a card leads to its case and the case leads back', async ({ page }) => {
    await page.goto('/pt');
    await page
      .getByRole('button', { name: /Recusar opcionais|Reject optional/i })
      .click();

    await page
      .locator('#works')
      .getByRole('link', { name: /Ver case/i })
      .first()
      .click();

    await expect(page).toHaveURL(/\/pt\/projetos\/aurem$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Aurem');

    await page.getByRole('link', { name: 'Projetos', exact: true }).click();
    await expect(page).toHaveURL(/\/pt(#works)?$/);
  });

  test('an unknown slug is a 404', async ({ page }) => {
    const response = await page.goto('/pt/projetos/does-not-exist');

    expect(response?.status()).toBe(404);
  });

  test('a secondary project has no case', async ({ page }) => {
    const response = await page.goto('/pt/projetos/wind-energy');

    expect(response?.status()).toBe(404);
  });

  test('the case is readable in English too', async ({ page }) => {
    await page.goto('/en/projetos/maincore');
    await page.getByRole('button', { name: /Reject optional/i }).click();

    await expect(
      page.getByRole('heading', { name: 'The problem', level: 2 })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Technical decisions', level: 2 })
    ).toBeVisible();
  });
});
