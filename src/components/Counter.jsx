import { useState } from "preact/hooks";

export default function Counter() {
    const [count, setCount] = useState(0);
    const add = () => setCount((i) => i + 1);
    const subtract = () => setCount((i) => i - 1);

    return (
        <div className="container p-4 border-[3px] border-gray-300 rounded-xl">
            <h1>React counter</h1>
            <div className="counter">
                <button onClick={subtract}>-</button>
                <pre>{count}</pre>
                <button onClick={add}>+</button>
            </div>
        </div>
    );
}
