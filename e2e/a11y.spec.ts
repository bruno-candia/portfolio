import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const dismissConsent = async (page: import('@playwright/test').Page) => {
  const reject = page.getByRole('button', {
    name: /Recusar opcionais|Reject optional/i,
  });
  await reject.waitFor({ state: 'visible', timeout: 1500 }).catch(() => {});
  if (await reject.isVisible()) await reject.click();
};

const openPreferences = async (
  page: import('@playwright/test').Page,
  isMobile: boolean
) => {
  if (isMobile) {
    await page.getByRole('button', { name: /Abrir menu|Open menu/i }).click();
    await page
      .getByRole('button', { name: /Acessibilidade|Accessibility/i })
      .click();
  } else {
    await page
      .getByRole('button', {
        name: /Abrir preferências de acessibilidade|Open accessibility preferences/i,
      })
      .click();
  }

  return page.getByRole('dialog', {
    name: /Preferências de acessibilidade|Accessibility preferences/i,
  });
};

test.describe('Accessibility (A11y)', () => {
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    await page.goto('/');

    await page.waitForLoadState('domcontentloaded');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .include('body')
      .exclude('.opacity-50')
      .exclude('#skills')
      .analyze();

    if (accessibilityScanResults.violations.length > 0) {
      console.log(
        'A11y Violations:',
        JSON.stringify(accessibilityScanResults.violations, null, 2)
      );
    }

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('accessibility preferences expose state, persist and restore focus', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/pt');
    await dismissConsent(page);

    const dialog = await openPreferences(page, isMobile);
    await expect(dialog).toBeVisible();

    await dialog.getByRole('radio', { name: '150%' }).check();
    await dialog.getByRole('radio', { name: 'Reduzido' }).check();
    await dialog.getByRole('radio', { name: 'Alternativa' }).check();
    await dialog.getByRole('radio', { name: 'Alto' }).check();

    await expect(page.locator('html')).toHaveAttribute(
      'data-text-scale',
      '150'
    );
    await expect(page.locator('html')).toHaveAttribute(
      'data-motion',
      'reduced'
    );
    await expect(page.locator('html')).toHaveAttribute(
      'data-reading-font',
      'alternative'
    );
    await expect(page.locator('html')).toHaveAttribute('data-contrast', 'high');

    const scan = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .include('[role="dialog"]')
      .analyze();
    expect(scan.violations).toEqual([]);

    await dialog.getByRole('button', { name: 'Concluir' }).click();
    await expect(dialog).toBeHidden();

    if (!isMobile) {
      await expect(
        page.getByRole('button', {
          name: 'Abrir preferências de acessibilidade',
        })
      ).toBeFocused();
    }

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute(
      'data-text-scale',
      '150'
    );
    await expect(page.locator('html')).toHaveAttribute(
      'data-motion',
      'reduced'
    );

    const reopened = await openPreferences(page, isMobile);
    await expect(reopened.getByRole('radio', { name: '150%' })).toBeChecked();
    await expect(
      reopened.getByRole('radio', { name: 'Reduzido' })
    ).toBeChecked();

    await reopened.getByRole('button', { name: 'Restaurar padrão' }).click();
    await expect(page.locator('html')).toHaveAttribute(
      'data-text-scale',
      '100'
    );
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'system');
  });

  test('the close control closes the dialog on both layouts', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/pt');
    await dismissConsent(page);

    const dialog = await openPreferences(page, isMobile);
    await dialog
      .getByRole('button', { name: 'Fechar preferências de acessibilidade' })
      .click();
    await expect(dialog).toBeHidden();
  });

  // The menu used to open under the consent banner, which swallowed the last
  // rows, accessibility among them.
  test('the menu opens over the consent banner', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'the menu only exists on the mobile layout');

    await page.goto('/pt');
    await page.getByRole('button', { name: /Abrir menu/i }).click();

    const row = page.getByRole('button', { name: /Acessibilidade/i });
    await expect(row).toBeVisible();
    await row.click();
    await expect(
      page.getByRole('dialog', { name: /Preferências de acessibilidade/i })
    ).toBeVisible();
  });

  test('the career graph stays inside its section', async ({ page }) => {
    await page.goto('/pt');
    await dismissConsent(page);
    await page.locator('#experience').scrollIntoViewIfNeeded();

    const overflow = await page.evaluate(() => {
      const figure = document.querySelector('.graph-figure') as HTMLElement;
      const bottom = figure.getBoundingClientRect().bottom;
      return [...figure.querySelectorAll<HTMLElement>('svg, span')].map((el) =>
        Math.round(el.getBoundingClientRect().bottom - bottom)
      );
    });
    expect(Math.max(...overflow)).toBeLessThanOrEqual(0);
  });

  test('200 percent text remains inside the viewport', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/pt');
    await dismissConsent(page);
    const dialog = await openPreferences(page, isMobile);
    await dialog.getByRole('radio', { name: '200%' }).check();
    await dialog.getByRole('button', { name: 'Concluir' }).click();

    const widths = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
    }));
    expect(widths.document).toBeLessThanOrEqual(widths.viewport);
  });
});
