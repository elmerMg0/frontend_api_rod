import React from "react";

const Paginator = ({ pageInfo, getData }) => {
  let { page, count, next, previus, start, totalPages } = pageInfo;

  const handlePrevius = () => getData(previus);

  const handleNext = () => getData(next);

  return (
    <div className="paginator">
      <p>Items por pagina {count}</p>
      <h5>{`${start + 1}-${start + count} de ${page}`}</h5>
      {page === 1 ? 
          <button disabled onClick={handlePrevius} className=" ">{`<`}</button>
          :
          <button onClick={handlePrevius} className=" ">{`<`}</button>
      }
      {
        page === totalPages ? 
        <button disabled onClick={handleNext} className=" ">{`>`}</button>
        :
        <button onClick={handleNext} className=" ">{`>`}</button>
      }
    </div>
  );
};

export default Paginator;
