import React, { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly';
// import 'blockly/blockly.css'; // Uncomment if you want to use the CSS file locally
import {javascriptGenerator} from 'blockly/javascript';

const App = () => {
  const blocklyDiv = useRef(null); // Create a reference for the Blockly container
  const [workspace, setWorkspace] = useState(null); // State to hold the Blockly workspace

  useEffect(() => {
    // Initialize Blockly
    const workspaceInstance = Blockly.inject(blocklyDiv.current, {
      toolbox: `
        <xml>
          <block type="controls_repeat_ext"></block>
          <block type="logic_boolean"></block>
          <block type="math_number"></block>
          <block type="text"></block>
          <block type="controls_if"></block>
          <block type="logic_compare"></block>
          <block type="math_arithmetic"></block>
          <block type="text_print"></block>
        </xml>
      `,
    });

    // Set the workspace state when Blockly is initialized
    setWorkspace(workspaceInstance);

    // Cleanup when the component is unmounted
    return () => {
      if (workspaceInstance) {
        workspaceInstance.dispose();
      }
    };
  }, []); // Empty dependency array ensures this effect only runs once when the component mounts

  // Function to generate JavaScript code from the blocks
  const generateCode = () => {
    if (workspace) {
      try {
        const code = javascriptGenerator.workspaceToCode(workspace);

        console.log(code);  // Logs the generated JavaScript code
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
