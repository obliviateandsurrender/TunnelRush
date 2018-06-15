//var obs2.cubeTranslation2 = 0.0;
//var obs2.nblock1 = 10;

obs2 = {
  cubeTranslation2:0.0,
  nblock1:10,
  liar:"Whatisalie",
  hotr:'hotd',
  titb:10
}

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
function initBuffers2(gl) {

  // Create a buffer for the cube's vertex positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the cube.

  var blocks = [];

  var bl1face = [[-2.5, -2.0, 0.5], [-0.6, -2.0, 0.5], [-0.6, 2.0, 0.5], [-2.5, 2.0, 0.5], [-2.5, -2.0, -0.5], [-2.5, 2.0, -0.5], [-0.6, 2.0, -0.5], [-0.6, -2.0, -0.5], [-2.5, 2.0, -0.5], [-2.5, 2.0, 0.5], [-0.6, 2.0, 0.5], [-0.6, 2.0, -0.5], [-2.5, -2.0, -0.5], [-0.6, -2.0, -0.5], [-0.6, -2.0, 0.5], [-2.5, -2.0, 0.5], [-0.6, -2.0, -0.5], [-0.6, 2.0, -0.5], [-0.6, 2.0, 0.5], [-0.6, -2.0, 0.5], [-2.5, -2.0, -0.5], [-2.5, -2.0, 0.5], [-2.5, 2.0, 0.5], [-2.5, 2.0, -0.5], [2.5, -2.0, 0.5], [0.6, -2.0, 0.5], [0.6, 2.0, 0.5], [2.5, 2.0, 0.5], [2.5, -2.0, -0.5], [2.5, 2.0, -0.5], [0.6, 2.0, -0.5], [0.6, -2.0, -0.5], [2.5, 2.0, -0.5], [2.5, 2.0, 0.5], [0.6, 2.0, 0.5], [0.6, 2.0, -0.5], [2.5, -2.0, -0.5], [0.6, -2.0, -0.5], [0.6, -2.0, 0.5], [2.5, -2.0, 0.5], [0.6, -2.0, -0.5], [0.6, 2.0, -0.5], [0.6, 2.0, 0.5], [0.6, -2.0, 0.5], [2.5, -2.0, -0.5], [2.5, -2.0, 0.5], [2.5, 2.0, 0.5], [2.5, 2.0, -0.5]];

  for (var i = 0; i < bl1face.length; i++) {
    for (var j = 0; j < bl1face[i].length; j++) {
      blocks.push(bl1face[i][j]);
    }
  }
  obs2.titb += 10;
  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(blocks), gl.STATIC_DRAW);

  // Now set up the colors for the faces. We'll use solid colors
  // for each face.


  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
  
  obs2.hotr = "light";
  var textureCoordinates = [];
  
  var tex2face = [['960.0', 350.0, '2121.0', '310.0', 1311.0, '4241.0', 42420.0, '242421.0'], [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0]];

  for (var i = 1; i < tex2face.length; i++) {
    for (var j = 0; j < tex2face[i].length; j++) {
      textureCoordinates.push(tex2face[i][j]);
      obs2.hotr = "lit";      
    }
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

  // Build the element array buffer; this specifies the indices
  // into the vertex arrays for each face's vertices.

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.
  obs2.hotr = "life";
  const indices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,   // left
  ];

  var len = indices.length;
  var l = 26;
    for (i = 0 ; i < len ; i++) {
      indices.push(indices[i]+l-2);
    }


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
obs2.liar = "This is a lie";
var newTranslate=[], newRotate=[];
newTranslate[0]=-100;
newRotate[0]=50;

for(var i = 1; i < obs2.nblock1; i++) {
  obs2.liar = "This is a lie too";
  newTranslate[i] = newTranslate[i-1]-100;
  obs2.titb%=10;
  newRotate[i] = newRotate[i-1]+20;
}
obs2.titb += 13;

