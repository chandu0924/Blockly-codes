import React, { useRef, useEffect, useState } from 'react';
import * as Blockly from 'blockly';
import Toolbox from './Toolbox';  
import {javascriptGenerator} from 'blockly/javascript';
import customBlocks from './customBlocks';

const BlocklyApp = () => {
  const blocklyDiv = useRef(null);  
  const outputDiv = useRef(null);   
  const blocklyWorkspace = useRef(null);  
  // const canvasRef = useRef(null); 

  const [generatedCode, setGeneratedCode] = useState('');
  const [savedCode, setSavedCode] = useState('');
  // const [savedCode, setSavedCode] = useState([]);

  const initBlockly = () => {
    if (!blocklyWorkspace.current) {  
      blocklyWorkspace.current = Blockly.inject(blocklyDiv.current, {
        toolbox: Toolbox(),
      });
    }
  };

  const handleSaveProgram = () => {
    // Save the generated code in the state
    console.log("save program",generateCode);
    setSavedCode(generatedCode);
    alert('Program saved!');
  };

  const handleLoadProgram = () => {
    // Load the saved code back into the outputDiv and set it to state
    if (savedCode) {
      setGeneratedCode(savedCode);
      console.log(generateCode)
      outputDiv.current.textContent = generateCode;
    } else {
      alert('No program has been saved yet!');
    }
  };

  const onWorkspaceChange = (workspace) => {
    ws_instance = workspace
  }
  const generateCode = () => {
    const workspace = Blockly.getMainWorkspace();
    const code = javascriptGenerator.workspaceToCode(workspace);
    console.log(code);  
    outputDiv.current.textContent = code;  

    // let convertedString = String(code);
    // console.log(convertedString);
    // setGeneratedCode(convertedString);

    setGeneratedCode(code);

    try {
      eval(code);  
    } catch (error) {
      console.error('Error executing generated code:', error);
    }
  };

  useEffect(() => {
    customBlocks();
    initBlockly();
  }, []); 

  return (
    <div>
      <div id="blocklyDiv" ref={blocklyDiv} style={{ height: '600px', width: '1000px', border: '1px solid black' }}></div>

      <button onClick={generateCode}>Generate Code</button>
      <button onClick={handleSaveProgram}>Save</button>
      <button onClick={handleLoadProgram}>Load Saved Program</button>

      <h3>Generated Code:</h3>
      <pre ref={outputDiv} style={{ border: '1px solid #ccc', padding: '10px', background: '#f5f5f5' }}></pre>
    </div>
  );
};

export default BlocklyApp;
