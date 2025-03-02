import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import HomePage from "../page";

describe("HomePage", () => {
  it("should render", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: "Hello World" }),
    ).toBeInTheDocument();
  });
});
