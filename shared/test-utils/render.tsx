import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'

/**
 * Custom render function that wraps React Testing Library's render
 * with common providers and setup
 */
export function render(ui: ReactElement, options?: RenderOptions) {
  return rtlRender(ui, {
    wrapper: ({ children }) => children,
    ...options,
  })
}

// Re-export everything from React Testing Library
export * from '@testing-library/react'
export { userEvent } from '@testing-library/user-event'
