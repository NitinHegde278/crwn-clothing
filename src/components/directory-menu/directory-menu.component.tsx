import { Component } from "react";
import { DirectoryMenuContainer } from "./directory-menu.styles";
import MenuItem from "../menu-item/menu-item.component";
import { Key } from "react";

type MyProps = {};

type MyState = {
  sections: Section[];
};

type Section = {
  title: string;
  imageUrl: string;
  id: Key;
  linkUrl: string;
  size?: string;
};

class DirectoryMenu extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      sections: [
        {
          title: "hats",
          imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
          id: 1,
          linkUrl: "shop/hats",
        },
        {
          title: "jackets",
          imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
          id: 2,
          linkUrl: "shop/jackets",
        },
        {
          title: "sneakers",
          imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
          id: 3,
          linkUrl: "shop/sneakers",
        },
        {
          title: "womens",
          imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
          size: "large",
          id: 4,
          linkUrl: "shop/womens",
        },
        {
          title: "mens",
          imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
          size: "large",
          id: 5,
          linkUrl: "shop/mens",
        },
      ],
    };
  }

  render() {
    const { sections } = this.state;
    return (
      <DirectoryMenuContainer>
        {sections.map((section) => {
          return <MenuItem key={section.id} section={[section]} />;
        })}
      </DirectoryMenuContainer>
    );
  }
}

export default DirectoryMenu;
