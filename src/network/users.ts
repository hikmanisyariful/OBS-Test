import { User } from "../interfaces/User";

export const fetchUsers = async (signal?: AbortSignal): Promise<User[]> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`, { signal });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
};
