import "./new.js";
const Toolbox = () => {
    return {   
        kind: 'categoryToolbox',
        contents: [
            {
                kind: 'category',
                name: 'Logic',
                contents: [
                    {
                        kind: 'block',
                        type: 'circle'
                    },
                    {
                        kind: 'block',
                        type: 'logic_boolean'
                    },
                    {
                        kind: 'block',
                        type: 'logic_compare'
                    }
                ]
            },
            {
                kind: 'category',
                name: 'Control',
                contents: [
                    {
                        kind: 'block',
                        type: 'controls_repeat_ext'
                    },
                    {
                        kind: 'block',
                        type: 'controls_if'
                    }
                ]
            },
            {
                kind: 'category',
                name: 'Math',
                contents: [
                    {
                        kind: 'block',
                        type: 'math_number'
                    },
                    {
                        kind: 'block',
                        type: 'math_arithmetic'
                    }
                ]
            },
            {
                kind: 'category',
                name: 'Text',
                contents: [
                    {
                        kind: 'block',
                        type: 'text'
                    },
                    {
                        kind: 'block',
                        type: 'text_print'
                    }
                ]
            },
            {
                kind: 'category',
                name: 'Variables',
                contents: [
                    {
                        kind: 'block',
                        type: 'variables_set'
                    },
                    {
                        kind: 'block',
                        type: 'variables_get'
                    },
                    {
                        kind: 'block',
                        type: 'variables_set'
                    },
                    {
                        kind: 'block',
                        type: 'variables_get'
                    }
                ]
            }
        ]
    }
}

export default Toolbox;
