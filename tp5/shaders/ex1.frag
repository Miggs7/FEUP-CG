#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec4 normal;
varying vec4 transformed;

void main() {
	if (transformed.y > 0.5) // yellow
	{
		gl_FragColor.rgb = vec3(1.0, 1.0, 0.0);
		gl_FragColor.a = 1.0;
	}
	else	//blue
	{
		gl_FragColor.rgb = vec3(0.0, 0.0, 1.0);
		gl_FragColor.a = 1.0;
	}
}