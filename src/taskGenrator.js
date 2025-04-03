

Blockly.JavaScript['draw_circle'] = function(block) {
    const radius = block.getFieldValue('RADIUS');
    const centerX = block.getFieldValue('CENTER_X');
    const centerY = block.getFieldValue('CENTER_Y');
    
    const code = `drawCircle(${centerX}, ${centerY}, ${radius});\n`;
  
    return code;
  };
  

function drawCircle(centerX, centerY, radius) {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';  
    ctx.fill();
    ctx.stroke();
  }