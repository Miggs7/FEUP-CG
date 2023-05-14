#version 300 es
precision highp float;

in vec4 vFinalColor;
in vec2 vTextureCoord;

out vec4 fragColor;

uniform sampler2D uSampler;

uniform bool uUseTexture;

void main() {
	// Branching should be reduced to a minimal. 
	// When based on a non-changing uniform, it is usually optimized.
	if (uUseTexture)
	{
		vec4 textureColor = texture(uSampler, vTextureCoord);
		if (textureColor.a < 1.0)
			discard;
		fragColor = textureColor * vFinalColor;
	}
	else
		fragColor = vFinalColor;
}