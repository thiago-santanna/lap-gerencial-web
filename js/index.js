let dvChartDunut = document.querySelector("#chart-dunut")
let  optionsDunut = {
  chart: {
    type: 'donut'
  },
  plotOptions: {
    pie: {
      expandOnClick: false
    }
  },
  series: [44, 55, 13, 33],
  labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
}
let chartDunit = new ApexCharts(dvChartDunut, optionsDunut);
chartDunit.render();

let dvChartBar = document.querySelector("#chart-bar")
let optionsBar = {
  chart: {
    type: 'bar'
  },
  series: [{
    name: 'sales',
    data: [30,40,45,50,49,60,70,91,125]
  }],
  xaxis: {
    categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
  }
}
let chart = new ApexCharts(dvChartBar, optionsBar);
chart.render();

let dvMenuUser = document.querySelector("#menu-user")
const defaultClassElementMenu = "absolute w-40 bg-white rounded-lg shadow-lg py-2 mt-16"

const openMenu = () => {
  let actualClassElementMenu = dvMenuUser.className;
  let newClassElementMenu = actualClassElementMenu.search("hidden") > 0 ? defaultClassElementMenu : actualClassElementMenu += " hidden"
  dvMenuUser.className = newClassElementMenu 
}