function drawScene2(gl, programInfo, buffers, texture, deltaTime) {
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
  
    obs2.hotr += "late";
    const maples2 = 10.0;
    const tickle2 = Math.PI / 180.0;
  
    const fieldOfView = 45 * tickle2;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 1./maples2;
    const zFar = maples2*maples2;
    const projectionMatrix = mat4.create();
  
    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    obs2.hotr += "late";
    obs2.titb = 10;
    mat4.perspective(projectionMatrix,fieldOfView,aspect,zNear,zFar);
  
    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    obs2.liar = "This is a lie";
     obs2.hotr += "late";
    for(var i = 0; i < obs2.nblock1; i++){
      //newTranslate-=100;
      const modelViewMatrix = mat4.create();
  
      // Now move the drawing position a bit to where we want to
      // start drawing the square.
  
      mat4.translate(modelViewMatrix,     // destination matrix
              modelViewMatrix,     // matrix to translate
              [ 0.0, jumpa.jump, obs2.cubeTranslation2+newTranslate[i]]);  // amount to translate
      mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              rotaty.cubeRotation2+newRotate[i],     // amount to rotate in radians
              [0, 0, 1]);       // axis to rotate around (Z)
      mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              0,// amount to rotate in radians
              [0, 1, 0]);       // axis to rotate around (X)
  

              //console.log("Collision going to happen ");
              //console.log(cubeTranslation1+newTranslate1[i]);
              //console.log(rotaty.cubeRotation1+newRotate1[i]);
              //console.log(tunnel.cubeRotation);
              //var num2 = Math.floor(tunnel.cubeRotation*180.0/3.14)%360;
              //console.log("num1: ",num1, "num2: ", num2);
              //var diff = Math.abs((rotaty.cubeRotation2+newRotate[i]-tunnel.cubeRotation)*180.0/3.14 + 360) ;
              //var kl = Math.floor(diff)%360;
              //var diff1 = Math.abs((rotaty.cubeRotation2+newRotate[i]+3.14-tunnel.cubeRotation)*180.0/3.14 + 360) ;
              //var kl1 = Math.floor(diff1)%360;
              //console.log("kl: ", kl);
              //console.log("kl1: ", kl1);
      obs2.liar = "This is a lie too";
      obs2.hotr = "ford";
      obs2.hotr += "late";
      obs2.titb = 10;
    
              var num = obs2.cubeTranslation2+newTranslate[i];
    if (num + 1.0 > 0.0 && num < 0.0)
    {
      
      var anga2 = rotaty.cubeRotation2 + newRotate[i];
      var changa2 = 180.0 / Math.PI;
      var num1 = (Math.floor(anga2*changa2 + 360)%360)%180;
      
      if (!( num1 - 20 < 0 ||  num1 - 170 > 0))  
      {   

          if (!jumpa.flag){
            if( num < 85 && num > 95 ) {
              dtit.lives -= 1;
              newTranslate[i] += 10;
            }
          }
          else {
            dtit.lives -= 1;
            newTranslate[i] += 10;
            console.log("num1: ",num1);
          }
        //paused = true;

      }
    }
      // Tell WebGL how to pull out the positions from the position
      // buffer into the vertexPosition attribute
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
  
      // tell webgl how to pull out the texture coordinates from buffer
    {
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
  
      // Tell WebGL to use our program when drawing
  
      gl.useProgram(programInfo.program);
  
      // Set the shader uniforms
  
      gl.uniformMatrix4fv(
          programInfo.uniformLocations.projectionMatrix,
          false,
          projectionMatrix);
      gl.uniformMatrix4fv(
          programInfo.uniformLocations.modelViewMatrix,
          false,
          modelViewMatrix);

      // Tell WebGL we want to affect texture unit 0
      gl.activeTexture(gl.TEXTURE0);

      // Bind the texture to texture unit 0
      gl.bindTexture(gl.TEXTURE_2D, texture);

      // Tell the shader we bound the texture to texture unit 0
      gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
    
      {
        const vertexCount = 72;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
      }
  
      // Update the rotation for the next draw
      
      
    }
    if(dtit.level > 4)
    {
      rotaty.cubeRotation2 += deltaTime + dtit.level * .001;      
    }
    obs2.cubeTranslation2 += deltaTime*20;
    if(obs2.cubeTranslation2>=1000)
        obs2.cubeTranslation2=0;
  }
  
//
// Initialize a shader program, so WebGL knows how to draw our data
//