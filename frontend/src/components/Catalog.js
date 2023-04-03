import { CardCat } from "./CardCat";

export const Catalog = ({
    cat,
}) => {
    return (
        <section id="catalog-page">
            <h1>All cats</h1>

            {cat.map(x =>
                <CardCat key={x._id} {...x} />
            )}

            {cat.length === 0 && (
                <h3 className="no-articles">No cats yet</h3>
            )}
        </section>
    );
};