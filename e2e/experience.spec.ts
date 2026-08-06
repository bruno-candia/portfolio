import { test, expect } from '@playwright/test';

import { getWork } from '@/lib/resume';

const jobs = getWork('pt');
const companies = [...new Set(jobs.map((job) => job.company))];

test.describe('Career timeline', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pt');
    await page
      .getByRole('button', { name: /Recusar opcionais|Reject optional/i })
      .click();
    await page
      .locator('main section#experience:visible')
      .last()
      .scrollIntoViewIfNeeded();
  });

  test('draws one branch per company, with a commit per role', async ({
    page,
  }) => {
    const branches = page.locator('main #experience [data-branch]');
    const commits = page.locator('main #experience .graph-node');

    // Counted off the résumé: a role added there must not need a test edited.
    await expect(branches).toHaveCount(companies.length);
    await expect(commits).toHaveCount(jobs.length);
    await expect(branches.first()).toHaveAttribute(
      'data-jobs',
      jobs
        .filter((job) => job.company === jobs[0].company)
        .map((job) => job.id)
        .join(' ')
    );
  });

  test('lists the jobs newest first', async ({ page }) => {
    const headings = page
      .locator('main #experience li[data-entry] h3')
      .filter({ hasText: /./ });

    await expect(headings).toHaveText(jobs.map((job) => job.company));
  });

  // It grew every time the section shrank: the measurement counted the SVG it
  // had just sized, so the branches hung past the footer until a reload.
  test('the graph follows the section back down', async ({ page }) => {
    const size = () =>
      page.evaluate(() => {
        const figure = document.querySelector('.graph-figure')!;
        const svg = figure.querySelector('svg')!;
        return {
          figure: Math.round(figure.getBoundingClientRect().height),
          svg: Number(svg.getAttribute('height')),
        };
      });

    const scale = (value: string) =>
      page.evaluate((next) => {
        document.documentElement.dataset.textScale = next;
        window.dispatchEvent(
          new CustomEvent('accessibility-preferences-change')
        );
      }, value);

    const start = await size();
    expect(start.svg).toBe(start.figure);

    await scale('200');
    await expect
      .poll(async () => (await size()).svg)
      .toBeGreaterThan(start.svg);

    await scale('100');
    await expect.poll(async () => (await size()).svg).toBe(start.svg);
    expect((await size()).figure).toBe(start.figure);
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
    isMobile,
  }) => {
    for (let step = 0; step < 12; step += 1) {
      if (isMobile) {
        await page.evaluate(() => window.scrollBy(0, 240));
      } else {
        await page.mouse.wheel(0, 240);
      }
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
    await page
      .locator('main section#experience:visible')
      .last()
      .scrollIntoViewIfNeeded();

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
