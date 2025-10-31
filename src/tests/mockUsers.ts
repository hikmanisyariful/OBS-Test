import { User } from "../interfaces/User";

export const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    phone: "08123456789",
    website: "example.com",
    address: { street: "Jl. Mawar" },
    company: { name: "Acme" } ,
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    email: "jane@example.com",
    phone: "08129876543",
    website: "janesite.dev",
    address: { street: "Jl. Melati" },
    company: { name: "Globex" },
  },
];
