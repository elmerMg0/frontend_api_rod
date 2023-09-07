import CustomerCrud from "../components/administrator/customer/CustomerCrud";
import CategoryCrud from "../components/administrator/category/CategoryCrud";
import { useSelector } from "react-redux";
import ProductCrud from "../components/administrator/product/ProductCrud";
import PointOfSale from "../components/administrator/pointOfSale/PointOfSale";
import User from "../components/administrator/user/User";
import Period from "../components/administrator/period/Period";
import Report from "../components/administrator/reports/Report";
import Company from "../components/administrator/company/Company";
import SaleHistory from "../components/administrator/saleHistory/SaleHistory";
import DeliveryApp from "../components/administrator/delivery/DeliveryApp";
import ReportProduct from "../components/administrator/reportProduct/ReportProduct";
import Inventary from "../components/administrator/inventario/Inventary";
import CurrentInventary from "../components/administrator/currentInventary/CurrentInventary";
import Lounges from "../components/administrator/lounges/Lounges";
import LoungeConfig from '../components/administrator/loungeConfig/LoungeConfig'
const ContentDashboard = () => {
  const view = useSelector((store) => store.dashboard);
  return (
    <>
      {view === "customer" && <CustomerCrud />}
      {view === "category" && <CategoryCrud />}
      {view === "product" && <ProductCrud />}
      {view === "pos" && <PointOfSale />}
      {view === "user" && <User />}
      {view === "period" && <Period />}
      {view === "report" && <Report />}
      {view === "company" && <Company />}
      {/* view === 'help' && <PrinterApp/> */}
      {view === "saleHistory" && <SaleHistory />}
      {view === "orderApp" && <DeliveryApp />}
      {view === "reportProduct" && <ReportProduct />}
      {view === "inventary" && <Inventary />}
      {view === "inventaryCurrent" && <CurrentInventary />}
      {view === "lounges" && <Lounges />}
      {view === "loungeConfig" && <LoungeConfig />}
    </>
  );
};

export default ContentDashboard;
