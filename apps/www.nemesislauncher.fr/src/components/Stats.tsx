"use client";

import { memo, useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faUsers, faCoffee, faHeart } from "@fortawesome/free-solid-svg-icons";

const stats = [
  {
    icon: faCode,
    value: 0,
    target: 15000,
    suffix: "+",
    label: "Lignes de code",
    color: "text-minecraft-diamond",
    bgColor: "bg-minecraft-diamond/10",
  },
  {
    icon: faUsers,
    value: 0,
    target: 1,
    suffix: "",
    label: "Développeur passionné",
    color: "text-nemesis-400",
    bgColor: "bg-nemesis-500/10",
  },
  {
    icon: faCoffee,
    value: 0,
    target: 247,
    suffix: "",
    label: "Cafés consommés",
    color: "text-minecraft-gold",
    bgColor: "bg-minecraft-gold/10",
  },
  {
    icon: faHeart,
    value: 0,
    target: 100,
    suffix: "%",
    label: "Passion investie",
    color: "text-minecraft-redstone",
    bgColor: "bg-minecraft-redstone/10",
  },
];

// Optimized animated number using requestAnimationFrame
const AnimatedNumber = memo(function AnimatedNumber({ 
  target, 
  suffix, 
  inView 
}: { 
  target: number; 
  suffix: string; 
  inView: boolean;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1500;
    const startTime = performance.now();
    let animationFrame: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad for smoother finish
      const easeOut = 1 - (1 - progress) * (1 - progress);
      setCurrent(Math.round(target * easeOut));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, inView]);

  return (
    <span className="tabular-nums">
      {current.toLocaleString()}{suffix}
    </span>
  );
});

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-nemesis-500/5 via-transparent to-transparent" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px),
                           repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px)`,
        }} />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-minecraft-gold/10 border-2 border-minecraft-gold/30 mb-6">
            <span className="text-minecraft-gold text-sm font-bold">En développement actif</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            <span className="text-white">Le projet en </span>
            <span className="text-nemesis-400">chiffres</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Un launcher créé avec passion, bientôt disponible pour tous.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative p-6 bg-dark-900 border-4 border-dark-700 shadow-minecraft text-center group hover:border-nemesis-500/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className={`inline-flex p-4 ${stat.bgColor} border-2 border-current ${stat.color.replace('text-', 'border-')}/20 mb-4`}>
                <FontAwesomeIcon icon={stat.icon} className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className={`text-4xl sm:text-5xl font-black ${stat.color} mb-2`}>
                <AnimatedNumber target={stat.target} suffix={stat.suffix} inView={isInView} />
              </div>
              <p className="text-dark-400 font-bold uppercase tracking-wider text-sm">
                {stat.label}
              </p>
              
              {/* Corner decorations */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-dark-700 group-hover:bg-nemesis-500/30 transition-colors" />
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-dark-700 group-hover:bg-nemesis-500/30 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
