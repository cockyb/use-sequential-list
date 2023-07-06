import { useEffect, useState } from 'react';

const IS_LOADED_PROPERTY = 'isLoaded';

type Loading<T> = T & { [IS_LOADED_PROPERTY]: boolean };
type Done<T> = T & { done: () => void };

type UseSequentialListHook = <T extends object>(originList: Array<T>) => { items: Array<Done<Loading<T>>> };
export const useSequentialList: UseSequentialListHook = <T extends object>(originList: Array<T> = []) => {
    const [sequentialList, setSequentialList] = useState<Array<Loading<T>>>([]);

    const index = sequentialList.findIndex((a) => a[IS_LOADED_PROPERTY] === false);
    const sliced = index < 0 ? sequentialList.slice() : sequentialList.slice(0, index + 1);

    const items = sliced.map((item, index) => {
        const done = () => {
            setSequentialList((prev) => {
                return prev.map((prevItem, prevIndex) => {
                    if (prevIndex === index) {
                        return { ...prevItem, [IS_LOADED_PROPERTY]: true };
                    }
                    return { ...prevItem };
                });
            });
        };

        return { ...item, done };
    });

    useEffect(() => {
        setSequentialList(originList.map((item) => ({ ...item, [IS_LOADED_PROPERTY]: false })));
    }, [originList]);

    return { items };
};
