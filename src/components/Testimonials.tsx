import React from 'react';
import { motion } from 'motion/react';
import { Users, Quote } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const testimonials = [
  {
    quote: "CCS has been our go-to partner for hard-to-find components. Their turnaround time and global reach are simply unmatched in the industry.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechFlow Systems"
  },
  {
    quote: "The quality assurance process at CCS gives us the confidence we need for our medical device manufacturing. 100% traceability is a game changer.",
    author: "James Miller",
    role: "Operations Director",
    company: "MedTech Solutions"
  },
  {
    quote: "Exceptional service and competitive pricing. They really understand the complexities of the global supply chain and act as a true strategic partner.",
    author: "Elena Rodriguez",
    role: "Procurement Manager",
    company: "AeroSystems Global"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Client Testimonials"
          subtitle="What industry leaders say about our sourcing solutions"
        />
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-10 rounded-[3rem] bg-slate-50 border border-slate-100 group hover:bg-brand hover:text-white transition-all duration-500"
            >
              <Quote className="absolute top-8 right-8 text-brand/10 group-hover:text-white/20 transition-colors" size={60} />
              <div className="relative z-10">
                <p className="text-lg font-medium leading-relaxed mb-8 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center text-brand group-hover:bg-white/20 group-hover:text-white transition-all duration-500 shadow-lg">
                    <Users size={24} />
                  </div>
                  <div>
                    <h5 className="font-black tracking-tight">{t.author}</h5>
                    <p className="text-xs font-bold opacity-60 uppercase tracking-widest">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
