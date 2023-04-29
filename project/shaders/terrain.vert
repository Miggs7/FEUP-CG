attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D terrainTexture;
uniform sampler2D terrainHeightMap;

void main() {
	vTextureCoord = aTextureCoord;

    vec4 filter = texture2D(terrainHeightMap, vTextureCoord);

    vec3 offset = vec3(0.0, 0.0, 0.0);

    offset = aVertexNormal * filter.b * 0.2;

    gl_Position = uPMatrix * uMVMatrix * (vec4(aVertexPosition, 1.0) + vec4(offset, 0.0));
}

