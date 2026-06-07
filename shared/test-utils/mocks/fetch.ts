import { vi } from 'vitest'

export function mockFetch(response: any, options: { ok?: boolean; status?: number } = {}) {
  const { ok = true, status = 200 } = options

  return vi.fn(() =>
    Promise.resolve({
      ok,
      status,
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response)),
      blob: () => Promise.resolve(new Blob([JSON.stringify(response)])),
    })
  )
}

export function mockFetchError(message: string = 'Network error') {
  return vi.fn(() => Promise.reject(new Error(message)))
}

export function setupFetchMock(response: any, options?: { ok?: boolean; status?: number }) {
  global.fetch = mockFetch(response, options) as any
}

export function setupFetchErrorMock(message?: string) {
  global.fetch = mockFetchError(message) as any
}
