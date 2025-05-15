import Product from "./product";

function ProductsList({ products }) {
  return (
    <div className="card-container">
      {products.data.map((product) => {

        return <Product key={product.id} product={product} />;
      })}
    </div>
  );
}

export default ProductsList;
