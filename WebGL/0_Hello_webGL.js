//var vertices;
var shaderProgram;

var callWebGL = function () {

         /======= Step 1: Getting the WebGL context =========/
         var canvas = document.getElementById('my_Canvas');
         var gl = canvas.getContext('experimental-webgl');

         /======= Step 2: clear the canvas color =========/
         gl.clearColor(0, 0.5, 0.9, 0.6); // specify the color (RGB) and transparency
         gl.clear(gl.COLOR_BUFFER_BIT); // Clear the color

         /*======= Step 3: Define vertex data in JS array variable
             Middle of the screen is (0, 0)
         ======*/


	     var vertices = [
         0.1, 0, 0,
         -0.1, 0, 0,
         -0.2, 0.2, 0,
         -0.1, 0.4, 0,
         0.1, 0.4, 0,
         0.2, 0.2, 0,
         0.1, 0, 0,
         0.2, -0.2, 0,
         0, -0.4, 0,
         -0.2, -0.2, 0,
         -0.1, 0, 0,
         -0.2, -0.2, 0,
         -0.3, 0, 0,
         -0.2, 0.2, 0,
         -0.1, 0.4, 0,
         0.1, 0.4, 0,
         0.2, 0.2, 0,
         0.3, 0, 0,
         0.2, -0.2, 0
         ];

         /======= STEP 4: Create buffer (in GPU) for vertex data =======/
         var vertex_buffer = gl.createBuffer();   // Create an empty buffer object
         gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer); // Bind appropriate array buffer to it

         /======= STEP 5: Load JS variable for vertex data onto the buffer =======/
         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

         /======= Step 6: Create shader and shader programs, shaderCode() ======/
	      glStaticShaderCode(gl, vertices, 3, 3);

         /*======= Step 7: get the location of shader variable corresponding to the vertex positions in a JS variable
                           (meaning: corresponding to JS array of vertex data, there are corresponding variables
                           in shaders(GPU)
         ======*/
         var coord = gl.getAttribLocation(shaderProgram, "coordinates");

         /*======= Step 8: with the help of the JS variable above (Step 7), state the information about vertex
                           positions data declared earlier with JS vertex data (Step 3)
         ======*/
         gl.vertexAttribPointer(coord, 3, gl.FLOAT, gl.FALSE, 3*Float32Array.BYTES_PER_ELEMENT, 0);
               // Attribute Location,
               // no of elements per attribute,
               // type of elements,
               // whether data is normalized,
               // size of an individual vertex, e.g. 2 for 2-d point, 3 for 3-d point, 5 for 2-d point and RGB info.
               // offset from the begining of a single vertex to this attribute )

         /======= STEP 9: Enable the unfolding of data out of the buffer =======/
         gl.bindBuffer(gl.ARRAY_BUFFER, null);

         /======= STEP 10: Free the memory from the buffer =======/
         gl.enableVertexAttribArray(coord);

         /======= Step 11: Draw the geometry =======/
         gl.drawArrays(gl.LINE_LOOP, 0, 19);
         // POINTS, LINE_STRIP, LINE_LOOP, LINES, TRIANGLE_STRIP,TRIANGLE_FAN, TRIANGLES
         //(how to draw vertices, how many vertices to skip from start, how many to draw)
}

//Shader Code: (All this happening in GPU )
function glStaticShaderCode(gl, vertex_buffer, ELEMENTS_PER_ATTRIBUTE, ELEMENTS_PER_VERTEX)
{
         /======= Step 1: State vertex shader code in a JS text =======/
         var vertCode =
            'attribute vec3 coordinates;' +
            'void main(void) {' +
               ' gl_Position = vec4(coordinates, 1.0);' +
            '}';

         /*======= Step 2: Create a (no body) vertex shader and attach vertex shader text(step 1)
                  to it
         =======*/
         var vertShader = gl.createShader(gl.VERTEX_SHADER);
         gl.shaderSource(vertShader, vertCode);

         /======= Step 3: Compile the shader =======/
         gl.compileShader(vertShader);

         /======= Step 4: Similarly, state the fragment shader code in a JS text =======/
         var fragCode =
            'void main(void) {' +
               'gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);' +
            '}';

         /*======= Step 5: Create a (no body) fragment shader and attach fragment shader text( step 4)
                     to it
         =======*/
         var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
         gl.shaderSource(fragShader, fragCode);

         /======= Step 6: Compile the shader =======/
         gl.compileShader(fragShader);

         /======= Step 7: Create a (no body) shader program =======/
         shaderProgram = gl.createProgram();

         /*======= Step 8: Attach vertex shader and fragment shader compiled above to it,
                  one by one
         =======*/
         gl.attachShader(shaderProgram, vertShader);
         gl.attachShader(shaderProgram, fragShader);

         /======= Step 9: Link the program =======/
         gl.linkProgram(shaderProgram);

         /======= Step 10: Now, use the program =======/
         gl.useProgram(shaderProgram);
}
