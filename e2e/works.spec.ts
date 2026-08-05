import { test, expect } from '@playwright/test';

test.describe('Works Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page
      .getByRole('button', { name: /Recusar opcionais|Reject optional/i })
      .click();
  });

  test('every project card links to its case with the keyboard', async ({
    page,
  }) => {
    const works = page.locator('#works');

    const caseLinks = works.getByRole('link', {
      name: /Ver case|Read the case/i,
    });
    await expect(caseLinks.first()).toBeVisible();

    const hrefs = await caseLinks.evaluateAll((links) =>
      links.map((link) => link.getAttribute('href'))
    );
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href).toMatch(/\/projetos\/[a-z0-9-]+$/);
    }
  });

  test('project titles are readable without hovering', async ({ page }) => {
    const works = page.locator('#works');

    await expect(
      works.getByRole('heading', { name: 'Aurem', level: 3 })
    ).toBeVisible();
  });

  test('secondary projects open their external link in a new tab', async ({
    page,
  }) => {
    const works = page.locator('#works');
    const link = works.getByRole('link', { name: /Wind Energy/i });

    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', /noopener/);
  });
});
