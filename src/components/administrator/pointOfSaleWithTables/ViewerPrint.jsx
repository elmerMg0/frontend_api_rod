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
import { useContext } from "react";
import { MyContext, PRINTERTYPE } from "./PosWithTables";

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
  global: {
    marginLeft: 5,
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
    width: "30px",
    textAlign: "center",
  },
  tableColName: {
    textAlign: "left",
    width: "130px",
  },
  tableColPrice: {
    textAlign: "right",
    width: "30px",
  },
  tableCellHeader: {
    marginTop: 5,
    fontSize: 12,
  },
  tableCell: {
    fontSize: 14,
  },
  footer: {
    paddingTop: 0,
    paddingLeft: 145,
    textAlign: "left",
    fontSize: 12,
    borderTop: '1px dotted black'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    gap: 70
  }
});
const date = new Date().toLocaleDateString();


const ViewerPrint = ({ saleInfo, setShowViewer, cleanCarrito, customer, printerType, tableSelected}) => {
  const username = useSelector((store) => store.user.username);
  const [hour, setHour] = useState(null);
  const { orderDetailNew, orderDetail} = useContext(MyContext)

  const [items, setItems] = useState([])
  useEffect( () => {
    let hourCurrently = new Date().toLocaleTimeString();
    setHour(hourCurrently);
    if(printerType === PRINTERTYPE.COCINA){
      const productWithoutDrinks = orderDetailNew.filter( prod => prod.tipo === 'comida')
      setItems(productWithoutDrinks)
    }else{
      setItems(orderDetail)
    }
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
                {
                  printerType === PRINTERTYPE.COCINA && 
                  <View style={styles.sectionHeader}>
                    <View style={styles.header}>
                      <Text>Ticket: {saleInfo.numero_pedido}</Text>
                      <Text>Mesa: {tableSelected.nombre}</Text>
                    </View>
                    <Text>Cliente: {customer && Object.keys(customer).length > 0 ? ` ${customer.nombre}` : 'generico'}
                  </Text>
              </View>
              }
              <View style={styles.global}>
                <Text>Mesero: {username}</Text>
               {printerType === PRINTERTYPE.SALON && 
                <Text>Mesa: {tableSelected.nombre}</Text>
               }
                <Text>Fecha: {`${date}  ${hour}`} </Text> 
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
                      <Text>Imp.</Text>
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
              {
                printerType === PRINTERTYPE.SALON && <Text>{`Total: ${saleInfo.cantidad_total}`}</Text>
              }
               {/*  <Text>Pago: {saleInfo.cantidad_cancelada}</Text> */}
              {/*   <Text>
                  Vuelto:{" "}
                  {saleInfo.cantidad_cancelada - saleInfo.cantidad_total}
                </Text>
                <Text>Tipo Pago: {saleInfo.tipo_pago}</Text> */}
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
