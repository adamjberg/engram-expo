type LoginOptions = {
  username: string;
  password: string;
}

export async function login(options: LoginOptions) {
  const res = await fetch("https://engram.xyzdigital.com/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  return res.json();
}

export function signup() {

}