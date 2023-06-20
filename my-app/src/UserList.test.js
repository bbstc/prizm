import { render, screen } from "@testing-library/react";
import UserList from "./UserList";

test("User_List", () => {
  render(<UserList />);

  const element = screen.getByText(/User /i);

  expect(element).toBeInTheDocument();
});
