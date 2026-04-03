import React from 'react';
import { motion } from 'motion/react';
import { Globe, ShieldCheck, Clock, Users, Zap, Target } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const features = [
  {
    id: "01",
    title: "Global Network",
    desc: "Direct access to 500+ verified global suppliers across 4 continents.",
    icon: <Globe size={24} />,
    stat: "500+ Suppliers"
  },
  {
    id: "02",
    title: "Quality First",
    desc: "Rigorous 3-stage inspection process ensuring 99.9% assurance rate.",
    icon: <ShieldCheck size={24} />,
    stat: "99.9% Accuracy"
  },
  {
    id: "03",
    title: "Fast Delivery",
    desc: "Optimized logistics routes delivering industry-leading turnaround times.",
    icon: <Clock size={24} />,
    stat: "24H Response"
  },
  {
    id: "04",
    title: "Expert Support",
    desc: "Dedicated engineering team providing 24/7 technical guidance.",
    icon: <Users size={24} />,
    stat: "24/7 Support"
  }
];

export const WhyChooseCCS = () => {
  return (
    <section id="why-us" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-brand font-black tracking-[0.3em] uppercase text-xs mb-4 block">
                The CCS Edge
              </span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] mb-8">
                WHY<br />CHOOSE<br /><span className="text-brand">CCS?</span>
              </h2>
              <p className="text-slate-400 font-medium text-lg max-w-sm">
                As leading consulting firms in Ahmedabad, we engineer business resilience through expertise, strategic planning, and global reach.
              </p>
              <div className="mt-12 flex gap-4">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-brand animate-pulse">
                  <Zap size={20} />
                </div>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-slate-500">
                  <Target size={20} />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-2/3 grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900 p-10 group hover:bg-brand transition-all duration-500 relative overflow-hidden"
              >
                <span className="absolute -bottom-4 -right-4 text-9xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                  {f.id}
                </span>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/20 transition-colors">
                    {f.icon}
                  </div>
                  <h4 className="text-2xl font-black tracking-tight mb-4">{f.title}</h4>
                  <p className="text-slate-400 group-hover:text-white/80 transition-colors font-medium mb-8">
                    {f.desc}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="h-px w-8 bg-brand group-hover:bg-white transition-colors" />
                    <span className="text-[10px] font-black tracking-widest uppercase opacity-60 group-hover:opacity-100">
                      {f.stat}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
