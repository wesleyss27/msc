import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const SalesOverviewChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch('http://flask/dados_grafico');
        if (!response.ok) {
          throw new Error('Failed to fetch chart data');
        }
        const data = await response.json();
        const transformedData = transformToChartDataStructure(data);
        console.log(transformedData)
        setChartData(transformedData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, []);

  const transformToChartDataStructure = (data) => {
    const labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const datasets = data.mercadorias.map(mercadoria => {
      const entradas = new Array(12).fill(0);
      const saidas = new Array(12).fill(0);
      mercadoria.entradas.forEach(entrada => {
        entradas[entrada.mes - 1] = parseFloat(entrada.quantidade);
      });
      mercadoria.saidas.forEach(saida => {
        saidas[saida.mes - 1] = parseFloat(saida.quantidade);
      });
      return [{
        label: `${mercadoria.nome} (Entradas)`,
        data: entradas,
        fill: false,
        color: 'success'
      }, {
        label: `${mercadoria.nome} (Saídas)`,
        data: saidas,
        fill: false,
        color: 'error',
      }];
    });
  
    return {
      labels: labels,
      datasets: datasets.flat() 
    };
  };

  return {chartData}
}

export default SalesOverviewChart;
