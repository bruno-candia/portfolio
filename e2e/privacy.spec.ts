import { expect, test } from '@playwright/test';

test.describe('Privacy consent', () => {
  test('does not send analytics after rejection', async ({ page }) => {
    const analyticsRequests: string[] = [];
    page.on('request', (request) => {
      if (request.url().includes('/api/events')) {
        analyticsRequests.push(request.url());
      }
    });

    await page.goto('/');
    await expect(
      page.getByRole('heading', {
        name: /Privacidade e dados|Privacy and data/i,
      })
    ).toBeVisible();
    expect(analyticsRequests).toHaveLength(0);

    await page
      .getByRole('button', { name: /Recusar opcionais|Reject optional/i })
      .click();
    await page.waitForTimeout(100);

    expect(analyticsRequests).toHaveLength(0);
  });

  test('sends a page view only after analytics consent', async ({ page }) => {
    const eventRequest = page.waitForRequest((request) =>
      request.url().includes('/api/events')
    );

    await page.goto('/');
    await page
      .getByRole('button', { name: /Aceitar opcionais|Accept optional/i })
      .click();

    const request = await eventRequest;
    const body = request.postDataJSON();
    expect(body.name).toBe('page_view');
    expect(body.params.path).toMatch(/^\/(pt|en)/);
    expect(body.params).not.toHaveProperty('email');
  });

  test('allows preferences to be reopened from the footer', async ({
    page,
  }) => {
    await page.goto('/');
    await page
      .getByRole('button', { name: /Recusar opcionais|Reject optional/i })
      .click();

    await page
      .getByRole('button', {
        name: /Configurações de privacidade|Privacy settings/i,
      })
      .click();

    await expect(
      page.getByRole('heading', {
        name: /Privacidade e dados|Privacy and data/i,
      })
    ).toBeVisible();
  });
});
