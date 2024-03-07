import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

const bgImage =
  "https://media.licdn.com/dms/image/C4D05AQHe5JykZ-ruHQ/feedshare-thumbnail_720_1280/0/1615314598001?e=2147483647&v=beta&t=NgTTVrOnH70mpJqEuhIDswFxBcTlslQ1izMkQ2yg8i8";

function Illustration() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Estado para armazenar mensagens de erro
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSignInClick = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para validar o e-mail
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email."); // Definir mensagem de erro se o e-mail for inválido
      return;
    }

    const serverAddress = '127.0.0.1:5001'; // Endereço IP do seu servidor Flask
    const loginUrl = 'http://192.168.32.4:5001/login'; // Rota para a página de login no servidor

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify({
          email: email, // Envia o email do estado local
          password: password, // Envia a senha do estado local
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        sessionStorage.setItem("user", data.username);
        sessionStorage.setItem("token", token);
        // Lógica para lidar com uma resposta bem-sucedida
       navigate('/dashboard', { state: { nomeUsuario: data.username } }); // Redireciona para a página inicial após o login
      } else {
        // Lógica para lidar com uma resposta de erro
        const data = await response.json(); // Extrair mensagem de erro da resposta
        setError(data.message); // Definir mensagem de erro
      }
    } catch (error) {
      // Lógica para lidar com erros de rede ou de outra natureza
      console.error('Erro de rede:', error);
    }
  };

  return (
    <IllustrationLayout
      title="Entrar"
      description="Digite seu e-mail e senha para entrar"
      illustration={{
        image: bgImage,
        title: '"CONSULTORIA EM SOLUÇÕES TECNOLÓGICAS"',
        description:
          "A Morning Star é uma empresa multidisciplinar que fornece consultoria especializada nas áreas de Tecnologia, Gestão & Inovação",
      }}
    >
      <ArgonBox component="form" role="form">
        <ArgonBox mb={2}>
          <ArgonInput type="email" placeholder="Email" size="large" value={email} onChange={(e) => setEmail(e.target.value)} />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput type="password" placeholder="Password" size="large" value={password} onChange={(e) => setPassword(e.target.value)} />
        </ArgonBox>
        {error && ( // Renderizar mensagem de erro se houver um erro
          <ArgonTypography variant="body2" color="error" mb={2}>
            {error}
          </ArgonTypography>
        )}
        <ArgonBox mt={4} mb={1}>
          <ArgonButton color="info" size="large" fullWidth onClick={handleSignInClick}>
            Entrar
          </ArgonButton>
        </ArgonBox>
        <ArgonBox mt={3} textAlign="center">
          <ArgonTypography variant="button" color="text" fontWeight="regular">
            Não tem uma conta?{" "}
            <ArgonTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
            >
              Inscrever-se
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>
    </IllustrationLayout>
  );
}

export default Illustration;
