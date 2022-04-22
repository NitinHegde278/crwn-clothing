import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
import {
  selectCategoriesError,
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/categories.selector";
import {
  CategoryDiv,
  SelectedCategoryContainer,
  Title,
} from "./selected-category.styles";

type SelectedRouteParams = {
  category: string;
};

const SelectedCategory = () => {
  const { category } = useParams() as SelectedRouteParams;
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const error = useSelector(selectCategoriesError);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    if (error) {
      //Error handling test
      alert(error);
      window.location.reload();
    }
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap, error]);

  return (
    <CategoryDiv>
      <Title>{category}</Title>
      {isLoading ? (
        <Spinner />
      ) : (
        <SelectedCategoryContainer>
          {products &&
            products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </SelectedCategoryContainer>
      )}
    </CategoryDiv>
  );
};
export default SelectedCategory;
