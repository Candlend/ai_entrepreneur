import { expect } from 'vitest'

/**
 * Assert that an element has specific text content
 */
export function expectTextContent(element: Element | null, text: string | RegExp) {
  expect(element).toBeTruthy()
  if (typeof text === 'string') {
    expect(element?.textContent).toContain(text)
  } else {
    expect(element?.textContent).toMatch(text)
  }
}

/**
 * Assert that an element has a specific attribute
 */
export function expectAttribute(element: Element | null, attr: string, value?: string) {
  expect(element).toBeTruthy()
  expect(element?.hasAttribute(attr)).toBe(true)
  if (value !== undefined) {
    expect(element?.getAttribute(attr)).toBe(value)
  }
}

/**
 * Assert that an element has specific classes
 */
export function expectClasses(element: Element | null, ...classes: string[]) {
  expect(element).toBeTruthy()
  classes.forEach(cls => {
    expect(element?.classList.contains(cls)).toBe(true)
  })
}

/**
 * Assert that an element is visible
 */
export function expectVisible(element: Element | null) {
  expect(element).toBeTruthy()
  expect(element).toBeVisible()
}

/**
 * Assert that an element is not in the document
 */
export function expectNotInDocument(element: Element | null) {
  expect(element).not.toBeInTheDocument()
}

/**
 * Assert that a function throws an error
 */
export async function expectThrows(fn: () => any, errorMessage?: string | RegExp) {
  await expect(fn).rejects.toThrow(errorMessage)
}

/**
 * Assert array length
 */
export function expectLength<T>(array: T[], length: number) {
  expect(array).toHaveLength(length)
}

/**
 * Assert that an array contains an item
 */
export function expectContains<T>(array: T[], item: T) {
  expect(array).toContain(item)
}
