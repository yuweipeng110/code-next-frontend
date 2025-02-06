import { Dropdown, Flex, message, Modal } from 'antd';
import { DeleteFilled, EditFilled, EllipsisOutlined, ExclamationCircleOutlined, SettingFilled, VerticalAlignTopOutlined } from '@ant-design/icons';
import Link from 'next/link';
import "./index.css";

/**
 * 用户中心-明细列表-我的专栏
 */
const UserCenterDetailListColumn = () => {
    console.log('UserCenterDetailListColumn')
    return (
        <div className='user-center-detail-list-column'>
            <div className='column-container'>
                <Link className='column-link' href="/">
                    <div className='column-wrap'>
                        <img src="https://p3-juejin-sign.byteimg.com/tos-cn-i-k3u1fbpfcp/b51144ea79e1493d97841cdd681f5f9a~tplv-k3u1fbpfcp-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5ruhenM=:q75.awebp?rk3s=f64ab15b&x-expires=1734400957&x-signature=zkHY2LfVRC5sGvnWDQ25N61bch8%3D" className="column-img" />
                        <div className='column-right'>
                            <Flex className='first-line' align='center'>
                                <span className='title'>工作流引擎设计与实现</span>
                                <span className='bnts'>
                                    <Dropdown
                                        menu={{
                                            items: [
                                                {
                                                    key: 'columnManage',
                                                    icon: <SettingFilled />,
                                                    label: "管理内容",
                                                },
                                                {
                                                    key: 'columnEdit',
                                                    icon: <EditFilled />,
                                                    label: "编辑",
                                                },
                                                {
                                                    key: 'columnTop',
                                                    icon: <VerticalAlignTopOutlined />,
                                                    label: "置顶专栏",
                                                },
                                                {
                                                    key: 'columnDelete',
                                                    icon: <DeleteFilled />,
                                                    label: '删除',
                                                    danger: true,
                                                    onClick: () =>
                                                        Modal.confirm({
                                                            icon: <ExclamationCircleOutlined />,
                                                            content: '是否确认删除？不可找回',
                                                            onOk() {
                                                                message.success("删除成功");
                                                            },
                                                        })
                                                },
                                            ]
                                        }}
                                    >
                                        <EllipsisOutlined style={{ cursor: "pointer", fontSize: 20 }} />
                                    </Dropdown>
                                </span>
                            </Flex>
                            <span className='content'>
                                从0-1设计并开发一套工作流引擎、流程设计器、工作流引擎管理系统、工作流引擎实战项目等工作流引擎实战项目等
                            </span>
                            <div className='infos'>
                                <span>文章数 13</span>
                                <span>订阅人数 380</span>
                                <span>小满zs</span>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link className='column-link' href="/">
                    <div className='column-wrap'>
                        <img className="column-img" src="https://p9-juejin-sign.byteimg.com/tos-cn-i-k3u1fbpfcp/2a4f61cde42e4ae38fc690c768fc54e9~tplv-k3u1fbpfcp-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56iL5bqP5ZGY6IqL5LuU:q75.awebp?rk3s=f64ab15b&amp;x-expires=1734396751&amp;x-signature=7kZs591bKSQhVHPDYcfB8s3ha2k%3D" />
                        <div className='column-right'>
                            <Flex className='first-line' align='center'>
                                <span className='title'>工作流引擎设计与实现</span>
                                <span className='bnts'>
                                    <Dropdown
                                        menu={{
                                            items: [
                                                {
                                                    key: 'columnManage',
                                                    icon: <SettingFilled />,
                                                    label: "管理内容",
                                                },
                                                {
                                                    key: 'columnEdit',
                                                    icon: <EditFilled />,
                                                    label: "编辑",
                                                },
                                                {
                                                    key: 'columnTop',
                                                    icon: <VerticalAlignTopOutlined />,
                                                    label: "置顶专栏",
                                                },
                                                {
                                                    key: 'columnDelete',
                                                    icon: <DeleteFilled />,
                                                    label: '删除',
                                                    danger: true,
                                                    onClick: () =>
                                                        Modal.confirm({
                                                            icon: <ExclamationCircleOutlined />,
                                                            content: '是否确认删除？不可找回',
                                                            onOk() {
                                                                message.success("删除成功");
                                                            },
                                                        })
                                                },
                                            ]
                                        }}
                                    >
                                        <EllipsisOutlined style={{ cursor: "pointer", fontSize: 20 }} />
                                    </Dropdown>
                                </span>
                            </Flex>
                            <span className='content'>
                                从0-1设计并开发一套工作流引擎、流程设计器、工作流引擎管理系统、工作流引擎实战项目等
                            </span>
                            <div className='infos'>
                                <span>文章数 13</span>
                                <span>订阅人数 380</span>
                                <span>小满zs</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default UserCenterDetailListColumn;