document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});
var bookModal = document.getElementById("book-modal");
function openModal(id) {
  bookModal.style.display = "block";
  fetch(`/books/${id}`, {
    method: "GET"
  })
    .then(res => res.json())
    .then(res => {
      var data = JSON.parse(res)[0];
      bookModal.querySelector("p.modal-card-title").innerHTML =
        data.fields.title;
      bookModal.querySelector(".modal-card-body>.table").innerHTML = `
      <tr>
        <th>Author</th>
        <th>Price</th>
        <th>Selling Count</th>
        <th>Created At</th>
      </tr>
      <tr>
        <td>${data.fields.author}</td>
        <td>$${data.fields.price}</td>
        <td>${data.fields.selling_count}</td>
        <td>${moment(data.fields.created_at).format(
          "MMMM Do YYYY, h:mm:ss a"
        )}</td>
      </tr>`;
    });
}
window.onclick = e => {
  if (e.target == bookModal.getElementsByClassName("modal-background")[0]) {
    bookModal.style.display = "none";
  }
};
function closeModal() {
  bookModal.style.display = "none";
  bookModal.querySelector("p.modal-card-title").innerHTML = "";
}
