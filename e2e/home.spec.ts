import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display correct title and meta tags', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Bruno Costa/);

    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Full-stack/i);
  });

  test('should navigate to skills section', async ({ page }) => {
    await page.goto('/');

    const menuToggle = page.locator('label[for="menu-toggle"]').first();
    if (await menuToggle.isVisible()) {
      await menuToggle.click();
    }

    const skillsLink = page
      .getByRole('link', { name: /Habilidades|Skills/i })
      .first();
    await expect(skillsLink).toBeVisible();
    await skillsLink.click();

    await expect(page).toHaveURL(/#skills/);
  });

  test('should have CV download button with correct attributes', async ({
    page,
  }) => {
    await page.goto('/');

    const downloadButton = page.getByRole('link', {
      name: /Download CV|Baixar CV/i,
    });

    await expect(downloadButton).toBeVisible();
    await expect(downloadButton).toHaveAttribute(
      'href',
      '/brunocandia-cv-slim.pdf'
    );
    await expect(downloadButton).toHaveAttribute('download', '');
  });

  test('should have valid robots.txt', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.ok()).toBeTruthy();
    const text = await response.text();
    expect(text).toContain('User-Agent: *');
    expect(text).toContain('Allow: /');
  });

  test('should have valid sitemap.xml', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.ok()).toBeTruthy();
    const text = await response.text();
    expect(text).toContain('urlset');
    expect(text).toContain('https://brunocandia.com');
  });
});
