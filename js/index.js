const myRound = (value, precision) => {
  let multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

//Manipulacao menu desktop
let dvMenuUserDesktop = document.querySelector("#menu-user-desktop")
const defaultClassElementMenuDesktop = "absolute w-40 bg-white rounded-lg shadow-lg py-2 mt-16"
const openMenuDesktop = () => {
  let actualClassElementMenuDesktop = dvMenuUserDesktop.className
  let newClassElementMenuDesktop = actualClassElementMenuDesktop.search("hidden") > 0 ? defaultClassElementMenuDesktop : actualClassElementMenuDesktop += " hidden"
  dvMenuUserDesktop.className = newClassElementMenuDesktop
}

//Manipulacao menu mobile
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
  axios.get(`https://verticalautomotivo.ddns.net:443/wslap/dwCGIServer.exe/helloworld?name=${name}`)
    .then((response) => {
      dvBemVIndo.innerHTML = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

//Empresas
let selectEmpresa = document.querySelector("#empresas")
function getEmpresas() {
  axios.get(`https://verticalautomotivo.ddns.net:443/wslap/dwCGIServer.exe/getCodEmpresa`)
    .then((response) => {
      response.data.map(emp => {
        let opt = document.createElement('option')
        opt.value = emp.ljcodemp
        opt.innerHTML = emp.ljcodemp
        selectEmpresa.appendChild(opt)
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

//Consulta faturamento
function getConsultaFaturamento() {
  let empSelect = pegarEmpresaSelecionada()
  let resultado = {}
  let dtInicial = document.querySelector("#dt-inicial")
  let dtFinal = document.querySelector("#dt-final")

  if (!empSelect || !dtInicial.value || !dtFinal.value) {
    alert('Selecione parametros válidos.')
  }

  let sqlFaturamento = "select ";
  sqlFaturamento = sqlFaturamento.concat("sum(ososdepe) as ValDes,");
  sqlFaturamento = sqlFaturamento.concat("sum(oscheque) as TotChe, sum(ospredat) as TotPre,")
  sqlFaturamento = sqlFaturamento.concat("sum(oscartao) as TotCar, sum(osretenc) as TotRet,")
  sqlFaturamento = sqlFaturamento.concat("SUM(CASE WHEN OSFATPOS = 'N' THEN OSESPECI ELSE 0 END) AS TotEsp,")
  sqlFaturamento = sqlFaturamento.concat("SUM(CASE WHEN OSFATPOS = 'S' THEN OSESPECI ELSE 0 END) AS FatPos,")
  sqlFaturamento = sqlFaturamento.concat("SUM(CASE WHEN OSTIPTAB <> 'F' THEN OSVVALES ELSE 0 END) AS TotVal,")
  sqlFaturamento = sqlFaturamento.concat("SUM(CASE WHEN OSTIPTAB = 'F' THEN OSVVALES ELSE 0 END) AS TraFil,")
  sqlFaturamento = sqlFaturamento.concat("SUM(CASE WHEN OSTIPTAB <> 'C' THEN OSDUPLIC ELSE 0 END) AS TotDup,")
  sqlFaturamento = sqlFaturamento.concat("SUM(CASE WHEN OSTIPTAB = 'C' THEN OSDUPLIC ELSE 0 END) AS VdaCol ")
  sqlFaturamento = sqlFaturamento.concat("from sosa01 ")
  sqlFaturamento = sqlFaturamento.concat("where OSFORMVD <> 'O' ")
  sqlFaturamento = sqlFaturamento.concat(`and OSCODEMP = '${empSelect}' `)
  sqlFaturamento = sqlFaturamento.concat(`and osliquid >= '${dtInicial.value
    } 00:00:00' `)
  sqlFaturamento = sqlFaturamento.concat(`and osliquid <= '${dtFinal.value
    } 23:59:59' `)

  axios.get(`https://verticalautomotivo.ddns.net:443/wslap/dwCGIServer.exe/consulta?sql=${sqlFaturamento
    }`)
    .then((response) => {
      resultado = response.data[0]
      document.querySelector("#td-especie").innerHTML = myRound(resultado.totesp, 2)
      document.querySelector("#td-cartao").innerHTML = myRound(resultado.totcar, 2)
      document.querySelector("#td-duplicata").innerHTML = myRound(resultado.totdup, 2)
      document.querySelector("#td-vales").innerHTML = myRound(resultado.totval, 2)
      document.querySelector("#td-cheque").innerHTML = myRound(resultado.totche, 2)
      document.querySelector("#td-cheque-pre").innerHTML = myRound(resultado.totpre, 2)
      document.querySelector("#td-retencao").innerHTML = myRound(resultado.totret, 2)
      document.querySelector("#td-transf-filial").innerHTML = myRound(resultado.trafil, 2)
      document.querySelector("#td-coligadas").innerHTML = myRound(resultado.vdacol, 2)
      document.querySelector("#td-posterior").innerHTML = myRound(resultado.fatpos, 2)
      gerarGrafico(resultado)
    })
    .catch((error) => {
      console.log(error)
    })
}

const pegarEmpresaSelecionada = () => {
  let opt = selectEmpresa.getElementsByTagName("option")
  for (let i = 0; i < opt.length; i++) {
    if (opt[i].selected) {
      return opt[i].value
    }
  }
}

//Grafico pizza
const gerarGrafico = (res) => {
  let dvChartDunut = document.querySelector("#chart-dunut")
  dvChartDunut.innerHTML = ""
  let optionsDunut = {
    chart: {
      type: 'donut'
    },
    plotOptions: {
      pie: {
        expandOnClick: false
      }
    },
    series: [myRound(res.totesp, 2), myRound(res.totcar, 2), myRound(res.totdup, 2), myRound(res.totval, 2), myRound(res.totche, 2), myRound(res.totpre, 2), myRound(res.totret, 2), myRound(res.trafil, 2), myRound(res.vdacol, 2), myRound(res.fatpos, 2)],
    labels: ['Espécie', 'Cartão', 'Duplicatas', 'Vales', 'Cheque', 'Cheque Pré', 'Retenção', 'Trans. Filial', 'Coligada', 'Fat. Posterior']
  }
  let chartDunit = new ApexCharts(dvChartDunut, optionsDunut);
  chartDunit.render();
}

