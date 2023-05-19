#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D treeTexture;

void main() {
    vec4 color = texture2D(treeTexture, vTextureCoord);

    if (color.a < 1.0) {
        discard;
    }
	
	gl_FragColor = color;
}