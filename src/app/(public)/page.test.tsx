import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";

import HomePage from "./page";

it("테스트", () => {
  render(<HomePage />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Hello World" }),
  ).toBeDefined();
});
