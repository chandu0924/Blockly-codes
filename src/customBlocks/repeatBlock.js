import * as Blockly from "blockly/core";
// import { CustomFieldNumber } from "./custom_field";

Blockly.Blocks["repeat_block"] = {
  validate: function (newValue) {
    this.getSourceBlock().updateShape_(newValue);

    return newValue;
  },

  init: function () {
    this.appendDummyInput("type_holder")
      .appendField("Repeat")
      .appendField(
        new Blockly.FieldDropdown(
          [
            ["for Iteration(s)", "Itr"],
            ["until Time", "T"],
            ["until expression met", "exp"]
            // ["until Input ", "Inp"],
          ],
          this.validate
        ),
        "repeat_type"
      );
    this.appendDummyInput("dummy")
    this.appendStatementInput("stm_holder").setCheck(null).appendField("do");
    // this.setColour("#2F8AD0");
    this.setColour("120")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setOnChange(function (changeEvent) {
      if (changeEvent.blockId === this.id) {
        if (changeEvent.type === "move") {
        }
      }
    });
    this.setTooltip("");
    this.setHelpUrl("");
  },

  mutationToDom: function () {
    var container = document.createElement("mutation");
    var repeat_type = this.getFieldValue("repeat_type");
    container.setAttribute("repeat_type", repeat_type);

    if (this.getField("iter_check")) {
      var iter_check = this.getFieldValue("iter_check");
      if (iter_check == "TRUE") {
        container.setAttribute("iter_check", iter_check);
      }

      return container;
    }

    if (this.getField("iterations")) {
      var iterations = this.getFieldValue("iterations");
      container.setAttribute("iterations", iterations);
    }

    if (this.getField("seconds")) {
      var seconds = this.getFieldValue("seconds");
      container.setAttribute("seconds", seconds);
    }

    if (this.getField("input_type")) {
      var input_type = this.getFieldValue("input_type");
      container.setAttribute("input_type", input_type);

      if (input_type == "AI") {
        var anl_in_dropdown = this.getFieldValue("anl_in_dropdown");
        var compare_dropdown = this.getFieldValue("compare_dropdown");

        container.setAttribute("anl_in_dropdown", anl_in_dropdown);
        container.setAttribute("compare_dropdown", compare_dropdown);

        if (this.getField("v_val_holder")) {
          var v_val_holder = this.getFieldValue("v_val_holder");
          container.setAttribute("v_val_holder", v_val_holder);
        } else if (this.getField("c_val_holder")) {
          var c_val_holder = this.getFieldValue("c_val_holder");
          container.setAttribute("c_val_holder", c_val_holder);
        }
      } else if (input_type == "DI") {
        var dig_in_dropdown = this.getFieldValue("dig_in_dropdown");
        container.setAttribute("dig_in_dropdown", dig_in_dropdown);

        var compare_dropdown = this.getFieldValue("compare_dropdown");
        container.setAttribute("compare_dropdown", compare_dropdown);

        var dig_val_holder = this.getFieldValue("dig_val_holder");
        container.setAttribute("dig_val_holder", dig_val_holder);
      }
    }

    // if(this.getFieldValue('exprr_holder')){
    //   var exprr_holder = this.getFieldValue('exprr_holder');
    //   container.setAttribute('exprr_holder', exprr_holder);
    // }

    return container;
  },

  domToMutation: function (xmlElement) {
    var repeat_type = xmlElement.getAttribute("repeat_type");
    this.updateShape_(repeat_type);
    if (repeat_type == "Itr") {
      if (xmlElement.hasAttribute("iter_check")) {
        this.getField("iter_check").setValue(
          xmlElement.getAttribute("iter_check")
        );
      }
      if (xmlElement.hasAttribute("iterations")) {
        this.getField("iterations").setValue(
          xmlElement.getAttribute("iterations")
        );
      }
    }

    if (repeat_type == "T") {
      if (xmlElement.hasAttribute("seconds")) {
        this.getField("seconds").setValue(xmlElement.getAttribute("seconds"));
      }
    }

    if (repeat_type == "Inp") {
      if (xmlElement.hasAttribute("input_type")) {
        this.getField("input_type").setValue(
          xmlElement.getAttribute("input_type")
        );
        var input_type = xmlElement.getAttribute("input_type");
        if (input_type == "AI") {
          this.getField("anl_in_dropdown").setValue(
            xmlElement.getAttribute("anl_in_dropdown")
          );
          this.getField("compare_dropdown").setValue(
            xmlElement.getAttribute("compare_dropdown")
          );
        } else if (input_type == "DI") {
          this.getField("dig_in_dropdown").setValue(
            xmlElement.getAttribute("dig_in_dropdown")
          );
          this.getField("compare_dropdown").setValue(
            xmlElement.getAttribute("compare_dropdown")
          );
          this.getField("dig_val_holder").setValue(
            xmlElement.getAttribute("dig_val_holder")
          );
        }
      }
    }

    // if(repeat_type === "exp"){
    //   var exprr_holder = xmlElement.getAttribute('exprr_holder');
    //   this.getField('exprr_holder').setValue(exprr_holder);
    // }
  },

  updateShape_: function (newValue) {
    if (newValue == "Itr" || newValue == "T" || newValue == "Inp" || newValue === "exp") {

      if (this.getInputTargetBlock('exp')) {
        this.getInputTargetBlock('exp').dispose();
      }

      if (this.getInput('exp')) {
        this.removeInput('exp');
      }

      if (this.getInput('exprr_holder_cover')) {
        this.removeInput('exprr_holder_cover');
      }

      if (this.getField("iterations")) {
        this.getInput("type_holder").removeField("iterations");
      }
      if (this.getField("time")) {
        this.getInput("type_holder").removeField("time");
      } else {
      }

      if (this.getField("infinite_field")) {
        this.getInput("type_holder").removeField("infinite_field");
      }

      if (this.getField("iter_check")) {
        this.getInput("type_holder").removeField("iter_check");
      }

      if (this.getField("input_type")) {
        this.getInput("type_holder").removeField("input_type");
      }
      if (this.getField("anl_in_dropdown")) {
        this.getInput("type_holder").removeField("anl_in_dropdown");
      }
      if (this.getField("compare_dropdown")) {
        this.getInput("type_holder").removeField("compare_dropdown");
      }
      if (this.getField("v_val_holder")) {
        this.getInput("type_holder").removeField("v_val_holder");
      }
      if (this.getField("c_val_holder")) {
        this.getInput("type_holder").removeField("c_val_holder");
      }
      if (this.getField("dig_val_holder")) {
        this.getInput("type_holder").removeField("dig_val_holder");
      }
      if (this.getField("dig_in_dropdown")) {
        this.getInput("type_holder").removeField("dig_in_dropdown");
      }
      if (this.getField("seconds")) {
        this.getInput("type_holder").removeField("seconds");
      }
      if (this.getField("second")) {
        this.getInput("type_holder").removeField("second");
      }
    }

    if (newValue == "AI") {
      if (this.getField("dig_val_holder")) {
        this.getInput("type_holder").removeField("dig_val_holder");
      }
      if (this.getField("dig_in_dropdown")) {
        this.getInput("type_holder").removeField("dig_in_dropdown");
      }
      if (this.getField("compare_dropdown")) {
        this.getInput("type_holder").removeField("compare_dropdown");
      }
      if (this.getField("anl_in_dropdown")) {
        this.getInput("type_holder").removeField("anl_in_dropdown");
      }
      if (this.getField("compare_dropdown")) {
        this.getInput("type_holder").removeField("compare_dropdown");
      }
      if (this.getField("v_val_holder")) {
        this.getInput("type_holder").removeField("v_val_holder");
      }
      if (this.getField("c_val_holder")) {
        this.getInput("type_holder").removeField("c_val_holder");
      }
    }

    if (newValue == "DI") {
      if (this.getField("anl_in_dropdown")) {
        this.getInput("type_holder").removeField("anl_in_dropdown");
      }
      if (this.getField("compare_dropdown")) {
        this.getInput("type_holder").removeField("compare_dropdown");
      }
      if (this.getField("v_val_holder")) {
        this.getInput("type_holder").removeField("v_val_holder");
      }
      if (this.getField("c_val_holder")) {
        this.getInput("type_holder").removeField("c_val_holder");
      }
      if (this.getField("dig_val_holder")) {
        this.getInput("type_holder").removeField("dig_val_holder");
      }
      if (this.getField("dig_in_dropdown")) {
        this.getInput("type_holder").removeField("dig_in_dropdown");
      }
      if (this.getField("compare_dropdown")) {
        this.getInput("type_holder").removeField("compare_dropdown");
      }
    }

    if (newValue.charAt(2) == "v") {
      if (this.getField("c_val_holder")) {
        this.getInput("type_holder").removeField("c_val_holder");
      }
    }

    if (newValue.charAt(2) == "c") {
      if (this.getField("v_val_holder")) {
        this.getInput("type_holder").removeField("v_val_holder");
      }
    }

    if (newValue == "Itr") {
      this.getInput("type_holder")
        .appendField("Infinite", "infinite_field")
        .appendField(
          new Blockly.FieldCheckbox("FALSE", this.validate),
          "iter_check"
        );
        this.getInput("type_holder")
        .appendField(new Blockly.FieldTextInput("0"), "iterations")
        .appendField("Times", "time");
      this.setFieldValue("FALSE", "iter_check");
      // .appendField(new Blockly.FieldNumber(0, 0), "iterations")
      // .appendField("Times","time");

      //console.log("iterations filed added");
    } else if (newValue == "T") {
        if (!this.getField("seconds")) {
            this.getInput("type_holder")
            .appendField(new Blockly.FieldTextInput("0"), "seconds")
            .appendField("sec", "second");
          }
    } else if (newValue == "Inp") {
      this.getInput("type_holder").appendField(
        new Blockly.FieldDropdown(
          [
            ["Analog", "AI"],
            ["Digital", "DI"],
          ],
          this.validate
        ),
        "input_type"
      );
      this.updateShape_("AI");
    } else if (newValue == "AI") {
      ///here i assume that i am getting a list of analog inputs here each element of list will have 2 things pin name , pin id (this pin id also contains information about the volt or current mode
      /// like we can give id like this a_v_1 or a_c_1 from this i got to know by third character it is in v/c mode so that i can set the voltage and current limit in field)
      const anl_in_names = window.ioData.getAnlInNames();
      const anl_in_modes = window.ioData.getAnlInModes();

      const generatedArray = anl_in_names.map((val, index) => {
        let name = val.split(" ").join("\u00A0");
        //console.log("name is ",name)
        return [name, `a_${anl_in_modes[index] ? "c" : "v"}_${index + 1}`];
      });
      //var dropDownVal = [["Analog_In_0", "a_v_1"], ["Analog_In_1", "a_c_2"], ["Analog_In_2", "a_c_3"], ["Analog_In_3", "a_c_4"]];
      var dropdown = new Blockly.FieldDropdown(generatedArray);
      dropdown.setValidator(this.validate);

      var comparsion_dropdown_val = [
        ["=", "=="],
        ["\u2260", "!="],
        ["\u200F<", "<"],
        ["\u200F\u2264", "<="],
        ["\u200F>", ">"],
        ["\u200F\u2265", ">="],
      ];

      var comparsion_dropdown = new Blockly.FieldDropdown(
        comparsion_dropdown_val
      );

      this.getInput("type_holder")
        .appendField(dropdown, "anl_in_dropdown")
        .appendField("")
        .appendField(comparsion_dropdown, "compare_dropdown");

      if (generatedArray[0][1].charAt(2) == "v") {
        this.getInput("type_holder").appendField(
          new Blockly.FieldNumber(0, 0, 10, 0.01),
          "v_val_holder"
        );
      } else if (generatedArray[0][1].charAt(2) == "c") {
        this.getInput("type_holder").appendField(
          new Blockly.FieldNumber(4, 4, 20, 0.01),
          "c_val_holder"
        );
      }
    } else if (newValue == "DI") {
      ///here i assume that i am getting a list of digital inputs which are not used in safety
      //// var options = [["option_name", "option_identifier"], ["option_name", "option_identifier"]];
      /// option name is nae of pin and identifier will be like this DO_1 -- DO_16 and AO_1 to AO_16

      const dig_in_names = window.ioData.getDigInNames();
      const safety_in_names = window.ioData.getSafetyInputNames();

      var dig_names_without_safety = dig_in_names.filter(
        (val) => !safety_in_names.includes(val)
      );

      const generatedArray = dig_names_without_safety.map((val, index) => {
        let name = val.split(" ").join("\u00A0");
        //console.log("name is ",name)
        return [name, `d_id_${index + 1}`];
      });

      //var dropDownVal = [["DI_0", "d_id_1"], ["DI_1", "d_id_2"], ["DI_2", "d_id_3"], ["DI_3", "d_id_4"], ["DI_4", "d_id_5"], ["DI_5", "d_id_6"], ["DI_6", "d_id_7"], ["DI_7", "d_id_8"], ["DI_8", "d_id_9"], ["DI_9", "d_id_10"], ["DI_10", "d_id_11"], ["DI_11", "d_id_12"], ["DI_12", "d_id_13"], ["DI_13", "d_id_14"], ["DI_14", "d_id_15"], ["DI_15", "d_id_16"]];

      var comparsion_dropdown_val = [
        ["=", "=="],
        ["\u2260", "!="],
        ["\u200F<", "<"],
        ["\u200F\u2264", "<="],
        ["\u200F>", ">"],
        ["\u200F\u2265", ">="],
      ];

      var comparsion_dropdown = new Blockly.FieldDropdown(
        comparsion_dropdown_val
      );

      this.getInput("type_holder")
        .appendField(
          new Blockly.FieldDropdown(generatedArray),
          "dig_in_dropdown"
        )
        .appendField("")
        .appendField(comparsion_dropdown, "compare_dropdown")
        .appendField(
          new Blockly.FieldDropdown([
            ["True", "TRUE"],
            ["False", "FALSE"],
          ]),
          "dig_val_holder"
        );
    } else if (newValue.charAt(2) == "v") {
      if (this.getField("v_val_holder") == null) {
        this.getInput("type_holder").appendField(
          new Blockly.FieldNumber(0, 0, 10, 0.01),
          "v_val_holder"
        );
      }
    } else if (newValue.charAt(2) == "c") {
      if (this.getField("c_val_holder") == null) {
        this.getInput("type_holder").appendField(
          new Blockly.FieldNumber(4, 4, 20, 0.01),
          "c_val_holder"
        );
      }
    } else if (newValue == "TRUE") {
      if (this.getField("iterations")) {
        this.getInput("type_holder").removeField("iterations");
      }

      if (this.getField("time")) {
        this.getInput("type_holder").removeField("time");
      }
    } else if (newValue === "FALSE") {
      if (!this.getField("iterations")) {
        this.getInput("type_holder")
          .appendField(new Blockly.FieldNumber(0, 0), "iterations")
          .appendField("Times", "time");
      }
    } else if(newValue === "exp"){ 

      this.appendValueInput('exp')
        .setCheck(["include", "compare"]);

      // this.moveInputBefore('exp', null); // 'null' moves it to the end
      this.moveInputBefore('exp', 'dummy');

      let logic_block = this.workspace.newBlock('compare');

      logic_block.initSvg()
      logic_block.render();
      logic_block.setShadow(true);
      logic_block.outputConnection.connect(
        this.getInput("exp").connection
      );

      // this.appendDummyInput("exprr_holder_cover");
    }
  },
};

Blockly.Blocks["break"] = {
  init: function () {
    this.appendDummyInput().appendField("Break");
    this.setPreviousStatement(true, null);
    this.setOnChange(function (changeEvent) {
      // console.log(changeEvent);
      if (changeEvent.blockId === this.id) {
        if (changeEvent.type === "move") {
          //console.log(changeEvent);
          if (changeEvent.newParentId) {
            if (
              this.getSurroundParent() &&
              this.getSurroundParent().type === "trajectory"
            ) {
              if (this.previousConnection.targetConnection) {
                this.previousConnection.disconnect();
              }
              if (this.nextConnection.targetConnection) {
                this.nextConnection.disconnect();
              }
            } else if (
              this.workspace
                .getBlockById(changeEvent.newParentId)
                .getSurroundParent() &&
              this.workspace
                .getBlockById(changeEvent.newParentId)
                .getSurroundParent().type == "trajectory"
            ) {
              if (this.previousConnection.targetConnection) {
                this.previousConnection.disconnect();
              }
            }
          }
        }
      }
    });
    this.setColour("120");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};
