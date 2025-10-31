import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// mock ResizeObserver untuk komponen MUI yang pakai observer
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal("ResizeObserver", ResizeObserverMock);

// Optional: suppress noisy console.error dari MUI test env
const originalError = console.error;
console.error = (...args) => {
  if (/MUI:/.test(args[0])) return;
  originalError.call(console, ...args);
};
