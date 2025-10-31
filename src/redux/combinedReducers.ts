import users from "./reducers/users";
import userForm from "./reducers/userForm";
import alert from "./reducers/alert";

const combinedReducers = { users, userForm, alert };

export default combinedReducers;
