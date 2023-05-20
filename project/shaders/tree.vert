attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

attribute vec3 WindDirection;
attribute vec3 windOffset;
attribute vec4 displacedPosition;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

uniform float timeFactor;
uniform float uWindIntensity;

varying vec2 vTextureCoord;

void main() {
	vec3 WindDirection = vec3(0, 0, 1);
    float textureThreshold = 0.8; // Adjust this value to control the threshold for the moving texture

    // Apply displacement only to the top part of the texture
    vec3 windOffset = aVertexNormal * uWindIntensity  * dot(normalize(WindDirection), aVertexNormal) * step(aTextureCoord.y, textureThreshold);

    float wobbleOffset = sin(timeFactor) * 0.1;
    vec4 displacedPosition = vec4(aVertexPosition + windOffset * wobbleOffset, 1.0);

    gl_Position = uPMatrix * uMVMatrix * displacedPosition;
    vTextureCoord = aTextureCoord;
}

