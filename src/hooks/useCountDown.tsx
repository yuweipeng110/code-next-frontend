import { useEffect, useRef, useState } from 'react';


const useCountDown = (initCount: number, callBack: () => void) => {
    //   const { initCount, callBack } = props;
    const timeId: any = useRef<{ id: number }>({ id: 0 });
    const [count, setCount] = useState<number>(10);

    const start = () => {
        setCount(initCount);
        timeId.current.id = setInterval(() => {
            setCount((item) => {
                return item - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        return () => {
            clearInterval(timeId.current.id);
        };
    }, []);

    useEffect(() => {
        if (count === 0) {
            clearInterval(timeId.current.id);
            callBack();
        }
    }, [count]);

    return { count, start };
};

export default useCountDown;
