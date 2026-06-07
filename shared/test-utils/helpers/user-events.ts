import { userEvent } from '@testing-library/user-event'

/**
 * Create a configured userEvent instance
 */
export function createUserEvent() {
  return userEvent.setup()
}

/**
 * Type text into an input with realistic delay
 */
export async function typeIntoInput(element: Element, text: string) {
  const user = createUserEvent()
  await user.type(element, text)
}

/**
 * Click an element with realistic behavior
 */
export async function clickElement(element: Element) {
  const user = createUserEvent()
  await user.click(element)
}

/**
 * Fill a form with multiple fields
 */
export async function fillForm(fields: Record<string, { element: Element; value: string }>) {
  const user = createUserEvent()

  for (const [, { element, value }] of Object.entries(fields)) {
    await user.type(element, value)
  }
}

/**
 * Select an option from a select element
 */
export async function selectOption(element: Element, option: string) {
  const user = createUserEvent()
  await user.selectOptions(element, option)
}
