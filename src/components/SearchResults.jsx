import { useEffect, useRef } from "react";
import HotelGrid from "./HotelGrid.jsx";

export default function SearchResults({ result, onBook }) {
  const ref = useRef(null);

  // Scroll to the results every time a new search is made.
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [result]);

  const { query, matches, hotels } = result;

  return (
    <section className="section results" ref={ref}>
      <h2>Search Results</h2>
      <p className="search-message">
        {matches > 0 ? (
          <>
            {matches} hotel(s) found in <strong>{query}</strong>
          </>
        ) : (
          <>
            No hotels found for <strong>{query}</strong>. Showing all available hotels.
          </>
        )}
      </p>
      <HotelGrid hotels={hotels} onBook={onBook} />
    </section>
  );
}
