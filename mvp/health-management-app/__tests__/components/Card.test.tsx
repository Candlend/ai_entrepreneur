import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '@/components/ui/Card';

describe('Card', () => {
  it('renders children', () => {
    render(
      <Card>
        <p>Test content</p>
      </Card>
    );
    expect(screen.getByText('Test content')).toBeDefined();
  });

  it('renders title when provided', () => {
    render(
      <Card title="My Title">
        <p>Content</p>
      </Card>
    );
    expect(screen.getByText('My Title')).toBeDefined();
  });

  it('renders subtitle when provided', () => {
    render(
      <Card title="Title" subtitle="Sub">
        <p>Content</p>
      </Card>
    );
    expect(screen.getByText('Sub')).toBeDefined();
  });

  it('does not render subtitle when not provided', () => {
    render(
      <Card title="Title">
        <p>Content</p>
      </Card>
    );
    expect(screen.queryByText('Sub')).toBeNull();
  });
});
