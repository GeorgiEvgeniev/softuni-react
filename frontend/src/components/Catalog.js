import { useEffect } from "react";
import { CardCat } from "./CardCat";
// import { gameServiceFactory } from "../services/catService";
// import { useService } from "../hooks/userService";

export const Catalog = ({ cat }) => {
  // const catService = useService(gameServiceFactory);
  // useEffect(() => {
  //     catService.getAll()
  // }, [catService])
  return (
    <>
      <h1>All cats</h1>
      <section className='catalog-page'>
        {cat.map((x) => (
          <CardCat key={x._id} {...x} />
        ))}

        {cat.length === 0 && <h3 className='no-articles'>No cats yet</h3>}
      </section>
    </>
  );
};
