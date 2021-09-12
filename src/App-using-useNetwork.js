import React from 'react';
import { useNetwork } from './custom-hooks';

const AppUseNetwork = () => {
    const network = useNetwork(() => {
        console.log(`network : ${network}`);
    });

    return (
        <div>
            <h1>💡 useNetwork</h1>
            <p>network : {network ? "online" : "offline"}</p>
        </div>
    )
}

export default AppUseNetwork;