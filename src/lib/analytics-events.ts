export interface AnalyticsEventMap {
  page_view: { path: string; locale: 'pt' | 'en' };
  navigate: { destination: string };
  download_cv: { locale: 'pt' | 'en' };
  click_social: { platform: 'linkedin' | 'github' | 'behance' };
  view_project: { project_id: string };
  click_project_link: {
    project_id: string;
    link_type: 'external_details';
  };
  select_skill_category: { category_id: string };
}

export type AnalyticsEventName = keyof AnalyticsEventMap;

export interface AnalyticsEnvelope<
  N extends AnalyticsEventName = AnalyticsEventName,
> {
  name: N;
  params: AnalyticsEventMap[N];
  clientId: string;
  sessionId: number;
}

export type AnyAnalyticsEnvelope = {
  [N in AnalyticsEventName]: AnalyticsEnvelope<N>;
}[AnalyticsEventName];

const destinations = new Set([
  'about',
  'skills',
  'works',
  'experience',
  'contact',
]);
const projects = new Set(['aurem', 'wind-energy', 'scaling-x', 'maincore']);
const categories = new Set([
  'frontend',
  'backend',
  'mobile',
  'arquitetura',
  'devops',
]);
const platforms = new Set(['linkedin', 'github', 'behance']);

function hasExactKeys(value: Record<string, unknown>, keys: string[]) {
  const actual = Object.keys(value).sort();
  return (
    actual.length === keys.length &&
    keys.sort().every((key, i) => key === actual[i])
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function isValidPath(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.length >= 1 &&
    value.length <= 100 &&
    value.startsWith('/') &&
    !value.includes('?') &&
    !value.includes('#') &&
    !value.includes('://')
  );
}

export function validateAnalyticsEnvelope(
  value: unknown
): AnyAnalyticsEnvelope | null {
  if (!isRecord(value)) return null;
  if (!hasExactKeys(value, ['name', 'params', 'clientId', 'sessionId'])) {
    return null;
  }
  if (
    typeof value.name !== 'string' ||
    typeof value.clientId !== 'string' ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value.clientId
    ) ||
    typeof value.sessionId !== 'number' ||
    !Number.isSafeInteger(value.sessionId) ||
    value.sessionId <= 0 ||
    !isRecord(value.params)
  ) {
    return null;
  }

  const params = value.params;
  let valid = false;
  switch (value.name) {
    case 'page_view':
      valid =
        hasExactKeys(params, ['path', 'locale']) &&
        isValidPath(params.path) &&
        (params.locale === 'pt' || params.locale === 'en');
      break;
    case 'navigate':
      valid =
        hasExactKeys(params, ['destination']) &&
        typeof params.destination === 'string' &&
        destinations.has(params.destination);
      break;
    case 'download_cv':
      valid =
        hasExactKeys(params, ['locale']) &&
        (params.locale === 'pt' || params.locale === 'en');
      break;
    case 'click_social':
      valid =
        hasExactKeys(params, ['platform']) &&
        typeof params.platform === 'string' &&
        platforms.has(params.platform);
      break;
    case 'view_project':
      valid =
        hasExactKeys(params, ['project_id']) &&
        typeof params.project_id === 'string' &&
        projects.has(params.project_id);
      break;
    case 'click_project_link':
      valid =
        hasExactKeys(params, ['project_id', 'link_type']) &&
        typeof params.project_id === 'string' &&
        projects.has(params.project_id) &&
        params.link_type === 'external_details';
      break;
    case 'select_skill_category':
      valid =
        hasExactKeys(params, ['category_id']) &&
        typeof params.category_id === 'string' &&
        categories.has(params.category_id);
      break;
  }

  return valid ? (value as unknown as AnyAnalyticsEnvelope) : null;
}
