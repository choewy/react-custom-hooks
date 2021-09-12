import React from 'react';
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
