import { test, expect } from '@playwright/test';

async function dismissConsent(page: import('@playwright/test').Page) {
  const reject = page.getByRole('button', {
    name: /Recusar opcionais|Reject optional/i,
  });

  await reject.click();
  await expect(reject).toBeHidden();
}

test.describe('Home Page', () => {
  test('should display correct title and meta tags', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Bruno Costa/);

    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Full-stack/i);
  });

  test('should navigate to skills section', async ({ page, isMobile }) => {
    await page.goto('/');

    await page
      .getByRole('button', { name: /Recusar opcionais|Reject optional/i })
      .click();

    const menuToggle = page.locator('label[for="menu-toggle"]').first();
    if (await menuToggle.isVisible()) {
      await menuToggle.click();

      await expect(page.locator('#menu-toggle')).toBeChecked();
      await expect(page.locator('aside')).toHaveCSS(
        'transform',
        /^(none|matrix\(1, 0, 0, 1, 0, 0\))$/
      );
    }

    const skillsLink = page.locator('a[href="#skills"]:visible').first();
    await expect(skillsLink).toBeVisible();

    if (isMobile) {
      await skillsLink.evaluate((link: HTMLElement) => link.click());
    } else {
      await skillsLink.click();
    }

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
      '/bruno-candia-full-stack-resume.pdf'
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

  test('renders the approved about and contact copy', async ({ page }) => {
    await page.goto('/pt');
    await dismissConsent(page);
    const about = page.locator('main section#about:visible').last();
    const footer = page.locator('main footer#contact:visible').last();

    await expect(about).toContainText('Eu sou Bruno Costa.');
    await expect(about).toContainText(
      'Costumo desenhar, inventar e desmontar coisas. Às vezes monto de volta.'
    );
    await expect(footer).toContainText('Aberto para conversar.');
    await expect(footer).toContainText('Feito com ♥️ por Bruno');
  });

  test('uses resume contact data without restoring Instagram', async ({
    page,
  }) => {
    await page.goto('/pt');
    await dismissConsent(page);
    const footer = page.locator('main footer#contact:visible').last();

    await expect(footer.locator('a[href^="mailto:"]')).toHaveAttribute(
      'href',
      'mailto:me@brunocandia.com'
    );
    await expect(footer.locator('a[aria-label="LinkedIn"]')).toHaveAttribute(
      'rel',
      'noopener noreferrer'
    );
    await expect(footer.locator('a[aria-label="GitHub"]')).toHaveCount(1);
    await expect(footer.locator('a[aria-label="Behance"]')).toHaveCount(1);
    await expect(footer.locator('a[href*="instagram"]')).toHaveCount(0);
  });

  test('keeps the approved section geometry', async ({ page, isMobile }) => {
    await page.setViewportSize(
      isMobile ? { width: 390, height: 844 } : { width: 1440, height: 900 }
    );
    await page.goto('/pt');
    await dismissConsent(page);

    const about = page.locator('main section#about:visible').last();
    const footer = page.locator('main footer#contact:visible').last();
    await expect(about).toBeVisible();
    await expect(footer).toBeVisible();
    const aboutBox = await about.boundingBox();
    const eyeBox = await about.locator('[data-about-eye]').boundingBox();
    const footerBox = await footer.boundingBox();
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);

    expect(aboutBox?.height).toBe(isMobile ? 640 : 820);
    expect(footerBox?.height).toBe(isMobile ? 700 : 580);
    expect(eyeBox?.width).toBe(isMobile ? 224 : 300);
    expect(bodyWidth).toBe(isMobile ? 390 : 1440);
  });

  test('moves the eye with pointer intent and holds the fixation', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/pt');
    await dismissConsent(page);
    const section = page.locator('main section#about:visible').last();
    const eye = section.locator('[data-about-eye]');
    const pupil = section.locator('[data-about-pupil]');
    await section.scrollIntoViewIfNeeded();
    await expect(eye).toHaveAttribute('data-motion-ready', 'true');
    const initial = await pupil.evaluate(
      (element) => getComputedStyle(element).transform
    );
    const bounds = await section.boundingBox();
    expect(bounds).not.toBeNull();

    const x = bounds!.x + bounds!.width * 0.78;
    const y = bounds!.y + Math.min(bounds!.height * 0.42, 500);
    if (isMobile) await page.touchscreen.tap(x, y);
    else await page.mouse.move(x, y);

    await expect
      .poll(() =>
        pupil.evaluate((element) => getComputedStyle(element).transform)
      )
      .not.toBe(initial);
    await page.waitForTimeout(700);
    const settled = await pupil.evaluate(
      (element) => getComputedStyle(element).transform
    );
    await page.waitForTimeout(500);
    await expect(pupil).toHaveCSS('transform', settled);
  });

  test('centers the eye when reduced motion is requested', async ({
    page,
    isMobile,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/pt');
    await dismissConsent(page);
    const section = page.locator('main section#about:visible').last();
    const eye = section.locator('[data-about-eye]');
    const pupil = section.locator('[data-about-pupil]');
    await section.scrollIntoViewIfNeeded();
    await expect(eye).toHaveAttribute('data-motion-ready', 'true');
    const initial = await pupil.evaluate(
      (element) => getComputedStyle(element).transform
    );
    const bounds = await section.boundingBox();
    expect(bounds).not.toBeNull();

    const x = bounds!.x + bounds!.width * 0.78;
    const y = bounds!.y + Math.min(bounds!.height * 0.42, 500);
    if (isMobile) await page.touchscreen.tap(x, y);
    else await page.mouse.move(x, y);

    await page.waitForTimeout(250);
    await expect(pupil).toHaveCSS('transform', initial);
  });

  test('does not render forbidden punctuation in about or footer', async ({
    page,
  }) => {
    await page.goto('/pt');
    await dismissConsent(page);

    const about = page.locator('main section#about:visible').last();
    const footer = page.locator('main footer#contact:visible').last();
    const copy = `${await about.innerText()}\n${await footer.innerText()}`;
    expect(copy).not.toMatch(/[—;]/);
  });
});
