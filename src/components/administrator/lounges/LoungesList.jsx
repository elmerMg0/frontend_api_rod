import { Spinner } from "react-bootstrap";

const LoungesList = ({ lounges, loungeFlag, loungeSelected, loading }) => {
  return (
    <section className="lounges-list">
      {lounges && lounges.length > 0
        ? lounges.map((lounge) => {
            return (
              <div
                className={` lounges-list__card ${loungeFlag === lounge.id ? 'flag-card': ''}`}
                key={lounge.id}
                onClick={() => loungeSelected(lounge)}
              >
                {
                  loading && loungeFlag === lounge.id? 
                    <Spinner size='sm'variant="primary"/>
                  :
                  lounge.nombre
                }
              </div>
            );
          })
        : "No existen salones"}
    </section>
  );
};

export default LoungesList;
