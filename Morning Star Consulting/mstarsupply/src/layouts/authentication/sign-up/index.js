
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg";

  

function Cover() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSignInClick = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email."); 
      return;
    }

    const serverAddress = '127.0.0.1:5001'; 
    const loginUrl = 'http://flask/register'; 

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password, 
          username: username
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        sessionStorage.setItem("user", data.username);
        sessionStorage.setItem("token", token);
       navigate('/login', { state: { nomeUsuario: data.username } });
      } else {
        const data = await response.json(); 
        setError(data.message); 
      }
    } catch (error) {
      console.error('Erro de rede:', error);
    }
  };

  return (
    <CoverLayout
      title="Bem-vindo!"
      description="Morning Star Consulting"
      image={bgImage}
      imgPosition="top"
      button={{ color: "dark", variant: "gradient" }}
    >
      <Card>
        <ArgonBox p={3} mb={1} textAlign="center">
          <ArgonTypography variant="h5" fontWeight="medium">
            Registre-se
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox pt={2} pb={3} px={3}>
          <ArgonBox component="form" role="form">
            <ArgonBox mb={2}>
              <ArgonInput placeholder="Nome" value={username} onChange={(e) => setUserName(e.target.value)}/>
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput type="password" placeholder="Senha" alue={password} onChange={(e) => setPassword(e.target.value)}/>
            </ArgonBox>
            <ArgonBox display="flex" alignItems="center">
            </ArgonBox>
            {error && ( // Renderizar mensagem de erro se houver um erro
              <ArgonTypography variant="body2" color="error" mb={2}>
                {error}
              </ArgonTypography>
            )}
            <ArgonBox mt={4} mb={1}>
              <ArgonButton variant="gradient" color="dark" fullWidth onClick={handleSignInClick}>
                Registrar
              </ArgonButton>
            </ArgonBox>
            <ArgonBox mt={2}>
              <ArgonTypography variant="button" color="text" fontWeight="regular">
              já tem uma conta?&nbsp;
                <ArgonTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Entrar
                </ArgonTypography>
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
