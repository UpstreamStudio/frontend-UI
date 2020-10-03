// @flow
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ULScreen } from "../presentScreens/UserList.component";

function UserListContainer({ navigation }: Object) {
  return <ULScreen navigation={navigation} />;
}

export default UserListContainer;
