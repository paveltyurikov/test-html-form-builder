import "@testing-library/jest-dom";
import {vitest} from "vitest";


beforeEach(async () => {
  console.warn = vitest.fn()
});