import { BlocklyWorkspace } from 'react-blockly';
import { useContext, useRef } from 'react';
import { BlocklyContext } from "./BlocklyContext.jsx";
import Toolbox from './Toolbox.js';
import { javascriptGenerator } from 'blockly/javascript';
import { generateCode } from './taskGenrator.js';
var ws_instance;
import * as Blockly from 'blockly'; 
import { DEFAULT_OPTIONS } from './Default.js';
import "./App.css"

const Programming = () => {
    const blocklyContext = useContext(BlocklyContext);
    const outputDiv = useRef(null); 
 
    const onWorkspaceChange = (workspace) => {

        ws_instance = workspace;
    
        let newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
        blocklyContext.onUpdateProgramXml(newXml)
      }

    const defineCustomBlocks = () => {
    Blockly.Blocks['start'] = {
        init: function () {
        this.appendDummyInput()
            .appendField("START");
        this.appendStatementInput("tasks_holder")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("END");
        this.setColour("#6BBA48");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setDeletable(false);
        this.setMovable(false);
        }
    };
    }
    defineCustomBlocks();

    let workspaceConfiguration = {
        ...DEFAULT_OPTIONS
    };
    
    const toolbox = Toolbox();
    // const toolbox = Blockly.Xml.jsonToXml(Toolbox());
    // const toolboxDom = Blockly.Xml.textToDom(toolbox);
    // const toolboxDom = Blockly.utils.xml.textToDom(toolbox);
  
    console.log("toolbox",toolbox);
    console.log("this",blocklyContext.isXmlLoaded);    
    
    const generateCodeProgram = () => {
        if (ws_instance) {
            const genCode = generateCode("  ");
            const code = javascriptGenerator.workspaceToCode(ws_instance); 
            outputDiv.current.textContent = code; 
        }
    };

    const handleSaveProgram = () => {
        if (ws_instance) {
            const xml = Blockly.Xml.workspaceToDom(ws_instance); 
            const xmlText = Blockly.Xml.domToText(xml); 
            blocklyContext.addUseCase(xmlText); 
            console.log("Program saved!");
        }
    };

    const handleLoadProgram = (index) => {
        const savedXml = blocklyContext.loadUseCase(index);
        if (savedXml) {
            const xml = Blockly.Xml.textToDom(savedXml); 
            outputDiv.current.textContent = xml;
            Blockly.Xml.domToWorkspace(xml, ws_instance); 
            console.log(`Program loaded from use case ${index}`);
        }
    };

    return (
    <div>
        <div style={{ height: '600px', width: '1000px', border: '1px solid black' }}>
            {blocklyContext.isXmlLoaded && <BlocklyWorkspace 
            className="workspace-style"
            toolboxConfiguration={toolbox}
            workspaceConfiguration={workspaceConfiguration}
            initialXml={blocklyContext.currProgramXml}
            onWorkspaceChange={onWorkspaceChange}
            />}
        </div>

        <button onClick={() => generateCodeProgram}>Generate Code</button>
        <button onClick={() => handleSaveProgram}>Save</button>
        <button onClick={() => handleLoadProgram(0)}>Load Program 0</button> 

        <h3>Generated Code:</h3>
        <pre ref={outputDiv} style={{ border: '1px solid #ccc', padding: '10px', background: '#f5f5f5' }}></pre>
    </div>
    )
}

export default Programming
export { ws_instance };