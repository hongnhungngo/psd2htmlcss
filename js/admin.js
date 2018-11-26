$(document).ready(function() {
  //menu icon toggle
  $(document).on("click", ".menu__icon", function() {
    $(this)
      .siblings(".dropdown")
      .toggle();
    $(this)
      .siblings(".dropdown-close")
      .toggle();
    $(this)
      .siblings(".dropdown-open")
      .toggle();
  });
  // close sub menu
  $(document).on("click", ".dropdown-close", function() {
    $(this)
      .siblings(".dropdown")
      .hide();
    console.log("close");
    $(this).toggle();
    $(this)
      .siblings(".dropdown-open")
      .toggle();
  });
  // open sub menu
  $(document).on("click", ".dropdown-open", function() {
    $(this)
      .siblings(".dropdown")
      .show();
    console.log("open");
    $(this)
      .siblings(".dropdown-close")
      .toggle();
    $(this).toggle();
  });
  // toggle menu
  $(document).on("click", ".header__toggle", function() {
    if (
      $(".line-top").hasClass("line-top--toggle") &&
      $(".line-bot").hasClass("line-bot--toggle")
    ) {
      $(".line-top").removeClass("line-top--toggle");
      $(".line-bot").removeClass("line-bot--toggle");
      $(".menu").removeClass("menu--toggle");
    } else {
      $(".line-top").addClass("line-top--toggle");
      $(".line-bot").addClass("line-bot--toggle");
      $(".menu").addClass("menu--toggle");
    }
  });
  // pie chart
  Chart.pluginService.register({
    beforeDraw: function(chart) {
      if (chart.config.options.elements.center) {
        //Get ctx from string
        var ctx = chart.chart.ctx;
        //Get options from the center object in options
        var centerConfig = chart.config.options.elements.center;
        var fontStyle = centerConfig.fontStyle || "Arial";
        var txt = centerConfig.text;
        var color = centerConfig.color || "#000";
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated =
          (sidePadding / 100) * (chart.innerRadius * 2);
        //Start with a base font of 30px
        ctx.font = "30px " + fontStyle;

        //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = chart.innerRadius * 2;

        // Pick a new font size so it will not be larger than the height of label.
        //var fontSizeToUse = Math.min(newFontSize, elementHeight);
        var fontSizeToUse = "30";

        //Set font settings to draw it correctly.
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
        var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
        ctx.font = "bold " + fontSizeToUse + "px " + fontStyle;
        ctx.fillStyle = color;

        //Draw text in center
        ctx.fillText(txt, centerX, centerY);
      }
    }
  });
  function configChart($color1, $color2, $data1, $data2, $text, $textcolor) {
    return (config = {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [$data1, $data2],
            backgroundColor: [$color1, $color2],
            label: "Dataset 1",
            borderWidth: 0
          }
        ],
        labels: ["Red", "Orange"]
      },
      options: {
        responsive: true,
        cutoutPercentage: 85,
        legend: { display: false },
        title: { display: false },
        animation: { animateScale: true, animateRotate: true },
        elements: {
          center: {
            text: $text,
            color: $textcolor,
            fontStyle: "Montserrat",
            sidePadding: 30
          }
        }
      }
    }); // elements: { arc: { borderWidth: 0 } }, // segmentShowStroke: false, // rotation: 0.7 * Math.PI,
  } // Default is #000000 // Default is Arial // Defualt is 20 (as a percentage)
  // hit rate chart
  var ctxhrc = document.getElementById("hitRateChart").getContext("2d");
  var width = ctxhrc.canvas.width;
  var height = ctxhrc.canvas.height;
  var hitRateChart = new Chart(
    ctxhrc,
    configChart("#e76c90", "#f2f3f8", 50, 50, "50%", "#2c304d")
  );
  ctxhrc.font = "normal 20px 'Arial'";
  ctxhrc.fillStyle = "black";
  ctxhrc.textBaseline = "middle";
  ctxhrc.fillText("60%", width / 2 - 20, width / 2, 200);
  // Happy Customer Chart
  var ctxhcc = document.getElementById("happyCustomerChart").getContext("2d");
  var width = ctxhcc.canvas.width;
  var height = ctxhcc.canvas.height;
  var happyCustomerChart = new Chart(
    ctxhcc,
    configChart("#ffffff", "#9ec1f3", 50, 50, "50%", "#ffffff")
  );
  ctxhcc.font = "normal 20px 'Arial'";
  ctxhcc.fillStyle = "black";
  ctxhcc.textBaseline = "middle";
  ctxhcc.fillText("50%", width / 2 - 20, width / 2, 200);
  // bar chart - delivered order
  Chart.defaults.global.legend.labels.usePointStyle = true;
  function configBarChart() {
    return (configBarChart = {
      type: "bar",
      stacked: true,
      data: {
        labels: [
          "jan",
          "feb",
          "mar",
          "apr",
          "may",
          "jun",
          "jul",
          " aug",
          "sep",
          "oct",
          "nov",
          "dec"
        ],
        datasets: [
          {
            label: "delivered",
            data: [90, 70, 70, 40, 90, 70, 70, 50, 90, 70, 70, 40],
            backgroundColor: "#5d5386"
          },
          {
            label: "estimated",
            data: [10, 25, 20, 50, 10, 25, 20, 50, 10, 25, 20, 50],
            backgroundColor: "#e4e8f0"
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              barPercentage: 0.5,
              stacked: true,
              gridLines: { display: false, color: "#fff" },
              ticks: { autoSkip: false, maxRotation: 0, minRotation: 0 }
            }
          ],
          yAxes: [
            {
              ticks: {
                display: false
              },
              stacked: true,
              gridLines: { display: false, color: "#fff" }
            }
          ]
        },
        legend: { position: "bottom", usePointStyle: true }
      }
    });
  }
  var ctxoc = document.getElementById("oderChart");
  var orderChart = new Chart(ctxoc, configBarChart());

  // statistic
  var ctxno = document.getElementById("newOrder").getContext("2d");
  var width = ctxno.canvas.width;
  var height = ctxno.canvas.height;
  var happyCustomerChart = new Chart(
    ctxno,
    configChart("#9ec1f3", "#f0eff4", 65, 35, "65%", "#2c304d")
  );
  ctxno.font = "normal 20px 'Arial'";
  ctxno.fillStyle = "black";
  ctxno.textBaseline = "middle";
  ctxno.fillText("50%", width / 2 - 20, width / 2, 200);
});
