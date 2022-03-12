import bcrypt from "bcryptjs";

const users = [
  {
    name: "yusuf Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "yusto Ali ",
    email: "yusto@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "moh ali ",
    email: "moh@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
