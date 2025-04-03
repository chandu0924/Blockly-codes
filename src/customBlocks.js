// src/CustomBlocks.js
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

  javascriptGenerator['math_square'] = function(block) {
    const number = block.getFieldValue('NUMBER');
    const code = `${number} * ${number}`;
    return [code,javascriptGenerator.ORDER_MULTIPLICATION];  
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

  javascriptGenerator['draw_circle'] = function (block) {
    const radius = block.getFieldValue('RADIUS');  
    const xPosition = block.getFieldValue('X_POSITION');  
    const yPosition = block.getFieldValue('Y_POSITION'); 

    const code = `
      const canvas = document.getElementById('myCanvas');
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.arc(${xPosition}, ${yPosition}, ${radius}, 0, 2 * Math.PI);
      ctx.stroke();
    `;  

    return code;
  };
};

export default customBlocks;
