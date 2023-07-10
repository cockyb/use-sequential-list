`use-sequential-list` is a React hook that allows you to sequentially render a list of items.

### Install

```bash
npm install use-sequential-list
```



### Usage

```typescript
import { useSequentialList } from 'use-sequential-list';
import { useEffect } from 'react';

const origin = [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' },
    { name: 'Item 4' },
];


function App() {
    const { items } = useSequentialList(origin);

    return (
        <div>
            {items.map((item) => (
                <Item key={item.name} {...item} />
            ))}
        </div>
    );
}

interface ItemProps {
    name: string;
    done: () => void;
    isLoaded: boolean;
}

function Item({ name, done, isLoaded }: ItemProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            done();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    //NOTE: that we don't need to add `done` to the dependency array
    }, []);

    return (
        <div>
            {name} {isLoaded ? '✔️' : '❌'}
        </div>
    );
}

export default App;
```

### Result
![Result](https://i.ibb.co/kStL6Hx/sample.gif)

### Parameters

| Name  | Type | Description                               |
| ----- | ---- | ----------------------------------------- |
| items | T[]  | The list of items to render sequentially. |

### Issues
If you find any issues, please [report them]().


