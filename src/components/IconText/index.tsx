import { Space } from 'antd';
import React from 'react';

type Props = {
    icon: any;
    text: string;
    defalutColor?: string;
    actionIcon?: any;
    actionColor?: string;
}

const IconText: React.FC<Props> = (props) => {
    let { icon, text, defalutColor, actionIcon, actionColor } = props;

    actionColor = actionColor || "#1677ff";

    return (
        <Space>
            {
                React.createElement(actionIcon ? actionIcon : icon, {
                    style: defalutColor ? { color: defalutColor } : (actionIcon ? { color: actionColor } : {})
                })
            }
            {text}
        </Space>
    )
}

export default IconText;