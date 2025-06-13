import "./App.css";
import "./index.css";
import "@splidejs/react-splide/css/core";
import "@splidejs/splide/dist/css/splide.min.css";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import OnlyFooterLayout from "./components/layout/OnlyFooterLayout";
import Login from "./pages/Login/Login";
import Movie from "./pages/Movie";
import ContainedLayout from "./components/layout/ContainedLayout";
import PrivateRoute from "./components/PrivateRoute";
import TvShow from "./pages/TvShow";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<OnlyFooterLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/tv-show/:id" element={<TvShow />} />
        </Route>
        <Route element={<ContainedLayout />}>
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:genreId" element={<Movies />} />
          <Route path="/tv-shows" element={<TvShows />} />
          <Route path="/tv-shows/:genreId" element={<TvShows />} />
          <Route
            path="/watchlist"
            element={
              <PrivateRoute>
                <Watchlist />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
