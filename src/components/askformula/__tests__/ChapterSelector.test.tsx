import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ChapterSelector from '../ChapterSelector';
import type { Chapter } from '@/lib/formulas';

describe('ChapterSelector toggleAll edge cases', () => {
  const mockChapters: Chapter[] = [
    {
      id: 'ch1',
      name: 'Chapter 1',
      formulas: [{ id: 'f1', name: 'Formula 1', formula: 'E=mc^2', categoryId: 'cat1' }],
    },
    {
      id: 'ch2',
      name: 'Chapter 2',
      formulas: [{ id: 'f2', name: 'Formula 2', formula: 'a^2+b^2=c^2', categoryId: 'cat1' }],
    },
  ];

  it('calls onSelect([]) when chapters array is empty and "Select all" is toggled', () => {
    const onSelectMock = vi.fn();
    render(<ChapterSelector chapters={[]} selectedIds={[]} onSelect={onSelectMock} />);

    // When chapters is empty, allSelected will be true, so toggleAll should call onSelect([])
    const selectAllBtn = screen.getByRole('button', { name: /Select all chapters/i });
    fireEvent.click(selectAllBtn);

    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith([]);
  });

  it('calls onSelect with all chapter IDs when no chapters are currently selected', () => {
    const onSelectMock = vi.fn();
    render(<ChapterSelector chapters={mockChapters} selectedIds={[]} onSelect={onSelectMock} />);

    const selectAllBtn = screen.getByRole('button', { name: /Select all chapters/i });
    fireEvent.click(selectAllBtn);

    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith(['ch1', 'ch2']);
  });

  it('calls onSelect with all chapter IDs when some chapters are currently selected', () => {
    const onSelectMock = vi.fn();
    render(<ChapterSelector chapters={mockChapters} selectedIds={['ch1']} onSelect={onSelectMock} />);

    const selectAllBtn = screen.getByRole('button', { name: /Select all chapters/i });
    fireEvent.click(selectAllBtn);

    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith(['ch1', 'ch2']);
  });

  it('calls onSelect([]) when all chapters are currently selected', () => {
    const onSelectMock = vi.fn();
    render(<ChapterSelector chapters={mockChapters} selectedIds={['ch1', 'ch2']} onSelect={onSelectMock} />);

    const selectAllBtn = screen.getByRole('button', { name: /Select all chapters/i });
    fireEvent.click(selectAllBtn);

    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith([]);
  });
});
