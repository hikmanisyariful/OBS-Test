import { useEffect } from "react";
import "./App.css";
import Header from "./components/common/Header";
import { UserList } from "./components/user-list";
import { getUsers } from "./redux/reducers/users";
import { useAppDispatch } from "./redux/hooks";
import GlobalAlert from "./components/common/GlobalAlert";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(getUsers());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <UserList />
      <GlobalAlert />
    </>
  );
}

export default App;
