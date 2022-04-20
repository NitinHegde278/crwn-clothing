import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryItem } from "../../store/categories/categories.types";
import ProductCard from "../product-card/product-card.component";
import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from "./category-preview.styles";

type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate(`/shop/${title}`);
  };
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title onClick={navigateHandler}>{title}</Title>
      </h2>
      <Preview>
        {products
          .filter((_, index) => {
            return index < 4;
          })
          .map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
