#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D terrainTexture;
uniform sampler2D terrainHeightMap;
uniform sampler2D terrainGradient;

void main() {
	vec4 color = texture2D(terrainTexture, vTextureCoord);

	// Get the height of the terrain at this point
	vec4 height = texture2D(terrainHeightMap, vTextureCoord);

	// gradient represents the altimetry of the terrain
	vec4 gradient = texture2D(terrainGradient, vec2(-height.r));

	vec4 finalColor = mix(color, gradient, 0.3);
	
	//gl_FrafColor = color;
	//gl_FragColor = gradient;
	gl_FragColor = finalColor;
}
