export function authVerify(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    console.log("No estas logueado");
    res.redirect("/");
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
