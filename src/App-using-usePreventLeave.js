import React from 'react';
import { usePreventLeave } from './custom-hooks';

const AppUsePreventLeave = () => {

    const { enablePrevent, disablePrevent } = usePreventLeave();

    return (
        <div>
            <h1>💡 usePreventLeave</h1>
            <button onClick={enablePrevent}>enable</button>
            <button onClick={disablePrevent}>disable</button>
        </div>
    )
}

export default AppUsePreventLeave;