import React from 'react';
import { Avatar, Button, Card, Col, Flex, Row } from 'antd';
import "./index.css";

type Props = {
    userObject: API.UserVO;
    userLoading: boolean;
}

/**
 * 用户卡片 Card
 * @returns 
 */
const UserCardSection: React.FC<Props> = React.memo((props) => {
    const { userObject, userLoading } = props;

    return (
        <Card className="user-card-section" loading={userLoading}>
            <Card.Meta
                avatar={<Avatar src={userObject.userAvatar} size={48} />}
                title={userObject.userName}
                description={userObject.userProfile}
                style={{ paddingBottom: 8 }}
                className="flex item-center"
            />
            <Flex justify="space-around" className="stat">
                <Flex vertical justify="center" align="center">
                    <div className="count">36</div>
                    <div>文章</div>
                </Flex>
                <Flex vertical justify="center" align="center">
                    <div className="count">36</div>
                    <div>阅读</div>
                </Flex>
                <Flex vertical justify="center" align="center">
                    <div className="count">36</div>
                    <div>粉丝</div>
                </Flex>
            </Flex>
            <div style={{ marginBottom: 16 }} />
            <Row justify="space-between" align="bottom">
                <Col span={11}>
                    <Button block type="primary">关注</Button>
                </Col>
                <Col span={11}>
                    <Button block className="im-btn">私信</Button>
                </Col>
            </Row>
        </Card>
    )
})

export default UserCardSection;