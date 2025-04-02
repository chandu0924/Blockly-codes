import * as Blockly from "blockly/core";

// Circle block definition
Blockly.Blocks['circle'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Custom Block");
        this.appendValueInput("radius")
            .setCheck(null)
            .appendField("Radius");
        this.appendValueInput("x")
            .setCheck(null)
            .appendField("X axis");
        this.appendValueInput("y")
            .setCheck(null)
            .appendField("Y axis");
        this.setColour(150);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// Variable getter block definition
Blockly.Blocks['variables_get'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("VAR_NAME"), "FIELD_NAME");
        this.setOutput(true, null);
    }
};

// Variable setter block definition
Blockly.Blocks['variables_set'] = {
    init: function() {
        this.appendValueInput("THIS NAME")
            .setCheck(null)
            .appendField("setting")
            .appendField(new Blockly.FieldVariable("VAR_NAME"), "FIELD_NAME")
            .appendField("tooo");
        this.setOutput(true, null);
    }
};