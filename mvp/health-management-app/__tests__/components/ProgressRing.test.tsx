import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProgressRing from '@/components/ui/ProgressRing';

describe('ProgressRing', () => {
  it('renders with correct value', () => {
    render(<ProgressRing value={500} max={1000} />);
    expect(screen.getByText('500')).toBeDefined();
    expect(screen.getByText('/ 1000 卡')).toBeDefined();
  });

  it('clamps percentage at 100%', () => {
    render(<ProgressRing value={1500} max={1000} />);
    expect(screen.getByText('1500')).toBeDefined();
  });
});
