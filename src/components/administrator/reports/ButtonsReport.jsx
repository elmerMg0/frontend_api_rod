import charLine from '../../../assets/svg/chartLine.svg'
import analytics from '../../../assets/svg/analytics.svg'
import { reports } from './Report';

const ButtonsReport = ( {setShowReport }) => {
  return (
    <div className="btns-report">
      <div className="btns-report__container brc-1" onClick={()=> setShowReport(reports.grafics)}>
        <h5>Graficos</h5>
        <img src={analytics} alt="icon charline" />
      </div>
      <div className="btns-report__container brc-2" onClick={() => setShowReport(reports.ventas)}>
        <h5>Ventas</h5>
        <img src={charLine} alt="icon charline" />
      </div>
     {/*  <div className="btns-report__container brc-3">
        <h5>Productos</h5>
        <button className="">other</button>
      </div>
      <div className="btns-report__container brc-4">
        <h5>text</h5>
        <button className="">other</button>
      </div> */}
    </div>
  );
};
export default ButtonsReport;
