//      
import React from 'react';
import { View, ScrollView } from 'react-native';
import { List, ListItem, Layout, Icon, Divider, useTheme, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as _ from 'lodash';

const dummy = new Array(8).fill({
    title: `🔵 게시판`,
    description: `🔵🔵 게시판입니다.`
});

const dummy2 = new Array(2).fill({
    category: "🟥 게시판",
    boards: new Array(8).fill({
        title: `🔵 게시판`,
        description: `🔵🔵 게시판입니다.`
    })

})

const layoutIcon = (props) => (
    <Icon {...props} name="layout-outline" />
);



export const BoardHome = (props        ) => {
    const theme = useTheme();
    const {navigation: {navigate}} = props;

    const renderItem = ({ item, index }        ) => (
        <ListItem 
        title={item.title} 
        description={item.description} 
        key={index} 
        accessoryLeft={layoutIcon}
        onPress={() => navigate("BoardScreen",{
            title: item.title
        })}
         />
    );

    const innerList = ({ item, index }) => (
        <View style={{...styles.innerList, borderColor: theme['color-primary-transparent-600']}}>
        <Text style={styles.innerList.text} category="h5">{item.category}</Text>
        <Divider />
        <List renderItem={renderItem} data={item.boards} />
        </View>
    );

    return (
        <SafeAreaView style={styles.safeview} edges={["top", "left", "right"]}>
            <Layout style={styles.layout} level="1">
                <List style={{...styles["list"]}} renderItem={innerList} data={dummy2} />
            </Layout>
        </SafeAreaView>)
};

const styles = {
    safeview: {
        flex: 1
    },
    layout: {
        flex: 1
    },
    list: {
        flex: 1
    },
    innerList: {
        marginLeft: 20,
        marginRight:20,
        marginTop: 10,
        marginBottom: 10,
        padding: 5,
        borderWidth: 1, 
        borderRadius: 10,
        borderStyle: "solid",
        text: {
            padding: 10
        },
    }
}