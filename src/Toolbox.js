const Toolbox = () => {
  return {
    kind: 'categoryToolbox',
    contents: [
      {
        kind: 'category',
        name: 'Loops',
        colour: '#5CA65C',
        contents: [
          { kind: 'block', type: 'controls_repeat_ext' },
          { kind: 'block', type: 'controls_for' },
          { kind: 'block', type: 'controls_whileUntil' }
        ]
      },
      {
        kind: 'category',
        name: 'Logic',
        colour: '#5C6BC0',
        contents: [
          { kind: 'block', type: 'logic_compare' },
          { kind: 'block', type: 'logic_operation' },
          { kind: 'block', type: 'logic_negate' },
          { kind: 'block', type: 'logic_boolean' }
        ]
      },
      {
        kind: 'category',
        name: 'Math',
        colour: '#FF8C1A',
        contents: [
          { kind: 'block', type: 'math_number' },
          { kind: 'block', type: 'math_arithmetic' },
          { kind: 'block', type: 'math_change' }
        ]
      },
      {
        kind: 'category',
        name: 'Text',
        colour: '#F1C40F',
        contents: [
          { kind: 'block', type: 'text' },
          { kind: 'block', type: 'text_print' }
        ]
      },
      {
        kind: 'category',
        name: 'custom blocks',
        colour: '#F1C40F',
        contents: [
          { kind: 'block', type: 'math_square' }
        ]
      },
      {
        kind: 'category',
        name: 'circle',
        colour: '#5C6BC0',
        contents: [
          { kind: 'block', type: 'draw_circle' }
        ]
      }
    ]
  };
};

export default Toolbox;