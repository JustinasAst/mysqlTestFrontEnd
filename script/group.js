const url = "http://localhost:3000/v1/accounts/accounts";
const gr_url = "http://localhost:3000/v1/accounts/groups";

const token = window.localStorage.getItem("token");
console.log(token);
fetch(url, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    const groupbox = document.getElementById("groupbox");
    data.forEach((items) => {
      const box = document.createElement("a");
      box.href = "bills.html?id=" + items.group_id;
      box.className = "box";
      const group_id = document.createElement("h2");
      const name = document.createElement("h4");

      group_id.textContent = `ID: ${items.group_id}`;
      name.textContent = items.name;

      box.append(group_id, name);
      groupbox.append(box);
    });
  });

const form = document.getElementById("addGroup");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const group_id = e.target.elements.group_id.value.trim();

  fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      group_id,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.err) {
        return alert(data.err);
      }
      form.reset();
      setTimeout(() => {
        location.reload();
      }, 500);
    })
    .catch((err) => {
      alert("This group not exist");
    });
});

document.getElementById("signout").addEventListener("click", () => {
  localStorage.removeItem("token");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 500);
});
