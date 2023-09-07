import { useSelector } from "react-redux";
import { BottleIcon, BurgerIcon, Bussines, CategoryIcon, CustomerIcon, PeriodIcon, PosIcon, ProductsIcon, ReportIcon, SeetingsIcon, TablesIcon, TicketIcon, TrolleyIcon, UsersIcon } from "../../icons/Icons";

const iconsNavigation = {
    company: () => <SeetingsIcon/>,
    user: () => <UsersIcon/>,
    customer: () => <CustomerIcon/>,
    products: () => <ProductsIcon/>,
    category: () => <CategoryIcon/>,
    orderApp: () => <TrolleyIcon/>,
    pos: () => <PosIcon/>,
    report: () => <ReportIcon/>,
    loungeConfig: () => <h1></h1>,
    lounges: () => <TablesIcon/>,
    saleHistory: () => <TicketIcon/>,
    period: () => <PeriodIcon/>,
    detailPeriod: () => <PeriodIcon/>,
    reportProduct: () => <h1></h1>,
    inventary: () => <BottleIcon/>,
    currentInventary: () => <h1></h1>,
  /*   printer: () => <h1></h1>,
    printSpooler: () => <SeetingsIcon/>,
    expense: () => <SeetingsIcon/>  */
  }

export function NavigationLink ({value, changeView}) {
    const viewDashboard = useSelector((store) => store.dashboard);
    const { view, name} = value;
    return (
      <li className={viewDashboard === view ? "bg-link" : ""}>
      <div
        onClick={() => changeView(view)}
        className="navigation__content"
      >
        {iconsNavigation[view]()}
      
        <button className="navigation__link" href="">
          {name}
        </button>
      </div>
    </li>
    )
}
