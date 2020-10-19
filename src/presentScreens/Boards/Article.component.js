// @flow
import React from "react";
import { View, Image } from "react-native";
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
    width: 15,
    height: 15,
    marginRight: 5
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



export const ArticleScreen = ({ navigation, route }: Object) => {
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
      <Card {...props} style={style.card}>
      <View style={style.cardView}>
      <View style={style.avatarView}>
        <Avatar shape="rounded" source={require('../../../assets/icon.png')}/>
      </View>
        <View style={style.info}>
            <Text category="h6">{data.nickname || "익명"}</Text>
            <Text category="label">{data.when}</Text>
        </View>
        <View style={style.buttons}>
        <ButtonGroup style={style.buttons.group} appearance="outline" size="tiny">
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
            flex: 1,
            maxHeight: 50
        },
        text: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start'
        },
        icon: {
            width: 15,
            height: 15,
            marginRight: 5
        }
    }

    return (
     <View {...props} style={style.container}>
     <View style={style.text}>
        <LikeIcon style={style.icon}/>
        <Text category="label">{data.likes}</Text>
     </View>
     <View style={style.text}>
        <CommentIcon style={style.icon}/>
        <Text category="label">{data.comments}</Text>
     </View>
     <View style={style.text}>
        <StarIcon style={style.icon}/>
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

  const InputRight = () => (
    <Button appearance="ghost" status="success" accessoryLeft={EnterIcon}/>
  )

  const CardFooter = () => (
    <Input value={value} placeholder="댓글을 입력해주세요." onChangeText={nextValue => setValue(nextValue)} accessoryLeft={InputLeft} accessoryRight={InputRight}/>
  )

//   const listItem = ({item, index}) => (
//       <ListItem 
//       title={item.title} 
//       description={item.comment} 
//       accessoryLeft={() => <Avatar shape='rouned' source={item.avatar}/>}/>
//   )

  // 댓글 아이템 
  const cardItem = ({item, index}) => {
      
      const cardStyle = {
        header: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            avatar: {
                maxWidth: 50,
                maxHeight: 50
            },
            buttongroup: {
                position: 'absolute',
                right: 0
            }
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'flex-start'
        },
      }

      const header = (props) => (
          <View {...props} style={cardStyle.header}>
              <Avatar style={cardStyle.header.avatar} shape="rounded" require={require('../../../assets/icon.png')}/>
              <Text category="h6">{item.nickname}</Text>
              <ButtonGroup style={cardStyle.header.buttongroup} appearance="ghost" size="tiny">
                  <Button appearance="ghost" accessoryLeft={LikeIcon}/>
                  <Button appearance="ghost" accessoryLeft={CommentIcon}/>
                  <Button appearance="ghost" accessoryLeft={MenuIcon}/>
              </ButtonGroup>
          </View>
      )

      const footer = (props) => (
          <View {...props} style={cardStyle.footer}>
              <Text category="p2">{item.when}</Text>
              <LikeIcon />
              <Text status="info" category="p1">{item.likes}</Text>
          </View>
      )

      return (
      <Card key={moment().format('hh-mm')} header={header} footer={footer}>
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
        <Card header={CardHeader} footer={CardFooter}>
         <Text category="h3">{data.title}</Text>
         <Text category="p1">{data.content}</Text>
         {/* <ViewPager selectedIndex={selectedIndex} onSelect={index => setSelectedIndex(index)}>
            {_.map(data.images, (url) => (
                <View>
                    <Image source={{uri: url}}/>
                </View>
            ))}
         </ViewPager> */}
         <ContentFooter />
         <Divider />
        <List data={data.commentList} renderItem={cardItem}/>
        </Card>
      </Layout>
    </SafeAreaView>
  );
};
