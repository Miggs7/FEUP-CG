attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform
void main() {
	vec3 new_offset=vec3(0.0,0.0,0.0);
	
	vTextureCoord = aTextureCoord;
    new_offset.y = amplitude * cos(timeFactor);

gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0) + vec4(new_offset, 0.0);

}

