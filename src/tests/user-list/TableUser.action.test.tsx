/// <reference types="vitest/globals" />
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TableUser from "../../components/user-list/TableUser";

/**
 * Helper: ambil <tr> dari sebuah sel yang mengandung teks tertentu.
 * Misal: baris milik user dengan nama "Leanne Graham".
 */
function getRowByCellText(text: string) {
  const cell = screen.getByText(text);
  return cell.closest("tr") as HTMLElement;
}

/**
 * Cek apakah row sedang selected.
 * TableUser men-set:
 *  - <TableRow selected={checked}>
 *  - aria-checked pada role="checkbox"
 * Keduanya kita cek agar aman.
 */
function expectRowSelected(row: HTMLElement, selected: boolean) {
  // aria-checked
  const ariaChecked = row.getAttribute("aria-checked");
  if (selected) {
    expect(ariaChecked).toBe("true");
  } else {
    expect(ariaChecked === null || ariaChecked === "false").toBe(true);
  }
  // class MUI selected (opsional, tergantung tema), tapi kita cek juga
  if (selected) {
    expect(row.className).toMatch(/Mui-selected/);
  } else {
    expect(row.className).not.toMatch(/Mui-selected/);
  }
}

describe("TableUser action focus selection", () => {
  it("should select only the current row when action menu is clicked", async () => {
    const user = userEvent.setup();
    render(<TableUser />);

    // Ambil baris untuk dua user berbeda
    const rowLeanne = getRowByCellText("Leanne Graham");
    const rowErvin = getRowByCellText("Ervin Howell");

    // Pastikan awalnya tidak ada yang terpilih
    expectRowSelected(rowLeanne, false);
    expectRowSelected(rowErvin, false);

    // Klik tombol action (⋮) pada baris Leanne
    const actionBtnLeanne = within(rowLeanne).getByLabelText(/actions/i);
    await user.click(actionBtnLeanne);

    // Harusnya hanya baris Leanne yang selected
    expectRowSelected(rowLeanne, true);
    expectRowSelected(rowErvin, false);

    // Sekarang klik action pada baris Ervin
    const actionBtnErvin = within(rowErvin).getByLabelText(/actions/i);
    await user.click(actionBtnErvin);

    // Fokus pindah: hanya baris Ervin yang selected
    expectRowSelected(rowLeanne, false);
    expectRowSelected(rowErvin, true);
  });

  it("should not toggle selection of other rows when opening action menu (stopPropagation works)", async () => {
    const user = userEvent.setup();
    render(<TableUser />);

    const rowLeanne = getRowByCellText("Leanne Graham");
    const rowErvin = getRowByCellText("Ervin Howell");

    // Klik action pada Leanne
    await user.click(within(rowLeanne).getByLabelText(/actions/i));
    expectRowSelected(rowLeanne, true);
    expectRowSelected(rowErvin, false);

    // Buka lagi action pada Leanne (klik kedua), tidak boleh mengubah selection lain
    await user.click(within(rowLeanne).getByLabelText(/actions/i));
    expectRowSelected(rowLeanne, true);
    expectRowSelected(rowErvin, false);
  });
});