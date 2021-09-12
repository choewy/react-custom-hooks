import React from 'react';
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
