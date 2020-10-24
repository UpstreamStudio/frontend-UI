//      
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ClassGroupScreen } from "../presentScreens/ClassGroup.component";
import { getUserDataRequest } from "../redux/dataDucks";
import { Spinner } from "@ui-kitten/components";
import { View } from "react-native";
function ClassGroupContainer(props        ) {
  const { isLoading } = useSelector((state) => ({
    isLoading: state.dataReducer.isLoading,
  }));

  const dispatch = useDispatch();
  const renderLoading = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner />
      </View>
    );
  };
  // useEffect(() => {
  //   dispatch(getUserDataRequest());
  // }, [dispatch]);

  return <ClassGroupScreen {...props} />;
}

export default ClassGroupContainer;
