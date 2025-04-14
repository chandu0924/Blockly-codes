import * as Blockly from "blockly/core";

Blockly.Blocks['math_square'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Square of")
          .appendField(new Blockly.FieldNumber(0), "NUMBER");
      this.setOutput(true, 'Number');
      this.setColour(230);
      this.setTooltip('Returns the square of the number');
      this.setHelpUrl('http://www.example.com/');
    }
  };