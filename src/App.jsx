import React, { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly/core'; 
import Toolbox from './components/Toolbox';  
import { javascriptGenerator } from 'blockly/javascript';

const App = () => {
  const blocklyDiv = useRef(null);
  const [workspace, setWorkspace] = useState(null);

  useEffect(() => {
    // Initialize Blockly
    const workspaceInstance = Blockly.inject(blocklyDiv.current, {
      toolbox: Toolbox(),
      trashcan: true,
    });

    setWorkspace(workspaceInstance);

    return () => {
      if (workspaceInstance) {
        workspaceInstance.dispose();
      }
    };
  }, []);

  const generateCode = () => {
    if (workspace) {
      try {
        const code = javascriptGenerator.workspaceToCode(workspace);
        console.log(code);  
      } catch (error) {
        console.error("Error generating code:", error);
      }
    } else {
      console.log("Workspace is not initialized yet");
    }
  };

  return (
    <div className="App">
      <h1>Blockly in React</h1>
      <div
        ref={blocklyDiv}
        style={{ height: '600px', width: '1000px', border: '1px solid black' }}
      ></div>
      <button onClick={generateCode}>Generate Code</button>
    </div>
  );
};

export default App;
