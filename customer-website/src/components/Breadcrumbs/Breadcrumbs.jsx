import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumbs({ product, separator = "/" }) {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    product.category
      ? { name: product.category, path: `/products?category=${product.category}` }
      : null,
    { name: product.title },
  ].filter(Boolean);

  return (
    <nav
      className="text-sm sm:text-base font-medium ml-6"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-2">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={index} className="inline-flex items-center">
              {!isLast ? (
                <>
                  <Link
                    to={crumb.path}
                    className="text-[var(--text-muted)] hover:text-[var(--primary)] hover:underline transition-colors"
                  >
                    {crumb.name}
                  </Link>
                  <span className="mx-2 text-[var(--text-muted)]">{separator}</span>
                </>
              ) : (
                <span
                  className="text-[var(--text-main)] font-semibold"
                  aria-current="page"
                >
                  {crumb.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
