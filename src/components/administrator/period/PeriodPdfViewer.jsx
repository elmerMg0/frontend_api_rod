import { useSelector } from "react-redux";
import {
  PDFViewer,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
    flexDirection: "column",
    width: "100%",
    height: '100%'
  },
  section: {
    padding: 5,
    marginLeft: 20,
    fontSize: 10,
  },
  table: {
    display: "table",
    width: "auto",
    height: "auto",
    borderStyle: "solid",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    textAlign: "center",
  },
  tableColHeader: {
    width: "33%",
    borderStyle: "solid",
    textAlign: "center",
    fontWeight: "bold",
  },
  tableCol: {
    width: "33%",
    textAlign: "center",
  },
  tableColPrice: {
    textAlign: "right",
    width: "33%",
  },
  tableCellHeader: {
    marginTop: 5,
    fontSize: 10,
  },
  tableCell: {
    marginTop: 5,
    fontSize: 10,
  },
  footer: {
    padding: 10,
    textAlign: "right",
    fontSize: 10,
  },
});
const date = new Date().toLocaleDateString();

const PeriodPdfViewer = ({ infoPeriod, setShow, fullCount}) => {
  const username = useSelector((store) => store.user.username);
  const [hour, setHour] = useState('');

  useEffect( () => {
    let hourCurrently = new Date().toLocaleTimeString();
    setHour(hourCurrently);
  },[])
  const handleCancel = () => {
    setShow(false);
  }

  return (
    <div className="bg-pdfviewer">
    <div className="viewer-print">
      <div style={{ height: "calc(100vh - 300px)" }}>
        <PDFViewer style={{ width: "350px", height: "100%" }} 
  >
          <Document>
            {/* <Page size={{ width: '215', height: "auto" }}> */}
            <Page size='A4'>
              {/* Header ticker */}
              <View style={styles.section}>
                <Text>Usuario: {username}</Text>
              </View>
              <View style={styles.section}>
                <Text>CORTE DE CAJA</Text>
                {
                  infoPeriod.fechaInicio && <Text>Desde: {`${infoPeriod.fechaInicio.slice(0,19)}`} </Text>
                }
                <Text>Hasta: {`${date} ${hour}`}</Text>
              </View>

              <View style={styles.section}>
                <Text>VENTAS TOTALES</Text>
                <Text>{`Apertura de Caja: ${infoPeriod.cajaInicial}`}</Text>
                <Text>{`Ventas Efectivo: ${infoPeriod.totalSaleCash}`}</Text>
                <Text>{`Ventas Tarjeta: ${infoPeriod.totalSaleCard}`}</Text>
                <Text>{`Ventas Transferencia: ${infoPeriod.totalSaleTransfer}`}</Text>
                <Text>{`Ventas App: ${infoPeriod.totalSaleApp}`}</Text>
              </View>

              <View style={styles.section}>
                <Text>{`Total Ventas: ${infoPeriod.totalSale}`}</Text>
                <Text>{`Total calculado: ${Number(infoPeriod.totalSale) + Number(infoPeriod.cajaInicial)}`}</Text>
                <Text>{`Total contado: ${fullCount}`}</Text>
                <Text>{`Diferencia: ${fullCount - (Number(infoPeriod.totalSale) + Number(infoPeriod.cajaInicial)) }`}</Text>
              </View>   

        
            </Page>
          </Document>
        </PDFViewer>
      </div>
      <div className="viewer-print_btn" onClick={handleCancel}>
         <button>Salir</button>
      </div>
    </div>
    </div>
  );
};
export default PeriodPdfViewer;
