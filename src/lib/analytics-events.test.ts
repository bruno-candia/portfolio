import { describe, expect, it } from 'vitest';
import { validateAnalyticsEnvelope } from './analytics-events';

const base = {
  clientId: '5fb9a010-8d93-44de-a7d2-117f5ea7f001',
  sessionId: 1_720_000_000,
};

describe('analytics event contract', () => {
  it.each([
    ['page_view', { path: '/pt', locale: 'pt' }],
    ['navigate', { destination: 'skills' }],
    ['download_cv', { locale: 'en' }],
    ['click_social', { platform: 'github' }],
    ['view_project', { project_id: 'aurem' }],
    [
      'click_project_link',
      { project_id: 'maincore', link_type: 'external_details' },
    ],
    ['select_skill_category', { category_id: 'frontend' }],
  ])('accepts %s', (name, params) => {
    expect(validateAnalyticsEnvelope({ ...base, name, params })).not.toBeNull();
  });

  it.each([
    { ...base, name: 'unknown', params: {} },
    {
      ...base,
      name: 'page_view',
      params: { path: '/pt?email=person@example.com', locale: 'pt' },
    },
    {
      ...base,
      name: 'navigate',
      params: { destination: 'skills', email: 'person@example.com' },
    },
    {
      ...base,
      name: 'click_social',
      params: { platform: 'unknown-network' },
    },
    {
      ...base,
      name: 'view_project',
      params: { project_id: 'arbitrary-project' },
    },
    {
      ...base,
      name: 'page_view',
      params: { path: 'https://example.com/pt', locale: 'pt' },
    },
  ])('rejects invalid or excessive data', (event) => {
    expect(validateAnalyticsEnvelope(event)).toBeNull();
  });
});
