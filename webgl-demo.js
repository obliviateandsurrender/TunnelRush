var torp = {
  kyra:10,
  shom:'free'
}

var tunnel = {
  cubeRotation:0.0,
  cubeTranslation:0.0,
  tunnel_length:100
}

var rotaty = {
  zrotate: 0.1,
  cubeRotation1: 0.0,
  cubeRotation2: 0.0
}

var flagger = {
  grayScala: false,
  flashScala: false,
  paused: false
}

var dtit = {
  lives:5,
  score:0,
  level:1,
  hs:0
}

var jumpa = {
  jump:1,
  speed:0,
  flag:1,
  gravity:-0.05,
  pos:0
}

main();


Mousetrap.bind(['a','left'], function () {

    tunnel.cubeRotation += rotaty.zrotate;
   rotaty.cubeRotation1 += rotaty.zrotate;
   rotaty.cubeRotation2 += rotaty.zrotate;

})

Mousetrap.bind(['d','right'], function () {

    tunnel.cubeRotation -= rotaty.zrotate;
   rotaty.cubeRotation1 -= rotaty.zrotate;
   rotaty.cubeRotation2 -= rotaty.zrotate;

})
/*
Mousetrap.bind(['space d', 'd space', 'right space', 'space right', 'up d', 'd up', 'right up', 'up right'], function () {

  tunnel.cubeRotation -= rotaty.zrotate;
  rotaty.cubeRotation1 -= rotaty.zrotate;
  rotaty.cubeRotation2 -= rotaty.zrotate;
  
  if (jumpa.flag == 1) {
    jumpa.flag = 0;
    jumpa.speed = -0.098;
    jumpa.gravity = 0.005;
  }

})


Mousetrap.bind(['space a', 'a space', 'left space', 'space left', 'up a', 'a up', 'left up', 'up left'], function () {

    tunnel.cubeRotation += rotaty.zrotate;
  rotaty.cubeRotation1 += rotaty.zrotate;
  rotaty.cubeRotation2 += rotaty.zrotate;
  
  if (jumpa.flag == 1) {
    jumpa.flag = 0;
    jumpa.speed = -0.098;
    jumpa.gravity = 0.005;
  }
})
*/

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}

Mousetrap.bind('b', function () {
  flagger.grayScala = !flagger.grayScala;
})

Mousetrap.bind('p', function () {
  flagger.paused = !flagger.paused;
})

Mousetrap.bind(['up','space'], function() {
  if (jumpa.flag == 1) 
  {
    jumpa.flag = 0;
    jumpa.speed = -0.098;
    jumpa.gravity = 0.005;
  }
});

Mousetrap.bind(['q', 'Q'], function () {
  dtit.lives = 0;
});

