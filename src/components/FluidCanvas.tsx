"use client";

import { useEffect, useRef } from "react";

type GL = WebGL2RenderingContext | null;

const VERTEXShader = `#version 300 es
layout(location = 0) in vec4 a_position;
void main() { gl_Position = a_position; }
`;

const FRAGMENTShader = `#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;

uniform float u_scale;
uniform float u_rotation;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;

out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth, float edge_blur) {
  vec3 color1 = c1.rgb * c1.a;
  vec3 color2 = c2.rgb * c2.a;
  vec3 color3 = c3.rgb * c3.a;
  float r1 = smoothstep(.0 + .35 * edgesWidth, .7 - .35 * edgesWidth + .5 * edge_blur, mixer);
  float r2 = smoothstep(.3 + .35 * edgesWidth, 1. - .35 * edgesWidth + edge_blur, mixer);
  vec3 blended_color_2 = mix(color1, color2, r1);
  float blended_opacity_2 = mix(c1.a, c2.a, r1);
  vec3 c = mix(blended_color_2, color3, r2);
  float o = mix(blended_opacity_2, c3.a, r2);
  return vec4(c, o);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = .5 * u_time;
  float noise_scale = .0005 + .006 * u_scale;

  uv -= .5;
  uv *= (noise_scale * u_resolution);
  uv = rotate(uv, u_rotation * .5 * PI);
  uv /= u_pixelRatio;
  uv += .5;

  float n1 = noise(uv * 1. + t);
  float n2 = noise(uv * 2. - t);
  float angle = n1 * TWO_PI;
  uv.x += 4. * u_distortion * n2 * cos(angle);
  uv.y += 4. * u_distortion * n2 * sin(angle);

  float iterations_number = ceil(clamp(u_swirlIterations, 1., 30.));
  for (float i = 1.; i <= iterations_number; i++) {
    uv.x += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);
    uv.y += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1. * uv.x);
  }

  float proportion = clamp(u_proportion, 0., 1.);
  float shape = 0.;
  float mixer = 0.;

  if (u_shape < .5) {
    vec2 checks_shape_uv = uv * (.5 + 3.5 * u_shapeScale);
    shape = .5 + .5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);
    mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
  } else if (u_shape < 1.5) {
    vec2 stripes_shape_uv = uv * (.25 + 3. * u_shapeScale);
    float f = fract(stripes_shape_uv.y);
    shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);
    mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
  } else {
    float sh = 1. - uv.y;
    sh -= .5;
    sh /= (noise_scale * u_resolution.y);
    sh += .5;
    float shape_scaling = .2 * (1. - u_shapeScale);
    shape = smoothstep(.45 - shape_scaling, .55 + shape_scaling, sh + .3 * (proportion - .5));
    mixer = shape;
  }

  vec4 color_mix = blend_colors(u_color1, u_color2, u_color3, mixer, 1. - clamp(u_softness, 0., 1.), .01 + .01 * u_scale);
  fragColor = vec4(color_mix.rgb, color_mix.a);
}
`;

interface ShaderProps {
  color1?: string;
  color2?: string;
  color3?: string;
  scale?: number;
  rotation?: number;
  proportion?: number;
  softness?: number;
  distortion?: number;
  swirl?: number;
  swirlIterations?: number;
  shape?: number;
  shapeScale?: number;
  seed?: number;
  className?: string;
  style?: React.CSSProperties;
}

function hexToRgba(hex: string): [number, number, number, number] {
  let h = hex.replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length === 6) h += "ff";
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const a = parseInt(h.slice(6, 8), 16) / 255;
  return [r, g, b, a];
}

function parseColor(color: string): [number, number, number, number] {
  if (color.startsWith("#")) return hexToRgba(color);
  if (color.startsWith("rgb")) {
    const m = color.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)/i);
    if (!m) return [0, 0, 0, 1];
    return [
      parseInt(m[1] ?? "0") / 255,
      parseInt(m[2] ?? "0") / 255,
      parseInt(m[3] ?? "0") / 255,
      m[4] === undefined ? 1 : parseFloat(m[4]),
    ];
  }
  return [0, 0, 0, 1];
}

