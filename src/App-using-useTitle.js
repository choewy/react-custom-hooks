import React from 'react';
import { useTitle } from './custom-hooks';
import { useTitleSrc } from './src';

const AppUseTitle = () => {

    const { title, setTitle } = useTitle('Loading...');

    setTimeout(() => {
        setTitle('💡 useTitle');
    }, 5000)

    return (
        <div>
            <h1 className="title">{title}</h1>
            <pre>{useTitleSrc}</pre>
        </div>

    )
}

export default AppUseTitle;