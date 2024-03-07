// PrivateRoute.js
import { Route, Navigate } from 'react-router-dom';
import PropTypes from "prop-types";

const PrivateRoute = ({ children, ...rest }) => {
  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return token; // Retorna true se o token existir, caso contrário, retorna false
  };

  return (
    <Route {...rest}>
      {isLoggedIn() ? (
        children // Renderiza o conteúdo da rota se o usuário estiver autenticado
      ) : (
        <Navigate to="/login" replace /> // Redireciona para a página de login se não estiver autenticado
      )}
    </Route>
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