function main() {
  const canvas = document.getElementById('glcanvas'); //querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // look up the elements we want to affect
  var scoreElement = document.getElementById('score');
  var levelElement = document.getElementById('level');
  var livesElement = document.getElementById('lives');

  // Create text nodes to save some time for the browser.
  var scoreNode = document.createTextNode('');
  var levelNode = document.createTextNode('');
  var livesNode = document.createTextNode('');

  // Add those text nodes where they need to go
  scoreElement.appendChild(scoreNode);
  levelElement.appendChild(levelNode);
  livesElement.appendChild(livesNode);

  torp.kyra = -torp.kyra;

  // Vertex shader program

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;
    attribute vec4 aVertexColor;
    
    varying highp vec3 vLighting;
    varying highp vec2 vTextureCoord;
    varying lowp vec4 vColor;

    vec4 lighter(in vec4 directionl, in vec4 direct) {
      return (directionl * direct);
    }
    
    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform bool flashScala;

    vec4 lighters(in vec4 directionl, in vec4 direct) {
      return (directionl * direct * vec4(1.0,1.0,1.0,1.0));
    }
    

		void main(void) {
      
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
			vTextureCoord = aTextureCoord;
      
			// Apply lighting effect
      
      highp vec3 directionalVector = normalize(vec3(0, -1.5, 10));
      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
      highp vec4 distnorm = normalize(transformedNormal);
      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      
			// highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));
      
      highp vec3 ambientLight = vec3(0.4, 0.4, 0.4);
      
      if (flashScala) {
			  vLighting = ambientLight + (vec3(1.75, 1.75, 1.75) * directional);    
      }
      else {
        vLighting = ambientLight + (vec3(0.75, 0.75, 0.75) * directional);
      }

		}
  `;

  // Fragment shader program

  const fsSource = `
		precision mediump float;  
		  
    vec4 colorize(in vec4 grayscale, in vec4 color) {
      return (grayscale * color);
    }
    
    vec4 toGreyScole(in vec4 color) {
      return vec4(color.r*0.21, color.g*0.72, color.b*.07, 1.0);
    //return
    }
    
    uniform sampler2D uSampler;
    uniform float now;
    uniform bool grayScala;
    
    vec4 toGrayscaleluminious(in vec4 color) {
			return vec4(color.r*0.013, color.g*0.22, color.b*.17, 1.0);
		}
    
		vec4 toGrayscale(in vec4 color) {

      float average = (color.r + color.g + color.b) / 3.0;
			return vec4(average, average, average, 1.0);	
		}
    
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
    
		
		void main(void) {
			
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
      vec4 fortified = vec4(texelColor.rgb * vLighting, texelColor.a);
      
			if (grayScala){ 
        gl_FragColor = toGrayscale(fortified); 	
			}
			else {
        gl_FragColor = fortified;
			}
		}
  `;

  torp.shom += 'lifeisalie';

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    
  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  var then = 0;
  torp.shom += 'sufferingisinevitable';
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
      vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),

    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
      grayScala: gl.getUniformLocation(shaderProgram, 'grayScala'),
      flashScala: gl.getUniformLocation(shaderProgram, 'flashScala'),
    },
  };

  torp.shom += 'herewego';


  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  const buffers2 = initBuffers2(gl);
  const buffers1 = initBuffers1(gl);
  const buffers = initBuffers(gl);
  torp.shom = 'herewego';
  var then = 0;
  torp.kyra = 10*47;
  const texture = loadTexture(gl, 'bg1.jpg');
  const texture1 = loadTexture(gl, 'brick.jpeg');
  const texture2 = loadTexture(gl, 'obs2.jpg');
  // const texture = loadTexture(gl, 'obs3.png');
  torp.shom += 'herewego';
  // Draw the scene repeatedly
  function render(now) {
  //  console.log("now: ",now);
  //  console.log("then: ", then);
    if(!flagger.paused) {
      now *= 0.001;
      const deltaTime = now - then;
      then = now;
      dtit.hs+=0.175;
    //  console.log("h: ",dtit.hs);

      if (dtit.lives - 1 < 0) {
        audio.pause();
        flagger.paused = true;
        document.getElementById('bod').remove();
        var img = document.createElement('img');
        img.src = './gameover.jpg';
        img.alt = 'Game Over';
        img.height = '650';
        img.width = '1380';
        document.getElementById('load').appendChild(img);
      }
      
      dtit.score = Math.floor(now*10);
      scoreNode.nodeValue = Math.ceil(dtit.hs);
      livesNode.nodeValue = dtit.lives;
      dtit.level = Math.ceil(dtit.hs/75);
      levelNode.nodeValue = dtit.level;
      
      gl.uniform1i(programInfo.uniformLocations.flashScala, flagger.flashScala);
      gl.uniform1i(programInfo.uniformLocations.grayScala, flagger.grayScala);
      
	    if (now%10 - 6 > 0) {
	      flagger.flashScala = true;
	    }
      else 
      {
	      flagger.flashScala = false;
	    }
	    //-----------------------------------------------------------------
	    drawScene(gl, programInfo, buffers, texture, deltaTime);
	    //-----------------------------------------------------------------
      drawScene1(gl, programInfo, buffers1, texture1, deltaTime);
      drawScene2(gl, programInfo, buffers2, texture2, deltaTime);
      
	}

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
function initBuffers(gl) {

  // Create a buffer for the cube's vertex positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the cube.

  var positions = [];
  torp.kyra = 8*6;
  var n = 8; 
  var pi = Math.PI, angle = 0, theta = (2 * pi) / n;

  for (var i = 0; i < n; i++,angle-=theta) {
    for (var j = 0; j < 2; j++, angle+=theta) {
      var cnn = 2 * Math.cos(angle), snn = 2 * Math.sin(angle), tnn = 2.0;
      positions.push(cnn,snn,-tnn,cnn,snn,-3*tnn);
    }
  }
  
  var p_len = positions.length;
  
  for (var j = 0; j - tunnel.tunnel_length < 0; j++) {
    var catchy = 4*(j+1);
    for (var i = 0; i - p_len < 0; i += 3) {
      positions.push(positions[i], positions[i + 1], positions[i + 2] - catchy);
    }
  }

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  //-------------------------------------------------------------------------------------------------
  
  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  
  var vertexFaceNormals = [];
  
  var normfaces = [[5.656850496748460, 2.343141997766190, 0],[2.343149503244498, 5.656847387874637, 0],[-2.343134492283756, 5.65685360561233, 0],[-5.656844278990856, 2.34315700871868, 0],[-5.65685671446623, -2.343126986797201, 0],[-2.34316451418874, -5.656841170097116, 0],[2.343119481306521, -5.656859823310183, 0],[5.656838061193419, -2.343172019654669, 0]];
  

  for (var i = 0; i < normfaces.length; i++) {
    for (var j = 0; j < 4; j++) {
      for (var k = 0; k < normfaces[i].length; k++) {
        vertexFaceNormals.push(normfaces[i][k]);
      }
    }
  }

  var vertexNormals = [];
  torp.shom = '';

  for (var i = 0; i < tunnel.tunnel_length; i++) {
    vertexNormals.push.apply(vertexNormals, vertexFaceNormals);
    torp.shom+='winner';
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
    gl.STATIC_DRAW);

  //-------------------------------------------------------------------------------------------------
  const textureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
  
  var faceTextureCoordinates = [];

  var textfaces = [['3.4', 234.33, '3455.43', 11.4], [3.4, '234.33', '3455.43', '11.4'],[0.0, 0.0, 1.0, 0.0], [1.0, 1.0, 0.0, 1.0], [1.0, 0.0, 1.0, 1.0], [0.0, 1.0, 0.0, 0.0], [1.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 0.0], [0.0, 1.0, 0.0, 0.0], [1.0, 0.0, 1.0, 1.0], [0.0, 0.0, 1.0, 0.0], [1.0, 1.0, 0.0, 1.0], [1.0, 0.0, 1.0, 1.0], [0.0, 1.0, 0.0, 0.0], [1.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 0.0], [0.0, 1.0, 0.0, 0.0], [1.0, 0.0, 1.0, 1.0] ];
  

  while (faceTextureCoordinates.push([]) < 8);  

  for(var i = 2; i < textfaces.length; i+=2) {
      faceTextureCoordinates[Math.floor(i / 2)-1] = textfaces[i].concat(textfaces[i + 1]);
  };

	var textureCoordinates = [];
  
	for (var i = 0; i < tunnel.tunnel_length; i++) {
    for (var j = 0; j < faceTextureCoordinates.length; j++) {
      textureCoordinates.push.apply(textureCoordinates, faceTextureCoordinates[j]);
		}
	}
  
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
  //-----------------------------------------------------------------------------------------------


  // Now set up the colors for the faces. We'll use solid colors
  // for each face.

  // const colorBuffer = gl.createBuffer();
  // gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  // Build the element array buffer; this specifies the indices
  // into the vertex arrays for each face's vertices.

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.

  const indices = [
    0,  1,  2,      1,  2,  3,    // front
    4,  5,  6,      5,  6,  7,    // back
    8,  9,  10,     9,  10, 11,   // top
    12, 13, 14,     13, 14, 15,   // bottom
    16, 17, 18,     17, 18, 19,   // right
    20, 21, 22,     21, 22, 23,   // left
    24, 25, 26,     25, 26, 27,   // left
    28, 29, 30,     29, 30, 31,   // left
  ];

  var len = indices.length;
  
  for (j = 0; j < tunnel.tunnel_length; j++) {
    var singlegen = 32*(j+1);
    for (i = 0 ; i < len ; i++) {
      indices.push(indices[i]+singlegen);
    }
  }

  // Now send the element array to GL

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
   // color: colorBuffer,
    normal: normalBuffer,
    textureCoord: textureCoordBuffer,   //--------------------------------------------
    indices: indexBuffer,
  };
}

//
// Draw the scene.
//
function drawScene(gl, programInfo, buffers, texture, deltaTime) {
  const titsq = 0.0;
  gl.clearColor(titsq, titsq, titsq, titsq + 1.0);  // Clear to black, fully opaque
  gl.clearDepth(titsq+1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const maples = 10.0;
  const tickle = Math.PI/ 180.0;

  const fieldOfView = 45 * tickle;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 1.0/maples;//0.1;
  const zFar = maples*maples;//100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,fieldOfView,aspect,zNear,zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.translate(modelViewMatrix,     // destination matrix
          modelViewMatrix,     // matrix to translate
          [ 0.0, jumpa.jump, tunnel.cubeTranslation]);  // amount to translate
  mat4.rotate(modelViewMatrix,  // destination matrix
          modelViewMatrix,  // matrix to rotate
          tunnel.cubeRotation,     // amount to rotate in radians
          [0, 0, 1]);       // axis to rotate around (Z)
  mat4.rotate(modelViewMatrix,  // destination matrix
          modelViewMatrix,  // matrix to rotate
          0,// amount to rotate in radians
          [0, 1, 0]);       // axis to rotate around (X)
  
  const normalMatrix = mat4.create();
  mat4.invert(normalMatrix, modelViewMatrix);
  mat4.transpose(normalMatrix, normalMatrix);
  
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
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  {
    const numComponents = 2;              //----------------- 2 for texture
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    // gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    
    //---------------------------------------------------------------
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    //---------------------------------------------------------------

    gl.vertexAttribPointer(programInfo.attribLocations.textureCoord,numComponents,type,normalize,stride,offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
  }


  // Tell WebGL how to pull out the texture coordinates from
  // the texture coordinate buffer into the textureCoord attribute.
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(programInfo.attribLocations.textureCoord,numComponents,type,normalize,stride,offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
  }

  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexNormal,numComponents,type,normalize,stride,offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
  }

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix,false,projectionMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix,false,modelViewMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocations.normalMatrix,false,normalMatrix);
    
    // Texture Code 
    //---------------------------------------------------------------------------------
    gl.activeTexture(gl.TEXTURE0);                                                    -
                                                                                      
      // Bind the texture to texture unit 0
    gl.bindTexture(gl.TEXTURE_2D, texture);
    
      // Tell the shader we bound the texture to texture unit 0
    gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
    //--------------------------------------------------------------------------------


  {
    const tickle_1 = 6;
    const vertexCount = tickle_1*8*tunnel.tunnel_length;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  // Update the rotation for the next draw

  //tunnel.cubeRotation += deltaTime;
  tunnel.cubeTranslation += deltaTime*20 + dtit.level*0.002;
  
  if(tunnel.cubeTranslation - 32*maples >= 0)
    tunnel.cubeTranslation=0;
  
  if(!jumpa.flag) {
    jumpa.pos += jumpa.speed;
    jumpa.speed += jumpa.gravity;
    jumpa.jump = 1 + jumpa.pos;
    if(jumpa.pos >= 0) {
      jumpa.flag = 1;
    }
    torp.shom+='jump';
  }
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully
  
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  
  return shader;
}


function loadTexture(gl, url) 
{
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  const texture1 = texture;
  const lolita = 0;

  // Because images have to be download over the internet
  // they might take a moment until they are ready.
  // Until then put a single pixel in the texture so we can
  // use it immediately. When the image has finished downloading
  // we'll update the texture with the contents of the image.
  const polita = 1;
  const pixel = new Uint8Array([lolita, lolita, 255, 255]);
  const level = lolita, internalFormat = gl.RGBA;
  const width = 1+lolita, height = 1+lolita, border = lolita;
  const srcFormat = gl.RGBA, srcType = gl.UNSIGNED_BYTE;
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);

  const image = new Image();
  image.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

    // WebGL1 has different requirements for power of 2 images
    // vs non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
    var checkers = isPowerOf2(image.width) && isPowerOf2(image.height);
    if (checkers) {
       // Yes, it's a power of 2. Generate mips.
       gl.generateMipmap(gl.TEXTURE_2D);
    } else {
       // No, it's not a power of 2. Turn of mips and set
       // wrapping to clamp to edge
       torp.shom='addingshader';
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
       torp.kyra = 6*8;
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  image.src = url;

  return texture;
}

