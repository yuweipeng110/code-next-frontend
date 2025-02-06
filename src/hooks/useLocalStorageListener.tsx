import { useEffect } from "react";

const safeParse = (jsonString: string | null) => {
    if (jsonString === null) {
        return null
    }
    try {
        return JSON.parse(jsonString)
    } catch (error) {
        console.error("Error parsing JSON:", error)
        return null
    }
}

/**
 * 监听localStorage变化hook
 * 
 * @param localStorageKey 
 * @param callbackFun 
 */
const useLocalStorageListener = (localStorageKey: string, callbackFun: (value: string) => void) => {
    useEffect(() => {
        const originalSetItem = localStorage.setItem;

        localStorage.setItem = (key, newValue) => {
            const setItemEvent = new CustomEvent("setItemEvent", {
                detail: { key, newValue },
            });
            window.dispatchEvent(setItemEvent);
            originalSetItem.apply(localStorage, [key, newValue]);
        };

        const handleSetItemEvent = (event) => {
            const { key, newValue } = event.detail; // 解构获取key和newValue
            if (key === localStorageKey) {
                const updatedValue = safeParse(newValue);
                callbackFun(updatedValue); // 调用回调函数传入解析后的值
            }
        };

        window.addEventListener("setItemEvent", handleSetItemEvent)

        return () => {
            window.removeEventListener("setItemEvent", handleSetItemEvent)
            localStorage.setItem = originalSetItem
        }
    }, [localStorageKey, callbackFun])
}

export default useLocalStorageListener;