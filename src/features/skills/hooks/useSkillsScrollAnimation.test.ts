import { renderHook, act } from '@testing-library/react';
import { useSkillsScrollAnimation } from './useSkillsScrollAnimation';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SkillCategory } from '../data/skills';

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    context: vi.fn((cb) => {
      cb();
      return {
        add: vi.fn(),
        revert: vi.fn(),
      };
    }),
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn(),
  },
}));

describe('useSkillsScrollAnimation', () => {
  const mockContainerRef = { current: document.createElement('div') };
  const mockCategories: SkillCategory[] = [
    {
      id: 'frontend',
      image: '/img.png',
      defaultLanguage: 'ts',
      defaultIcon: () => null,
      defaultCode: 'code',
      defaultColor: '#000',
      stacks: [
        {
          id: 'react',
          icon: () => null,
        },
      ],
    },
    {
      id: 'backend',
      image: '/img.png',
      defaultLanguage: 'ts',
      defaultIcon: () => null,
      defaultCode: 'code',
      defaultColor: '#000',
      stacks: [],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with the first category active', () => {
    const { result } = renderHook(() =>
      useSkillsScrollAnimation({
        categories: mockCategories,
        containerRef: mockContainerRef,
      })
    );

    expect(result.current.activeCategory).toBe('frontend');
    expect(result.current.activeCategoryData).toEqual(mockCategories[0]);
    expect(result.current.selectedTech).toBeNull();
  });

  it('should update selected tech when handleTechClick is called', () => {
    const { result } = renderHook(() =>
      useSkillsScrollAnimation({
        categories: mockCategories,
        containerRef: mockContainerRef,
      })
    );

    const techToSelect = mockCategories[0].stacks[0];

    act(() => {
      result.current.handleTechClick(techToSelect);
    });

    expect(result.current.selectedTech).toEqual(techToSelect);
  });
});
