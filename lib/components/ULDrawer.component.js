//      
import React from "react";
import {
  Drawer,
  DrawerGroup,
  DrawerItem,
  Icon,
  useTheme,
  Text,
} from "@ui-kitten/components";
import { View } from "react-native";
import { NavigationHelpersContext } from "@react-navigation/native";

const SmartphoneIcon = (props) => <Icon {...props} name="smartphone-outline" />;

const BrowserIcon = (props) => <Icon {...props} name="browser-outline" />;

const ColorPaletteIcon = (props) => (
  <Icon {...props} name="color-palette-outline" />
);

const StarIcon = (props) => <Icon {...props} name="star" />;

const PeopleIcon = (props) => <Icon {...props} name="people" />;

const setTitle = (group        , info                 ) => {
  function forGroup(info) {
    let title;
    switch (info) {
      case "firstGraders":
        title = "1학년";
        break;
      case "secondGraders":
        title = "2학년";
        break;
      default:
        title = "3학년";
    }

    return title;
  }
  function forClass(info) {
    const number = info.slice(5);
    let title;

    switch (number) {
      case "One":
        title = "1반";
        break;
      case "Two":
        title = "2반";
        break;
      default:
        title = "3반";
    }

    return title;
  }

  return group === "group" ? forGroup(info) : forClass(info);
};

export const ULDrawers = (props        ) => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const theme = useTheme();
  const { students } = props.students;
  const gradersList = Object.keys(students);
  const {
    navigation: { navigate },
  } = props;

  const style = {
    drawerGroup: {
      backgroundColor: theme["color-primary-transparent-100"],
    },
    // title: {
    //   flexDirection: "row",
    //   justifyContent: "flex-start",
    //   alignItems: "center",
    // },
  };

  return (
    <Drawer
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      {gradersList.map((gradersInfo) => {
        return (
          <DrawerGroup
          key={setTitle("group", gradersInfo)}
            style={style.drawerGroup}
            title={setTitle("group", gradersInfo)}
            accessoryLeft={PeopleIcon}
          >
            {Object.keys(students[gradersInfo]).map((classInfo) => (
              <DrawerItem
                key={setTitle("class", classInfo)}
                title={setTitle("class", classInfo)}
                accessoryLeft={StarIcon}
                onPress={() =>
                  navigate("userListClass", {
                    grade: setTitle("group", gradersInfo),
                    className: setTitle("class", classInfo),
                    members: students[gradersInfo][classInfo],
                  })
                }
              />
            ))}
          </DrawerGroup>
        );
      })}
      {/* <DrawerGroup
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
      </DrawerGroup> */}
    </Drawer>
  );
};
