import { useEffect, useState } from "react";
import { fetchingGenresList } from "../utils/fetching";
import LightButton from "./LightButton";
export default function CategoriesAside({
  onLinksClick,
  currentCategory,
  type,
}) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function fetchData() {
      try {
        const data = await fetchingGenresList(type);
        setCategories(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) return <h4>...loading</h4>;
  return (
    <aside className="categories hide-scrollbar">
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            className={category.id === currentCategory ? "active" : ""}
          >
            <LightButton
              label={category.name}
              icon={<ion-icon name="film-outline"></ion-icon>}
              onClick={() => onLinksClick(category.id)}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
}
