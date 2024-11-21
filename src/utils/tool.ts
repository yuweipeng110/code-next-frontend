/**
 * 防抖
 * @param func 
 * @param delay 
 * @returns 
 */
export const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any) => {
        if (timer) clearInterval(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    }
}

/**
 * 节流
 * @param func 
 * @param delay 
 * @returns 
 */
export const throttle = (func: any, delay: number) => {
    let timeStamp = 0;
    return (...rest: any) => {
        if (Date.now() - timeStamp > delay) {
            func(...rest);
            timeStamp = Date.now();
        }
    };
};


// 定义导航项的类型
type NavItem = {
    key: string;
    href: string;
    title: string;
    children?: NavItem[];
};

/**
 * 递归生成导航项数组
 * 
 * @param headings 当前处理的标题元素列表
 * @param parent 当前层级的父节点数组，默认为空数组
 * @param currentLevel 当前处理的标题层级，默认为 2（即 H2）
 * @returns 生成的导航项数组
 */
export const generateItemsRecursive = (
    headings: NodeListOf<HTMLElement>,
    prefix: string = '',
    parent: NavItem[] = [],
    currentLevel: number = 2
): NavItem[] => {
    let currentIndex = 0;

    while (currentIndex < headings.length) {
        const heading = headings[currentIndex];
        const key = String(parent.length + 1);
        let title = heading.textContent || '';
        const href = `#${heading.id || title.toLowerCase().replace(/\s+/g, '-')}`;
        const level = parseInt(heading.tagName.slice(1), 10); // 将 H2, H3, H4 转换为 2, 3, 4

        if (level === currentLevel) {
            // 当前层级的标题
            const newPrefix = prefix ? `${prefix}.${parent.length + 1}` : `${parent.length + 1}`;
            title = `${newPrefix}. ${title}`;
            const item: NavItem = { key, href, title, children: [] };
            parent.push(item);

            // 递归处理子标题
            const subHeadings = Array.from(headings).slice(currentIndex + 1);
            const nextLevel = currentLevel + 1;
            const subItems = generateItemsRecursive(subHeadings as unknown as NodeListOf<HTMLElement>, newPrefix, item.children, nextLevel);

            // 更新 currentIndex 以跳过已处理的子标题
            currentIndex += subItems.length;

            // 如果子项为空数组，删除 children 属性
            if (item.children?.length === 0) {
                delete item.children;
            }
        } else if (level < currentLevel) {
            // 遇到更高层级的标题，停止当前层级的处理
            break;
        }

        currentIndex++;
    }

    return parent;
};