import {javascriptGenerator} from 'blockly/javascript';
import * as Blockly from 'blockly';

const customBlocks = () => {  

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

  Blockly.Blocks['draw_circle'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Draw circle with radius")
        .appendField(new Blockly.FieldNumber(50, 0, 1000), "RADIUS"); 
      this.appendDummyInput()
        .appendField("at position X:")
        .appendField(new Blockly.FieldNumber(100, 0, 500), "X_POSITION");  
      this.appendDummyInput()
        .appendField("Y:")
        .appendField(new Blockly.FieldNumber(100, 0, 500), "Y_POSITION");  
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);  
      this.setTooltip('Draws a circle with specified radius and position on the canvas.');
      this.setHelpUrl('http://www.example.com/');
    }
  };

};

export default customBlocks;
