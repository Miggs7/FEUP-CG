
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform float normScale;
uniform float amplitude;

void main() {
	vec3 offset=vec3(0.0,0.0,0.0);
	
	// if parrot is flying oscilates

	vTextureCoord = aTextureCoord;

    offset.y = amplitude*sin(timeFactor);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}

