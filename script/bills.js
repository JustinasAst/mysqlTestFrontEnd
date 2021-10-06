const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

url =
  "https://justinas-ast-mysql-test-back-end-ugmhj.ondigitalocean.app/back/v1/accounts/bills/" +
  id;

const token = window.localStorage.getItem("token");
console.log(token);

function billsTable() {
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const table = document.querySelector("tbody");
      table.innerHTML = "";
      data.forEach((item) => {
        const tr = table.insertRow();

        const td0 = tr.insertCell();
        td0.textContent = item.id;

        const td1 = tr.insertCell();
        td1.textContent = item.description;

        const td2 = tr.insertCell();
        td2.textContent = item.amount;
      });
    });
}

billsTable();

const form = document.getElementById("bills");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const amount = e.target.elements.amount.value.trim();
  const description = e.target.elements.description.value.trim();
  fetch(
    "https://justinas-ast-mysql-test-back-end-ugmhj.ondigitalocean.app/back/v1/accounts/bills",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        group_id: id,
        amount,
        description,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      billsTable();
    })
    .catch((err) => console.log(err));
});

document.getElementById("signout").addEventListener("click", () => {
  localStorage.removeItem("token");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 500);
});
