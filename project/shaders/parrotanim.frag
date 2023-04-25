#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

void main() {
	//vec4 color = texture2D(uSampler, vTextureCoord+vec2(timeFactor*.01,0.0));
	//vec4 filter = texture2D(uSampler2, vec2(0.0,0.1)+vTextureCoord);


	vec4 color = vec4(1.0, 0.0, 0.0, 1.0);
	
	gl_FragColor = color;
}
