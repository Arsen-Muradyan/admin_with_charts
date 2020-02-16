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
