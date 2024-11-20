"use client";
import { useEffect, useState } from 'react';
import { Badge, Button, Input, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import './index.css';

const INPUT_PLACEHOLDER_DEFAULT = "探索frontend";
const INPUT_PLACEHOLDER_MOVE = "搜索帖子/标签/图片/用户";

const INPUT_ENTER_BUTTON_DEFAULT = undefined;
const INPUT_ENTER_BUTTON_MOVE = <SearchOutlined />;


/**
 * 搜索框组件
 * @returns 
 */
const SearchInput = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const searchParamsObj = {
        query: searchParams.get("query") || "",
        type: searchParams.get("type") || "all",
    }

    useEffect(() => {
        setInputValue(searchParamsObj.query);
    }, [searchParams]);

    const [isVisible, setIsVisible] = useState(true);

    const [inputValue, setInputValue] = useState<string>("");
    const [inputPlaceholder, setInputPlaceholder] = useState<string>(INPUT_PLACEHOLDER_DEFAULT);
    const [inputEnterButton, setInputEnterButton] = useState<undefined | React.ReactNode>(INPUT_ENTER_BUTTON_DEFAULT);

    useEffect(() => {
        if (isVisible) {
            setInputPlaceholder(INPUT_PLACEHOLDER_DEFAULT);
            setInputEnterButton(INPUT_ENTER_BUTTON_DEFAULT);
        } else {
            setInputPlaceholder(INPUT_PLACEHOLDER_MOVE);
            setInputEnterButton(INPUT_ENTER_BUTTON_MOVE);
        }
    }, [isVisible]);

    const onFocus = () => {
        setIsVisible(!isVisible);
    }

    const onBlur = () => {
        setIsVisible(!isVisible);
    }

    const onSearch = (value: string) => {
        router.push(`/search?query=${value}&type=${searchParamsObj.type}`);
    }

    return (
        <div className="search-input" aria-hidden>
            <Input.Search
                className={`input-search ${!isVisible ? 'expanded' : ''}`}
                placeholder={inputPlaceholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onSearch={(value) => onSearch(value)}
                onFocus={onFocus}
                onBlur={onBlur}
                enterButton={inputEnterButton}
            />
            {/* <div className={`add-group ${isVisible ? 'visible' : 'hidden'}`}>
                <Badge count={<Tag color="#FF0000">#FF0</Tag>} >
                    <Button type="primary">创作者中心</Button>
                </Badge>
            </div> */}
        </div>
    )
}

export default SearchInput;