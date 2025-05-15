import { useState } from "react";
import ProductList from "../components/ProductList";
import { useFetch } from "../hooks/useFetch";
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

  const { t, i18n } = useTranslation();
  const apiUrl = `http://localhost:3000/${i18n.language}?_page=${page}&_per_page=${limit}`;
  console.log(apiUrl);
  const { data, error, isPending } = useFetch(apiUrl);

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
