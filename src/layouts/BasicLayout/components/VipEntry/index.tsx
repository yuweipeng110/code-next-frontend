import { Flex, Space, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import './index.css';

/**
 * 会员入口组件
 * @returns 
 */
const VipEntry = () => {

    return (
        <div className="vip-entry" aria-hidden >
            <Link href="/vip" >
                <Flex justify="center" align="center">
                    <Space style={{ columnGap: 4, rowGap: 4, height: 28 }}>
                        <Image src="/assets/vip.svg" alt="vip" width={28} height={28} className="flex items-center" />
                        <Typography.Text type="secondary" style={{ fontSize: 15 }}>会员</Typography.Text>
                    </Space>
                </Flex>
            </Link>
        </div>
    )
}

export default VipEntry;