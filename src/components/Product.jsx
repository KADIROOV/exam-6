import { FaShoppingCart } from "react-icons/fa";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useTranslation } from "react-i18next";

function Product({ product }) {
  const { dispatch, cart } = useGlobalContext();
  const itemInCart = cart.find((item) => item.id === product.id);
  const { t } = useTranslation();

  return (
    <div className="card">
      <div className="card__info">
        <h4 className="card__title">{product.name}</h4>
        <p className="card__des">{product.description}</p>
        <span className="card__category">{product.category}</span>
        <span className="card__brand">{product.brand}</span>
        <small className="card__price"> ${product.price}</small>
      </div>

      {!itemInCart ? (
        <button
          onClick={() =>
            dispatch({
              type: "ADD_TO_CART",
              payload: { ...product, amount: 1 },
            })
          }
          className="btn card__btn"
        >
          <FaShoppingCart className="icon" />
        </button>
      ) : (
        <div className="card-action-btns">
          <button
            onClick={() => {
              if (itemInCart.amount === 1) {
                dispatch({ type: "DELETE", payload: product.id });
              } else {
                dispatch({ type: "DECREASE", payload: product.id });
              }
            }}
            className="btn card__btn__amount"
          >
            −
          </button>
          <span className="amount">{itemInCart.amount}</span>
          <button
            onClick={() =>
              dispatch({
                type: "INCREASE",
                payload: product.id,
              })
            }
            className="btn card__btn__amount"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default Product;
