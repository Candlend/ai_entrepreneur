import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FoodCamera from '@/components/FoodCamera';

describe('FoodCamera', () => {
  it('renders dropzone area initially', () => {
    const onCapture = vi.fn();
    render(<FoodCamera onImageCapture={onCapture} />);

    expect(screen.getByText(/拖拽或点击上传/)).toBeDefined();
    expect(screen.getByText(/打开相机拍照/)).toBeDefined();
  });

  it('shows supported formats hint', () => {
    const onCapture = vi.fn();
    render(<FoodCamera onImageCapture={onCapture} />);

    expect(screen.getByText(/JPG、PNG、WEBP/)).toBeDefined();
  });

  it('renders camera button', () => {
    const onCapture = vi.fn();
    render(<FoodCamera onImageCapture={onCapture} />);

    const cameraButton = screen.getByText(/打开相机拍照/);
    expect(cameraButton).toBeDefined();
  });
});
