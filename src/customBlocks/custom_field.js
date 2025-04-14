import * as Blockly from "blockly/core";
// import '../../Programming'


// class CustomFieldNumber extends Blockly.FieldNumber {
//     constructor(value = "0", validator = null) {
//         super(value, validator); // ✅ only pass value & validator
//     }
//     showEditor_ = (() => {

//         let event = new CustomEvent("linkKeyPad", {
//             detail: {
//                 "type": "numpad",
//                 "numpad_top": 250,
//                 "numpad_right": 700,
//                 "ref": this
//             },
//             bubbles: true,
//             cancelable: true
//         })
//         document.dispatchEvent(event);
//     });
// }

class CustomFieldNumber extends Blockly.FieldNumber {
    constructor(value, validator) {
        super(value);
        this.validator_ = validator;
        this.setValidator(this.validator_);
    }
        showEditor_ = (() => {

        let event = new CustomEvent("linkKeyPad", {
            detail: {
                "type": "numpad",
                "numpad_top": 250,
                "numpad_right": 700,
                "ref": this
            },
            bubbles: true,
            cancelable: true
        })
        document.dispatchEvent(event);
    });

    setValidator(validator) {
        this.validator_ = validator;
    }

    validate(value) {
        if (this.validator_) {
            return this.validator_(value);
        }
        return value;
    }
}


Blockly.registry.register(
    "FIELD",
    "field_number",
    CustomFieldNumber,
    true);

class CustomFieldTextInput extends Blockly.FieldTextInput {

    showEditor_ = (() => {
        console.log("reached text", this.EDITABLE);
        if (!this.EDITABLE) {
            return
        }
        let event = new CustomEvent("linkKeyPad", {
            detail: {
                "type": "keyboard",
                "keypad_top": 250,
                "keypad_left": 100,
                "ref": this
            },
            bubbles: true,
            cancelable: true
        })
        document.dispatchEvent(event);


    });
}

Blockly.registry.register(
    "FIELD",
    "field_text_input",
    CustomFieldTextInput,
    true);


export { CustomFieldNumber,CustomFieldTextInput } 