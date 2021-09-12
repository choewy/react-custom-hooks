import React from 'react';
import { useScroll } from './custom-hooks';

const AppUseScroll = () => {

    const { y } = useScroll();

    return (
        <div>
            <h1>💡 useScroll</h1>
            <p style={{
                color: y > 1487 ? "red" : "blue"
            }}>content</p>
        </div>
    )
}

export default AppUseScroll;