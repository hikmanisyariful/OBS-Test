import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithAllProviders } from "../../../tests/renderWithAllProviders";
import TableUser from "../TableUser";
import { FetchState } from "../../../interfaces/Fetch";
import { mockUsers } from "../../../tests/mockUsers";

const preloadedState = {
  users: {
    status: FetchState.SUCCESS,
    userList: mockUsers,
  },
};

describe("TableUser - Checkbox Behavior", () => {
  it("should show Users in toolbar initially", () => {
    renderWithAllProviders(<TableUser />, { preloadedState });
    expect(screen.getByTestId("table-user-toolbar")).toHaveTextContent(/Users/i);
  });

  it("should select all rows when header checkbox clicked", async () => {
    const user = userEvent.setup();
    renderWithAllProviders(<TableUser />, { preloadedState });

    const headerCb = screen.getByLabelText(/select all users/i);
    await user.click(headerCb);

    const rowCbs = screen.getAllByLabelText(/select user/i);
    rowCbs.forEach((cb) => expect((cb as HTMLInputElement).checked).toBe(true));

    expect(screen.getByTestId("table-user-toolbar")).toHaveTextContent(/selected/i);
  });

  it("should render correct table headers", () => {
    renderWithAllProviders(<TableUser />, { preloadedState });

    const expectedHeaders = ["ID", "Profile", "Email", "Phone", "Address", "Website", "Company"];

    // Ambil semua elemen header (selain checkbox)
    const headerCells = screen.getAllByRole("columnheader");

    // Ekstrak teks dari setiap header cell
    const headerTexts = headerCells
      .map((cell) => cell.textContent?.trim())
      .filter((text) => text && text !== "");

    // Pastikan label sesuai urutan
    expect(headerTexts).toEqual(expectedHeaders);
  });
});
