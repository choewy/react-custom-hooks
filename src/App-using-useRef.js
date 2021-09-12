import React, { useRef } from 'react';

const AppUseRef = () => {
    const input = useRef();

    setTimeout(() => input.current?.focus(), 2000)

    return (
        <div>
            <h1>💡 useRef</h1>
            <input ref={input} />
        </div>
    )
}

export default AppUseRef;