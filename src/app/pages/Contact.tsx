import { motion, AnimatePresence } from "motion/react";
import { Mail, Github, Linkedin, Send, MapPin, Phone, MessageSquare, Loader2, CheckCircle2, AlertCircle, Sparkles, ExternalLink, Shield, Palette } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";

/**
 * ParticleBackground Component
 * Preserved: Mouse-Interaction (Particles react to cursor position)
 */
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Array<{ 
      x: number; y: number; vx: number; vy: number; 
      size: number; alpha: number; originX: number; originY: number 
    }> = [];
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.12), 120);
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x: x, y: y, originX: x, originY: y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.4 + 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.current.radius) {
          const force = (mouse.current.radius - distance) / mouse.current.radius;
          p.x -= (dx / distance) * force * 5;
          p.y -= (dy / distance) * force * 5;
        }
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`; ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const dx2 = p.x - particles[j].x; const dy2 = p.y - particles[j].y;
          const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist < 110) {
            ctx.beginPath(); ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5; ctx.moveTo(p.x, p.y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    resize(); animate();
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
}

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState(""); 
  const [formData, setFormData] = useState({ name: "", email: "", title: "", message: "" });
  const messageLimit = 1500;

  const validateEmail = (email: string) => {
    return String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  /**
   * REWIRED HANDLER: UNLIMITED MAILTO
   * This replaces the EmailJS 403 Forbidden error with a 100% free direct link.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot !== "") return; 

    if (!validateEmail(formData.email)) {
      toast.error("Protocol Mismatch", { description: "Please enter a valid return email address." });
      return;
    }

    setIsSubmitting(true);

    // Polish: Artificial delay to make the "Encryption" animation feel real
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const recipient = "derg.moha@gmail.com";
      const subject = encodeURIComponent(`Portfolio Inquiry: ${formData.title}`);
      const bodyText = encodeURIComponent(
        `Hello Dhurgham,\n\n` +
        `Message from: ${formData.name} (${formData.email})\n` +
        `--------------------------------------------------\n\n` +
        `${formData.message}\n\n` +
        `--------------------------------------------------\n` +
        `Sent via dhurgham-portfolio-v3`
      );

      const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${bodyText}`;
      
      // Execution
      window.location.href = mailtoLink;

      toast.success("Client Handshake Successful", {
        description: "Opening your local mail app for unlimited transmission.",
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      });

      // Clear form after delay
      setTimeout(() => {
        setFormData({ name: "", email: "", title: "", message: "" });
      }, 2000);

    } catch (error) {
      toast.error("Transmission Error", {
        description: "Failed to initialize local mail protocol.",
        icon: <AlertCircle className="w-5 h-5 text-red-500" />
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Primary Email", value: "derg.moha@gmail.com", href: "mailto:derg.moha@gmail.com", gradient: "from-sky-500 to-blue-600" },
    { icon: Shield, label: "Hack The Box", value: "Verified Profile", href: "https://profile.hackthebox.com/profile/019e42b0-f185-72cc-8c58-2719e9977854?utm_medium=copy_url", gradient: "from-blue-600 to-sky-700" },
    { icon: Github, label: "Source Repository", value: "dhurghamCreation", href: "https://github.com/dhurghamCreation", gradient: "from-slate-700 to-slate-900" },
    { icon: Palette, label: "Behance Portfolio", value: "dhurghamalsaadi", href: "https://www.behance.net/dhurghamalsaadi", gradient: "from-blue-600 to-indigo-600" },
    { icon: Linkedin, label: "Career Network", value: "Dhurgham Alsaadi", href: "https://www.linkedin.com/in/dhurgham-a-b1428a253/", gradient: "from-blue-700 to-cyan-700" },
  ];

  const quickLinks = [
    { title: "Portfolio Archive", description: "Technical project history", icon: Sparkles, href: "/projects" },
    { title: "Skill Matrix", description: "Proficiency in modern stacks", icon: Phone, href: "/skills" },
    { title: "Biography", description: "Journey and CS education", icon: MessageSquare, href: "/about" },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#020617]">
      <ParticleBackground />
      <Toaster position="top-right" richColors theme="dark" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            Unlimited Direct Routing Active
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tighter">
            <span className="bg-gradient-to-br from-white via-blue-200 to-sky-400 bg-clip-text text-transparent">Let's Build Together</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Directly bridge the gap between human intent and digital reality. 
            Reach out via the secure portal below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="lg:col-span-2"
          >
            <Card className="p-8 sm:p-12 bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                  <div className="p-2 bg-sky-500/20 rounded-lg"><Send className="w-6 h-6 text-sky-400" /></div>
                  Direct Inquiry
                </h2>
                <div className="text-slate-500 text-sm font-mono uppercase tracking-widest hidden sm:block italic">Msg_Unlimited_v3.2</div>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 relative">
                <div className="hidden"><input value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" /></div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-slate-200 text-sm font-semibold tracking-wide">Identity</Label>
                    <Input id="name" name="name" placeholder="Name or Organization" value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} required
                      className="bg-slate-950/40 border-slate-800 text-white focus:border-sky-500 h-14 rounded-xl transition-all" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-slate-200 text-sm font-semibold tracking-wide">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="your@email.com" value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })} required
                      className="bg-slate-950/40 border-slate-800 text-white focus:border-sky-500 h-14 rounded-xl transition-all" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="title" className="text-slate-200 text-sm font-semibold tracking-wide">Project Subject</Label>
                  <Input id="title" name="title" placeholder="Collaboration or Inquiry" value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} required
                    className="bg-slate-950/40 border-slate-800 text-white focus:border-sky-500 h-14 rounded-xl transition-all" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="message" className="text-slate-200 text-sm font-semibold tracking-wide">Your Message</Label>
                    <span className="text-[10px] font-mono text-slate-500">{formData.message.length} / {messageLimit}</span>
                  </div>
                  <Textarea id="message" name="message" placeholder="Describe your objectives..."
                    value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value.slice(0, messageLimit) })}
                    required rows={6} className="bg-slate-950/40 border-slate-800 text-white focus:border-sky-500 p-5 rounded-xl resize-none leading-relaxed" />
                </div>

                <Button type="submit" size="lg" disabled={isSubmitting}
                  className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold h-16 rounded-xl relative overflow-hidden group shadow-2xl transition-all active:scale-[0.98]">
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="tracking-widest uppercase text-xs">Initializing Direct Mail...</span>
                      </motion.div>
                    ) : (
                      <motion.div key="static" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="tracking-wide">Launch Direct Messenger</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </form>
            </Card>
          </motion.div>

          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] px-2 mb-4">Direct Channels</h3>
                {contactInfo.map((info, index) => (
                  <Card key={index} className="p-1 bg-gradient-to-r from-white/5 to-transparent border-white/10 hover:border-sky-500/40 transition-all duration-500 group overflow-hidden">
                    <a href={info.href} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 p-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${info.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl transition-transform duration-500 group-hover:scale-110`}>
                        <info.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">{info.label}</div>
                        <div className="text-slate-200 font-semibold truncate group-hover:text-sky-400">{info.value}</div>
                      </div>
                    </a>
                  </Card>
                ))}
              </div>

              <Card className="p-8 bg-[#0f172a]/50 border-slate-800 backdrop-blur-md relative overflow-hidden group">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3"><div className="w-1.5 h-6 bg-sky-500 rounded-full" /> Quick Links</h3>
                <div className="space-y-4 relative z-10 text-left">
                  {quickLinks.map((link, index) => (
                    <a key={index} href={link.href} className="group flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                      <link.icon className="w-5 h-5 text-sky-400 mt-1 group-hover:scale-110" />
                      <div>
                        <div className="text-slate-200 font-bold text-sm leading-none mb-1">{link.title}</div>
                        <div className="text-slate-500 text-xs">{link.description}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-sky-500/10 via-slate-900 to-slate-900 border-sky-500/30 text-center relative overflow-hidden">
                <div className="w-3 h-3 bg-sky-400 rounded-full mx-auto mb-4 animate-pulse shadow-[0_0_20px_rgba(56,189,248,0.6)]" />
                <div className="text-white font-bold text-lg mb-2 tracking-tight">Open for Work</div>
                <div className="text-slate-400 text-sm leading-relaxed font-medium">Available for any On-Site, Remote or Hybrid opportunities.</div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Location Section - Polished & Enhanced */}
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mt-24">
          <Card className="p-10 sm:p-20 bg-[#0f172a]/40 border-slate-800 text-center relative overflow-hidden group">
            {/* Top accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
            
            {/* The Location "Oval" - Refined for better symmetry */}
            <motion.div 
              animate={{ y: [0, -12, 0] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} 
              className="inline-flex items-center justify-center mb-10 p-6 bg-sky-500/10 rounded-[2.5rem] border border-sky-500/20 shadow-[0_0_50px_-12px_rgba(56,189,248,0.3)]"
            >
              <MapPin className="w-14 h-14 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
            </motion.div>

            {/* Typography & Content */}
            <h3 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tighter group-hover:scale-[1.01] transition-transform duration-500">
              Athlone, Ireland <span className="inline-block hover:animate-bounce">🇮🇪</span>
            </h3>
            
            <p className="text-slate-400 max-w-2xl mx-auto mb-14 text-lg sm:text-xl leading-relaxed font-medium">
              CS Student at the <span className="text-white font-bold underline decoration-sky-500/50 decoration-2 underline-offset-8 hover:decoration-sky-400 transition-colors">University of Galway</span>. 
              <br className="hidden sm:block" /> Engineering scalable solutions from the west of Ireland.
            </p>

            {/* Stats Grid - Fixed Spacing and Alignment */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto relative">
              {[{ label: "Base Location", value: "Athlone, IE" }, { label: "Local Timezone", value: "GMT (UTC+0)" }, { label: "Response Latency", value: "< 24 Hours" }].map((item, i) => (
                <div key={i} className="group/item p-8 bg-slate-950/60 rounded-3xl border border-white/5 shadow-inner hover:border-sky-500/30 transition-all duration-300">
                  <div className="text-sky-500 text-[11px] font-black uppercase mb-3 tracking-[0.25em] group-hover/item:text-sky-400 transition-colors">{item.label}</div>
                  <div className="text-white font-bold text-xl tracking-tight">{item.value}</div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Footer Polish */}
        <div className="mt-20 text-center">
          <div className="h-px w-2/3 mx-auto bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-12" />
          <p className="text-slate-500 font-mono text-sm mb-10 italic">"Software engineering is the art of translating human intent into digital reality."</p>
          <div className="flex justify-center items-center gap-5">
            {[Github, Linkedin, Mail].map((Icon, i) => (
              <motion.div key={i} whileHover={{ y: -8 }} className="p-5 bg-slate-900 border border-slate-800 rounded-3xl hover:bg-sky-500/10 hover:border-sky-500/50 transition-all shadow-2xl">
                <Icon className="w-6 h-6 text-slate-400 hover:text-sky-400 transition-colors cursor-pointer" />
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-slate-600 text-[10px] font-mono tracking-[0.3em] uppercase">Built with Integrity by Dhurgham Alsaadi © 2026</div>
        </div>
      </div>
    </div>
  );
}