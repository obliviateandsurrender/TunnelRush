var obs1 = {
  cubeTranslation1:0.0,
  nblock:10,
  liar:"whatisalie",
  wand:"quick",
  titb:1
}
//var obs1.cubeTranslation1 = 0.0;
//var obs1.nblock = 10;
//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
function initBuffers1(gl) {

  // Create a buffer for the cube's vertex positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the cube.
  
  var blocks = [];
  
  var bl1face = [[-0.5, -2.0, 0.5], [0.5, -2.0, 0.5], [0.5, 2.0, 0.5], [-0.5, 2.0, 0.5], [-0.5, -2.0, -0.5], [-0.5, 2.0, -0.5], [0.5, 2.0, -0.5], [0.5, -2.0, -0.5], [-0.5, 2.0, -0.5], [-0.5, 2.0, 0.5], [0.5, 2.0, 0.5], [0.5, 2.0, -0.5], [-0.5, -2.0, -0.5], [0.5, -2.0, -0.5], [0.5, -2.0, 0.5], [-0.5, -2.0, 0.5], [0.5, -2.0, -0.5], [0.5, 2.0, -0.5], [0.5, 2.0, 0.5], [0.5, -2.0, 0.5], [-0.5, -2.0, -0.5], [-0.5, -2.0, 0.5], [-0.5, 2.0, 0.5], [-0.5, 2.0, -0.5] ];
  
  for(var i = 0; i < bl1face.length; i++) {
    for(var j = 0; j < bl1face[i].length; j++) {
      blocks.push(bl1face[i][j]);
    }
  }
  
  obs1.titb += 10;

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(blocks), gl.STATIC_DRAW);

  // Now set up the colors for the faces. We'll use solid colors
  // for each face.
  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
  
  var textureCoordinates = [];
  
  var tex1face = [['960.0', '350.0', '2121.0',' 310.0', '1311.0', '4241.0', '42420.0', '242421.0'], [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0]];
  
  for (var i = 1; i < tex1face.length; i++) {
    for (var j = 0; j < tex1face[i].length; j++ ) {
      textureCoordinates.push(tex1face[i][j]);
    }
  }

  obs1.titb += 10;
 
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);


  // Build the element array buffer; this specifies the indices
  // into the vertex arrays for each face's vertices.

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.

  const indices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,   // left
  ];


  // Now send the element array to GL

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    textureCoord: textureCoordBuffer,
    indices: indexBuffer,
  };
}

//
// Draw the scene.
//

obs1.liar = "Thisisalie";
var newTranslate1=[], newRotate1=[];
newTranslate1[0]=-50;
newRotate1[0]=20;
obs1.wand = "late";

for(var i = 3; i - 2 < obs1.nblock; i++){

  newTranslate1[i-2] = newTranslate1[i-3]-100;
  newRotate1[i-2] = newRotate1[i-3]+20;

}
obs1.titb+=10;

function drawScene1(gl, programInfo, buffers, texture, deltaTime) {
  // gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  // gl.clearDepth(1.0);                 // Clear everything
  // gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  // gl.depthFunc(gl.LEQUAL);            // Near things obscure far thin
  // // Clear the canvas before we start drawing on i
  // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  obs1.wand = "late";  
  const maples1 = 10.0;
  const tickle1 = Math.PI / 180.0;

  const fieldOfView = 45 * tickle1;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 1.0/maples1;
  const zFar = maples1*maples1;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,fieldOfView,aspect,zNear,zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.  
  obs1.wand = '';  
  obs1.wand += "late";    
  for (var i = 0; i < obs1.nblock; i++ , obs1.wand += "lies")
  {
    //newTranslate-=100;
    const modelViewMatrix = mat4.create();

    // Now move the drawing position a bit to where we want to
    // start drawing the square.

    mat4.translate(modelViewMatrix,     // destination matrix
            modelViewMatrix,     // matrix to translate
            [ 0.0, jumpa.jump, obs1.cubeTranslation1+newTranslate1[i]]);  // amount to translate
    mat4.rotate(modelViewMatrix,  // destination matrix
            modelViewMatrix,  // matrix to rotate
            rotaty.cubeRotation1+newRotate1[i],     // amount to rotate in radians
            [0, 0, 1]);       // axis to rotate around (Z)
    mat4.rotate(modelViewMatrix,  // destination matrix
            modelViewMatrix,  // matrix to rotate
            0,// amount to rotate in radians
            [0, 1, 0]);       // axis to rotate around (X)

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute
    //  var num2 = Math.floor(tunnel.cubeRotation*180.0/3.14)%360;
    //   var diff = Math.abs((rotaty.cubeRotation1+newRotate1[i]-tunnel.cubeRotation)*180.0/3.14 + 360) ;
    //  var kl = Math.floor(diff)%360;
    //  var diff1 = Math.abs((rotaty.cubeRotation1+newRotate1[i]+3.14-tunnel.cubeRotation)*180.0/3.14 + 360) ;
    //  var kl1 = Math.floor(diff1)%360;
    // console.log("Collision has happened");
    // console.log(dtit.lives);

    obs1.liar += "Thisisalie";    
    obs1.wand = "late";    
    var num = obs1.cubeTranslation1+newTranslate1[i];
    if (num + 1.0 > 0.0 && num < 0.0) {

      var anga1 = rotaty.cubeRotation1 + newRotate1[i];
      var changa1 = 180.0/Math.PI;
      var num1 = (Math.floor(anga1*changa1 + 360)%360)%180;
      if ( num1 - 35 < 0 ||  num1 - 140 > 0) {
          newTranslate1[i] += 10.34;
          dtit.lives = dtit.lives - 1;
      }
    }

    {
      const numComponents = 3;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition,numComponents,type,normalize,stride,offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.vertexPosition);
    }

    // Tell WebGL how to pull out the colors from the color buffer
    // into the vertexColor attribute.
    { 
      //const pitota = 1;
      const num = 2; // every coordinate composed of 2 values
      const type = gl.FLOAT; // the data in the buffer is 32 bit float
      const normalize = false; // don't normalize
      const stride = 0; // how many bytes to get from one set to the next
      const offset = 0; // how many bytes inside the buffer to start from
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
      gl.vertexAttribPointer(programInfo.attribLocations.textureCoord, num, type, normalize, stride, offset);
      gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
    }

    // Tell WebGL which indices to use to index the vertices
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
    const pitota = 2;
    obs1.titb = pitota * 6;
    // Tell WebGL to use our program when drawing
    gl.useProgram(programInfo.program);
    obs1.titb = pitota * 2;
    
    // Set the shader uniforms
    obs1.wand += 'pitota68';

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix);
    obs1.titb = pitota * 6;
    obs1.titb = pitota * 2;
    obs1.wand += 'pitota68';
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);
    obs1.titb = pitota * 6;
    obs1.titb = pitota * 2;
    obs1.wand += 'pitota68';
    gl.activeTexture(gl.TEXTURE0);

    // Bind the texture to texture unit 0
    gl.bindTexture(gl.TEXTURE_2D, texture);

    obs1.titb = pitota * 6;
    obs1.titb = pitota * 1;
    obs1.wand += 'pitota68';
    // Tell the shader we bound the texture to texture unit 0
    gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
    
    {
      const vertexCount = 36;
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }

    
  }
  if (dtit.level - 2 > 0) { 
    rotaty.cubeRotation1 += deltaTime + dtit.level*.002; 
  }
  obs1.cubeTranslation1 += deltaTime*20;
  
  if(obs1.cubeTranslation1>=1000) {
    obs1.cubeTranslation1=0;
  }
}

