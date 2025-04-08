import {ws_instance} from './Programming.jsx'

var taskCodeGenerator = new Blockly.Generator("JSON");

var generateCode = function (id_ = "") {
    console.log(ws_instance)
    if (ws_instance === null || ws_instance === undefined)
      return ""
  
    let result = ""
  
    var start_block = ws_instance.getBlocksByType("start", true)[0];
    result += taskCodeGenerator.blockToCode(start_block, false);
  
    let copiedObject = JSON.parse(JSON.stringify(json_object));
  
    json_object = {};
    return copiedObject
  }

export { taskCodeGenerator, generateCode }