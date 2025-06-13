import { initDB } from "./db";

export async function signup({
  username,
  password,
  firstName,
  lastName,
  email,
}) {
  const db = await initDB();
  const existingUser = await db.get("users", username);
  const existingEmail = await db.get("users", email);
  if (existingUser) throw new Error("User already exists");
  if (existingEmail) throw new Error("Email already exists");
  await db.add("users", { username, password, firstName, lastName, email });
  localStorage.setItem("currentUser", username);
}

export async function login({ username, password }) {
  const db = await initDB();
  const user = await db.get("users", username);
  if (!user || user.password !== password) throw new Error("Invalid login");
  localStorage.setItem("currentUser", username);
}

export function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

export function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "/";
}

export async function getFirstName() {
  const username = getCurrentUser();
  if (!username) return null;

  const db = await initDB();
  const user = await db.get("users", username);

  return user?.firstName || null;
}
