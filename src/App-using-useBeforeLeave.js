import React from "react";
import { useBeforeLeave } from './custom-hooks';

const AppUseBeforeLeave = () => {

    const onBefore = () => console.log("Pls don't leave!")
    useBeforeLeave(onBefore);

    return (
        <div>
            <h1>💡 useBeforeLeave</h1>
        </div>
    )
}

export default AppUseBeforeLeave;