import { BrowserRouter, Route, Navigate } from "react-router-dom";
import AuthGuard from "./guards/AuthGuard";
import { PrivateRoutes, PublicRoutes } from "./models/routes";
  import Login from "./pages/Login";
import RoutesWithNotFount from "./utilities/RoutesWithNotFount";
import  Main from "./components/orderCustomer/home/Main"
import { Suspense, lazy } from "react";
import Loading from "./components/administrator/loader/Loading";
const Dashboard = lazy(() => import("./pages/Dashboard"));
function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <div className="App">
        <BrowserRouter>
          <RoutesWithNotFount>
            <Route
              path="/"
              element={<Main />}
            />
            <Route path={PublicRoutes.LOGIN} element={<Login />} />
            <Route element={<AuthGuard />}>
              <Route
                path={PrivateRoutes.DASHBOARD}
                element={<Dashboard />}
              ></Route>
            </Route>
          </RoutesWithNotFount>
        </BrowserRouter>
      </div>
    </Suspense>
  );
}

export default App;