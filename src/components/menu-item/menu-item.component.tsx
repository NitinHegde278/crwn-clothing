import { FC, Key } from "react";
import { useNavigate } from "react-router-dom";
import {
  MenuItemContainer,
  Content,
  BackgroundImage,
} from "./menu-item.styles";

type MenuItemProps = {
  section: Section[];
};

type Section = {
  title: string;
  imageUrl: string;
  id: Key;
  linkUrl: string;
  size?: string;
};

const MenuItem: FC<MenuItemProps> = ({ section }) => {
  const { title, imageUrl, size } = section[0];
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
