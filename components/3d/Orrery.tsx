import { Suspense, useRef } from "react";
import { OrbitControls, Stars } from "@react-three/drei";

import Orbit from "./Orbit";
import Moon from "./Planets/Moon";
import Earth from "./Planets/Earth";
import { useControls } from "leva";
import Satellite from "./Satellite";

const satelliteData = [
  {
    name: "Sputnik",
    period: 0.0668,
    periapsis: 0.215,
    apoapsis: 0.939,
    inclination: 65.1,
  },
  {
    name: "Geostationary Orbit",
    period: 0.0668,
    periapsis: 35.785,
    apoapsis: 35.785,
    inclination: 0,
  },
  
  {
    name: "International Space Station",
    period: 0.06436,
    periapsis: 0.418,
    apoapsis: 0.422,
    inclination: 65.1,
  },
];

const Orrery: React.FC = () => {
  const earthRef = useRef<THREE.Mesh>(null);

  const { satellites } = useControls({ satellites: false });

  return (
    <>
      <Stars radius={450} />
      <OrbitControls minDistance={7} />
      <directionalLight color={0xffffff} intensity={1} position={[0, 0, 1]} />
      <Suspense fallback={null}>
        <Earth ref={earthRef}>
          <Orbit apoapsis={405.4} periapsis={362.6} period={27.321}>
            <Moon />
          </Orbit>
          {satellites &&
            satelliteData.map(satellite => (
              <Orbit
                key={satellite.name}
                apoapsis={satellite.apoapsis}
                periapsis={satellite.periapsis}
                period={satellite.period}
                surface={6.371}
              >
                <Satellite satellite={satellite} occlude={[earthRef]} />
              </Orbit>
            ))}
        </Earth>
      </Suspense>
    </>
  );
};

export default Orrery;
