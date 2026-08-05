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

    const menuToggle = page.getByRole('button', {
      name: /Abrir menu|Open menu/i,
    });
    if (await menuToggle.isVisible()) {
      await menuToggle.click();
      await expect(page.getByRole('dialog', { name: /Menu/i })).toBeVisible();
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

  test('draws the black hole separator between hero and about', async ({
    page,
    isMobile,
  }) => {
    await page.setViewportSize(
      isMobile ? { width: 390, height: 844 } : { width: 1440, height: 900 }
    );
    await page.goto('/pt');
    await dismissConsent(page);

    const canvas = page.locator('[data-black-hole]');
    await canvas.scrollIntoViewIfNeeded();
    await expect(canvas).toHaveAttribute('data-black-hole-ready', 'true');

    // The hole is centred on the fold and spans the screen, which is the whole
    // point of the band: a fixed height would drift from both at other sizes.
    const placement = await page.evaluate(() => {
      const band = document.querySelector('[data-black-hole]')!.parentElement!;
      const hero = document.querySelector('main section')!;
      const box = band.getBoundingClientRect();
      return {
        centre: Math.round(box.top + box.height / 2),
        heroBottom: Math.round(hero.getBoundingClientRect().bottom),
        ratio: +(box.height / box.width).toFixed(2),
      };
    });
    expect(placement.centre).toBe(placement.heroBottom);
    expect(placement.ratio).toBe(0.32);

    const drawnWidth = await canvas.evaluate((element: HTMLCanvasElement) => {
      const ctx = element.getContext('2d');
      const { data } = ctx!.getImageData(0, 0, element.width, element.height);
      let min = element.width;
      let max = 0;
      for (let y = 0; y < element.height; y += 2) {
        for (let x = 0; x < element.width; x += 2) {
          if (data[(y * element.width + x) * 4 + 3] > 8) {
            if (x < min) min = x;
            if (x > max) max = x;
          }
        }
      }
      return (max - min) / element.width;
    });
    expect(drawnWidth).toBeGreaterThan(0.85);

    // Reading the pixels, because an empty canvas has the right box too.
    const litPixels = () =>
      canvas.evaluate((element: HTMLCanvasElement) => {
        const ctx = element.getContext('2d');
        const { data } = ctx!.getImageData(0, 0, element.width, element.height);
        let lit = 0;
        for (let i = 3; i < data.length; i += 16) if (data[i] > 10) lit++;
        return lit;
      });

    expect(await litPixels()).toBeGreaterThan(0);
    const first = await litPixels();
    await page.waitForTimeout(600);
    expect(await litPixels()).not.toBe(first);
  });

  test('counts the stack a narrow card cannot show', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/pt');
    await dismissConsent(page);

    const card = page.locator('#skills article').first();
    const counter = card.getByRole('button', { name: /\+\d+ outras/ });
    const chips = card.locator('ul > li:visible');

    if (!isMobile) {
      await expect(counter).toBeHidden();
      return;
    }

    await expect(counter).toBeVisible();
    const collapsed = await chips.count();

    await counter.click();
    await expect(card.getByRole('button', { name: /menos/ })).toBeVisible();
    expect(await chips.count()).toBeGreaterThan(collapsed);
  });

  test('drops the separator when reduced motion is requested', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/pt');
    await dismissConsent(page);

    await expect(page.locator('[data-black-hole]')).toBeHidden();
  });

  test('drops the separator when the panel asks for reduced motion', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/pt');
    await dismissConsent(page);

    if (isMobile) {
      await page.getByRole('button', { name: /Abrir menu/i }).click();
      await page.getByRole('button', { name: /Acessibilidade/i }).click();
    } else {
      await page
        .getByRole('button', { name: /Abrir preferências de acessibilidade/i })
        .click();
    }

    const canvas = page.locator('[data-black-hole]');
    const dialog = page.getByRole('dialog', {
      name: /Preferências de acessibilidade/i,
    });
    await dialog.getByRole('radio', { name: 'Reduzido' }).check();
    await expect(canvas).toBeHidden();

    // And it comes back, with a canvas that was rebuilt at the right size.
    await dialog.getByRole('radio', { name: 'Sistema' }).check();
    await dialog.getByRole('button', { name: 'Concluir' }).click();
    await expect(canvas).toBeVisible();
    await expect
      .poll(() =>
        canvas.evaluate((element: HTMLCanvasElement) => element.width)
      )
      .toBeGreaterThan(0);
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
