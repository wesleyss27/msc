import Dashboard from "layouts/dashboard";
import EntradaMercadoria from "layouts/entrada";
import SaidaMercadoria from "layouts/saida";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import ArgonBox from "components/ArgonBox";

const routes = [
  {
    type: "route",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-tv-2" />,
    component: <Dashboard />,
  },
  {
    type: "route",
    name: "Entrada de mercadorias",
    key: "entrada",
    route: "/entrada",
    icon: (
      <ArgonBox component="i" color="success" fontSize="14px" className="ni ni-box-2" />
    ),
    component: <EntradaMercadoria />,
  },
  {
    type: "route",
    name: "Saída de mercadorias",
    key: "saida",
    route: "/saida",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-send" />
    ),
    component: <SaidaMercadoria />,
  },
  {
    type: "route",
    key: "sign-in",
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "route",
    key: "sign-up",
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
