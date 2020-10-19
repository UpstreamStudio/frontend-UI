// @flow
import React from "react";
import { View, Image } from "react-native";
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Button,
  List,
  ListItem,
  Spinner,
  OverflowMenu,
  MenuItem,
  Card,
  useTheme
} from "@ui-kitten/components";
import produce from "immer";

import { useSafeArea, SafeAreaView } from "react-native-safe-area-context";
const dummy = new Array(8).fill({
  title: "title",
  summary: "lorem ipsum",
  when: "2020.10.10",
  who: "John",
  like: 10,
  comments: 10,
  thumbnail: "../../../assets/icon.png"
});

const imageSource = require("../../../assets/icon.png");

const BackIcon = (props) => <Icon {...props} name="arrow-back"/>;
const renderItemIcon = (props) => <Icon {...props} name="hash"/>;
const LikeIcon = (props) => <Icon {...props} name="award"/>;
const CommentIcon = (props) => <Icon {...props} name="message-square"/>;




const styles = {
  safeview: {
    flex: 1,
  },
  layout: {
    flex: 1,
    justifyContent: "flex-start",
  },
  loadingView: {
    flex: 1
  },
  itemRight: {
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    maxHeight: 'auto',
    maxWidth: 150,
    marginRight: 20
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 20,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5
  },
  summary: {
    marginVertical: 2
  },
  thumbnail: {
    width: 50,
    height: 50
  },
  text: {
    marginRight: 5
  }
};

const loadingView = (props) => (
  <View {...props} style={styles.loadingView}>
    <Spinner size="giant" />
  </View>
)

const RefreshIcon = (props) => (
  <Icon {...props} name="refresh-outline" />
)

const MenuIcon = (props) => (
  <Icon {...props} name="more-vertical" />
)

const InfoIcon = (props) => (
  <Icon {...props} name='info'/>
);

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out'/>
);

const SearchIcon = (props)=> (
  <Icon {...props} name="search-outline"/>
)



export const BoardScreen = ({ navigation, route }: Object) => {
  // const { title, description } = route.params;
  const data = {
    title: "☽ 게시판",
    description: "☽ 게시판입니다."
  };
  const theme = useTheme();

  const [menuVisible, setMenuVisible] = React.useState(false);

  
  const renderItemRight = (props) => {
    return (
      <View style={styles.itemRight}>
        <View style={styles.rowView}>
          <LikeIcon fill={theme['color-info-500']} style={styles.icon}/>
          <Text category="label">{props.likes}</Text>
        </View>
        <View style={styles.rowView}>
          <CommentIcon fill={theme['color-danger-500']} style={styles.icon}/>
          <Text category="label">{props.comments}</Text>
        </View>
        {props.thumbnail ? 
        <View style={styles.rowView}>
        <Image style={styles.thumbnail} source={require('../../../assets/icon.png')}/> 
        </View>
        : 
        <></>}
      </View>
    )
  };

  const Summary = (props) => (
    <Text category="c1" style={styles.summary}>
    {/* <Text category="p2">{props.summary}</Text>
    <Text category="p2">{props.description}</Text> */}
    {`${props.summary}\n${props.description}`}
    </Text>
  )

  const renderItem = ({ item, index }) => {
    const description = `${item["when"]} | ${item["who"]}`;

    return (
    <ListItem
      key={item["title"]}
      title={() => <Text category="s1">{item.title}</Text>}
      description={() => Summary({summary: item.summary, description: description })}
      accessoryLeft={renderItemIcon}
      accessoryRight={() => renderItemRight({likes: item.like, comments: item.comments, thumbnail: item.thumbnail})}
      onPress={() => navigation.navigate("ArticleScreen")}
    />
  )};


  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={RefreshIcon} />
      <TopNavigationAction icon={SearchIcon} />
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={InfoIcon} title='About' />
        <MenuItem accessoryLeft={LogoutIcon} title='Logout' />
      </OverflowMenu>
    </React.Fragment>
  );

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeview}>
      <TopNavigation
        title={data.title}
        subtitle={data.description}
        alignment="center"
        accessoryLeft={BackAction}
        accessoryRight={renderRightActions}
      />
      <Divider />
      <Layout style={styles.layout}>
        <List data={dummy} renderItem={renderItem} />
      </Layout>
    </SafeAreaView>
  );
};
