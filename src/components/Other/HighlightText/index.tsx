import React, { memo } from 'react';

type Props = {
    text: string | undefined;
    keyword: string;
    textColor?: string;
}

const HighlightText: React.FC<Props> = memo((props) => {
    const { text = "", keyword = "", textColor = "red" } = props;
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));

    return (
        <span className="space-nowap" style={{ display: "block" }}>
            {parts.map((part: string, index: number) =>
                part.toLowerCase() === keyword.toLowerCase() ? (
                    <span key={index} style={{ color: textColor }}>{part}</span>
                ) : part
            )}
        </span>
    );
})

export default HighlightText;
