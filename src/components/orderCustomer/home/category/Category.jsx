import { useState } from 'react';
import '../../../../styles/carrito/category.css'

const Category = ({ categories }) => {
  const hasCategory = categories?.length > 0;
  
  const [idCategory, setIdCategory] = useState(0);

  const easeInOut = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  };

  const linear = (t, b, c, d) => {
    return c * (t / d) + b;
  };
  const handleNavClick = (event, targetId) => {
    event.preventDefault();
    setIdCategory(targetId)
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 150;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;

      const startTime = performance.now();

      function scrollStep(timestamp) {
        const currentTime = timestamp - startTime;
        const easeInOutCubic = linear(currentTime, startPosition, distance, 100);

        window.scrollTo(0, easeInOutCubic);

        if (currentTime < 100) {
          requestAnimationFrame(scrollStep);
        }
      }

      requestAnimationFrame(scrollStep);
    }

  }
  return (
    <section className="carrito-category">
      <ul>
        {hasCategory ? (
          categories.map((cat) => {
            return (
              <li key={cat.id}  onClick={(e) => handleNavClick(e, cat.id)} className={ cat.id === idCategory ? 'flag' : '' }>
                <a href='#'>{cat.nombre}</a>
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
