import { test, expect } from '@playwright/test';

test.describe('Career timeline', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pt');
    await page
      .getByRole('button', { name: /Recusar opcionais|Reject optional/i })
      .click();
    await page.locator('main #experience').scrollIntoViewIfNeeded();
  });

  test('draws one branch per company, with a commit per role', async ({
    page,
  }) => {
    const branches = page.locator('main #experience [data-branch]');
    const commits = page.locator('main #experience .graph-node');

    await expect(branches).toHaveCount(4);
    await expect(commits).toHaveCount(5);
    await expect(branches.first()).toHaveAttribute(
      'data-jobs',
      'bees-tech-lead bees-senior'
    );
  });

  test('lists the jobs newest first', async ({ page }) => {
    const headings = page
      .locator('main #experience li[data-entry] h3')
      .filter({ hasText: /./ });

    await expect(headings).toHaveText([
      'BEES (AB InBev)',
      'BEES (AB InBev)',
      'Aurem',
      'Verzel',
      'Neoenergia',
    ]);
  });

  test('the graph is decoration, not information', async ({ page }) => {
    const figure = page.locator(
      'main #experience .graph-figure > [aria-hidden]'
    );

    await expect(figure).toHaveCount(1);
    await expect(page.locator('main #experience svg')).toBeAttached();
  });

  test('the job that has a case links to it', async ({ page }) => {
    const link = page
      .locator('li[data-entry="aurem"]')
      .getByRole('link', { name: /ver o case/i });

    await expect(link).toHaveAttribute('href', '/pt/projetos/aurem');
  });

  test('every branch is drawn once its entry has been seen', async ({
    page,
  }) => {
    for (let step = 0; step < 12; step += 1) {
      await page.mouse.wheel(0, 240);
      await page.waitForTimeout(80);
    }
    await page.waitForTimeout(700);

    const drawn = await page
      .locator('main #experience [data-branch]')
      .evaluateAll((groups) =>
        groups.map((group) => group.getAttribute('data-drawn'))
      );

    // Four branches, not five: the two BEES roles ride the same one.
    expect(drawn).toEqual(['true', 'true', 'true', 'true']);
  });
});

test.describe('Career timeline without motion', () => {
  test('renders the graph already drawn', async ({ page }) => {
    // Emulated on the page rather than through `test.use`, which does not
    // reach the context when it is declared inside a describe block.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/pt');
    await page
      .getByRole('button', { name: /Recusar opcionais|Reject optional/i })
      .click();
    await page.locator('main #experience').scrollIntoViewIfNeeded();

    const branches = page.locator('main #experience .graph-branch');
    await expect(branches.first()).toBeAttached();

    // Polled rather than slept on: the graph is measured from the rendered
    // list, so it appears a frame after the section does.
    await expect
      .poll(
        () =>
          branches.evaluateAll(
            (paths) =>
              paths.length > 0 &&
              paths.every(
                (path) => getComputedStyle(path).strokeDashoffset === '0px'
              )
          ),
        { timeout: 15_000 }
      )
      .toBe(true);
  });
});
