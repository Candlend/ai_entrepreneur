import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import BarChart from '@/components/ui/BarChart';

const sampleData = [
  { label: 'Mon', value: 100 },
  { label: 'Tue', value: 200 },
  { label: 'Wed', value: 150 },
];

describe('BarChart', () => {
  it('renders all labels', () => {
    render(<BarChart data={sampleData} />);
    expect(screen.getByText('Mon')).toBeDefined();
    expect(screen.getByText('Tue')).toBeDefined();
    expect(screen.getByText('Wed')).toBeDefined();
  });

  it('renders values when no display provided', () => {
    render(<BarChart data={sampleData} />);
    expect(screen.getByText('100')).toBeDefined();
  });

  it('renders display text when provided', () => {
    const data = [{ label: 'A', value: 50, display: 'fifty' }];
    render(<BarChart data={data} />);
    expect(screen.getByText('fifty')).toBeDefined();
  });
});
