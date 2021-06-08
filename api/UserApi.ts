import { baseUrl } from "./Api";

type LoginOptions = {
  username: string;
  password: string;
}

export async function login(options: LoginOptions) {
  const res = await fetch(`${baseUrl}/api/users/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  return res.json();
}

type SignUpParams = {
  username: string;
  email: string;
  password: string;
}

export async function signup(params: SignUpParams) {
  const res = await fetch(`${baseUrl}/api/users/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  return res.json();
}

export async function getMe() {
  const res = await fetch(`${baseUrl}/api/users/me`);
  return res.json();
}