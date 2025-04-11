import { useEffect } from 'react';
import { BlocklyWorkspace } from 'react-blockly';
import { useContext, useRef } from 'react';
import { BlocklyContext } from "./BlocklyContext.jsx";
import Toolbox from './Toolbox.js';
import { javascriptGenerator } from 'blockly/javascript';
import { generateCode, taskCodeGenerator } from './taskGenrator.js';
import * as Blockly from 'blockly'; 
import { DEFAULT_OPTIONS } from './Default.js';
import customBlocks from './customBlocks.js';
import "./App.css"
import "./Programming.css"
var ws_instance;

const Programming = () => {
    const blocklyContext = useContext(BlocklyContext);
    const outputDiv = useRef(null); 
 
    const onWorkspaceChange = (workspace) => {

        ws_instance = workspace;
        // console.log("workspace",workspace);
    
        let newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
        blocklyContext.onUpdateProgramXml(newXml)
    }

    const defineCustomBlocks = () => {
    Blockly.Blocks['start'] = {
        init: function () {
        this.appendDummyInput()
            .appendField("START TASK");
        this.appendStatementInput("tasks_holder")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("END TASK");
        this.setColour("#6BBA48");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setDeletable(false);
        this.setMovable(false);
        }
    };
    }
    useEffect(() => {
        defineCustomBlocks();
        customBlocks();
    }, []);

    useEffect(() => {
        console.log("Saved tasks updated:", blocklyContext.savedTask);
    }, [blocklyContext.savedTask]);

    let workspaceConfiguration = {
        ...DEFAULT_OPTIONS
    };
    
    const toolbox = Toolbox();
  
    // console.log("toolbox",toolbox);
    // console.log("this",blocklyContext.isXmlLoaded);    
    
    const generateCodeProgram = () => {
        // console.log("generateCodeProgram", ws_instance);
        if (ws_instance) {
            // const genCode = generateCode("  ");
            // console.log("   ",genCode)
            // const code = javascriptGenerator.workspaceToCode(ws_instance); 
            // outputDiv.current.textContent = code; 
            // const genCode = generateCode(); // this uses your custom `taskCodeGenerator`
            // outputDiv.current.textContent = JSON.stringify(genCode, null, 2); // pretty print the JSON
            const code = taskCodeGenerator.workspaceToCode(ws_instance);
            outputDiv.current.textContent = code;
        }
    };

    const handleSaveProgram = () => {
        if (ws_instance) {
            const xml = Blockly.Xml.workspaceToDom(ws_instance); 
            const xmlText = Blockly.Xml.domToText(xml); 
            blocklyContext.saveTask(xmlText); 
            console.log("Program saved!");
        }
    };

    const handleLoadProgram = (index) => {
        const savedXml = blocklyContext.loadTask(index);
        if (savedXml) {
            const xml = Blockly.utils.xml.textToDom(savedXml); 
            ws_instance.clear();
            // outputDiv.current.textContent = xml;
            Blockly.Xml.domToWorkspace(xml, ws_instance);
             
            console.log(`Program loaded from use case ${index}`);
        }
    };

    return (
    <div>
        <div className='workspace-container'>
            <div className='workspace'>
                {blocklyContext.isXmlLoaded && <BlocklyWorkspace 
                className="workspace-style"
                toolboxConfiguration={toolbox}
                workspaceConfiguration={workspaceConfiguration}
                initialXml={blocklyContext.currProgramXml}
                onWorkspaceChange={onWorkspaceChange}
                />}
            </div>
            <div className='saved-program'>
                <p>Saved Programs:</p>
                <ul>
                    {blocklyContext.savedTask && blocklyContext.savedTask.length > 0 ? (
                blocklyContext.savedTask.map((xmlText, index) => (
    
                    <li key={index}>
                        <button onClick={() => handleLoadProgram(index)}>Load Saved Program {index+1}</button>
                    <button onClick={() => blocklyContext.deleteTask(index)}>
                        &#128465;
                    </button>
                    </li>
                ))
            ) : (
                <p>No saved programs</p>
            )}
                </ul>
            </div>
        </div>

        <button onClick={generateCodeProgram}>Generate Code</button>
        <button onClick={handleSaveProgram}>Save</button>
        
        <h3>Generated Code:</h3>
        <pre ref={outputDiv} 
        className='generated-code'></pre>
    </div>
    )
}

export default Programming
export { ws_instance };