/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from 'motion/react';
import {
  Menu, X, ChevronRight, Target, Zap, Users, CheckCircle2,
  Mail, Phone, Linkedin, Twitter, Facebook, Instagram,
  ArrowRight, FileText, BarChart3, Globe, ShieldCheck, Clock, Search,
  Cpu, Layers, Microchip, CircuitBoard, Gift, Sparkles, Check, Quote,
} from 'lucide-react';
import { SectionHeading } from './components/SectionHeading';

// --- Lazy-loaded heavy sections ---
const Testimonials = lazy(() =>
  import('./components/Testimonials').then((m) => ({ default: m.Testimonials }))
);
const WhyChooseCCS = lazy(() =>
  import('./components/WhyChooseCCS').then((m) => ({ default: m.WhyChooseCCS }))
);
const ContactSection = lazy(() =>
  import('./components/ContactSection').then((m) => ({ default: m.ContactSection }))
);

// --- Mobile detection hook ---
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
};

// --- Section loading fallback ---
const SectionLoader = () => (
  <div className="flex items-center justify-center py-24">
    <div className="w-10 h-10 border-4 border-brand/20 border-t-brand rounded-full animate-spin" />
  </div>
);

// --- Optimized Interactive Background (fewer blobs on mobile) ---
const InteractiveBackground = ({ isMobile }: { isMobile: boolean }) => {
  const count = isMobile ? 5 : 15;
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-slate-50" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(90deg, #007aff 1px, transparent 1px), linear-gradient(#007aff 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-brand/10 rounded-full blur-[100px]"
          initial={{
            width: Math.random() * 600 + 200,
            height: Math.random() * 600 + 200,
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            opacity: 0.2,
          }}
          animate={{
            x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
            y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 30 + 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const PCBBackground = () => (
  <div className="fixed inset-0 -z-10 pointer-events-none opacity-[0.03]">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <pattern id="pcb-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
        <path d="M 20 20 L 180 20 L 180 180 L 20 180 Z" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
        <circle cx="180" cy="20" r="3" fill="currentColor" />
        <circle cx="180" cy="180" r="3" fill="currentColor" />
        <circle cx="20" cy="180" r="3" fill="currentColor" />
        <path d="M 20 100 L 60 100 L 80 120 L 140 120 L 160 100 L 180 100" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M 100 20 L 100 60 L 120 80 L 120 140 L 100 160 L 100 180" fill="none" stroke="currentColor" strokeWidth="1" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#pcb-pattern)" />
    </svg>
  </div>
);

// --- Magnetic Button (desktop-only effect) ---
const MagneticButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  isMobile?: boolean;
}> = ({ children, className, isMobile }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    x.set((e.clientX - left - width / 2) * 0.2);
    y.set((e.clientY - top - height / 2) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const springConfig = { stiffness: 150, damping: 15 };
  const dx = useSpring(x, springConfig);
  const dy = useSpring(y, springConfig);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
    >
      <motion.div style={{ x: dx, y: dy }}>{children}</motion.div>
    </div>
  );
};

// --- Floating Particles (fewer on mobile) ---
const FloatingParticles = ({ isMobile }: { isMobile: boolean }) => {
  const count = isMobile ? 8 : 30;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-brand/20 rounded-full"
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            scale: Math.random() * 2,
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

// --- TiltCard (disabled on mobile for perf) ---
// All hooks are called unconditionally to comply with rules of hooks.
// The isMobile flag just controls which JSX is returned.
const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  isMobile?: boolean;
}> = ({ children, className, isMobile }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);
  const radialBg = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(0, 122, 255, 0.08), transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // On mobile: no tilt, no radial gradient
  if (isMobile) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group/tilt ${className}`}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="w-full h-full"
      >
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover/tilt:opacity-100 transition-opacity duration-500"
          style={{ background: radialBg }}
        />
        <div
          style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
          className="relative z-10 h-full"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};

// --- Navbar ---
const Navbar = ({ isMobile }: { isMobile: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SERVICES', href: '#services' },
    { name: 'WHY US', href: '#why-us' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl py-4 shadow-xl border-b border-slate-100'
          : 'bg-transparent py-6 md:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-4 group cursor-pointer">
          <img
            src="/img/logo-ccs.png"
            alt="CCS Logo"
            className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
            width="80"
            height="48"
            decoding="async"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-black tracking-widest text-slate-500 hover:text-brand transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-1 bg-brand group-hover:w-full transition-all duration-300 rounded-full" />
            </a>
          ))}
          <MagneticButton isMobile={isMobile}>
            <a
              href="#quote"
              className="group relative px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-xs tracking-widest overflow-hidden transition-all hover:shadow-2xl hover:shadow-slate-900/20 block"
            >
              <span className="relative z-10">GET QUOTE</span>
              <div className="absolute inset-0 bg-brand translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </MagneticButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden w-12 h-12 flex items-center justify-center bg-slate-100 rounded-xl text-slate-900"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 shadow-2xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-black tracking-tighter text-slate-900 hover:text-brand transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#quote"
                className="bg-brand text-white text-center py-5 rounded-2xl font-black tracking-widest text-sm mt-4 shadow-xl shadow-brand/30"
                onClick={() => setIsOpen(false)}
              >
                GET QUOTE
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Marquee ---
const Marquee: React.FC<{ text: string; reverse?: boolean }> = ({ text, reverse = false }) => (
  <div className="overflow-hidden whitespace-nowrap py-4 bg-brand/5 border-y border-brand/10">
    <motion.div
      initial={{ x: reverse ? '-50%' : '0%' }}
      animate={{ x: reverse ? '0%' : '-50%' }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      className="inline-block"
    >
      {[...Array(10)].map((_, i) => (
        <span
          key={i}
          className="text-2xl md:text-6xl font-black uppercase tracking-tighter text-brand/10 px-8"
        >
          {text}
        </span>
      ))}
    </motion.div>
  </div>
);

// --- Main App ---
export default function App() {
  const isMobile = useIsMobile();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = (data: Record<string, string>) => {
    const errors: Record<string, string> = {};
    if (!data.name) errors.name = 'Name is required';
    if (!data.company) errors.company = 'Company is required';
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Invalid email format';
    }
    if (!data.phone) errors.phone = 'Phone is required';
    if (!data.service) errors.service = 'Please select a service';
    if (!data.message) errors.message = 'Project details are required';
    return errors;
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({});
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      company: formData.get('company') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service: formData.get('service') as string,
      message: formData.get('message') as string,
    };
    const errors = validateForm(data);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormStatus('submitting');
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setFormStatus('success');
      } else {
        throw new Error('Failed to submit quote');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setFormStatus('idle');
      alert('Failed to submit quote. Please try again.');
    }
  };

  const services = [
    {
      title: 'PCB Design',
      icon: <CircuitBoard className="text-brand" size={32} />,
      desc: 'Expert layout and design services for high-performance circuit boards.',
      img: '/img/Design 1.jpeg',
    },
    {
      title: 'PCB Manufacturing',
      icon: <Layers className="text-brand" size={32} />,
      desc: 'High-quality manufacturing solutions through our trusted global partners (Outsourcing).',
      img: '/img/manufacturing 1.png',
    },
    {
      title: 'Components Sourcing',
      icon: <Microchip className="text-brand" size={32} />,
      desc: 'Direct access to our extensive inventory and global supplier network (Inhouse).',
      img: '/img/Sourcing 1.png',
    },
    {
      title: 'PCB Assembly',
      icon: <Cpu className="text-brand" size={32} />,
      desc: 'Precision SMT and THT assembly services for turnkey or consigned projects (Outsourcing).',
      img: '/img/Assembly 1.jpeg',
    },
  ];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Disable parallax on mobile
  const heroImageY = useTransform(scrollYProgress, [0, 0.2], isMobile ? [0, 0] : [0, -100]);
  const heroImageScale = useTransform(scrollYProgress, [0, 0.2], isMobile ? [1, 1] : [1, 1.1]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], isMobile ? [0, 0] : [0, 50]);

  return (
    <div className="min-h-screen font-sans perspective-1000">
      <PCBBackground />
      <InteractiveBackground isMobile={isMobile} />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand z-[100] origin-left"
        style={{ scaleX }}
      />
      <Navbar isMobile={isMobile} />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-32 lg:pt-20 overflow-hidden bg-slate-50"
      >
        <FloatingParticles isMobile={isMobile} />
        {/* Advanced Background */}
        <div className="absolute inset-0 -z-10">
          {!isMobile && (
            <>
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-[20%] -left-[10%] w-[80%] aspect-square bg-gradient-to-br from-brand/10 to-transparent rounded-full blur-[120px]"
              />
              <motion.div
                animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-[20%] -right-[10%] w-[70%] aspect-square bg-gradient-to-tl from-brand-dark/10 to-transparent rounded-full blur-[120px]"
              />
            </>
          )}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(#007aff 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 relative z-10">
              <motion.div
                initial={{ opacity: 0, x: isMobile ? 0 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: isMobile ? 0.5 : 1, ease: [0.16, 1, 0.3, 1] }}
                style={{ y: heroTextY }}
              >
                <motion.div
                  style={{ marginTop: '50px', marginBottom: '10px' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-md border border-slate-200 mb-8 relative z-20"
                >
                  <span className="flex h-2 w-2 rounded-full bg-brand animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-700">
                    Global Supply Chain Excellence
                  </span>
                </motion.div>

                <h1 className="text-4xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter mb-6">
                  <span className="block overflow-hidden py-1">
                    <motion.span
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="block"
                    >
                      {isMobile ? (
                        'PRECISION'
                      ) : (
                        ['P','R','E','C','I','S','I','O','N'].map((char, i) => (
                          <motion.span key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.05 }} className="inline-block">{char}</motion.span>
                        ))
                      )}
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden py-1 text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-dark">
                    <motion.span
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="block"
                    >
                      {isMobile ? (
                        'SOURCING'
                      ) : (
                        ['S','O','U','R','C','I','N','G'].map((char, i) => (
                          <motion.span key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.05 }} className="inline-block">{char}</motion.span>
                        ))
                      )}
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden py-1">
                    <motion.span
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="block"
                    >
                      {isMobile ? (
                        'DEFINED.'
                      ) : (
                        ['D','E','F','I','N','E','D','.'].map((char, i) => (
                          <motion.span key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.05 }} className="inline-block">{char}</motion.span>
                        ))
                      )}
                    </motion.span>
                  </span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="text-lg md:text-xl text-slate-600 mb-8 md:mb-10 max-w-xl leading-relaxed font-medium"
                >
                  CCS bridges the gap between complex engineering requirements and global component
                  availability. We deliver 100% traceable, high-performance electronics at scale.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="flex flex-wrap gap-6"
                >
                  <MagneticButton isMobile={isMobile}>
                    <motion.a
                      whileHover={isMobile ? {} : { scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      href="#quote"
                      className="group relative px-10 py-6 bg-brand text-white rounded-2xl font-black text-lg overflow-hidden shadow-2xl shadow-brand/30 block"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        START YOUR PROJECT{' '}
                        <ArrowRight
                          size={20}
                          className="group-hover:translate-x-2 transition-transform"
                        />
                      </span>
                      {!isMobile && (
                        <motion.div
                          className="absolute inset-0 bg-brand-dark"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.4, ease: 'circOut' }}
                        />
                      )}
                    </motion.a>
                  </MagneticButton>

                  <MagneticButton isMobile={isMobile}>
                    <motion.a
                      whileHover={isMobile ? {} : { scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      href="#services"
                      className="px-10 py-6 bg-white border-2 border-slate-200 text-slate-900 rounded-2xl font-black text-lg hover:border-brand hover:text-brand transition-all flex items-center gap-3 block"
                    >
                      VIEW SERVICES
                    </motion.a>
                  </MagneticButton>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                  className="mt-6 md:mt-10 flex flex-wrap items-center gap-6 md:gap-12 relative z-20"
                  style={{ marginBottom: '50px' }}
                >
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-4xl font-black tracking-tighter text-slate-900">
                      15K+
                    </span>
                    <span className="text-[10px] font-black text-slate-600 tracking-widest uppercase mt-1">
                      Parts Sourced
                    </span>
                  </div>
                  <div className="hidden md:block w-px h-12 bg-slate-200" />
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-4xl font-black tracking-tighter text-slate-900">
                      99%
                    </span>
                    <span className="text-[10px] font-black text-slate-600 tracking-widest uppercase mt-1">
                      Quality Rate
                    </span>
                  </div>
                  <div className="hidden md:block w-px h-12 bg-slate-200" />
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-4xl font-black tracking-tighter text-slate-900">
                      24H
                    </span>
                    <span className="text-[10px] font-black text-slate-600 tracking-widest uppercase mt-1">
                      Response Time
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Visual */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: isMobile ? 0 : 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: isMobile ? 0.6 : 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                style={{ y: heroImageY, scale: heroImageScale }}
                className="relative"
              >
                <TiltCard className="relative z-10" isMobile={isMobile}>
                  <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_80px_120px_-30px_rgba(0,0,0,0.3)] border-[8px] md:border-[12px] border-white group">
                    <img
                      src="./img/Sourcing 2.jpeg"
                      alt="Advanced Electronics Sourcing"
                      className="w-full h-[400px] md:h-[600px] object-cover group-hover:scale-110 transition-transform duration-1000"
                      decoding="async"
                      fetchPriority="high"
                      width="600"
                      height="600"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Overlay Badges */}
                    {!isMobile && (
                      <>
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute top-8 left-8 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/20">
                              <Cpu size={24} />
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                                Technology
                              </p>
                              <p className="text-sm font-black">Next-Gen Sourcing</p>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          animate={{ y: [0, 10, 0] }}
                          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                          className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                              <ShieldCheck size={24} />
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                                Quality Assurance
                              </p>
                              <p className="text-sm font-black">ISO Certified</p>
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </div>
                </TiltCard>

                {/* Floating Geometric Shapes — desktop only */}
                {!isMobile && (
                  <>
                    <motion.div
                      animate={{ rotate: 360, y: [0, 30, 0] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="absolute -top-12 -right-12 w-32 h-32 border-4 border-brand/20 rounded-full -z-10"
                    />
                    <motion.div
                      animate={{ rotate: -360, x: [0, -30, 0] }}
                      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                      className="absolute -bottom-12 -left-12 w-48 h-48 border-4 border-brand-dark/10 rounded-[4rem] -z-10"
                    />
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Rail Text */}
        <div className="absolute bottom-0 left-0 w-full z-20">
          <Marquee text="Global Logistics • Precision Sourcing • Quality Guaranteed • Rapid Lead Times • Expert Engineering • " />
        </div>

        {/* Scroll Indicator */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">
              Scroll
            </span>
            <div className="w-6 h-10 border-2 border-slate-200 rounded-full flex justify-center p-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 bg-brand rounded-full"
              />
            </div>
          </motion.div>
        )}
      </section>

      {/* Ad Banner Section */}
      <section className="py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TiltCard className="w-full" isMobile={isMobile}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-brand to-brand-dark rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center animate-bounce">
                    <Gift size={40} className="text-white" />
                  </div>
                  <div>
                    <div className="inline-block bg-yellow-400 text-brand-dark text-xs font-black px-3 py-1 rounded-full mb-2 uppercase tracking-widest">
                      Limited Time Offer
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black">Free Assembly on turnkey project!</h2>
                    <p className="text-white/80 font-medium">
                      Optimize your production with our special turnkey assembly offer.
                      <span className="text-[10px] opacity-70 ml-1 align-top">*t&c</span>
                    </p>
                  </div>
                </div>
                <a
                  href="#quote"
                  className="bg-white text-brand px-10 py-4 rounded-full font-black text-lg hover:bg-slate-100 transition-all shadow-xl whitespace-nowrap flex items-center gap-2"
                >
                  Claim Now <Sparkles size={20} />
                </a>
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </section>

      {/* Services Section */}
      <motion.section
        id="services"
        className="py-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Services"
            subtitle="Comprehensive electronics solutions tailored to your specific requirements"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <TiltCard key={i} className="h-full" isMobile={isMobile}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-500 group h-full flex flex-col relative"
                >
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 ease-out"
                      loading="lazy"
                      decoding="async"
                      width="400"
                      height="224"
                    />
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <motion.div
                      className="w-16 h-16 bg-brand/10 rounded-[1.5rem] flex items-center justify-center mb-6 group-hover:bg-brand group-hover:text-white transition-all duration-700 shadow-md"
                      animate={isMobile ? {} : { y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                    >
                      {service.icon}
                    </motion.div>
                    <h4 className="text-xl font-black tracking-tighter mb-3 text-slate-900">
                      {service.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow font-medium">
                      {service.desc}
                    </p>
                    <a
                      href="#quote"
                      className="inline-flex items-center gap-3 text-brand font-black text-xs uppercase tracking-widest group/link mt-auto"
                    >
                      <span className="relative">
                        Request Quote
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover/link:w-full" />
                      </span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="py-24 bg-slate-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="About CCS"
            subtitle="Component Sourcing Solutions (CCS) specializes in providing comprehensive component sourcing services to businesses worldwide."
          />
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Our expertise lies in analyzing market conditions, evaluating supplier networks, and
                delivering precise component sourcing solutions that enable informed procurement
                decisions. We are committed to excellence in every aspect of component sourcing.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <Target className="text-brand" />, title: 'Precision Focus', desc: 'Every component meets the highest quality standards' },
                  { icon: <Zap className="text-brand" />, title: 'Rapid Response', desc: 'Industry-leading turnaround times without compromise' },
                  { icon: <Users className="text-brand" />, title: 'Strategic Partnership', desc: 'Building long-term relationships through expert guidance' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100"
                  >
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-bold">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <TiltCard isMobile={isMobile}>
                <img
                  src="/img/top 3.jpeg"
                  alt="PCB close-up"
                  className="rounded-2xl shadow-lg mt-8"
                  loading="lazy"
                  decoding="async"
                  width="300"
                  height="250"
                />
              </TiltCard>
              <TiltCard isMobile={isMobile}>
                <img
                  src="/img/top 2.jpeg"
                  alt="Warehouse"
                  className="rounded-2xl shadow-lg"
                  loading="lazy"
                  decoding="async"
                  width="300"
                  height="250"
                />
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Why Choose CCS — Lazy loaded */}
      <Suspense fallback={<SectionLoader />}>
        <WhyChooseCCS />
      </Suspense>

      {/* Testimonials — Lazy loaded */}
      <Suspense fallback={<SectionLoader />}>
        <Testimonials />
      </Suspense>

      {/* Process Section */}
      <motion.section
        className="py-24 bg-slate-50 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        {/* Floating Background Icons — desktop only */}
        {!isMobile && (
          <>
            <motion.div
              animate={{ y: [0, 100, 0], rotate: [0, 360, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-20 left-10 text-brand/5 -z-10"
            >
              <Cpu size={200} />
            </motion.div>
            <motion.div
              animate={{ y: [0, -100, 0], rotate: [360, 0, 360] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-20 right-10 text-brand/5 -z-10"
            >
              <CircuitBoard size={250} />
            </motion.div>
          </>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="4-Step Process"
            subtitle="Simple workflow to get your components sourced efficiently"
          />
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-100 -z-10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="h-full bg-brand/30"
              />
            </div>
            {[
              { step: '1', title: 'Get Parts with CCS', desc: 'Create account or log in to our platform' },
              { step: '2', title: 'Upload Your BOM', desc: 'Submit your bill of materials for analysis' },
              { step: '3', title: 'Get a Quote Fast', desc: 'Receive comprehensive quotation within 24-48 hours' },
              { step: '4', title: 'Approve and Procure', desc: 'Confirm order and proceed to delivery' },
            ].map((item, i) => (
              <div key={i} className="text-center relative group">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: i * 0.2, type: 'spring', stiffness: 260, damping: 20 }}
                  className="w-16 h-16 bg-brand text-white rounded-full flex items-center justify-center font-black text-2xl mx-auto mb-8 relative z-10 shadow-2xl shadow-brand/40 group-hover:scale-110 transition-transform duration-500"
                >
                  {item.step}
                  {!isMobile && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-brand/20 -z-10"
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    />
                  )}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: i * 0.2 + 0.3, duration: 0.6 }}
                >
                  <h4 className="text-xl font-black mb-3 tracking-tight group-hover:text-brand transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed px-4">
                    {item.desc}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact & Quote — Lazy loaded */}
      <Suspense fallback={<SectionLoader />}>
        <ContactSection
          formStatus={formStatus}
          formErrors={formErrors}
          onSubmit={handleFormSubmit}
          onReset={() => { setFormStatus('idle'); setFormErrors({}); }}
        />
      </Suspense>

      {/* Footer */}
      <footer className="py-20 bg-slate-950 text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <img
                  src="/img/logo-ccs.png"
                  alt="CCS Logo"
                  className="h-10 w-auto object-contain"
                  loading="lazy"
                  decoding="async"
                  width="60"
                  height="40"
                />
              </div>
              <p className="text-slate-400 text-sm mb-6">
                Optimal Parts. Competitive Prices. Industry-Leading Lead Times.
              </p>
              <div className="space-y-2 text-sm text-slate-400">
                <p className="flex items-center gap-2">
                  <Mail size={14} /> Info.ccs@myyahoo.com
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={14} /> +91 7048891774
                </p>
              </div>
            </div>

            <div>
              <h5 className="font-bold mb-6">Our Services</h5>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-brand transition-colors">PCB Design</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">PCB Manufacturing</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Components Sourcing</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">PCB Assembly</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-6">Process</h5>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-brand transition-colors">Get Parts with CCS</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Upload Your BOM</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Get a Quote Fast</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Approve and Procure</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-6">Company</h5>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-brand transition-colors">About CCS</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Our Advantages</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
            <p>© 2026 CCS - Component Sourcing Solutions. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <p>Development by <a href="https://nrrevibe.online" target="_blank" rel="noopener noreferrer">NR Revibe</a></p>
            </div>
          </div>
        </div>
      </footer> 
    </div>
  );
}
