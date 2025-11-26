// widgets/hero-background/HeroParticles.tsx
import { useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

import { particlesConfig } from "./particles.config";
import styles from "./HeroParticles.module.scss";

const HeroParticles = () => {
  // инициализация движка один раз
  useEffect(() => {
    void initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    });
  }, []);

  // мемоизируем options
  const options = useMemo(() => particlesConfig, []);

  return <Particles className={styles.particles} options={options} />;
};

export default HeroParticles;
