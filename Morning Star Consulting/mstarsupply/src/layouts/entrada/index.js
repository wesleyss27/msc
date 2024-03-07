import React, { useState, useEffect  } from 'react';
import Card from "@mui/material/Card";
import axios from 'axios';
import './styles.css';
import {MenuItem, Select } from '@mui/material';
import {
  MDBRow,
  MDBCol,
  MDBBtn,
} from 'mdb-react-ui-kit';

import ArgonBox from 'components/ArgonBox';
import ArgonTypography from 'components/ArgonTypography';

import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';

import ArgonButton from "components/ArgonButton";
import Icon from "@mui/material/Icon";
import { useLocation, Link } from "react-router-dom";
import swal from 'sweetalert';

function CadastroMercadoria() {
    const [formData, setFormData] = useState({
      entries: [
        {
          nome: '',
          registro: '',
          fabricante: '',
          tipo: '',
          descricao: '',
          quantidade: '',
          dataHora: '',
          local: '',
          mercadoriaSelecionada: 'Selecione Mercadoria' // Mercadoria selecionada no dropdown
        }
      ]
    });
  
    const [newProductData, setNewProductData] = useState({
      nome: '',
      registro: '',
      fabricante: '',
      tipo: '',
      descricao: ''
    });
  
    const [mercadorias, setMercadorias] = useState([]);

    useEffect(() => {
        async function fetchMercadorias() {
            try {
                const response = await axios.get('http://flask/mercadorias');
                setMercadorias(response.data.mercadorias);
                console.log(mercadorias)
            } catch (error) {
                console.error('Erro ao buscar mercadorias:', error);
                swal( "Oops" ,  "Erro ao buscar mercadorias" ,  "error" )
            }
        }

        fetchMercadorias();
    }, []);
  
    const [showNewProductForm, setShowNewProductForm] = useState(false);
  
    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        //await axios.post('http://127.0.0.1:5001/mercadoria', formData.entries[0]);
        const response = await axios.post('http://flask/entrada_mercadoria', formData);
        if (response.status === 201) {
          swal("Feito", "Mercadoria cadastrada com sucesso!", "success");
          setFormData({
            entries: [{
              nome: '',
              registro: '',
              fabricante: '',
              tipo: '',
              descricao: '',
              quantidade: '',
              dataHora: '',
              local: '',
              mercadoriaSelecionada: ''
            }]
          });
        } else {
          console.error('Erro ao cadastrar entrada de mercadoria:', response.statusText);
          alert('Erro ao cadastrar entrada de mercadoria');
        }
        } catch (error) {
          console.error('Erro ao cadastrar entrada de mercadoria:', error);
          swal( "Oops" ,  "Erro ao cadastrar entrada de mercadoria" ,  "error" )
        }
    };
  
    const handleChange = (index, key, value) => {
      const updatedFormData = { ...formData };
      updatedFormData.entries[index][key] = value;
      setFormData(updatedFormData);
    };
  
    const addNewEntry = () => {
      setFormData({
        entries: [...formData.entries, {
          nome: '',
          registro: '',
          fabricante: '',
          tipo: '',
          descricao: '',
          quantidade: '',
          dataHora: '',
          local: '',
          mercadoriaSelecionada: "Selecione Mercadoria"
        }]
      });
    };
  
    const removeEntry = (index) => {
      const updatedFormData = { ...formData };
      updatedFormData.entries.splice(index, 1);
      setFormData(updatedFormData);
    };
  
    const handleSubmitNewProduct = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://flask/mercadoria', newProductData);
        if (response.status === 201) {
          console.log('Novo produto cadastrado:', newProductData);
          swal("Feito", "Novo produto cadastrado com sucesso!", "success");
          setNewProductData({
            nome: '',
            registro: '',
            fabricante: '',
            tipo: '',
            descricao: ''
          });
        } else {
          console.error('Erro ao cadastrar novo produto:', response.statusText);
          alert('Erro ao cadastrar novo produto');
        }
      } catch (error) {
        console.error('Erro ao cadastrar novo produto:', error);
        alert('Erro ao cadastrar novo produto');
      }
    };
  
    const handleAddNewProduct = () => {
      setShowNewProductForm(true);
    };
  
    const handleCancelNewProduct = () => {
      setShowNewProductForm(false);
    };
  
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <ArgonBox py={3}>
          <ArgonBox>
            {!showNewProductForm ? (
              <Card>
                <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                  <ArgonTypography variant="h6">Entrada de Mercadoria</ArgonTypography>
                    <ArgonButton color="dark" onClick={handleAddNewProduct}>
                            {/* <Icon sx={{ fontWeight: "bold" }}>add</Icon> */}
                            &nbsp;Nova Mercadoria
                    </ArgonButton>
                  
                </ArgonBox>
                <form onSubmit={onSubmit} style={{ width: '98%',margin: '20px' }}>
                  {formData.entries.map((entry, index) => (
                    <MDBRow key={index} className="mb-3 input-row" style={{ justifyContent: 'flex-start' }}>
                      <MDBCol style={{ marginRight: '20px' }}>
                        <input
                          type="number"
                          className="form-control form-control-lg"
                          placeholder="Quantidade"
                          value={entry.quantidade}
                          onChange={(e) => handleChange(index, 'quantidade', e.target.value)}
                          required
                          style={{
                            border: '1px solid #ccc', 
                            borderRadius: '5px', 
                            padding: '8px', 
                            width: '100%' 
                        }}
                        />
                      </MDBCol>
                      <MDBCol style={{ marginRight: '20px' }}>
                        <input
                          type="datetime-local"
                          placeholder="Data e Hora"
                          value={entry.dataHora}
                          onChange={(e) => handleChange(index, 'dataHora', e.target.value)}
                          required
                          style={{
                            border: '1px solid #ccc', 
                            borderRadius: '5px', 
                            padding: '8px', 
                            width: '100%' 
                        }}
                        />
                      </MDBCol>
                      <MDBCol style={{ marginRight: '20px' }}>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Local"
                          value={entry.local}
                          onChange={(e) => handleChange(index, 'local', e.target.value)}
                          required
                          style={{
                            border: '1px solid #ccc', 
                            borderRadius: '5px', 
                            padding: '8px', 
                            width: '100%' 
                        }}
                        />
                        
                      </MDBCol>
                      <MDBCol style={{ marginRight: '20px' }}>
                    
                      {mercadorias.length > 0 ? (
                          <Select
                            labelId="select-mercadorias-label"
                            value={entry.mercadoriaSelecionada || mercadorias[0].nome}
                            onChange={(e) => handleChange(index, 'mercadoriaSelecionada', e.target.value)}
                            required
                            style={{
                              border: '1px solid #ccc', 
                              borderRadius: '5px', 
                              padding: '8px', 
                              width: '100%' 
                          }}
                          >
                            <MenuItem value="Selecione Mercadoria" disabled>Selecione Mercadoria</MenuItem>
                            {mercadorias.map((mercadoria) => (
                              <MenuItem key={mercadoria.id} value={mercadoria.id}>{mercadoria.nome}</MenuItem>
                            ))}
                          </Select>
                        ) : (
                          <p>Carregando...</p>
                        )}
                      
                        </MDBCol>


                      <MDBCol size="1" className="d-flex align-items-center" style={{ marginRight: '20px' }}>
                        <ArgonButton color="error" type="button" onClick={() => removeEntry(index)}>
                          REMOVE
                        </ArgonButton>
                      </MDBCol>
                    </MDBRow>
                  ))}
                  <MDBRow className="mb-3">
                    <MDBCol>
                        <ArgonButton color="info" fullWidth onClick={addNewEntry}>
                            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                            &nbsp;ADD
                        </ArgonButton>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-3">
                    <MDBCol>
                      <ArgonButton color="dark" type="submit">Cadastrar</ArgonButton>
                    </MDBCol>
                  </MDBRow>

                </form>
              </Card>
            ) : (
              <ArgonBox>
                <Card>
                  {/* Formulário para adicionar novo produto */}
                  <Card>
                    <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <ArgonTypography variant="h6">Novo produto</ArgonTypography>
                    </ArgonBox>
                    <form onSubmit={handleSubmitNewProduct} style={{ width: '98%', margin: '0 auto' }}>
                        <MDBRow className="mb-3 input-row" style={{ justifyContent: 'flex-start' }}>
                            <MDBCol style={{ marginRight: '20px' }}>
                            <input
                                label="Nome"
                                placeholder="Nome"
                                value={newProductData.nome}
                                onChange={(e) => setNewProductData({ ...newProductData, nome: e.target.value })}
                                required
                                style={{
                                  border: '1px solid #ccc', 
                                  borderRadius: '5px', 
                                  padding: '8px', 
                                  width: '100%' 
                              }}
                            />
                            </MDBCol>  
                            <MDBCol style={{ marginRight: '20px' }}>
                            <input
                                label="Número de Registro"
                                placeholder="Número de Registro"
                                value={newProductData.registro}
                                onChange={(e) => setNewProductData({ ...newProductData, registro: e.target.value })}
                                required
                                style={{
                                  border: '1px solid #ccc', 
                                  borderRadius: '5px', 
                                  padding: '8px', 
                                  width: '100%' 
                              }}
                            />
                            </MDBCol>
                        
                        
                            <MDBCol style={{ marginRight: '20px' }}>
                            <input
                                label="Fabricante"
                                placeholder="Fabricante"
                                value={newProductData.fabricante}
                                onChange={(e) => setNewProductData({ ...newProductData, fabricante: e.target.value })}
                                required
                                style={{
                                  border: '1px solid #ccc', 
                                  borderRadius: '5px', 
                                  padding: '8px', 
                                  width: '100%' 
                              }}
                            />
                            </MDBCol>
        
                            <MDBCol style={{ marginRight: '20px' }}>
                            <input
                                label="Tipo"
                                placeholder="Tipo"
                                value={newProductData.tipo}
                                onChange={(e) => setNewProductData({ ...newProductData, tipo: e.target.value })}
                                required
                                style={{
                                  border: '1px solid #ccc', 
                                  borderRadius: '5px', 
                                  padding: '8px', 
                                  width: '100%' 
                              }}
                            />
                            </MDBCol>
                            <MDBCol style={{ marginRight: '20px' }}>
                            <input
                                label="Descrição"
                                placeholder="Descrição"
                                value={newProductData.descricao}
                                onChange={(e) => setNewProductData({ ...newProductData, descricao: e.target.value })}
                                required
                                style={{
                                  border: '1px solid #ccc', 
                                  borderRadius: '5px', 
                                  padding: '8px', 
                                  width: '100%',
                              }}
                            />
                            </MDBCol>

                        </MDBRow>
                        <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                            <ArgonButton color="dark" type="submit">Cadastrar</ArgonButton>
                            <ArgonButton color="error" onClick={handleCancelNewProduct}>Cancelar</ArgonButton>
                        </ArgonBox>
                    </form>
                  </Card>
                </Card>
              </ArgonBox>
            )}
          </ArgonBox>
          <Footer />
        </ArgonBox>
      </DashboardLayout>
    );
  }
  
  export default CadastroMercadoria;
  
