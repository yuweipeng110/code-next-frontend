"use client";
import { memo, useRef, useState } from 'react';
import { Bubble, Conversations, Prompts, Sender, Suggestion, XProvider } from '@ant-design/x';
import { Alert, Avatar, Card, Divider, Empty, Flex, Input } from 'antd';
import { BulbOutlined, EllipsisOutlined, SearchOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { ChatMessage, ProChat } from '@ant-design/pro-chat';
import HighlightText from '@/components/Other/HighlightText';
import { imList, imUserList, initialChats } from '../../../../../mock/im';
import './index.css';
import moment from 'moment';

/**
 * 通知-私信
 */
const NotificationIm: React.FC = memo(() => {
    const searchInputRef = useRef<InputRef>(null);
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const [isSearchEnd, setIsSearchEnd] = useState<boolean>(false);

    const [searchUserList, setSearchUserList] = useState<any[]>([]);
    const [chats, setChats] = useState<ChatMessage<Record<string, any>>[]>(
        Object.values(initialChats),
    );
    const [value, setValue] = useState<string>('');

    const handleSearchInputEnter = () => {
        if (searchInputRef.current.input.value.length <= 0) {
            return;
        }
        // if (searchInputValue.length <= 0) {
        //     return;
        // }
        const filteredUsers = imUserList.filter(user => user.username.includes(searchInputRef.current.input.value));
        setSearchUserList(filteredUsers);
        setIsSearchEnd(true);
    }

    const renderSearchResult = () => {
        if (searchUserList.length <= 0) {
            return <Empty style={{ marginTop: 140 }} />
        }
        return searchUserList.map((searchUserItem, searchUserIndex) => {
            return (
                <div className="search-item" key={searchUserIndex}>
                    <Avatar src={"https://p26-passport.byteacctimg.com/img/user-avatar/7f43ce2baa99baf2d4d989f890cf81c7~180x180.awebp"} size={40} />
                    <div className="user-name">
                        <HighlightText text={searchUserItem.username} keyword={searchInputRef.current.input.value} textColor='var(--code-font-brand1-normal)' />
                    </div>
                </div>
            )
        })
    }

    const currentTime = new Date();  // 当前时间

    // 遍历imList并增加每隔10分钟插入的通知
    const interval = 10 * 60 * 400;  // 10分钟的毫秒数

    const newItems = imList.map((imItem, index) => {
        const dateTime = new Date(imItem.dateTime);  // 获取当前项的时间
        const formattedDateTime = dateTime.toISOString().slice(0, 16).replace('T', ' ');  // 格式化时间为 yyyy-MM-dd HH:mm

        // 返回的消息条目
        const item = {
            key: imItem.id,
            placement: imItem.role === 'user' ? 'end' : 'start',
            content: imItem.content,
            avatar: <Avatar src={imItem.avatar} />,
        };

        // 用于存储插入的通知条目
        const notifications = [];

        if (index > 0) {  // 如果不是第一条消息，才判断
            const prevDateTime = new Date(imList[index - 1].dateTime); // 上一条消息的时间
            const timeDifference = dateTime - prevDateTime; // 计算时间差

            // 如果时间差大于等于10分钟，插入通知条目
            if (timeDifference >= interval) {
                const notificationItem = {
                    key: `${imItem.id}-notification`,  // 防止key重复
                    shape: 'round',
                    content: '',
                    className: 'notification-message',
                    footer: (
                        <div className="msg-text">
                            {`昨天 ${formattedDateTime.slice(11)}`}  {/* 格式化时间为 '昨天 HH:mm' */}
                        </div>
                    ),
                };
                notifications.push(notificationItem); // 插入通知条目
            }
        }

        // 返回当前条目以及可能插入的通知条目
        return [item, ...notifications];
    }).flat();  // 使用flat()展平数组

    console.log('newItems', newItems);

    return (
        <div id='notification-im' className='max-width-content'>
            <Card style={{ marginTop: 20 }}>
                <XProvider>
                    <Flex style={{ height: "calc(100vh - 250px)" }}>
                        <Flex vertical className='im-conv-panel'>
                            <div ref={searchContainerRef} className='search-container'>
                                <div className='search-wapper'>
                                    <div className='input-wapper'>
                                        <Input
                                            ref={searchInputRef}
                                            placeholder="搜索联系人"
                                            variant='filled'
                                            suffix={
                                                <SearchOutlined
                                                    className='search-icon'
                                                    style={{ marginRight: 0 }}
                                                    // onClick={handleSearchInputEnter}
                                                    onMouseDown={(event) => {
                                                        // 阻止 onBlur 事件
                                                        event.preventDefault();
                                                        handleSearchInputEnter();
                                                    }}
                                                />
                                            }
                                            onPressEnter={handleSearchInputEnter}
                                            onFocus={() => { searchContainerRef.current.classList.add('is-focus') }}
                                            onBlur={() => { searchContainerRef.current.classList.remove('is-focus') }}
                                        />
                                    </div>
                                    <div className='search-cancel'
                                        onMouseDown={(event) => {
                                            // 阻止 onBlur 事件
                                            event.preventDefault();
                                            setIsSearchEnd(false);
                                            searchInputRef.current.blur();
                                        }}
                                    >
                                        取消
                                    </div>
                                </div>
                            </div>
                            <div className="im-scroll" style={{ display: isSearchEnd ? "block" : "none" }}>
                                <div className="im-search-result">
                                    {renderSearchResult()}
                                </div>
                            </div>
                            <div className="im-scroll" style={{ display: !isSearchEnd ? "block" : "none" }}>
                                <Conversations
                                    defaultActiveKey="1"
                                    // groupable
                                    items={
                                        imUserList.map((imUserItem, imUserIndex) => {
                                            return {
                                                key: imUserIndex.toString(),
                                                label: (
                                                    <Flex vertical>
                                                        <Flex justify='space-between'>
                                                            <div className='username'>{imUserItem.username}</div>
                                                            <div className='time'>{imUserItem.time}</div>
                                                        </Flex>
                                                        <div className='msg-preview'>{imUserItem.newMessage}</div>
                                                    </Flex>
                                                ),
                                                icon: <Avatar src={imUserItem.avatar} size={40} />,
                                                // group: imUserItem.username.substring()
                                            }
                                        })
                                    }
                                />
                            </div>
                        </Flex>
                        <Divider type="vertical" style={{ height: '100%', marginInline: 0 }} />
                        <Flex vertical style={{ flex: 1 }} gap={8}>
                            <Flex className='chat-header' justify='space-between'>
                                <div className='chat-info'>
                                    前端梦工厂
                                </div>
                                <EllipsisOutlined size={30} style={{ cursor: "pointer" }} />
                            </Flex>
                            {/* <ProChat
                                helloMessage='hello word'
                                chats={chats}
                                // style={{ height: "100%" }}
                                onChatsChange={(chats) => {
                                    setChats(chats);
                                }}
                                // backToBottomConfig={{
                                //     style: { bottom: 190 },
                                // }}
                                request={async (messages) => {
                                    // 发送请求，参数为 messages
                                    console.log('request message', messages);
                                    return messages; // 支持流式和非流式响应
                                }}

                                chatItemRenderConfig={{
                                    actionsProps: {
                                        user: {
                                            actions: ['copy'],
                                            moreActions: ['del', 'copy'],
                                        },
                                    },
                                    render: (item, dom, defaultDom) => {
                                        if (item?.originData?.role === 'notification') {
                                            return (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Alert message={item.message} type="info" showIcon />
                                                </div>
                                            );
                                        }
                                        return defaultDom;
                                    },
                                }}
                            /> */}
                            <Bubble.List
                                style={{ flex: 1, padding: 24 }}
                                items={newItems}
                            // items={imList.map(imItem => {
                            //     return {
                            //         key: imItem.id,
                            //         placement: imItem.role === 'user' ? 'end' : 'start',
                            //         content: imItem.content,
                            //         avatar: <Avatar src={imItem.avatar} />,
                            //     }
                            // })}
                            // items={[
                            //     {
                            //         key: '1',
                            //         placement: 'end',
                            //         content: 'Hello Ant Design X!',
                            //         avatar: { icon: <UserOutlined /> },
                            //     },
                            // {
                            //     key: '4',
                            //     shape: "round",
                            //     content: '',
                            //     className: 'notification-message',
                            //     footer: (
                            //         <div className='msg-text'>
                            //             昨天 15:19
                            //         </div>
                            //     ),
                            // },
                            //     {
                            //         key: '2',
                            //         avatar: { icon: <UserOutlined /> },
                            //         content: 'Hello World!',
                            //     },
                            //     {
                            //         key: '3',
                            //         content: '',
                            //         loading: true,
                            //     },
                            // ]}
                            />
                            <Suggestion items={[{ label: 'Write a report', value: 'report' }]} style={{ padding: 24 }}>
                                {({ onTrigger, onKeyDown }) => {
                                    return (
                                        <Sender
                                            value={value}
                                            onChange={(nextVal) => {
                                                if (nextVal === '/') {
                                                    onTrigger();
                                                } else if (!nextVal) {
                                                    onTrigger(false);
                                                }
                                                setValue(nextVal);
                                            }}
                                            onKeyDown={onKeyDown}
                                            placeholder='Type "/" to trigger suggestion'
                                        />
                                    );
                                }}
                            </Suggestion>
                        </Flex>
                    </Flex>
                </XProvider>
            </Card>
        </div>
    );
})

export default NotificationIm;