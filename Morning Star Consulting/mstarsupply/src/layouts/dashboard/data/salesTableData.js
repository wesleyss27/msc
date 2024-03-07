

import React, { useState, useEffect } from 'react';

const fetchSalesData = async () => {
  try {
    const response = await fetch('http://flask/relatorio');
    if (!response.ok) {
      throw new Error('Failed to fetch sales data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return null;
  }
};

function SalesTableData() {
  const [salesData, setSalesData] = useState([]);
  const [salesDataSaidas, setSalesDataSaidas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSalesData();
      if (data) {
        // Verifica se a chave "entradas" existe e se contém dados
        if (data.entradas && data.entradas.length > 0) {
          setSalesData(data.entradas);
        } else {
          console.error('No sales data found for entradas');
        }
        // Verifica se a chave "saidas" existe e se contém dados
        if (data.saidas && data.saidas.length > 0) {
          setSalesDataSaidas(data.saidas);
        } else {
          console.error('No sales data found for saidas');
        }
      }
    };
    fetchData();
  }, []);
  const totalQuantidadeEntradas = salesData.reduce((total, item) => total + item.quantidade, 0);
  const totalQuantidadeSaidas = salesDataSaidas.reduce((total, item) => total + item.quantidade, 0);
  const totalQuantidade = totalQuantidadeEntradas - totalQuantidadeSaidas;
  const hoje = new Date();
  const ontem = new Date();
  ontem.setDate(hoje.getDate() - 1);

  const entradasHoje = salesData.filter(item => new Date(item.data_hora).toDateString() === hoje.toDateString());
  const entradasOntem = salesData.filter(item => new Date(item.data_hora).toDateString() === ontem.toDateString());

  const saidasHoje = salesDataSaidas.filter(item => new Date(item.data_hora).toDateString() === hoje.toDateString());
  const saidasOntem = salesDataSaidas.filter(item => new Date(item.data_hora).toDateString() === ontem.toDateString());

  const totalEntradasHoje = entradasHoje.reduce((total, item) => total + item.quantidade, 0);
  const totalEntradasOntem = entradasOntem.reduce((total, item) => total + item.quantidade, 0);

  const totalSaidasHoje = saidasHoje.reduce((total, item) => total + item.quantidade, 0);
  const totalSaidasOntem = saidasOntem.reduce((total, item) => total + item.quantidade, 0);

  const aumentoPorcentagemEntrada = ((totalEntradasHoje - totalEntradasOntem) / totalEntradasOntem) * 100;
  const aumentoPorcentagemSaida = ((totalSaidasHoje - totalSaidasOntem) / totalSaidasOntem) * 100;
  const colorEntrada = aumentoPorcentagemEntrada >= 0 ? 'success' : 'error';
  const colorSaida = aumentoPorcentagemSaida >= 0 ? 'success' : 'error';
  return { entradas: salesData, saidas: salesDataSaidas, totalQuantidade, totalQuantidadeEntradas, totalQuantidadeSaidas, aumentoPorcentagemEntrada, aumentoPorcentagemSaida ,colorEntrada, colorSaida};
}




export default SalesTableData;
