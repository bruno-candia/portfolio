import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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
});
