import * as Blockly from 'blockly';
import {ws_instance} from './Programming.jsx'

var json_object = {};
var taskCodeGenerator = new Blockly.Generator("JSON");
taskCodeGenerator.ORDER_MULTIPLICATION = 3;

taskCodeGenerator.workspaceToCode = function(workspace) {
  const topBlocks = workspace.getTopBlocks(true);
  let code = '';
  for (let block of topBlocks) {
    code += this.blockToCode(block);
  }
  return code;
};
var generateCode = function (id_ = "") {
    // console.log("generatecode",ws_instance)
    if (ws_instance === null || ws_instance === undefined)
      return ""
  
    let result = ""
  
    // var start_block = ws_instance.getBlocksByType("start", true)[0];
    // result += taskCodeGenerator.blockToCode(start_block, false);
    taskCodeGenerator.init(ws_instance); // optional but good practice
    const code = taskCodeGenerator.workspaceToCode(ws_instance);
    console.log(code); // or return it if needed
  
    let copiedObject = JSON.parse(JSON.stringify(json_object));
  
    json_object = {};
    return copiedObject
  }
  

  // taskCodeGenerator.forBlock["text_print"] = function(block) {
  //   // const text = taskCodeGenerator.valueToCode(block, "TEXT", Blockly.ORDER_ATOMIC);
  //   const text = taskCodeGenerator.valueToCode(block, "TEXT", 0);

  //   return `console.log(${text});`;
  // };
  taskCodeGenerator.forBlock["text_print"] = function(block) {
    const text = taskCodeGenerator.valueToCode(block, "TEXT", 0);
    return `console.log(${text});\n`;
  };
  
  taskCodeGenerator.forBlock["start"] = function (block) {
    let nextBlock = block.getChildren()[0] && block.getChildren()[0].id ? block.getChildren()[0].id : "null"
    let result = {
      "block_type": "start_block",
      "child_block": nextBlock,
      "next_block": "null",
      "params": {
        "value": "null"
      }
    }
  // Here's the actual code generation part
  const statement_members = taskCodeGenerator.statementToCode(block, "tasks_holder");
  return statement_members;
  };
  
  taskCodeGenerator.forBlock["print_number"] = function (block) {
    // Get the connected number block
    const number = taskCodeGenerator.valueToCode(block, "NUM", taskCodeGenerator.ORDER_ATOMIC);
    // Return the JavaScript code for printing the number
    return `console.log(${number});\n`;
  };

  taskCodeGenerator.forBlock["repeat_block"] = function (block) {

    let nextBlock = block.getNextBlock() && block.getNextBlock().id ? block.getNextBlock().id : "null"
    let repeat_type = block.getField("repeat_type").value_
    if (repeat_type === "Itr") {
      let value = block.getField('iter_check').value_ ? -1 : block.getField('iterations').value_
      let result = {
        "block_type": "repeat_block",
        "child_block": block.childBlocks_[0].id,
        "next_block": nextBlock,
        "params": {
          "mode": "0",
          "value": value.toString(),
          "exp_block": "null"
        }
      }
      json_object[block.id] = result
      taskCodeGenerator.blockToCode(block.childBlocks_[0])
    }
    else if (repeat_type === "T") {
      let value = block.getField('seconds').value_
      let result = {
        "block_type": "repeat_block",
        "child_block": block.childBlocks_[0].id,
        "next_block": nextBlock,
        "params": {
          "mode": "1",
          "value": value.toString(),
          "exp_block": "null"
        }
      }
      json_object[block.id] = result
      taskCodeGenerator.blockToCode(block.childBlocks_[0])
    }
    else if (repeat_type === "exp") {
      let childBlock
      let exp_block
      let state = true
      for (let i = 0; i < block.childBlocks_.length; i++) {
        if (block.childBlocks_[i].type === "compare") {
          exp_block = block.childBlocks_[i]
        }
  
        if (block.childBlocks_[i].type != "compare" && state) {
          childBlock = block.childBlocks_[i]
          state = false
        }
      }
      let result = {
        "block_type": "repeat_block",
        "child_block": childBlock.id,
        "next_block": nextBlock,
        "params": {
          "mode": "2",
          "value": "0",
          "exp_block": exp_block.id
        }
      }
      json_object[block.id] = result
      taskCodeGenerator.blockToCode(exp_block)
      taskCodeGenerator.blockToCode(childBlock)
    }
  
    return ""
  
  }
  
  taskCodeGenerator.forBlock["compare"] = function (block) {
    let operator = block.inputList[1].fieldRow[0].selectedOption[0]
  
    let result = {
      "block_type": "compare_block",
      "child_block": block.getInputTargetBlock(`A`).id,
      "next_block": "null",
      "params": {
        "compare_op": operator
      }
    }
  
    json_object[block.id] = result
    taskCodeGenerator.valueToCode(block, "A", 0);
    json_object[block.getInputTargetBlock(`A`).id].next_block = block.getInputTargetBlock(`B`).id
    taskCodeGenerator.valueToCode(block, "B", 0);
  
    console.log(json_object)
  
    return ""
  }

  
  taskCodeGenerator.forBlock["math_square"] = function(block) {
    // const number = taskCodeGenerator.getFieldValue("NUMBER");
    const number = block.getFieldValue("NUMBER");
    // const code = number * number;
    // Return JavaScript code for squaring the number
    // return `${number} * ${number}`;
    // return [`${code}`, Blockly.JavaScript.ORDER_MULTIPLY];
    // return code;
    // return [code, 200];
    const code = `${number} * ${number}`;
    return [code, taskCodeGenerator.ORDER_MULTIPLICATION];
};

  taskCodeGenerator.forBlock["controls_repeat_ext"] = function(block) {
    const times = taskCodeGenerator.valueToCode(block, "TIMES",0); 
    const branch = taskCodeGenerator.statementToCode(block, "DO"); 

    return `for (let i = 0; i < ${times}; i++) {\n${branch}\n}\n`; 
  };
  
  taskCodeGenerator.scrub_ = function (block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? "" : taskCodeGenerator.blockToCode(nextBlock);
    return code + nextCode;
  };
  
  export { taskCodeGenerator, generateCode }