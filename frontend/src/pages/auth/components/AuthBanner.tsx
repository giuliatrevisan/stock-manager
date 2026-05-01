import { useEffect, useState } from "react";

import bg1 from "../../../assets/bg1.jpg";
import bg2 from "../../../assets/bg2.jpeg";
import bg3 from "../../../assets/bg3.webp";

const images = [bg1, bg2, bg3];

export function AuthBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-1/2 hidden md:block overflow-hidden">
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            transform: i === index ? "scale(1.1)" : "scale(1)",
            transition: "transform 6s ease, opacity 1s ease",
          }}
        />
      ))}

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-8 text-center">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
          Bem-vindo
        </h1>

        <p className="text-lg opacity-90 max-w-md">
          Sistema de gestão de estoque da Radar Saúde
        </p>
      </div>
    </div>
  );
}