import React from 'react';

type Props = {
    text: string | undefined;
    keyword: string;
}

const HighlightText: React.FC<Props> = ({ text = "", keyword = "" }) => {
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));

    return (
        <span className="space-nowap" style={{ display: "block" }}>
            {parts.map((part: string, index: number) =>
                part.toLowerCase() === keyword.toLowerCase() ? (
                    <span key={index} style={{ color: 'red' }}>{part}</span>
                ) : part
            )}
        </span>
    );
};

export default HighlightText;
