import { BrowserRouter, Route, Navigate } from "react-router-dom";
import AuthGuard from "./guards/AuthGuard";
import { PrivateRoutes, PublicRoutes } from "./models/routes";
  import Login from "./pages/Login";
import RoutesWithNotFount from "./utilities/RoutesWithNotFount";
import { Suspense, lazy } from "react";
import Loading from "./components/administrator/loader/Loading";
import Kitchen from "./components/kitchen/Kitchen";
import Ecommerce from "./components/orderCustomer/home/Ecommerce";
import Map from "./components/orderCustomer/map/Map";
const Dashboard = lazy(() => import("./pages/Dashboard"));
function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <div className="App">
        <BrowserRouter>
          <RoutesWithNotFount>
            <Route
              path="/"
              element={<Map />}
            />
            <Route path={PublicRoutes.LOGIN} element={<Login />} />
            <Route element={<AuthGuard />}>
              <Route
                path={PrivateRoutes.DASHBOARD}
                element={<Dashboard />}
              ></Route>
                <Route
                path="/kitchen"
                element={<Kitchen />}
            />
            </Route>
          </RoutesWithNotFount>
        </BrowserRouter>
      </div>
    </Suspense>
  );
}

export default App;
