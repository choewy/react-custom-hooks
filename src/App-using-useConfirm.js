import React from 'react';
import { useConfirm } from './custom-hooks';

const AppUseConfirm = () => {
    const agree = () => console.log("the world is been null;")
    const abort = () => console.log("save the world");
    const onConfirm = useConfirm("Delete The World?", agree, abort);

    return (
        <div>
            <h1>💡 useConfirm</h1>
            <button onClick={onConfirm}>confirm</button>
        </div>
    )
}

export default AppUseConfirm;