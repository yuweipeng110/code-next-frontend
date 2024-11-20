import React from 'react';
import './index.css';

const GlobalFooter = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="global-footer">
            <div>© {currentYear} CODE-NEXT-FRONTEND平台</div>
            <div>
                <a href="https://www.code-nav.cn" target="_blank">
                    作者：admin
                </a>
            </div>
        </div>
    )
}

export default GlobalFooter;