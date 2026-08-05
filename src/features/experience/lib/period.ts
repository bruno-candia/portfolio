import type { Locale, Work } from '@/lib/resume';

/** "fev 2024 a hoje", in the reader's language. */
export function formatPeriod(
  job: Work,
  locale: Locale,
  joiner: string,
  present: string
): string {
  const end = job.endDate ? monthYear(job.endDate, locale) : present;
  return `${monthYear(job.startDate, locale)} ${joiner} ${end}`;
}

/** The oldest start date on the page, which is where the trunk begins. */
export function firstLine(jobs: Work[], locale: Locale): string {
  const oldest = jobs
    .map((job) => job.startDate)
    .sort()
    .at(0);

  return oldest ? monthYear(oldest, locale) : '';
}

function monthYear(value: string, locale: Locale) {
  const [year, month] = value.split('-');
  const date = new Date(Number(year), Number(month ?? 1) - 1);
  const name = new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'en-US', {
    month: 'short',
  })
    .format(date)
    .replace('.', '');

  return `${name} ${year}`;
}
