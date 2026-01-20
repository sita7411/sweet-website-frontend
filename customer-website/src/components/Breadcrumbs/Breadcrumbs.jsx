import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs({ product = {}, separator = "/" }) {
  const location = useLocation();

  const breadcrumbs = [
    {
      name: "Home",
      path: "/",
    },
    product.category
      ? {
          name: product.category,
          path: `/shop`,
        }
      : null,
    {
      name: product.title || product.name || "Product",
    },
  ].filter(Boolean);

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full  ml-6 text-sm sm:text-base font-medium"
    >
      <ol className="flex flex-wrap items-center text-[var(--text-muted)]">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={index} className="flex items-center">
              {!isLast ? (
                <>
                  <Link
                    to={crumb.path}
                    className="hover:text-[var(--primary)] transition-colors"
                  >
                    {crumb.name}
                  </Link>

                  <span className="mx-2 select-none">
                    {separator}
                  </span>
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
