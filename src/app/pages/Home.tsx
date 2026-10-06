import { motion } from "motion/react";
import { Link } from "react-router";
import {
  Code2,
  Gamepad2,
  Palette,
  Database,
  Cloud,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Trophy,
  Rocket,
  ChevronDown,
} from "lucide-react";


// @ts-ignore

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import { QuotesSection } from "../components/QuotesSection";
import { DesignProjectsSection } from "../components/DesignProjectsSection";
import { InteractiveCanvas } from "../components/InteractiveCanvas";
import { DhSignature } from "../components/ui/dh-logo";
import { ThreeHeroCanvas } from "../components/ThreeHeroCanvas";
import { Fun3DShowcase } from "../components/Fun3DShowcase";

export function Home() {
  const portfolioImages = {
    // Files in the 'public' folder are accessed starting with '/'
    profile: "/assets/images/Dhurgham-new.png",
    foundation: "/assets/images/Moate bus.jpg",
    university: "/assets/images/Unig.jpg",
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const floatingVariants = {
    floating: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const glowVariants = {
    glow: {
      boxShadow: [
        "0 0 20px rgba(0, 0, 0, 0.3)",
        "0 0 40px rgba(0, 0, 0, 0.2)",
        "0 0 60px rgba(0, 0, 0, 0.1)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const skills = [
    {
      icon: Code2,
      label: "JavaScript, Python, Java, C#, C++, SQL",
      description: "Software and algorithms",
      color: "from-sky-500 to-blue-500",
    },
    {
      icon: Gamepad2,
      label: "Unity, Gameplay Systems, Mechanics",
      description: "Interactive systems and polish",
      color: "from-blue-500 to-sky-500",
    },
    {
      icon: Palette,
      label: "Photoshop, Illustrator, Premiere Pro",
      description: "Visual storytelling and brand assets",
      color: "from-blue-600 to-indigo-600",
    },
    {
      icon: Database,
      label: "Web Apps, Creative Production",
      description: "Delivery from concept to deployment",
      color: "from-slate-600 to-gray-600",
    },
    {
      icon: Cloud,
      label: "Cloud Computing",
      description: "Deployment, scalable services, and cloud workflows",
      color: "from-sky-700 to-slate-700",
    },
    {
      icon: ShieldCheck,
      label: "Cybersecurity",
      description: "Secure coding, authentication basics, and hardening",
      color: "from-blue-600 to-slate-700",
    },
  ];

  const stats = [
    { value: "50+", label: "Projects Completed" },
    { value: "8+", label: "Technologies" },
    { value: "20+", label: "Programming Languages" },
    { value: "2+", label: "Years Experience" },
    { value: "100%", label: "Dedication" },
  ];

  const featuredProjects = [
    {
      title: "DairyFresh",
      category: "Web Development",
      tech: ["TypeScript", "React", "Commerce"],
      description: "Interactive dairy-commerce platform with rich product browsing and multilingual support",
      gradient: "from-slate-700/40 to-indigo-900/35",
    },
    {
      title: "croc-playtime",
      category: "Game Development",
      tech: ["JavaScript", "Gameplay"],
      description: "Browser game focused on fast interaction loops and responsive controls",
      gradient: "from-zinc-700/40 to-slate-800/35",
    },
    {
      title: "SlainteAI-Core",
      category: "AI Engineering",
      tech: ["Python", "Core Modules"],
      description: "Core AI project structured for practical development and extensibility",
      gradient: "from-blue-900/40 to-slate-800/35",
    },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-zinc-950 via-slate-900 to-stone-950">
        {/* Three.js 3D Interactive Canvas */}
        <ThreeHeroCanvas />
        {/* Subtle studio texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.03),transparent_30%)] pointer-events-none" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center"
        >
          {/* Centered Available for Opportunities Badge aligned with photo */}
          <motion.div variants={itemVariants} className="mb-6 flex justify-center w-full">
            <Badge className="inline-flex items-center justify-center px-4 py-2 bg-slate-800/80 backdrop-blur-md rounded-full border border-sky-500/30 text-slate-200 shadow-lg shadow-sky-500/10">
              <Sparkles className="w-4 h-4 mr-2 text-sky-400 shrink-0" />
              <span className="font-medium tracking-wide">Available for Opportunities</span>
            </Badge>
          </motion.div>

          {/* Centered Profile Picture directly below badge */}
          <motion.div variants={itemVariants} className="mb-6 flex justify-center w-full">
            <img 
              src={portfolioImages.profile} 
              alt="Dhurgham portrait" 
              className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full object-cover mx-auto border-4 border-white/20 shadow-2xl shadow-sky-500/15"
            />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 display-text"
          >
            <span className="bg-gradient-to-r from-white via-slate-200 to-stone-300 bg-clip-text text-transparent">
              Dhurgham
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl lg:text-3xl text-slate-300 mb-4 elegant-text"
          >
            Polyglot Dev (C#/Rust/Go/SQL/Web/Others) & Ethical Hacker (Kali).I build AI/Computer Vision apps, Unity games & AAA 3D Art (Maya/Adobe). Bridging elite logic with high-fidelity design to create the secure digital future.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-slate-400 mb-8 max-w-2xl mx-auto px-4"
          >
            Apps, Games, Web, and Creative Production
            <br className="hidden sm:block" />
            Hands-on delivery using JavaScript,React,Angular, Python, Java,Rust,PHP,Azure, MongoDB, C#, C++, SQL,Go,PostqreSql,Wireshark, Unity, Photoshop, Illustrator, Premiere Pro, Autodesk tools and other programming languages and technologies.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/projects">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                variants={glowVariants}
                animate="glow"
              >
                <Button
                  size="lg"
                  className="bg-slate-200 hover:bg-white text-slate-900 px-8 py-6 text-lg group w-full sm:w-auto shadow-lg shadow-black/20"
                >
                  View My Work
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>
            <Link to="/contact">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-400/50 text-slate-200 hover:bg-white/10 px-8 py-6 text-lg w-full sm:w-auto backdrop-blur-sm"
                >
                  Get in Touch
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Enhanced Skills Icons */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12 px-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, y: -10, rotateX: 10 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="flex flex-col items-center p-6 sm:p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-sky-500/50 transition-all duration-500 h-full">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 mb-4 bg-gradient-to-br ${skill.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300`}>
                    <skill.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <span className="text-slate-300 text-sm sm:text-base text-center font-semibold mb-2">{skill.label}</span>
                  <span className="text-slate-500 text-xs text-center elegant-text">{skill.description}</span>
                </div>
                <motion.div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ zIndex: -1 }} />
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-gray-400"
          >
            <ChevronDown className="w-8 h-8 mx-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* Live Interactive 3D Showcase */}
      <Fun3DShowcase />

      {/* Foundation Years Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 display-text">
              <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                Foundation Years
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto elegant-text">
              My technical journey started at Moate Business College, where I built early websites and game projects while strengthening communication, mathematics, and professional practice. This stage helped me develop consistency, problem-solving habits, and confidence in shipping practical work.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={portfolioImages.foundation}
                  alt="Moate Business College"
                  className="w-full h-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = "../../images/Moate bus.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute left-5 right-5 bottom-5">
                  <h3 className="text-xl font-bold text-white mb-1">Moate Business College</h3>
                  <p className="text-gray-200">Early Development Foundation</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="p-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                <h4 className="text-lg font-semibold text-white mb-3">Key Skills Developed</h4>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-center"><span className="w-2 h-2 bg-sky-400 rounded-full mr-3"></span>Web Development Fundamentals</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-sky-400 rounded-full mr-3"></span>Game Project Creation</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-sky-400 rounded-full mr-3"></span>Professional Communication</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-sky-400 rounded-full mr-3"></span>Mathematical Problem Solving</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* University Growth Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 display-text">
              <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                University Growth
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto elegant-text">
              At University of Galway, I expanded into deeper software engineering practice through C, JavaScript, algorithms,R, MYSQL, Java and technical projects. The university environment accelerated my development as both a logical engineer and a creative builder.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 order-2 md:order-1"
            >
              <div className="p-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                <h4 className="text-lg font-semibold text-white mb-3">Advanced Technologies</h4>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>C Programming & Systems</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>JavaScript Engineering</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>Algorithm Design</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>Technical Project Management</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>MySQL Database Management</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>R Statistical Analysis</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>Java Software Development</li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group order-1 md:order-2"
            >
              <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={portfolioImages.university}
                  alt="University of Galway"
                  className="w-full h-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = "../../images/Unig.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute left-5 right-5 bottom-5">
                  <h3 className="text-xl font-bold text-white mb-1">University of Galway</h3>
                  <p className="text-slate-200">Advanced Computer Practice</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Design Projects Section */}
      <DesignProjectsSection />

      {/* Interactive 3D Spatial Canvas Section */}
      <InteractiveCanvas />

      {/* Quotes Section */}
      <QuotesSection />

      {/* Enhanced Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 bg-gradient-to-br from-sky-500/10 to-blue-500/10 rounded-xl border border-sky-500/20"
              >
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm sm:text-base elegant-text">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-200 to-stone-200 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto elegant-text">
              A selection of my best work across web development, game design, and creative arts
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className={`p-6 bg-gradient-to-br ${project.gradient} backdrop-blur-sm border-white/10 hover:border-sky-500/50 transition-all duration-300 h-full`}>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="border-slate-400/40 text-slate-200">
                      {project.category}
                    </Badge>
                    <Rocket className="w-5 h-5 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-slate-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-white/5 rounded-full text-xs text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/projects">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-400/50 text-slate-200 hover:bg-white/10 px-8 group"
              >
                View All Projects
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8"
            >
              <Trophy className="w-20 h-20 mx-auto text-slate-300" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white display-text">
              Let's Build Something Amazing Together
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto elegant-text">
              I'm always open to discussing new projects, creative ideas, or opportunities to be
              part of your vision.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link to="/contact">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-slate-200 hover:bg-white text-slate-900 px-8 py-6 text-lg group shadow-lg shadow-black/20"
                  >
                    Start a Conversation
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
              <div className="flex items-center space-x-2 px-4 py-2 bg-slate-900/50 backdrop-blur-xl rounded-full border border-sky-500/20 shadow-lg shadow-sky-500/10">
                <div className="text-sky-400"><DhSignature size="sm" /></div>
                <span className="text-sky-200/80 text-sm elegant-text">Crafted with passion</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
