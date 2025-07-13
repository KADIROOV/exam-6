import Product from "./product";

function ProductsList({ products }) {
  return (
    <div className="card-container">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductsList;
