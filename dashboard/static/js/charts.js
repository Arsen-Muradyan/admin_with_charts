var barChart = document.getElementById("barChart").getContext("2d");
var pieChart = document.getElementById("pieChart").getContext("2d");
var data = [];
var dataset = [];
var labels = [];
var pieData = [];
var colors = [];
function sum(arr) {
  var res = 0,
    n = arr.length || 0;
  while (n--) {
    res += parseInt(arr[n].fields.selling_count);
  }
  return res;
}
function randomNumberGen(min, max) {
  return min + Math.round(Math.random() * (max - min));
}
function generateColor() {
  return `rgba(${randomNumberGen(0, 255)}, ${randomNumberGen(
    0,
    255
  )}, ${randomNumberGen(0, 255)}, 0.5)`;
}
fetch("/data", {
  method: "GET"
})
  .then(res => res.json())
  .then(res => {
    data = JSON.parse(res);
    var dataSum = sum(data);
    data.forEach(item => {
      dataset.push(item.fields.selling_count);
      labels.push(item.fields.title);
      pieData.push((dataSum * parseInt(item.fields.selling_count)) / 100);
      colors.push(generateColor());
    });
    new Chart(barChart, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "# Selling Count",
            data: dataset,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    new Chart(pieChart, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            data: pieData,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  });
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
