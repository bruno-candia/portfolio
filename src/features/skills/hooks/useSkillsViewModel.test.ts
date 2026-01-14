import { renderHook, act } from '@testing-library/react';
import { useSkillsViewModel } from './useSkillsViewModel';
import { describe, it, expect } from 'vitest';
import { skillsData } from '../data/skills';

describe('useSkillsViewModel', () => {
  it('should return initial state correctly', () => {
    const { result } = renderHook(() => useSkillsViewModel());

    expect(result.current.categories).toEqual(skillsData);
    expect(result.current.activeCategory).toBe('frontend');
    expect(result.current.activeCategoryData?.id).toBe('frontend');
  });

  it('should update active category', () => {
    const { result } = renderHook(() => useSkillsViewModel());

    const nextCategory = skillsData[1].id;

    act(() => {
      result.current.handleCategoryClick(nextCategory);
    });

    expect(result.current.activeCategory).toBe(nextCategory);
    expect(result.current.activeCategoryData?.id).toBe(nextCategory);
  });
});
