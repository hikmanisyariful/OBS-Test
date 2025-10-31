import { SelectedUserProvider } from "./context/SelectedUserContext";
import HeaderTable from "./HeaderTable";
import TableUser from "./TableUser";

export default function Container() {
  return (
    <div className="mt-8">
      <SelectedUserProvider>
        <HeaderTable />
        <TableUser />
      </SelectedUserProvider>
    </div>
  );
}
