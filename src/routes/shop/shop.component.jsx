import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setCategories } from "../../store/categories/categories.action";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import SelectedCategory from "../selected-category/selected-category.component";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoryMap = async () => {
      const categoryArray = await getCategoriesAndDocuments();
      dispatch(setCategories(categoryArray));
    };
    getCategoryMap();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />}></Route>
      <Route path=":category" element={<SelectedCategory />}></Route>
    </Routes>
  );
};

export default Shop;
