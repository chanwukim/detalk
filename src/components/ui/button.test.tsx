import { useState } from "react";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Button } from "./button";

describe("Button", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render", () => {
    render(<Button>Text</Button>);

    const button = screen.getByRole("button", { name: "Text" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Text");
  });

  it("should render loading icon and not trigger onClick when isLoading", () => {
    function ButtonTest() {
      const [count, setCount] = useState(0);

      return (
        <>
          <span data-testid="count-value">{count}</span>
          <Button isLoading onClick={() => setCount(count + 1)}>
            Text
          </Button>
        </>
      );
    }
    render(<ButtonTest />);

    const button = screen.getByRole("button", { name: "Text" });
    const countValue = screen.getByTestId("count-value");

    fireEvent.click(button);

    expect(button).toHaveAttribute("data-loading", "true");
    expect(countValue).toHaveTextContent("0");
  });
});
