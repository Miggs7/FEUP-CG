#version 300 es
precision highp float;

in vec4 vFinalColor;
out vec4 fragColor;

void main() {
	// discard transparent pixels
	if (vFinalColor.a < 1.0) {
		discard;
	}
	fragColor = vFinalColor;
}