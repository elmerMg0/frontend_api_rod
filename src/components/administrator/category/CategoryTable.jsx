import React from "react";
import { Table } from "react-bootstrap";
import Paginator from "../../global/paginador/Paginator";
import CategoryTableRow from "./CategoryTableRow";
const CategoryTable = ({
  categories,
  pageInfo,
  getCategories,
  setCategoryToEdit,
  setShow,
  deleteCategory,
}) => {
  return (
    <Table>
      <thead className="head-table">
        <tr>
          <th style={{borderTopLeftRadius: '10px'}}>Nombre</th>
          <th>Descripcion</th>
          <th>Imagen</th>
          <th>Estado</th>
          <th style={{textAlign: 'center', borderTopRightRadius: '10px'}}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {categories && categories.length > 0 ? (
          categories.map((cat) => {
            return (
              <CategoryTableRow
                key={cat.id}
                category={cat}
                setCategoryToEdit={setCategoryToEdit}
                setShow={setShow}
                deleteCategory={deleteCategory}
              />
            );
          })
        ) : (
          <tr>
            <td colSpan={5} className="row-table-notExist">
              No existen resultados!
            </td>
          </tr>
        )}
        <tr>
          <td colSpan={5}>
            {categories.length > 0 && (
              <Paginator pageInfo={pageInfo} getData={getCategories} />
            )}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default CategoryTable;
