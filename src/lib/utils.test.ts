import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('merges basic classes correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    expect(cn('class1', true && 'class2', false && 'class3')).toBe('class1 class2');
  });

  it('handles arrays and objects', () => {
    expect(cn(['class1', 'class2'], { class3: true, class4: false })).toBe('class1 class2 class3');
  });

  it('merges tailwind classes and resolves conflicts correctly', () => {
    // Both px-2 and p-4 add padding. p-4 comes later, so it should override px-2.
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
  });

  it('handles arbitrary values correctly', () => {
    expect(cn('text-[14px]', 'text-[16px]')).toBe('text-[16px]');
  });

  it('handles falsy values gracefully', () => {
    expect(cn('class1', null, undefined, '', 0, false)).toBe('class1');
  });
});
