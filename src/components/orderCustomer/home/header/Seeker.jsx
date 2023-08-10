import search from "../../../../assets/svg/search.svg";

const Seeker = () => {
  return (
    <section className="carrito-seeker">
      <div className="carrito-seeker__input">
        <img src={search} alt="buscador" />
        <input type="text" placeholder="Que vas a pedir hoy?" />
      </div>
    </section>
  );
};
export default Seeker;
