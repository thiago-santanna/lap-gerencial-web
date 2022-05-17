//Grafico pizza
let dvChartDunut = document.querySelector("#chart-dunut")
let optionsDunut = {
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

//grafico barras
let dvChartBar = document.querySelector("#chart-bar")
let optionsBar = {
  chart: {
    type: 'bar'
  },
  series: [{
    name: 'sales',
    data: [30, 40, 45, 50, 49, 60, 70, 91, 125]
  }],
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
  }
}
let chart = new ApexCharts(dvChartBar, optionsBar);
chart.render();

//Mnipulacao meni desktop
let dvMenuUserDesktop = document.querySelector("#menu-user-desktop")
const defaultClassElementMenuDesktop = "absolute w-40 bg-white rounded-lg shadow-lg py-2 mt-16"
const openMenuDesktop = () => {
  let actualClassElementMenuDesktop = dvMenuUserDesktop.className
  let newClassElementMenuDesktop = actualClassElementMenuDesktop.search("hidden") > 0 ? defaultClassElementMenuDesktop : actualClassElementMenuDesktop += " hidden"
  dvMenuUserDesktop.className = newClassElementMenuDesktop
}

//Manipulacao meno mobile
let dvMenuUserMobile = document.querySelector("#menu-user-mobile")
const defaultClassElementMenuMobile = "flex flex-col pt-4"
let dvMenuMobileMenu = document.querySelector("#dv-menu-mobile")
let dvMenuMobileMenuClose = document.querySelector("#dv-menu-mobile-close")

const openMenuMobile = () => {
  let actualClassElementMenuMobile = dvMenuUserMobile.className
  const situationHiddenMenuMobile = actualClassElementMenuMobile.search("hidden") > 0

  if (situationHiddenMenuMobile) {
    actualClassElementMenuMobile = defaultClassElementMenuMobile
    dvMenuMobileMenu.className = "hidden"
    dvMenuMobileMenuClose.className = ""
  }
  else {
    actualClassElementMenuMobile = defaultClassElementMenuMobile + " hidden"
    dvMenuMobileMenu.className = ""
    dvMenuMobileMenuClose.className = "hidden"
  }
  dvMenuUserMobile.className = actualClassElementMenuMobile
}

// HelloW

let dvBemVIndo = document.querySelector("#bem-vindo")
function getHello(name) {
  axios.get(`http://verticalautomotivo.ddns.net:8080/wslap/dwCGIServer.exe/helloworld?name=${name}`)
    .then((response) => {
      dvBemVIndo.innerHTML = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

function getEmpresas() {
  axios.get(`http://verticalautomotivo.ddns.net:8080/wslap/dwCGIServer.exe/consulta?sql=select distinct ljcodemp from lapa19`)
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}

function getConsulta(sql) {
  axios.get(`http://verticalautomotivo.ddns.net:8080/wslap/dwCGIServer.exe/consulta?sql=${sql}`)
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}

