import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail, Phone, Linkedin, Twitter, Facebook, Instagram,
  ArrowRight, Check
} from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const FormField = ({
  label,
  children,
  error,
  delay = 0,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="space-y-2 group"
  >
    <label
      className={`text-sm font-bold transition-colors ${
        error ? 'text-rose-500' : 'text-slate-700 group-focus-within:text-brand'
      }`}
    >
      {label}
    </label>
    <div className="relative">
      {children}
      <motion.div
        className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
          error ? 'bg-rose-500 w-full' : 'bg-brand w-0 group-focus-within:w-full'
        }`}
      />
    </div>
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="text-[10px] font-bold text-rose-500 uppercase tracking-widest"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </motion.div>
);

const SuccessMessage = ({ onReset }: { onReset: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-16 text-center h-full"
  >
    <motion.div
      initial={{ scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
      className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-8 shadow-xl shadow-emerald-500/20"
    >
      <Check size={48} strokeWidth={3} />
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
        Quote Request Sent!
      </h3>
      <p className="text-slate-500 mb-10 max-w-sm leading-relaxed">
        Thank you for reaching out. Our engineering team has received your requirements and will
        provide a detailed quotation within{' '}
        <span className="text-brand font-bold">24 hours</span>.
      </p>
    </motion.div>
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      onClick={onReset}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg flex items-center gap-2 group"
    >
      Submit Another Request
      <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
        →
      </motion.span>
    </motion.button>
  </motion.div>
);

interface ContactSectionProps {
  formStatus: 'idle' | 'submitting' | 'success';
  formErrors: Record<string, string>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
}

export const ContactSection = ({
  formStatus,
  formErrors,
  onSubmit,
  onReset,
}: ContactSectionProps) => {
  return (
    <motion.section
      id="contact"
      className="py-24 bg-slate-900 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl font-bold mb-8">Get Your Quote Today</h2>
            <p className="text-slate-400 text-lg mb-12">
              Ready to optimize your component sourcing process? Contact us for professional services
              that deliver quality parts at competitive prices with industry-leading lead times.
            </p>
            <div className="space-y-8 mb-12">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Email Us</p>
                  <p className="text-xl font-bold">Info.ccs@myyahoo.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Call Us</p>
                  <p className="text-xl font-bold">+91 7048891774</p>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-white/10">
              <p className="text-slate-400 mb-6">Connect with us</p>
              <div className="flex gap-4">
                {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div id="quote" className="scroll-mt-32 h-full">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[40px] p-8 md:p-12 text-slate-900 shadow-2xl h-full relative overflow-hidden"
            >
              {formStatus === 'success' ? (
                <SuccessMessage onReset={onReset} />
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-8">Request a Quotation</h3>
                  <form onSubmit={onSubmit} noValidate className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField label="Name" error={formErrors.name} delay={0.1}>
                        <input
                          name="name"
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:bg-slate-50 outline-none transition-all"
                          placeholder="Your Name"
                        />
                      </FormField>
                      <FormField label="Company" error={formErrors.company} delay={0.2}>
                        <input
                          name="company"
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:bg-slate-50 outline-none transition-all"
                          placeholder="Company Name"
                        />
                      </FormField>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField label="Email" error={formErrors.email} delay={0.3}>
                        <input
                          name="email"
                          type="email"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:bg-slate-50 outline-none transition-all"
                          placeholder="email@example.com"
                        />
                      </FormField>
                      <FormField label="Phone" error={formErrors.phone} delay={0.4}>
                        <input
                          name="phone"
                          type="tel"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:bg-slate-50 outline-none transition-all"
                          placeholder="+91 ..."
                        />
                      </FormField>
                    </div>
                    <FormField label="Service Type" error={formErrors.service} delay={0.5}>
                      <select
                        name="service"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:bg-slate-50 outline-none transition-all bg-white"
                      >
                        <option value="">Select service type</option>
                        <option>PCB Design</option>
                        <option>PCB Manufacturing (Outsourcing)</option>
                        <option>Components sourcing (Inhouse)</option>
                        <option>PCB Assembly (Outsourcing)</option>
                      </select>
                    </FormField>
                    <FormField label="Project Details" error={formErrors.message} delay={0.6}>
                      <textarea
                        name="message"
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:bg-slate-50 outline-none transition-all"
                        placeholder="Tell us about your component sourcing requirements..."
                      />
                    </FormField>
                    <motion.button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-brand text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 flex items-center justify-center gap-2"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Processing...
                        </>
                      ) : (
                        'Get Quote'
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
