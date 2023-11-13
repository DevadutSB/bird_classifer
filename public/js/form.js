$('color').addEventListener('change', function() {
    line_color = this.value;

    bg_color = getComplementaryColor(line_color); 
    
    $('line_color').innerText   = `Line Color : ${line_color}`
    $('line_color').style.color = line_color
    $('bg_color').innerText     = `Background Color : ${bg_color}`
    $('bg_color').style.color   = bg_color
    console.log("Line color:", line_color,bg_color);
});

$('lineWidth').addEventListener('change', function() {
    line_width = this.value;
    $('line_width').innerText = `${line_width}px`
    console.log(line_width)
});
