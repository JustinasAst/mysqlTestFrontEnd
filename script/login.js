url =
  "https://justinas-ast-mysql-test-back-end-ugmhj.ondigitalocean.app/back/v1/auth/login";

const form = document.getElementById("login");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target.elements.email.value.trim();
  const password = e.target.elements.password.value.trim();
  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("token", `${data.token}`);
      location.href = "group.html";
      alert("You login succesfully");
    })
    .catch((err) => alert("Something wrong"));
});
