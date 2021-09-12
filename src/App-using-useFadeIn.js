import React from 'react';
import { useFadeIn } from './custom-hooks';

const AppUseFadeIn = () => {

    const element1 = useFadeIn();
    const element2 = useFadeIn(2, 2);

    return (
        <div>
            <h1>💡 useFadeIn</h1>
            <p>
                useFadeIn is animation hook.
            </p>
            <p {...element1}>
                this element is default (duration: 2, delay: 0)
            </p>
            <p {...element2}>
                this element is 2s delay.
            </p>
        </div>
    )
}

export default AppUseFadeIn;