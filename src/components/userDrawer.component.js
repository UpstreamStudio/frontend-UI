// @flow

import React from "react";
import { Drawer, DrawerGroup, DrawerItem, Icon } from "@ui-kitten/components";

const SmartphoneIcon = (props) => <Icon {...props} name="smartphone-outline" />;

const BrowserIcon = (props) => <Icon {...props} name="browser-outline" />;

const ColorPaletteIcon = (props) => (
  <Icon {...props} name="color-palette-outline" />
);

const StarIcon = (props) => <Icon {...props} name="star" />;

const PeopleIcon = (props) => <Icon {...props} name="people" />;

export const DrawerGroupsShowcase = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  return (
    <Drawer
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      <DrawerGroup title="1학년" accessoryLeft={PeopleIcon}>
        <DrawerItem title="UI Kitten" accessoryLeft={StarIcon} />
        <DrawerItem title="Kitten Tricks" accessoryLeft={StarIcon} />
      </DrawerGroup>
      <DrawerGroup title="2학년" accessoryLeft={PeopleIcon}>
        <DrawerItem title="Nebular" accessoryLeft={StarIcon} />
        <DrawerItem title="ngx-admin" accessoryLeft={StarIcon} />
        <DrawerItem title="UI Bakery" accessoryLeft={StarIcon} />
      </DrawerGroup>
      <DrawerGroup title="3학년" accessoryLeft={PeopleIcon}>
        <DrawerItem title="Eva Design System" accessoryLeft={StarIcon} />
        <DrawerItem title="Eva Icons" accessoryLeft={StarIcon} />
      </DrawerGroup>
    </Drawer>
  );
};
