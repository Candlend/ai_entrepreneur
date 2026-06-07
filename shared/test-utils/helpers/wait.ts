/**
 * Wait for a specified amount of time
 */
export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Wait for a condition to be true
 */
export async function waitFor(
  condition: () => boolean,
  options: { timeout?: number; interval?: number } = {}
): Promise<void> {
  const { timeout = 3000, interval = 50 } = options
  const startTime = Date.now()

  while (!condition()) {
    if (Date.now() - startTime > timeout) {
      throw new Error('Timeout waiting for condition')
    }
    await wait(interval)
  }
}

/**
 * Wait for an element to appear in the DOM
 */
export async function waitForElement(
  selector: string,
  options: { timeout?: number } = {}
): Promise<Element> {
  const { timeout = 3000 } = options
  const startTime = Date.now()

  while (Date.now() - startTime < timeout) {
    const element = document.querySelector(selector)
    if (element) return element
    await wait(50)
  }

  throw new Error(`Element ${selector} not found within ${timeout}ms`)
}
