export type View = { x: number; y: number; zoom: number };

export function createFractalRenderer(MAX_ITER = 300) {
    let canvas: HTMLCanvasElement | null = null;
    let gl: WebGLRenderingContext | null = null;

    // GL handles
    let program: WebGLProgram | null = null;
    let loc_res: WebGLUniformLocation | null = null;
    let loc_zoom: WebGLUniformLocation | null = null;
    let orbitTexture: WebGLTexture | null = null;

    // Orbit data
    const orbitData = new Float32Array(MAX_ITER * 2);

    // State
    let containerW = 0;
    let containerH = 0;
    let view: View = { x: -1.4102, y: 0, zoom: 0.5 };

    let animationFrameId = 0;
    let draws = false;

    const vsSource = `attribute vec2 position; void main() { gl_Position = vec4(position, 0.0, 1.0); }`;

    const fsSource = `
        precision highp float;

        uniform vec2 u_resolution;
        uniform float u_zoom;
        uniform sampler2D u_orbit; // The Reference Orbit from CPU

        void main() {
            vec2 uv = gl_FragCoord.xy / u_resolution;
            float aspect = u_resolution.x / u_resolution.y;
            vec2 st = (uv - 0.5);
            st.x *= aspect;

            // Delta C: The distance of this pixel from the center
            vec2 dc = st * (3.5 / u_zoom);

            vec2 d = vec2(0.0);
            float iter = 0.0;
            const float max_iter = ${MAX_ITER}.0;

            for (float i = 0.0; i < ${MAX_ITER}.0; i++) {
                vec4 ref = texture2D(u_orbit, vec2((i + 0.5) / max_iter, 0.5));
                vec2 x = ref.xy;

                vec2 z = x + d;
                if (dot(z, z) > 4.0) break;

                vec2 term1 = vec2(
                    2.0 * (x.x * d.x - x.y * d.y),
                    2.0 * (x.x * d.y + x.y * d.x)
                );

                vec2 term2 = vec2(
                    d.x * d.x - d.y * d.y,
                    2.0 * d.x * d.y
                );

                d = term1 + term2 + dc;
                iter++;
            }

            if (iter >= max_iter || iter == 1.0) {
                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
            } else {
                float freq = 0.15;
                float r = (25.0 + 25.0 * cos(freq * iter)) / 255.0;
                float g = (140.0 + 115.0 * cos(freq * iter + 0.0)) / 255.0;
                float b = (120.0 + 110.0 * cos(freq * iter + 1.0)) / 255.0;
                gl_FragColor = vec4(r, g, b, 1.0);
            }
        }
    `;

    function float32ToRGBA(data: Float32Array) {
        const len = data.length / 2;
        const out = new Float32Array(len * 4);
        for (let i = 0; i < len; i++) {
            out[i * 4] = data[i * 2];
            out[i * 4 + 1] = data[i * 2 + 1];
            out[i * 4 + 2] = 0;
            out[i * 4 + 3] = 0;
        }
        return out;
    }

    function initWebGL() {
        if (!canvas) return;
        gl = canvas.getContext('webgl');
        if (!gl) return;

        const ext = gl.getExtension('OES_texture_float');
        if (!ext) {
            console.error('Float textures not supported');
            return;
        }

        const vs = gl.createShader(gl.VERTEX_SHADER)!; gl.shaderSource(vs, vsSource); gl.compileShader(vs);
        const fs = gl.createShader(gl.FRAGMENT_SHADER)!; gl.shaderSource(fs, fsSource); gl.compileShader(fs);
        if (gl && !gl.getShaderParameter(fs, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(fs));

        program = gl.createProgram()!;
        gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program); gl.useProgram(program);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
        const posLoc = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(posLoc); gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        loc_res = gl.getUniformLocation(program, 'u_resolution');
        loc_zoom = gl.getUniformLocation(program, 'u_zoom');

        orbitTexture = gl.createTexture()!;
        gl.bindTexture(gl.TEXTURE_2D, orbitTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        resize();
    }

    function updateReferenceOrbit() {
        if (!gl || !orbitTexture) return;

        let zr = 0, zi = 0;
        let cr = view.x, ci = view.y;

        for (let i = 0; i < MAX_ITER; i++) {
            orbitData[i * 2] = zr;
            orbitData[i * 2 + 1] = zi;

            let zr2 = zr * zr;
            let zi2 = zi * zi;
            zi = 2 * zr * zi + ci;
            zr = zr2 - zi2 + cr;

            if (zr2 + zi2 > 4.0) break;
        }

        gl.bindTexture(gl.TEXTURE_2D, orbitTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, MAX_ITER, 1, 0, gl.RGBA, gl.FLOAT, float32ToRGBA(orbitData));
    }

    function draw() {
        if (!gl || !program || !loc_res || !loc_zoom || !canvas) return;
        gl.uniform2f(loc_res, canvas.width, canvas.height);
        gl.uniform1f(loc_zoom, view.zoom);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    function resize() {
        if (!canvas || !gl) return;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = containerW * dpr;
        canvas.height = containerH * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
        updateReferenceOrbit();
        draw();
    }

    function renderLoop(_time: number) {
        if (!draws) return;

        if (view.zoom < 1e16) {
            view.zoom *= 1.02;
        } else {
            view.zoom = 0.01;
            updateReferenceOrbit();
        }

        draw();
        animationFrameId = requestAnimationFrame(renderLoop);
    }

    return {
        setCanvas(c: HTMLCanvasElement | null) {
            canvas = c;
            if (canvas) initWebGL();
        },
        setSize(w: number, h: number) {
            containerW = w || 0;
            containerH = h || 0;
            resize();
        },
        setView(v: View) {
            view = v;
            updateReferenceOrbit();
        },
        updateReferenceOrbit,
        start() {
            if (!draws) {
                draws = true;
                renderLoop(performance.now());
            }
        },
        stop() {
            draws = false;
            cancelAnimationFrame(animationFrameId);
        },
        dispose() {
            if (gl && program) {
                gl.deleteProgram(program);
            }
            if (gl && orbitTexture) {
                gl.deleteTexture(orbitTexture);
            }
            program = null;
            gl = null;
        }
    };
}
