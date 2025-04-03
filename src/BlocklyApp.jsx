import React, { useRef, useEffect } from 'react';
import * as Blockly from 'blockly';
import Toolbox from './Toolbox';  
import {javascriptGenerator} from 'blockly/javascript';

const BlocklyApp = () => {
  const blocklyDiv = useRef(null);  
  const outputDiv = useRef(null);   
  const blocklyWorkspace = useRef(null);  

  const initBlockly = () => {
    if (!blocklyWorkspace.current) {  
      blocklyWorkspace.current = Blockly.inject(blocklyDiv.current, {
        toolbox: Toolbox(),
      });
    }
  };

  const generateCode = () => {
    const workspace = Blockly.getMainWorkspace();
    const code = javascriptGenerator.workspaceToCode(workspace);
    console.log(code);  
    outputDiv.current.textContent = code;  
  };

  useEffect(() => {
    initBlockly();
  }, []); 

  return (
    <div>
      <div id="blocklyDiv" ref={blocklyDiv} style={{ height: '480px', width: '600px', border: '1px solid black' }}></div>

      <button onClick={generateCode}>Generate Code</button>

      <h3>Generated Code:</h3>
      <pre ref={outputDiv} style={{ border: '1px solid #ccc', padding: '10px', background: '#f5f5f5' }}></pre>
    </div>
  );
};

export default BlocklyApp;
