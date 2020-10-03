//      
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ULScreen } from "../presentScreens/UserList.component";

function UserListContainer({ navigation }        ) {
  return <ULScreen navigation={navigation} />;
}

export default UserListContainer;
