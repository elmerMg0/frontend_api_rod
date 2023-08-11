import { useState } from 'react';
import '../../../../styles/carrito/category.css'

const Category = ({ categories }) => {
  const hasCategory = categories?.length > 0;
  
  const [idCategory, setIdCategory] = useState(0);

  return (
    <section className="carrito-category">
      <ul>
        {hasCategory ? (
          categories.map((cat) => {
            return (
              <li key={cat.id} onClick={() => setIdCategory(cat.id)} className={ cat.id === idCategory ? 'flag' : '' }>
                <a href={`#${cat.id}`}>{cat.nombre}</a>
              </li>
            );
          })
        ) : (
          <li>
            <p>Sin Categorias</p>
          </li>
        )}
      </ul>
    </section>
  );
};
export default Category;