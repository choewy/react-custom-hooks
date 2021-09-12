export const useInputSrc =
    `import React from 'react';
import { useInput } from './custom-hooks';
import { useInputSrc } from './src';
    
function AppUseInput() {

    const inputValidator = (value) => value.length <= 10;
    const inputProps = useInput('', inputValidator);

    return (
        <div>
            <h1>💡 useInput</h1>
            <input placeholder="input text (max legnth = 10)" {...inputProps} />
            <pre>{useInputSrc}</pre>
        </div>
    );
}
    
export default AppUseInput;
`;

export const useTabsSrc =
    `import React from 'react';
import { useTabs } from './custom-hooks';
import { useTabsSrc } from './src';

const api = [
    {
        tab: "Tab 1",
        content: "this is first tab."
    },
    {
        tab: "Tab 2",
        content: "this is second tab."
    },
    {
        tab: "Tab 3",
        content: "this is thirth tab."
    }
];

function AppUseTabs() {

    const tabs = useTabs(0, api);

    return (
        <div>
            <h1>💡 useTabs</h1>
            {api.map((tab, index) =>
                <button key={index} onClick={() => tabs.onContent(index)}>{tab.tab}</button>
            )}
            <div>{tabs.content}</div>
            <pre>{useTabsSrc}</pre>
        </div>
    );
}

export default AppUseTabs;
`;

export const useTitleSrc =
    `import React from 'react';
import { useTitle } from './custom-hooks';
import { useTitleSrc } from './src';

const App = () => {

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

export default App;
`