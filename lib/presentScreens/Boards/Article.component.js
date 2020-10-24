//      
import React from "react";
import { View, Image, FlatList } from "react-native";
import {
  Divider,
  Icon,
  Layout,
  Text,
  ViewPager,
  TopNavigation,
  TopNavigationAction,
  Button,
  ButtonGroup,
  Spinner,
  OverflowMenu,
  MenuItem,
  Card,
  useTheme,
  Avatar,
  Input,
  CheckBox,
  List,
  ListItem
} from "@ui-kitten/components";
import * as _ from 'lodash';
import produce from "immer";
import moment from 'moment';

import { useSafeArea, SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const dummy = new Array(8).fill({
  title: "title",
  when: "2020.10.10",
  who: "John",
  like: 10,
  comments: 10
});

const BackIcon = (props) => <Icon {...props} name="arrow-back"/>;
const renderItemIcon = (props) => <Icon {...props} name="hash"/>;
const LikeIcon = (props) => <Icon {...props} name="award"/>;
const CommentIcon = (props) => <Icon {...props} name="message-square"/>;
const StarIcon = (props) => <Icon {...props} name="star"/>;


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
    flex: 1,
    maxHeight: 50,
    maxWidth: 100
  },
  rowView: {
    flex: 1,
    flexDirection: 'row'
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5
  },
  contentView: {
    textAlign: 'left'
  }
};

const loadingView = () => (
  <View style={styles.loadingView}>
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

const NotificationIcon = (props)=> (
  <Icon {...props} name="bell-off"/>
)

const EnterIcon = (props) => (
    <Icon {...props} name="corner-down-left"/>
)



export const ArticleScreen = ({ navigation, route }        ) => {
  // const { title, description } = route.params;

  const data = {
      avatar: "https://picsum.photos/100/100",
      nickname: "nickname",
      when: "2020.10.10.16.12",
      likes: 10,
      comments: 10,
      subscribes: 10,
    title: "Title",
    content: `하나에 별을 하나에 별에도 내린 잠, 봅니다. 
    위에도 별 멀듯이, 둘 지나고 오는 같이 까닭입니다. 
    패, 사람들의 내 벌써 새워 옥 하늘에는 가슴속에 시인의 계십니다. 
    불러 책상을 것은 당신은 별을 릴케 파란 까닭입니다. 쉬이 한 별 소녀들의 경,
     오면 듯합니다. 위에도 다 봄이 밤이 헤일 거외다. 당신은 불러 아침이 별이 가을 이름을 나는 있습니다. 
     말 나는 어머니 봅니다. 무성할 가난한 계집애들의 봅니다. 아침이 같이 흙으로 밤이 풀이 않은 남은 이제 계십니다.
      추억과 어머니 된 릴케 당신은 까닭입니다.`,
    images: new Array(3).fill("https://picsum.photos/300/400"),
    commentList: new Array(4).fill({
        avatar: "https://picsum.photos/50/50",
        nickname: "nickname",
        when: "2020.10.10",
        likes: 10,
        comment: "lorem ipsum",
    }),
  };

  const theme = useTheme();

  const [menuVisible, setMenuVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [checked, setChecked] = React.useState(false);
  const [value, setValue] = React.useState("");

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
      </View>
    )
  };


  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={RefreshIcon} />
      <TopNavigationAction icon={NotificationIcon} />
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

  const CardHeader = (props) => {
     const style = {
         card:{
            maxHeight: 100
         },
         cardView:{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
         },
         avatarView: {
             flex: 1
         },
        avatar: {
            width: 50,
            height: 50
        },
        info: {
            flex: 2
        },
        buttons: {
            flex: 2,
            group: {

            }
        }
     };

     return (
      <Card {...props} style={style.card} appearance="filled">
        <View style={style.cardView}>
          <View style={style.avatarView}>
            <Avatar shape="rounded" source={require('../../../assets/icon.png')}/>
          </View>
          <View style={style.info}>
              <Text category="h6">{data.nickname || "익명"}</Text>
              <Text category="label">{data.when}</Text>
          </View>
          <View>
            <ButtonGroup appearance="outline" size="tiny">
              <Button accessoryLeft={LikeIcon}>추천</Button>
              <Button accessoryLeft={StarIcon}>즐겨찾기</Button>
            </ButtonGroup>
          </View>
        </View>
      </Card>
     )
  }

  const ContentFooter = (props) => {

    const style = {
        container: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flex: 1,
            height: 50,
            maxWidth: 200,
            maxHeight: 50
        },
        rowView: {
            flex: 1,
            flexDirection: 'row',
        },
        icon: {
            width: 20,
            height: 20,
            marginRight: 5
        }
    }

    return (
     <View {...props} style={style.container}>
      <View style={style.rowView}>
          <LikeIcon fill={theme['color-info-500']} style={style.icon}/>
          <Text category="label">{data.likes}</Text>
      </View>
      <View style={style.rowView}>
          <CommentIcon fill={theme['color-danger-500']} style={style.icon}/>
          <Text category="label">{data.comments}</Text>
      </View>
      <View style={style.rowView}>
          <StarIcon fill={theme['color-warning-400']} style={style.icon}/>
          <Text category="label">{data.subscribes}</Text>
      </View>
     </View>
    )
  }
 
  const InputLeft = () => (
      <CheckBox
      checked={checked}
      onChange={nextChecked => setChecked(nextChecked)}
      >
        {`익명`}
      </CheckBox>
  )

  const InputRight = (props) => (
    <Button {...props} appearance="ghost" status="success" accessoryLeft={EnterIcon}/>
  )

  const CardFooter = (props) => {
    const style = {
        input: {
          position: 'absolute',
          bottom: 0,
          width: '100%',
          marginBottom: -5
        }
    }

    return (
    <Input {...props} style={style.input} value={value} placeholder="댓글을 입력해주세요." onChangeText={nextValue => setValue(nextValue)} accessoryLeft={InputLeft} accessoryRight={InputRight}/>
  )}

