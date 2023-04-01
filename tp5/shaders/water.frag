#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler1;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
    vec2 movementCoords = mod(vTextureCoord + timeFactor*0.01, 1.0);
	vec4 color = texture2D(uSampler1, movementCoords);
	vec4 filter = texture2D(uSampler2, movementCoords);
    
    color.r -= color.r * filter.r * 0.25;
    color.g -= color.g * filter.g * 0.25;
    color.b -= color.b * filter.b * 0.25;

	gl_FragColor = color;
}