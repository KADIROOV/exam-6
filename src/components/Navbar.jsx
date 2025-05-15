import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useTranslation } from "react-i18next";
function Navbar() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  const { totalAmount, cart, dispatch } = useGlobalContext(); 
  return (
    <header>
      <div className="container">
        <h2>
          <Link to="/">Mini Store App</Link>
        </h2>
        <nav>
          <div className="lang-btns">
            <a href="#" onClick={() => changeLanguage("uz")}>
              uz
            </a>
            <a href="#" onClick={() => changeLanguage("en")}>
              en
            </a>
            <a href="#" onClick={() => changeLanguage("ru")}>
              pу
            </a>
          </div>
          <div className="header__card">
            <span className="header__card__indicator">{totalAmount}</span>
            <FaShoppingCart />
            <div className="hidden-card">
              {cart.length > 0 ? (
                cart.map((item) => {
                  const { id, name, price, amount } = item;
        
                  return (
                    <div key={id} className="hidden-card__item">
                      <div className="hidden-card__item-info">
                        <h2 className="hidden-card__title">{name}</h2>
                        <h3 className="hidden-card__price">
                          {t("price-btn")}: ${price}
                        </h3>
                        <p className="hidden-card__price ">
                          {amount}x ${price * amount}
                        </p>
                      </div>
                      <button
                        className="btn hidden-card__remove-btn"
                        onClick={() =>
                          dispatch({ type: "DELETE", payload: id })
                        }
                      >
                        <FaTrash />
                      </button>
                    </div>
                  );
                })
              ) : (
                <p className="hidden__card__info">{t("empty")}</p>
              )}
              {cart.length > 0 && (
                <div className="hidden-card__card-footer">
                  <button
                    onClick={() => dispatch({ type: "CLEAR" })}
                    className="hidden-card__clear-btn"
                  >
                    {t("clear-btn")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
