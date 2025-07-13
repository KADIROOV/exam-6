import { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useTranslation } from "react-i18next";

function Home() {
  const [page, setPage] = useState(1);
  const limit = 9;
  const skip = (page - 1) * limit;

  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://my-json-server.typicode.com/kadiroov/json-api/db`;

  useEffect(() => {
    setIsPending(true);
    setError(null);

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Ma'lumotni olishda xatolik yuz berdi");
        return res.json();
      })
      .then((json) => {
        const langData = json[i18n.language]; // ✅ kerakli tilni ajratib olish
        if (!langData) throw new Error("Til bo'yicha ma'lumot topilmadi");
        const paginatedData = langData.slice(skip, skip + limit); // ✅ pagination qo‘llash
        setData(paginatedData);
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [apiUrl, i18n.language, page]); // ❗ i18n.language ham dependencies ichida bo‘lishi kerak

  return (
    <section>
      <div className="container">
        {error && <h2 className="error">{t("error")} 404 Not Found</h2>}

        {isPending && (
          <h2 className="loader">
            <span className="loaderr"></span>
          </h2>
        )}

        {!isPending && data && (
          <>
            <ProductList products={data} />

            <Pagination>
              <PaginationContent className="pag-content">
                <PaginationItem>
                  <PaginationPrevious
                    className="previous-btn pag-btn"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                  />
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink isActive>{page}</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    className="next-btn pag-btn"
                    onClick={() =>
                      setPage((prev) => (data.length < limit ? prev : prev + 1))
                    }
                    disabled={data.length < limit}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
