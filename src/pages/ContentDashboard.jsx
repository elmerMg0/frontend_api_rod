import CustomerCrud from '../components/administrator/customer/CustomerCrud'
import CategoryCrud from '../components/administrator/category/CategoryCrud'
import { useSelector } from 'react-redux'
import ProductCrud from '../components/administrator/product/ProductCrud'
import PointOfSale from '../components/administrator/pointOfSale/PointOfSale'
import User from '../components/administrator/user/User'
import Period from '../components/administrator/period/Period'
import  Report from '../components/administrator/reports/Report'
import Company from '../components/administrator/company/Company'
import SaleHistory from '../components/administrator/saleHistory/SaleHistory'
import DeliveryApp from '../components/administrator/delivery/DeliveryApp'
import ReportProduct from '../components/administrator/reportProduct/ReportProduct'
const ContentDashboard = () => {
    //aqui todos los componente customers, users, products, etc
/*   const CustomerCrud = lazy(() => import("..//components/administrator/customer/CustomerCrud"));
  const CategoryCrud = lazy(() => import("../components/administrator/category/CategoryCrud"));
  const ProductCrud = lazy(() => import("../components/administrator/product/ProductCrud"));
  const PointOfSale = lazy(() => import("../components/administrator/pointOfSale/PointOfSale"));
  const User = lazy(() => import("../components/administrator/user/User"));
  const Period = lazy(() => import("../components/administrator/period/Period"));
  const Company = lazy(() => import("../components/administrator/company/Company"));
  const SaleHistory = lazy(() => import("../components/administrator/saleHistory/SaleHistory"));
  const Report = lazy(() => import("../components/administrator/reports/Report")); */
  
  const view = useSelector(store => store.dashboard )
  return (
    <>
      {
        view === 'customer' && <CustomerCrud/>
      }
      {
        view === 'category' && <CategoryCrud/>
      }
       {
        view === 'product' && <ProductCrud/>
      }
       {
        view === 'pos' && <PointOfSale/>
      }        
      {
        view === 'user' && <User/>
      }  
       {
        view === 'period' && <Period/>
      } 
      {
        view === 'report' && <Report/>
      }
            {
        view === 'company' && <Company/>
      }
      {
        /* view === 'help' && <PrinterApp/> */
      }
      {
        view === 'saleHistory' && <SaleHistory/>
      }
      { view === 'orderApp' && <DeliveryApp/>}
      { view === 'reportProduct' && <ReportProduct/>}
    </>
  )
}

export default ContentDashboard