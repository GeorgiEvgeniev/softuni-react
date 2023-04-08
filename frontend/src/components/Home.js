import { CardCat } from "./CardCat";

export const Home = ({ cat }) => {
  return (
    <div className='container'>
      <div className='hero-image'>
        <h1>Welcome to our Cat Home Page</h1>
        <p>Find everything you need to know about cats here!</p>
      </div>
      <div className='content'>
        <h1 style={{textAlign: "center"}}>Latest cats</h1>
        <section className='catalog-page'>
          {cat
            .sort((a, b) => b._createdOn - a._createdOn)
            .slice(0, 5)
            .map((x) => (
              <CardCat key={x._id} {...x} />
            ))}

          {cat.length === 0 && <h3 className='no-articles'>No cats yet</h3>}
        </section>
      </div>
      <div className='content'>
        <h2>About Cats</h2>
        <p>
          Cats are amazing creatures that have been domesticated for thousands of years. They make great companions and are known for their playful, curious,
          and independent nature. There are many breeds of cats, each with their own unique characteristics.
        </p>
        <h2>Cat Care</h2>
        <p>
          Cat care is important to ensure the health and happiness of your feline friend. Some tips for cat care include providing a healthy diet, regular
          exercise, and grooming. It's also important to take your cat to the vet for regular check-ups and vaccinations.
        </p>
        <h2>Cat Products</h2>
        <p>
          There are many cat products available to make your cat's life more comfortable and enjoyable. Some popular cat products include cat toys, cat trees,
          litter boxes, and scratching posts.
        </p>
      </div>
    </div>
  );
};
