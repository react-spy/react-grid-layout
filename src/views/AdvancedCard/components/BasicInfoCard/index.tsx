import { useEffect } from "react";

import { useSetState } from "ahooks";
import { Spin } from "antd";
import axios from "axios";
import CommonCard from "../CommonCard";

type UserListType = {
  id: number;
  name: string;
};

const BasicInfo = () => {
  const [state, setState] = useSetState<{
    userList: UserListType[];
    cardLoading: boolean;
  }>({
    userList: [],
    cardLoading: false,
  });
  const { userList, cardLoading } = state;

  // 获取数据列表
  const getUserList = async () => {
    setState({ cardLoading: true });
    const { data } = await axios({
      url: "/api/crawling/list",
    });
    if (Array.isArray(data) && data.length) {
      setState({ userList: data, cardLoading: false });
    }
  };
  useEffect(() => {
    getUserList();
  }, []);

  return (
    <CommonCard title="用户列表" reload={getUserList}>
      <Spin spinning={cardLoading}>
        {userList.map((item: UserListType) => {
          return <h4 key={item.id}>{item.name}</h4>;
        })}
      </Spin>
    </CommonCard>
  );
};
export default BasicInfo;
