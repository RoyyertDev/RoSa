export function authVerify(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    console.log("No estas logueado");
    res.redirect("/");
  }
}

export async function obtainUserLogin() {
  try {
    const response = await fetch("http://localhost:3000/auth/session", {
      method: "GET",
    });
    const data = await response.json();
    return data.success === true ? data.user : null;
  } catch (error) {
    console.error(error);
  }
}

export async function login(email, password) {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
