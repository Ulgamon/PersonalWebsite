import { render } from "@testing-library/react";
import Dashboard from "@/layout/Dashboard";

test("renders element", () => {
  render(<Dashboard />);
  expect(true).toBe(true);
});
