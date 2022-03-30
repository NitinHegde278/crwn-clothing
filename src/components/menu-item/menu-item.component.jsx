import { useNavigate } from "react-router-dom";
import {
  MenuItemContainer,
  Content,
  BackgroundImage,
} from "./menu-item.styles.jsx";

const MenuItem = ({ title, imageUrl, size }) => {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate(`shop/${title}`);
  };

  return (
    <MenuItemContainer size={size} onClick={navigateHandler}>
      <BackgroundImage imageUrl={imageUrl}></BackgroundImage>
      <Content>
        <h1>{title}</h1>
        <span>SHOP NOW</span>
      </Content>
    </MenuItemContainer>
  );
};

export default MenuItem;
