import { List } from 'antd';
import moment from 'moment';

type Props = {
    userInfo: API.UserVO;
}

/**
 * 用户中心-更多其他
 */
const UserCenterMore: React.FC<Props> = (props) => {
    const { userInfo } = props;

    const data = [
        {
            title: "收藏",
            content: userInfo.favourPostCount
        },
        {
            title: "关注标签",
            content: userInfo.followTagCount
        },
        {
            title: "加入于",
            content: moment(userInfo.createTime).format('YYYY-MM-DD')
        },
    ];

    return (
        <div className='user-center-more'>
            <List
                style={{ padding: "0 5px" }}
                // bordered
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item >
                        <List.Item.Meta
                            title={item.title}
                        />
                        <div>{item.content}</div>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default UserCenterMore;