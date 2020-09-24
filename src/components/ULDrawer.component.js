// @flow
import React from "react";
import {
  Drawer,
  DrawerGroup,
  DrawerItem,
  Icon,
  useTheme,
} from "@ui-kitten/components";

const SmartphoneIcon = (props) => <Icon {...props} name="smartphone-outline" />;

const BrowserIcon = (props) => <Icon {...props} name="browser-outline" />;

const ColorPaletteIcon = (props) => (
  <Icon {...props} name="color-palette-outline" />
);

const StarIcon = (props) => <Icon {...props} name="star" />;

const PeopleIcon = (props) => <Icon {...props} name="people" />;

export const ULDrawers = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const theme = useTheme();
  const style = {
    drawerGroup: {
      backgroundColor: theme["color-primary-200"],
    },
  };
  return (
    <Drawer
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      <DrawerGroup
        style={style.drawerGroup}
        title="1학년"
        accessoryLeft={PeopleIcon}
      >
        <DrawerItem title="1반" accessoryLeft={StarIcon} />
        <DrawerItem title="2반" accessoryLeft={StarIcon} />
      </DrawerGroup>
      <DrawerGroup
        style={style.drawerGroup}
        title="2학년"
        accessoryLeft={PeopleIcon}
      >
        <DrawerItem title="1반" accessoryLeft={StarIcon} />
        <DrawerItem title="2반" accessoryLeft={StarIcon} />
        <DrawerItem title="3반" accessoryLeft={StarIcon} />
      </DrawerGroup>
      <DrawerGroup
        style={style.drawerGroup}
        title="3학년"
        accessoryLeft={PeopleIcon}
      >
        <DrawerItem title="1반" accessoryLeft={StarIcon} />
        <DrawerItem title="2반" accessoryLeft={StarIcon} />
      </DrawerGroup>
    </Drawer>
  );
};
