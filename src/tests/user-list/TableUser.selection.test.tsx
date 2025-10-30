/// <reference types="vitest/globals" />
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TableUser from "../../components/user-list/TableUser";

const getHeaderCheckbox = () => screen.getByLabelText(/select all users/i) as HTMLInputElement;

const getRowCheckboxes = () => screen.getAllByLabelText(/select user/i) as HTMLInputElement[];

const getToolbar = () => screen.getByTestId("table-user-toolbar");

describe("TableUser - checkbox selection & total selected", () => {
  it("should render with no rows selected and show 'Users' in the toolbar", () => {
    render(<TableUser />);
    const headerCb = getHeaderCheckbox();
    const rowCbs = getRowCheckboxes();

    rowCbs.forEach((cb) => expect(cb.checked).toBe(false));
    expect(headerCb.checked).toBe(false);
    expect(headerCb.indeterminate).toBe(false);
    expect(getToolbar()).toHaveTextContent(/users/i);
  });

  it("should select all rows when header checkbox is clicked and update the toolbar count", async () => {
    const user = userEvent.setup();
    render(<TableUser />);

    const headerCb = getHeaderCheckbox();
    const rowCbs = getRowCheckboxes();

    await user.click(headerCb); // select all

    rowCbs.forEach((cb) => expect(cb.checked).toBe(true));
    expect(headerCb.checked).toBe(true);
    expect(headerCb.indeterminate).toBe(false);

    expect(getToolbar()).toHaveTextContent(new RegExp(`^${rowCbs.length} selected$`, "i"));
  });

  it("should clear all selections when header checkbox is clicked again and restore 'Users' label", async () => {
    const user = userEvent.setup();
    render(<TableUser />);

    const headerCb = getHeaderCheckbox();
    const rowCbs = getRowCheckboxes();

    await user.click(headerCb); // select all
    await user.click(headerCb); // clear all

    rowCbs.forEach((cb) => expect(cb.checked).toBe(false));
    expect(headerCb.checked).toBe(false);
    expect(headerCb.indeterminate).toBe(false);
    expect(getToolbar()).toHaveTextContent(/users/i);
  });
});
