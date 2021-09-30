url = "http://localhost:3000/v1/auth/register";
const form = document.getElementById("register");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const full_name = e.target.elements.full_name.value.trim();
  const email = e.target.elements.email.value.trim();
  const password = e.target.elements.password.value;
  const repeatPassword = e.target.elements.repeatPassword.value;
  console.log(full_name, email, password, repeatPassword);

  if (password !== repeatPassword) {
    return alert("Passwords do not match");
  }

  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      full_name,
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(`You  registered  successfully!`);
      form.reset();
      setTimeout(() => {
        location.href = "login.html";
      }, 1000);
    })
    .catch((err) => {
      alert("Something went wrong, please try again");
    });
});