//   const listItem = ({item, index}) => (
//       <ListItem 
//       title={item.title} 
//       description={item.comment} 
//       accessoryLeft={() => <Avatar shape='rouned' source={item.avatar}/>}/>
//   )

const customCard = ({item, index}) => {

  const styles = {
    card: {
      justifyContent: 'space-around',
      minHeight: 100,
      paddingTop: 10,
      paddingLeft: 15,
      paddingRight: 15,
      marginBottom: 10,
      borderTopWidth: 1,
      borderBottomWidth: 1,
    },
    columnView: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flex: 1
    },
    rowView: {
      marginLeft: 10
    },
    rowTwoThird: {
      flexDirection: 'row',
      flex: 2
    },
    rowOneThird: {
      marginRight: 10
    },
    icon: {
      width: 20,
      height: 20
    }
  }
  return (
    <View style={styles.card}>
      <View style={styles.columnView}>
        <View style={styles.rowTwoThird}>
          <View style={styles.rowView}>
            <Avatar size="tiny" shape="rounded" source={require('../../../assets/icon.png')}/>
          </View>
          <View style={styles.rowView}>
            <Text category="h6">{item.nickname}</Text>
          </View>
        </View>
          <View style={styles.rowOneThird}>
            <ButtonGroup appearance="outline" size="tiny">
              <Button accessoryLeft={LikeIcon}/>
              <Button accessoryLeft={CommentIcon}/>
              <Button accessoryLeft={MenuIcon}/>
            </ButtonGroup>  
          </View>
      </View>

      <View style={styles.columnView}>
        <View style={styles.rowView}>
          <Text category="p1">{item.comment}</Text>
        </View>
      </View>

      <View style={styles.columnView}>
        <View style={styles.rowView}>
          <Text category="p2">{item.when}</Text>
        </View>
        <View style={styles.rowView}>
          <LikeIcon style={styles.icon} fill={theme['color-info-600']}/>
        </View>
        <View style={styles.rowView}>
          <Text status="info" category="p1">{item.likes}</Text>
        </View>
      </View>
    </View>
  )
}
  // 댓글 아이템 
  const cardItem = ({item, index}) => {
      
      const cardStyle = {
        card: {
          minHeight: 100,
          height: 'auto',
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            avatar: {
                marginRight: 5,
            },
            buttongroup: {
                position: 'absolute',
                right: 0,
            }
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            icon: {
              width: 15,
              height: 15
            }
        },
      }

      const header = (props) => (
          <View {...props} style={cardStyle.header}>
              <Avatar style={cardStyle.header.avatar} size="tiny" shape="rounded" source={require('../../../assets/icon.png')}/>
              <Text category="h6">{item.nickname}</Text>
              <ButtonGroup style={cardStyle.header.buttongroup} appearance="outline" size="tiny">
                  <Button accessoryLeft={LikeIcon}/>
                  <Button accessoryLeft={CommentIcon}/>
                  <Button accessoryLeft={MenuIcon}/>
              </ButtonGroup>
          </View>
      )

      const footer = (props) => (
          <View {...props} style={cardStyle.footer}>
              <Text category="p2">{item.when}</Text>
              <LikeIcon style={cardStyle.footer.icon}/>
              <Text status="info" category="p1">{item.likes}</Text>
          </View>
      )

      return (
      <Card style={cardStyle.card} appearance="filled" key={moment().format('hh-mm')} header={header} footer={footer}>
          <Text category="p1">{item.comment}</Text>
      </Card>
      )
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeview}>
      <TopNavigation
        title={data.title}
        alignment="center"
        accessoryLeft={BackAction}
        accessoryRight={renderRightActions}
      />
      <Divider />
      <Layout style={styles.layout}>
        {/* <Card header={CardHeader}>
         <Text category="h3">{data.title}</Text>
         <Text category="p1">{data.content}</Text>
         <Divider />
        </Card>
        <CardFooter />
        <List data={data.commentList} renderItem={customCard}/> */}
      {/* <ScrollView>
        <CardHeader />
        <Text category="h3">{data.title}</Text>
         <Text category="p1">{data.content}</Text>
         <CardFooter />
      </ScrollView> */}
      <FlatList ListHeaderComponent={() => (
        <Card style={styles.contentView} header={CardHeader}>
         <Text category="h3">{data.title}</Text>
         <Text category="p1">{data.content}</Text>
         <ContentFooter />
        </Card>)}
        data={data.commentList}
        renderItem={customCard} 
        />
        <CardFooter />
      </Layout>
    </SafeAreaView>
  );
};
