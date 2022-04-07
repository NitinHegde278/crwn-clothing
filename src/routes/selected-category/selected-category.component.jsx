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
  SelectedCategoryContainer,
  Title,
} from "./selected-category.styles.jsx";

const SelectedCategory = () => {
  const { category } = useParams();
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
    <Fragment>
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
    </Fragment>
  );
};
export default SelectedCategory;
