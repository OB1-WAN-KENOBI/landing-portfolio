// widgets/hero-background/particles.config.ts
import type { ISourceOptions } from "@tsparticles/engine";

export const particlesConfig: ISourceOptions = {
  fpsLimit: 60,
  detectRetina: true, // правильное поле
  fullScreen: {
    enable: false,
  },

  background: {
    color: "transparent",
  },

  particles: {
    number: {
      value: 40,
    },

    color: {
      value: "#5b21b6", // жёстко, без var(--accent) для надёжности
    },

    links: {
      enable: true,
      distance: 140,
      color: "#5b21b6",
      opacity: 0.4,
      width: 1,
    },

    move: {
      enable: true,
      speed: 0.4,
      direction: "none",
      outModes: {
        default: "bounce",
      },
    },

    size: {
      value: { min: 1, max: 3 },
    },

    opacity: {
      value: { min: 0.3, max: 0.7 },
    },
  },

  interactivity: {
    detectsOn: "window",

    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: {
        enable: true,
      },
    },

    modes: {
      repulse: {
        distance: 80,
        duration: 0.4,
      },
    },
  },
};
