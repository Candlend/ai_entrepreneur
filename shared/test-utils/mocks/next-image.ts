import { vi } from 'vitest'

export const mockImage = (props: any) => {
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img {...props} />
}

vi.mock('next/image', () => ({
  default: mockImage,
}))
