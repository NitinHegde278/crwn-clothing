import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { selectCategoriesMap } from "../../store/categories/categories.selector";
import {
  SelectedCategoryContainer,
  Title,
} from "./selected-category.styles.jsx";

const SelectedCategory = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <Title>{category}</Title>
      <SelectedCategoryContainer>
        {products &&
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </SelectedCategoryContainer>
    </Fragment>
  );
};

export default SelectedCategory;
