import LeftPanel from "@/layout/LeftPanel";
import { render } from "@testing-library/react";

test("renders element", () => {
  render(<LeftPanel />);
  expect(true).toBe(true);
});
