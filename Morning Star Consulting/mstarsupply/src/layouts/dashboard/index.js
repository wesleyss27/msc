import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import React, { useState, useEffect } from 'react';

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";
import CategoriesList from "examples/Lists/CategoriesList";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import InfoIcon from '@mui/icons-material/Info';
import ArgonButton from "components/ArgonButton";

// Argon Dashboard 2 MUI base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import Slider from "layouts/dashboard/components/Slider";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

// Data
import SalesOverviewChart from "layouts/dashboard/data/gradientLineChartData";
import SalesTableData from "layouts/dashboard/data/salesTableData";
import categoriesListData from "layouts/dashboard/data/categoriesListData";
import Pagination from '@mui/material/Pagination';

function Default() {
  const { size } = typography;
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const salesData = SalesTableData();
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const lastIndex = page * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const salesDataObject = SalesTableData();
  const entradas = salesDataObject.entradas;
  const saidas = salesDataObject.saidas;
  const totalQuantidade = salesDataObject.totalQuantidade;
  const totalQuantidadeEntradas = salesDataObject.totalQuantidadeEntradas;
  const totalQuantidadeSaidas = salesDataObject.totalQuantidadeSaidas;
  const aumentoPorcentagemEntrada = salesDataObject.aumentoPorcentagemEntrada;
  const aumentoPorcentagemSaida = salesDataObject.aumentoPorcentagemSaida;
  const colorEntrada = salesDataObject.colorEntrada;
  const colorSaida = salesDataObject.colorSaida;
  const paginatedDataEntradas = entradas.slice(firstIndex, lastIndex);
  const paginatedDataSaidas = saidas.slice(firstIndex, lastIndex);
  const Char = SalesOverviewChart();

  
  const handleExportPDF = (data, etc) => {
    console.log(etc)
    fetch('http://flask/export_pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, etc }), // Envie `saidas` como parte do corpo da solicitação
    })
      .then((response) => {
        if (response.ok) {
          // Inicia o download do PDF
          return response.blob();
        } else {
          throw new Error('Erro ao exportar para PDF: ' + response.statusText);
        }
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sales_report.pdf');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Total entrada de mercadorias"
              count={totalQuantidadeEntradas}
              icon={{
                color: "success",
                component: (
                  <Icon sx={{ color: 'success' }}>
                    <ArrowUpwardIcon />
                  </Icon>
                )
              }}
              percentage={{ color: colorEntrada, count: `${aumentoPorcentagemEntrada.toFixed(2)}%`, text: "desde ontem" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Total saída de Mercadorias"
              count={totalQuantidadeSaidas}
              icon={{
                color: "error",
                component: (
                  <Icon sx={{ color: 'error' }}>
                    <ArrowDownwardIcon />
                  </Icon>
                )
              }}
              percentage={{ color: colorSaida, count: `${aumentoPorcentagemSaida.toFixed(2)}%`, text: "desde ontem" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Total de Mercadorias"
              count={totalQuantidade}
              icon={{
                color: "info",
                component: (
                  <Icon sx={{ color: 'error' }}>
                    <InfoIcon />
                  </Icon>
                )
              }}
              percentage={{text: "Número total de Mercadorias em estoque" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} lg={7}>
            <GradientLineChart
              title="Sales Overview"
              description={
                <ArgonBox display="flex" alignItems="center">
                  <ArgonBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                    <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                  </ArgonBox>
                  <ArgonTypography variant="button" color="text" fontWeight="medium">
                    4% more{" "}
                    <ArgonTypography variant="button" color="text" fontWeight="regular">
                      in 2022
                    </ArgonTypography>
                  </ArgonTypography>
                </ArgonBox>
              }
              chart={Char.chartData}
            />
          </Grid>
          <Grid item xs={12} lg={5}>
            <Slider />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <SalesTable title="Entrada de mercadorias" rows={paginatedDataEntradas} />
          </Grid>
          <Grid item xs={12} md={6}>
            <SalesTable title="Saída de mercadorias" rows={paginatedDataSaidas} />
          </Grid>
          <Grid item xs={12} md={6}>
          <ArgonButton
              color="info"
              variant="gradient"
              onClick={() => handleExportPDF(entradas, 'entradas')}
              fullWidth
            >
              EXPORTAR PARA PDF
            </ArgonButton>
        </Grid>
        <Grid item xs={12} md={6}>
            <ArgonButton
              color="info"
              variant="gradient"
              onClick={() => handleExportPDF(saidas, 'saídas')}
              fullWidth
            >
              EXPORTAR PARA PDF
            </ArgonButton>
        </Grid>
        </Grid>
          
    
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Default;
