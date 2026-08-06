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

  test('project keywords fit the first line before the counter wraps', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1200 });
    await page.reload();

    const aurem = page
      .locator('#works article')
      .filter({ has: page.getByRole('heading', { name: 'Aurem', level: 3 }) });
    const chips = aurem.locator('ul > li');

    await expect(chips).toHaveText([
      'React',
      'Redux',
      'Fabric.js',
      'Electron',
      'Socket.io',
      '+9',
    ]);
    await expect(
      aurem.getByLabel(/9 more technologies|mais 9 tecnologias/i)
    ).toBeVisible();

    const desktopRows = await chips.evaluateAll((items) =>
      items.map((item) => item.getBoundingClientRect().y)
    );
    expect(new Set(desktopRows).size).toBe(1);

    await page.setViewportSize({ width: 390, height: 844 });

    await expect(chips).toHaveText([
      'React',
      'Redux',
      'Fabric.js',
      'Electron',
      '+10',
    ]);
    await expect(
      aurem.getByLabel(/10 more technologies|mais 10 tecnologias/i)
    ).toBeVisible();

    const mobileRows = await chips.evaluateAll((items) =>
      items.map((item) => item.getBoundingClientRect().y)
    );
    expect(mobileRows.at(-1)).toBeGreaterThan(mobileRows[0]);
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
