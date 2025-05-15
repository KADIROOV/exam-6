import { FaShoppingCart } from "react-icons/fa";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useTranslation } from "react-i18next";

function Product({ product }) {
  const { dispatch, cart } = useGlobalContext();
  const itemInCart = cart.find((item) => item.id == product.id);
  const { t, i18n } = useTranslation();
  // console.log(product)
  return (
    <div className="card">
      <div className="card__info">
        <h4 className="card__title">{product.name}</h4>
        <p className="card_des">{product.description}</p>
        <span className="card_category">{product.category}</span>
        <small className="card__price">
          {t("price-btn")}: ${product.price}
        </small>
      </div>

      {!itemInCart && (
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
      )}

      {itemInCart && (
        <div className="card-action-btns">
          <button
            onClick={() => {
              if (itemInCart.amount == 1) {
                dispatch({ type: "DELETE", payload: product.id });
              } else {
                dispatch({ type: "DECREASE", payload: product.id });
              }
            }}
            className="btn card__btn__amount"
          >
            &#8722;
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
            &#43;
          </button>
        </div>
      )}
    </div>
  );
}

export default Product;
