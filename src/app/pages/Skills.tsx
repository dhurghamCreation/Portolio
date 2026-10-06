import { motion } from "motion/react";
import {
  Code2,
  Gamepad2,
  Palette,
  Database,
  FileCode,
  Terminal,
  Cpu,
  Cloud,
  ShieldCheck,
  Award,
  CheckCircle2,
  ExternalLink,
  HeartHandshake,
  Shield,
  Video,
  Languages,
  Users,
  Sparkles,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";

export function Skills() {
  const skillCategories = [
    {
      title: "Web Development",
      icon: Code2,
      gradient: "from-sky-500 to-blue-500",
      skills: [
        { name: "HTML/CSS", level: 95 },
        { name: "JavaScript", level: 90 },
        { name: "React", level: 92 },
        { name: "TypeScript", level: 90 },
        { name: "Responsive Design", level: 95 },
        { name: "UI/UX Principles", level: 93 },
      ],
    },
    {
      title: "Game Development & 3D",
      icon: Gamepad2,
      gradient: "from-sky-500 to-cyan-500",
      skills: [
        { name: "Unity (C#)", level: 90 },
        { name: "Autodesk Maya 3D", level: 88 },
        { name: "Game Mechanics & Physics", level: 94 },
        { name: "Level Design", level: 95 },
        { name: "WebGL / Three.js", level: 96 },
        { name: "Player Feedback Loops", level: 98 },
      ],
    },
    {
      title: "Design & Creative Media",
      icon: Palette,
      gradient: "from-blue-600 to-indigo-600",
      skills: [
        { name: "Adobe Photoshop", level: 90 },
        { name: "Adobe Illustrator", level: 92 },
        { name: "Premiere Pro & Video", level: 91 },
        { name: "Audition & Audio", level: 95 },
        { name: "Visual Composition", level: 97 },
        { name: "Branding & Figma", level: 90 },
      ],
    },
    {
      title: "Programming & Data",
      icon: Database,
      gradient: "from-slate-600 to-stone-600",
      skills: [
        { name: "C & C++", level: 90 },
        { name: "C# / .NET", level: 92 },
        { name: "Rust & Go", level: 88 },
        { name: "Python", level: 93 },
        { name: "SQL & MySQL", level: 96 },
        { name: "R Language & Algorithms", level: 91 },
      ],
    },
    {
      title: "Cybersecurity & Pentesting",
      icon: ShieldCheck,
      gradient: "from-blue-600 to-slate-700",
      skills: [
        { name: "Burp Suite & Web Auditing", level: 92 },
        { name: "Kali Linux Tooling", level: 95 },
        { name: "Wireshark Packet Analysis", level: 93 },
        { name: "Nmap & Reconnaissance", level: 94 },
        { name: "OWASP Top 10 Mitigation", level: 97 },
        { name: "Threat Modeling & Auth", level: 94 },
      ],
    },
    {
      title: "Interpersonal & Communication",
      icon: HeartHandshake,
      gradient: "from-sky-600 to-indigo-600",
      skills: [
        { name: "Bilingual Translation", level: 98 },
        { name: "Cross-Cultural Communication", level: 96 },
        { name: "Confidential Correspondence", level: 95 },
        { name: "Linguistic Precision & Nuance", level: 97 },
        { name: "Student Ambassadorship", level: 96 },
        { name: "Video Outreach (TikTok/YT)", level: 94 },
      ],
    },
  ];

  const tools = [
    { name: "Burp Suite", category: "Web Security & Proxy" },
    { name: "Kali Linux", category: "Penetration Testing" },
    { name: "Wireshark", category: "Network Analysis" },
    { name: "Nmap", category: "Network Auditing" },
    { name: "Metasploit", category: "Exploitation Framework" },
    { name: "Unity", category: "Game Engine" },
    { name: "Autodesk Maya", category: "3D Modeling" },
    { name: "Visual Studio Code", category: "IDE" },
    { name: "GitHub", category: "Version Control" },
    { name: "Docker", category: "Containerization" },
    { name: "Azure", category: "Cloud Platform" },
    { name: "MongoDB", category: "NoSQL Database" },
    { name: "MySQL", category: "Relational Database" },
    { name: "Adobe Creative Suite", category: "Design & Video" },
    { name: "Figma", category: "UI/UX Design" },
    { name: "Chrome DevTools", category: "Debugging" },
  ];

  const certifications = [
    {
      title: "Alive: The President's Award for Volunteering",
      issuer: "University of Galway",
      year: "2026",
      description: "Earned through volunteering in the media section (Science and Technology), producing TikTok and YouTube video content to boost student outreach, marketing, and community engagement.",
    },
    {
      title: "Adobe Certified Professional in Visual Design",
      issuer: "Adobe",
      year: "2025",
      description: "I earned this certification by demonstrating proficiency in Illustrator, showcasing my skills in visual design and creativity.",
    },
    {
      title: "Certified Digital Marketing Professional",
      issuer: "Digital Marketing Institute",
      year: "2026",
      description: "This certification validates my knowledge of digital marketing strategies, including SEO, social media, and content marketing, which I have applied in various projects.",
    },
    {
      title: "BCS Foundation Certificate in Business Analysis v4.1",
      issuer: "BCS, The Chartered Institute for IT",
      year: "2026",
      description: "Validates core competencies in business analysis, requirements engineering, stakeholder analysis, business process modelling, and delivering strategic organizational change.",
    },
    {
      title: "CompTIA Security+",
      issuer: "CompTIA",
      year: "2026",
      description: "Demonstrates baseline cybersecurity mastery across threat detection, risk management, identity & access control, network defense architecture, cryptography, and incident response.",
    },
    {
      title: "MongoDB Associate Developer",
      issuer: "MongoDB",
      year: "2026",
      description: "Certifies practical proficiency in developing robust backend applications with MongoDB, covering document data modelling, CRUD operations, indexing strategies, and aggregation pipelines.",
    },
    {
      title: "CompTIA Network+ ce Certification",
      issuer: "CompTIA",
      year: "2026",
      description: "Validates enterprise networking competencies including network architectures, IP routing and switching protocols, infrastructure monitoring, security controls, and systematic troubleshooting.",
    },
    {
      title: "MongoDB Overview: Core Concepts and Architecture",
      issuer: "MongoDB",
      year: "2026",
      description: "Validates foundational architectural knowledge of MongoDB, including distributed clusters, replica set high availability, horizontal sharding, and document database governance.",
    },
    {
      title: "Unity Essentials Pathway",
      issuer: "Unity",
      year: "2025",
      description: "Demonstrates real-time 3D and interactive game development fundamentals in Unity, covering C# game scripting, physics engines, lighting, UI systems, and gameplay mechanics.",
    },
  ];

  const achievements = [
    {
      title: "50+ Projects Delivered",
      description: "Successfully built and deployed full-stack web applications, game engines, and production systems",
      icon: Award,
    },
    {
      title: "Ethical Hacking & Defense",
      description: "Hands-on penetration testing and security auditing workflows with Parrot OS, Wireshark, and CompTIA Security+",
      icon: ShieldCheck,
    },
    {
      title: "Polyglot Systems Engineering",
      description: "Writing robust software across C#, Rust, Go, SQL, Python, C, and TypeScript for high-performance backends",
      icon: Terminal,
    },
    {
      title: "AI & Computer Vision",
      description: "Engineered automated OCR intelligence, manifold visualizers, and neural backend models",
      icon: Cpu,
    },
    {
      title: "Unity Real-Time 3D & Games",
      description: "Built multi-platform interactive 3D browser and native games with custom physics and game loops",
      icon: Gamepad2,
    },
    {
      title: "AAA 3D Art & Adobe Creative",
      description: "Certified in Visual Design and professional post-production in Photoshop/Illustrator",
      icon: Palette,
    },
    {
      title: "Academic CS Excellence",
      description: "Top performer in Computer Science course at University of Galway with strong algorithmic foundations",
      icon: CheckCircle2,
    },
    {
      title: "Open Source Leadership",
      description: "Active maintenance of 40+ public GitHub repositories spanning systems, games, robotics, and creative tech",
      icon: Code2,
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
            Skills & Expertise
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
          A comprehensive overview of my technical skills, tools, and certifications. Continuously
          learning and expanding my capabilities.
        </p>
      </motion.div>

      {/* Skills Categories */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 sm:p-8 bg-white/5 backdrop-blur-sm border-white/10 hover:border-sky-500/30 transition-all duration-600 h-full handcrafted-hover human-card">
                <div className="flex items-center mb-6">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${category.gradient} rounded-lg flex items-center justify-center mr-4`}
                  >
                    <category.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-sky-300 font-semibold">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tools & Technologies */}
      <div className="max-w-7xl mx-auto mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
        >
          <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
            Tools & Technologies
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {tools.map((tool, index) => (
            <Card
              key={index}
              className="p-4 bg-gradient-to-br from-sky-500/10 to-blue-600/10 border-sky-500/20 hover:border-sky-500/30 transition-all duration-600 warm-magnetic human-card"
            >
              <div className="flex items-center space-x-3">
                <Terminal className="w-8 h-8 text-sky-300" />
                <div>
                  <div className="text-white font-semibold">{tool.name}</div>
                  <div className="text-gray-400 text-xs">{tool.category}</div>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>
      </div>

      {/* Certifications */}
      <div className="max-w-7xl mx-auto mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
        >
          <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
            Certifications & Recognition
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col h-full"
            >  
             <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:border-sky-500/30 transition-all duration-600 handcrafted-hover human-card h-full flex flex-col">
                <div className="flex items-start space-x-4 h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 flex flex-col h-full"> {/* flex-col h-full here handles internal spacing */}
                    <h3 className="text-lg font-bold text-white mb-1">{cert.title}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30">
                        {cert.issuer}
                      </Badge>
                      <span className="text-gray-400 text-sm">{cert.year}</span>
                    </div>
                    {/* The description will now fill the remaining vertical space */}
                    <p className="text-gray-400 text-sm flex-1">{cert.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Button
            variant="outline"
            className="border-sky-500/30 text-sky-300 hover:bg-sky-500/10"
            asChild
          >
            <a
              href="https://www.linkedin.com/in/dhurgham-a-b1428a253/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View LinkedIn Certifications
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Volunteering & Interpersonal Leadership Impact */}
      <div className="max-w-7xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-medium mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-sky-400" />
            <span>Community Leadership & Communication</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Volunteering & Interpersonal Impact
            </span>
          </h2>
          <p className="text-gray-300 text-base max-w-2xl mx-auto">
            Applying empathy, linguistic nuance, and creative media to bridge communication gaps and uplift community organizations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Role 1: New Horizon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="flex"
          >
            <Card className="p-8 bg-gradient-to-br from-blue-950/30 via-slate-900/80 to-slate-900 border-sky-500/30 hover:border-sky-500/50 transition-all duration-300 flex flex-col w-full shadow-lg shadow-sky-950/20">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
                    <Languages className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Language & Customer Support Assistant</h3>
                    <p className="text-sky-400 font-medium text-sm">New Horizon Refugee & Asylum Seeker Support</p>
                  </div>
                </div>
                <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/40 shrink-0 text-xs">
                  Sep 2022 - Sep 2025 · 3 yrs
                </Badge>
              </div>

              <ul className="space-y-3 text-slate-300 text-sm mt-4 flex-1">
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                  <span>Utilized high-level reading comprehension and linguistic nuance to translate content, ensuring absolute contextual clarity and cultural alignment for a diverse user base.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                  <span>Evaluated and proofread translated text for factual correctness, grammatical precision, and strict adherence to communication guidelines.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                  <span>Maintained professional written communication and supervised daily email correspondence while handling sensitive information with strict confidentiality.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                  <span>Bridged communication gaps in a fast-paced environment, delivering high-quality service through clear verbal and written interaction.</span>
                </li>
              </ul>
            </Card>
          </motion.div>

          {/* Role 2: University of Galway */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="flex"
          >
            <Card className="p-8 bg-gradient-to-br from-indigo-950/30 via-slate-900/80 to-slate-900 border-indigo-500/30 hover:border-indigo-500/50 transition-all duration-300 flex flex-col w-full shadow-lg shadow-indigo-950/20">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">General Volunteer & Media Creator</h3>
                    <p className="text-indigo-400 font-medium text-sm">University of Galway — Science and Technology</p>
                  </div>
                </div>
                <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/40 shrink-0 text-xs">
                  Oct 2025 - Mar 2026 · 6 mos
                </Badge>
              </div>

              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 mb-4 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <h4 className="text-white font-semibold text-sm">Alive: The President's Award for Volunteering</h4>
                  <p className="text-xs text-indigo-200/90">Official presidential recognition for distinguished volunteer contributions.</p>
                </div>
              </div>

              <ul className="space-y-3 text-slate-300 text-sm flex-1">
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <span>Volunteered in the media sector, planning and producing TikTok and YouTube videos to boost the university's science and technology marketing outreach.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <span>Combined video editing, visual storytelling, and digital content creation to drive student engagement and public awareness.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <span>Fostered cross-departmental collaboration between students, faculty, and creative media teams.</span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Hack The Box Official Profile Spotlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto mb-24 px-4"
      >
        <Card className="p-8 sm:p-10 bg-gradient-to-r from-blue-950/50 via-slate-900 to-slate-950 border-sky-500/30 relative overflow-hidden shadow-2xl shadow-sky-500/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-sky-500/20 border border-sky-500/50 flex items-center justify-center text-sky-400 shrink-0 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-2xl font-bold text-white">Hack The Box Security Profile</h3>
                  <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/40 text-xs">
                    Verified Pentester
                  </Badge>
                </div>
                <p className="text-slate-300 text-sm max-w-xl">
                  Solving vulnerable machines, conducting penetration testing, and mastering network exploitation with Kali Linux, Burp Suite, Nmap, and Wireshark.
                </p>
              </div>
            </div>

            <Button
              asChild
              className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-7 py-6 rounded-xl shadow-lg shadow-sky-500/20 shrink-0"
            >
              <a
                href="https://profile.hackthebox.com/profile/019e42b0-f185-72cc-8c58-2719e9977854?utm_medium=copy_url"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Terminal className="w-4 h-4 mr-2" />
                View Hack The Box Profile
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Achievements */}
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
        >
          <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
            Key Achievements
          </span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-6 bg-gradient-to-br from-sky-500/10 to-blue-600/10 border-sky-500/20 hover:border-sky-500/30 transition-all duration-600 h-full text-center clay-hover human-card">
                <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                <p className="text-gray-400 text-sm">{achievement.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Current Focus */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-20"
      >
        <Card className="p-8 sm:p-12 bg-gradient-to-br from-sky-500/10 to-blue-600/10 border-sky-500/30 text-center earth-glow human-popup human-card">
          <Cpu className="w-16 h-16 mx-auto mb-6 text-sky-400" />
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Currently Learning
          </h3>
          <p className="text-gray-300 mb-6">
            Expanding my skills in visual design and creativity through Adobe Illustrator and Photoshop while also exploring new technologies and trends in web development, Cybersecurity, Machine Learning, and game design. Always eager to learn and grow!
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30">
              Advanced React
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              Machine Learning
            </Badge>
            <Badge className="bg-sky-600/20 text-sky-200 border-sky-500/30">
              3D Game Design
            </Badge>
            <Badge className="bg-blue-600/20 text-blue-200 border-blue-500/30">
              Adobe tools
            </Badge>
            <Badge className="bg-sky-700/20 text-sky-100 border-sky-500/30">
              Ethical Hacking
            </Badge>
            <Badge className="bg-blue-700/20 text-blue-100 border-blue-500/30">
              Cloud Computing
            </Badge>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
