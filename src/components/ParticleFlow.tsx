import { useRef, useEffect, useState } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';
import './ParticleFlow.css';

const hexToRgb = (hex: string): number[] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
};

interface ParticleFlowProps {
  primaryColor?: string;
  secondaryColor?: string;
  speed?: number;
  density?: number;
  flowIntensity?: number;
  className?: string;
}

const ParticleFlow: React.FC<ParticleFlowProps> = ({
  primaryColor = '#00ffff',
  secondaryColor = '#ff00ff',
  speed = 1.0,
  density = 1.0,
  flowIntensity = 0.5,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const animationIdRef = useRef<number | null>(null);
  const meshRef = useRef<any>(null);
  const cleanupFunctionRef = useRef<(() => void) | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    if (cleanupFunctionRef.current) {
      cleanupFunctionRef.current();
      cleanupFunctionRef.current = null;
    }

    const initializeWebGL = async () => {
      if (!containerRef.current) return;

      await new Promise(resolve => setTimeout(resolve, 10));

      if (!containerRef.current) return;

      console.log('🎨 ParticleFlow: Initializing WebGL...');

      const renderer = new Renderer({
        dpr: isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2),
        alpha: true,
        antialias: !isMobile
      });
      rendererRef.current = renderer;

      const gl = renderer.gl;
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';

      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.appendChild(gl.canvas);

      const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

      const frag = `precision highp float;

uniform float iTime;
uniform vec2  iResolution;
uniform vec3  primaryColor;
uniform vec3  secondaryColor;
uniform float speed;
uniform float density;
uniform float flowIntensity;
uniform vec2  mousePos;

varying vec2 vUv;

// Noise functions
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  
  for(int i = 0; i < 5; i++) {
    value += amplitude * noise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  
  return value;
}

// Particle flow field
vec2 flowField(vec2 uv, float time) {
  vec2 flow = vec2(0.0);
  
  // Create flowing movement
  float n1 = fbm(uv * 2.0 + time * 0.1 * speed);
  float n2 = fbm(uv * 2.0 - time * 0.15 * speed + vec2(5.2, 1.3));
  
  flow.x = cos(n1 * 6.28318) * flowIntensity;
  flow.y = sin(n2 * 6.28318) * flowIntensity;
  
  // Add mouse influence
  vec2 toMouse = mousePos - uv;
  float mouseDist = length(toMouse);
  float mouseEffect = exp(-mouseDist * 3.0) * 0.3;
  flow += normalize(toMouse) * mouseEffect;
  
  return flow;
}

// Particle stream effect
float particleStream(vec2 uv, vec2 flow, float time) {
  float particles = 0.0;
  
  // Multiple particle layers - more visible
  for(float i = 0.0; i < 5.0; i++) {
    vec2 offset = vec2(i * 0.3, i * 0.5);
    vec2 particleUV = uv + flow * 0.5 + offset;
    particleUV.y += time * (0.05 + i * 0.02) * speed;
    particleUV = fract(particleUV * (2.0 + i * 0.5) * density);
    
    float n = noise(particleUV * 10.0);
    particles += smoothstep(0.7, 0.9, n) * (1.0 - i * 0.15);
  }
  
  return particles * 1.5;
}

// Energy waves
float energyWaves(vec2 uv, float time) {
  float waves = 0.0;
  
  // Diagonal waves
  float wave1 = sin(uv.x * 3.0 + uv.y * 2.0 + time * speed) * 0.5 + 0.5;
  float wave2 = sin(uv.x * 2.0 - uv.y * 3.0 - time * 0.7 * speed) * 0.5 + 0.5;
  
  waves = (wave1 + wave2) * 0.5;
  waves = pow(waves, 3.0);
  
  return waves * 0.3;
}

// Glow effect
float glow(vec2 uv, vec2 center, float radius) {
  float dist = length(uv - center);
  return exp(-dist / radius) * 0.8;
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  
  // Create flow field
  vec2 flow = flowField(uv, iTime);
  
  // Get particle streams
  float particles = particleStream(uv, flow, iTime);
  
  // Get energy waves
  float waves = energyWaves(uv, iTime);
  
  // Add glowing orbs that move - brighter
  float orb1 = glow(uv, vec2(0.3 + sin(iTime * 0.5) * 0.2, 0.5 + cos(iTime * 0.3) * 0.3), 0.3) * 1.5;
  float orb2 = glow(uv, vec2(0.7 + cos(iTime * 0.4) * 0.2, 0.5 + sin(iTime * 0.6) * 0.3), 0.25) * 1.5;
  
  // Combine effects
  float combined = particles + waves + orb1 + orb2;
  
  // Create color gradient based on position and effects
  vec3 color1 = primaryColor;
  vec3 color2 = secondaryColor;
  
  float colorMix = fbm(uv * 3.0 + flow + iTime * 0.1);
  vec3 finalColor = mix(color1, color2, colorMix);
  
  // Apply the combined effect
  finalColor *= combined;
  
  // Add subtle background gradient
  float bgGradient = 1.0 - length(uv - vec2(0.5)) * 0.3;
  finalColor += finalColor * bgGradient * 0.3;
  
  // Boost brightness for visibility
  finalColor *= 1.5;
  
  // Output with increased transparency
  float alpha = combined * 0.9;
  
  gl_FragColor = vec4(finalColor, alpha);
}`;

      const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },
        primaryColor: { value: hexToRgb(primaryColor) },
        secondaryColor: { value: hexToRgb(secondaryColor) },
        speed: { value: isMobile ? speed * 0.8 : speed },
        density: { value: isMobile ? density * 0.7 : density },
        flowIntensity: { value: isMobile ? flowIntensity * 0.8 : flowIntensity },
        mousePos: { value: [0.5, 0.5] }
      };
      uniformsRef.current = uniforms;

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms
      });
      const mesh = new Mesh(gl, { geometry, program });
      meshRef.current = mesh;

      const updateSize = () => {
        if (!containerRef.current || !renderer) return;

        const mobile = window.innerWidth < 768;
        renderer.dpr = mobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2);

        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
        renderer.setSize(wCSS, hCSS);

        const dpr = renderer.dpr;
        const w = wCSS * dpr;
        const h = hCSS * dpr;

        uniforms.iResolution.value = [w, h];
      };

      const loop = (t: number) => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) {
          return;
        }

        animationIdRef.current = requestAnimationFrame(loop);

        uniforms.iTime.value = t * 0.001;

        // Smooth mouse movement
        const smoothing = 0.95;
        smoothMouseRef.current.x = smoothMouseRef.current.x * smoothing + mouseRef.current.x * (1 - smoothing);
        smoothMouseRef.current.y = smoothMouseRef.current.y * smoothing + mouseRef.current.y * (1 - smoothing);

        uniforms.mousePos.value = [smoothMouseRef.current.x, smoothMouseRef.current.y];

        try {
          renderer.render({ scene: mesh });
        } catch (error) {
          console.warn('WebGL rendering error:', error);
          if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
          }
          return;
        }
      };

      window.addEventListener('resize', updateSize);
      updateSize();
      animationIdRef.current = requestAnimationFrame(loop);
      
      console.log('✅ ParticleFlow: WebGL initialized successfully');

      cleanupFunctionRef.current = () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }

        window.removeEventListener('resize', updateSize);

        if (renderer) {
          try {
            const canvas = renderer.gl.canvas;
            const loseContextExt = renderer.gl.getExtension('WEBGL_lose_context');
            if (loseContextExt) {
              loseContextExt.loseContext();
            }

            if (canvas && canvas.parentNode) {
              canvas.parentNode.removeChild(canvas);
            }
          } catch (error) {
            console.warn('Error during WebGL cleanup:', error);
          }
        }

        rendererRef.current = null;
        uniformsRef.current = null;
        meshRef.current = null;
      };
    };

    initializeWebGL();

    return () => {
      if (cleanupFunctionRef.current) {
        cleanupFunctionRef.current();
        cleanupFunctionRef.current = null;
      }
    };
  }, [
    isVisible,
    primaryColor,
    secondaryColor,
    speed,
    density,
    flowIntensity,
    isMobile
  ]);

  useEffect(() => {
    if (!uniformsRef.current) return;

    const u = uniformsRef.current;

    u.primaryColor.value = hexToRgb(primaryColor);
    u.secondaryColor.value = hexToRgb(secondaryColor);
    u.speed.value = speed;
    u.density.value = density;
    u.flowIntensity.value = flowIntensity;
  }, [
    primaryColor,
    secondaryColor,
    speed,
    density,
    flowIntensity
  ]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !rendererRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height; // Flip Y
      mouseRef.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div ref={containerRef} className={`particle-flow-container ${className}`.trim()} />;
};

export default ParticleFlow;

