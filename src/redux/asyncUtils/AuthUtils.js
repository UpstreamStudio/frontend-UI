// @flow
import axios from "axios";

export async function postUser(api: string = "", userinfo: Object) {
  //나중에는 baseurl설정 header설정도 필요
  const { email, password } = userinfo;

  try {
    const { data, status, statusText, headers } = await axios.post(
      api,
      userinfo
    );
    return { data, status };
  } catch (error) {
    return error;
  }
}
