import React from 'react';
import { useClick } from './custom-hooks';

const AppUseClick = () => {
    const onClick = () => {
        console.log('onClick');
    }

    const title = useClick(onClick);

    return (
        <div>
            <h1 ref={title}>💡 useClick</h1>
        </div>
    )
}

export default AppUseClick;