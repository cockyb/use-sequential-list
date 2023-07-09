import { useEffect, useState } from 'react';

const IS_LOADED_PROPERTY = 'isLoaded';

type Loading<T> = T & { [IS_LOADED_PROPERTY]: boolean };
type Done<T> = T & { done: () => void };

/**
 * A custom React hook that returns a list of items with a `done` function that can be used to mark the item as loaded.
 * The hook takes an optional initial list of items as a parameter.
 * @template T The type of the items in the list.
 * @param {Array<T>} [originList=[]] An optional initial list of items.
 * @returns {{ items: Array<Done<Loading<T>>> }} An object containing the list of items.
 */
type UseSequentialListHook = <T extends object>(originList?: Array<T>) => { items: Array<Done<Loading<T>>> };
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
