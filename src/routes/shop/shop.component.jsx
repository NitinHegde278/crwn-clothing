import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { fetchCategoriesAsync } from "../../store/categories/categories.action";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import SelectedCategory from "../selected-category/selected-category.component";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />}></Route>
      <Route path=":category" element={<SelectedCategory />}></Route>
    </Routes>
  );
};

export default Shop;
