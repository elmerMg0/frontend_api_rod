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
    marginLeft: 0,
   /*  flexGrow: 1, */
    fontSize: 12,
  },
  sectionHeader: {
    paddingLeft: 5,
    paddingBottom: 0,
    fontSize: 12,
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
    width: "50px",
    borderStyle: "solid",
    textAlign: "center",
    fontWeight: "bold",
  },
  tableCol: {
    width: "50px",
    textAlign: "center",
  },
  tableColName: {
    textAlign: "left",
    width: "80px",
  },
  tableColPrice: {
    textAlign: "right",
    width: "50px",
  },
  tableCellHeader: {
    marginTop: 5,
    fontSize: 12,
  },
  tableCell: {
    fontSize: 12,
  },
  footer: {
    paddingTop: 0,
    paddingLeft: 10,
    textAlign: "left",
    fontSize: 10,
  },
});
const date = new Date().toLocaleDateString();


const ViewerPrint = ({ infoSale, setShowViewer, cleanCarrito, customer}) => {
  const username = useSelector((store) => store.user.username);
  const items = useSelector((store) => store.carrito.orderDetail);
  const [hour, setHour] = useState(null);

  useEffect( () => {
    let hourCurrently = new Date().toLocaleTimeString();
    setHour(hourCurrently);
  },[])
  const handleCancel = () => {
    setShowViewer(false);
    cleanCarrito()
  }

  return (
    <div className="bg-pdfviewer">
    <div className="viewer-print">
      <div style={{ height: "calc(100vh - 300px)" }}>
        <PDFViewer style={{ width: "350px", height: "100%" }}>
          <Document>
            {/* <Page size={{ width: '170', height: "auto" }}> */}
            <Page size='A4'>
              {/* Header ticker */}
              <View style={styles.sectionHeader}>
                <Text>Ticket: {infoSale.numero_pedido}</Text>
               {/*  <Text>Usuario: {username}</Text> */}
               {/*  <Text>Fecha: {`${date}  ${hour}`} </Text> */}
                <Text>Cliente: {customer}</Text>
              </View>

              {/* Table body */}
              <View style={styles.section}>
                <View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text>Cant.</Text>
                    </View>
                    <View style={styles.tableColName}>
                      <Text>Producto</Text>
                    </View>
                    <View style={styles.tableColPrice}>
                      <Text>Importe</Text>
                    </View>
                  </View>
                  {/* Table rows */}
                  {items &&
                    items.length > 0 &&
                    items.map((prod) => (
                      <View key={prod.id} style={styles.tableRow}>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{prod.cantidad}</Text>
                        </View>
                        <View style={styles.tableColName}>
                          <Text style={styles.tableCell}>{prod.nombre}</Text>
                        </View>
                        <View style={styles.tableColPrice}>
                          <Text style ={styles.tableCell}>{prod.precio_venta * prod.cantidad}</Text>
                        </View>
                      </View>
                    ))}
                </View>
              </View>
              {/* Footer */}
              <View style={styles.footer}>
                <Text>{`Total: ${infoSale.cantidad_total}`}</Text>
               {/*  <Text>Pago: {infoSale.cantidad_cancelada}</Text> */}
              {/*   <Text>
                  Vuelto:{" "}
                  {infoSale.cantidad_cancelada - infoSale.cantidad_total}
                </Text>
                <Text>Tipo Pago: {infoSale.tipo_pago}</Text> */}
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
export default ViewerPrint;
