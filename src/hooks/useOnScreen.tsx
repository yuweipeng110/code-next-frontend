import { useState, useEffect } from 'react';

/**
 * 组件是否在可视范围内
 * 
 * @param ref 
 * @param rootMargin 
 * @returns 
 */
const useOnScreen = (ref: React.RefObject<HTMLElement>, rootMargin = '0px') => {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIntersecting(entry.isIntersecting);
            },
            { rootMargin }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.unobserve(ref.current!);
        };
    }, [ref, rootMargin]);

    return isIntersecting;
}

export default useOnScreen;