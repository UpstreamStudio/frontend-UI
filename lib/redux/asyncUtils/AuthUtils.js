//      
import axios from "axios";

export async function postUser(api         = "", userinfo        ) {
  //나중에는 baseurl설정 header설정도 필요
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