export default function FluidCanvas({
  color1 = "#1a0533",
  color2 = "#0a1a4a",
  color3 = "#00f0ff",
  scale = 0.75,
  rotation = 0,
  proportion = 0.63,
  softness = 1,
  distortion = 0.1,
  swirl = 0.61,
  swirlIterations = 5,
  shape = 0,
  shapeScale = 0.28,
  seed = 0,
  className = "",
  style,
}: ShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<GL>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef(0);
  const totalTimeRef = useRef(seed);
  const uniformsRef = useRef<Record<string, number | number[]>>({});
  const uniformLocsRef = useRef<Record<string, WebGLUniformLocation | null>>({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2");
    if (!gl) return;
    glRef.current = gl;

    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, VERTEXShader);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      console.error("VS err:", gl.getShaderInfoLog(vs));
      return;
    }

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, FRAGMENTShader);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.error("FS err:", gl.getShaderInfoLog(fs));
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Link err:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);
    programRef.current = program;

    gl.deleteShader(vs);
    gl.deleteShader(fs);

    const posLoc = gl.getAttribLocation(program, "a_position");
    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(posLoc!);
    gl.vertexAttribPointer(posLoc!, 2, gl.FLOAT, false, 0, 0);

    const uniformNames = [
      "u_time", "u_pixelRatio", "u_resolution",
      "u_scale", "u_rotation", "u_color1", "u_color2", "u_color3",
      "u_proportion", "u_softness", "u_shape", "u_shapeScale",
      "u_distortion", "u_swirl", "u_swirlIterations",
    ];
    uniformLocsRef.current = Object.fromEntries(
      uniformNames.map((n) => [n, gl.getUniformLocation(program, n)])
    ) as Record<string, WebGLUniformLocation | null>;

    uniformsRef.current = {
      u_color1: parseColor(color1),
      u_color2: parseColor(color2),
      u_color3: parseColor(color3),
      u_scale: scale,
      u_rotation: rotation,
      u_proportion: proportion,
      u_softness: softness,
      u_distortion: distortion,
      u_swirl: swirl,
      u_swirlIterations: swirlIterations,
      u_shape: shape,
      u_shapeScale: shapeScale,
    };
    totalTimeRef.current = seed;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const render = (now: number) => {
      if (!glRef.current || !programRef.current) return;
      const glctx = glRef.current;
      const dt = now - lastTimeRef.current;
      lastTimeRef.current = now;
      totalTimeRef.current += dt * 0.001;

      glctx.clear(glctx.COLOR_BUFFER_BIT);
      glctx.useProgram(programRef.current);

      glctx.uniform1f(uniformLocsRef.current.u_time!, totalTimeRef.current);
      glctx.uniform2f(
        uniformLocsRef.current.u_resolution!,
        canvas.width,
        canvas.height
      );
      glctx.uniform1f(
        uniformLocsRef.current.u_pixelRatio!,
        Math.min(window.devicePixelRatio || 1, 2)
      );

      for (const [key, loc] of Object.entries(uniformLocsRef.current)) {
        if (!loc || key === "u_time" || key === "u_resolution" || key === "u_pixelRatio") continue;
        const val = uniformsRef.current[key];
        if (val === undefined) continue;
        if (Array.isArray(val)) {
          if (val.length === 4) glctx.uniform4fv(loc, val as number[]);
          else if (val.length === 2) glctx.uniform2fv(loc, val as number[]);
          else if (val.length === 3) glctx.uniform3fv(loc, val as number[]);
        } else {
          glctx.uniform1f(loc, val as number);
        }
      }

      glctx.drawArrays(glctx.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    };

    lastTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      if (programRef.current) {
        gl.deleteProgram(programRef.current);
        programRef.current = null;
      }
      glRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}
