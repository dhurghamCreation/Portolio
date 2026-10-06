import { motion } from "motion/react";
import {
  GraduationCap,
  Code,
  Lightbulb,
  Target,
  Award,
  BookOpen,
  Cpu,
  Palette,
  Shield,
  Terminal,
  HeartHandshake,
  ExternalLink,
  Languages,
  Users,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

export function About() {
  const journey = [
    {
      year: "2025-Present",
      title: "University of Galway — Computer Science",
      description:
        "Deepening computer science and software engineering mastery through C, Java, R, MySQL, JavaScript, algorithms, and practical development. Bridging elite logical problem-solving with creative systems.",
      icon: GraduationCap,
      color: "from-blue-800 to-indigo-900",
    },
    {
      year: "2026-Present",
      title: "Student Ambassador",
      description:
        "University & Student Community Ambassador — Representing Computer Science Program, guiding new and prospective students, leading campus orientations, and communicating institutional values with professionalism and empathy.",
      icon: Users,
      color: "from-sky-600 to-indigo-700",
    },
    {
      year: "2022-2025 (3 yrs)",
      title: "Language & Customer Support Assistant",
      description:
        "New Horizon Refugee & Asylum Seeker Support — Utilized linguistic comprehension and cultural nuance to translate critical content, supervised daily email communications with strict confidentiality, and bridged interpersonal communication gaps.",
      icon: HeartHandshake,
      color: "from-sky-700 to-blue-800",
    },
    {
      year: "2025-2026 (6 mos)",
      title: "Media Volunteer & Creator — Alive President's Award",
      description:
        "University of Galway (Science & Technology) — Earned the President's Award for Volunteering by producing engaging TikTok and YouTube video content to boost student outreach, marketing, and community engagement.",
      icon: Award,
      color: "from-indigo-600 to-blue-700",
    },
    {
      year: "2026-Present",
      title: "Ethical Hacking & Systems Engineering",
      description:
        "Active penetration tester on Hack The Box and practical security researcher. Proficient with Kali Linux, Burp Suite, Wireshark, Metasploit, Nmap, and network defense architectures.",
      icon: Shield,
      color: "from-blue-600 to-indigo-700",
    },
    {
      year: "2025-Present",
      title: "Game Engineering & AAA 3D Design",
      description:
        "Mastered Unity (C#) real-time interactive mechanics alongside Autodesk Maya and Adobe Creative Suite (Photoshop, Illustrator, Premiere Pro, Audition) to build rich interactive experiences.",
      icon: Palette,
      color: "from-blue-700 to-sky-800",
    },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Always seeking creative solutions to complex engineering challenges",
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Committed to delivering high-quality, secure, and polished work",
    },
    {
      icon: Shield,
      title: "Security & Trust",
      description: "Building defense-in-depth and safeguarding user privacy and data",
    },
    {
      icon: HeartHandshake,
      title: "Empathy & Service",
      description: "Dedicated to community impact, linguistic clarity, and ethical tech",
    },
  ];

  const expertise = [
    {
      category: "Programming Languages",
      icon: Code,
      skills: [
        "C",
        "C#",
        "C++",
        "Rust",
        "Go (Golang)",
        "Python",
        "SQL / MySQL",
        "R",
        "Java",
        "JavaScript",
        "TypeScript",
        "Bash / Shell",
        "PHP",
        "HTML5 / CSS3",
      ],
      color: "from-sky-500 to-blue-600",
    },
    {
      category: "Ethical Hacking & Security",
      icon: Shield,
      skills: [
        "Burp Suite",
        "Kali Linux",
        "Wireshark",
        "Nmap",
        "Metasploit",
        "OWASP Top 10",
        "Vulnerability Assessment",
        "Network Protocol Analysis",
        "Penetration Testing",
        "Linux Hardening",
      ],
      color: "from-blue-600 to-indigo-700",
    },
    {
      category: "Game & 3D Engineering",
      icon: Cpu,
      skills: [
        "Unity (C#)",
        "Autodesk Maya",
        "WebGL",
        "Three.js",
        "Game Physics & Loops",
        "Shader Graph Basics",
        "Level Design",
        "Arcade Mechanics",
      ],
      color: "from-indigo-600 to-blue-700",
    },
    {
      category: "Design & Creative Media",
      icon: Palette,
      skills: [
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Adobe Premiere Pro",
        "Adobe Audition",
        "Figma UI/UX",
        "CapCut",
        "Visual Composition",
        "Digital Storytelling",
      ],
      color: "from-blue-600 to-sky-600",
    },
    {
      category: "Databases & Cloud Architecture",
      icon: Terminal,
      skills: [
        "MongoDB",
        "MySQL",
        "Docker",
        "Microsoft Azure",
        "REST APIs",
        "Git / GitHub",
        "Vercel",
        "Linux Administration",
      ],
      color: "from-blue-700 to-slate-800",
    },
    {
      category: "Interpersonal & Communication",
      icon: HeartHandshake,
      skills: [
        "Cross-Cultural Translation",
        "Confidential Correspondence",
        "High-Level Reading Comprehension",
        "Media Content Creation",
        "Student Ambassadorship",
        "Public Engagement",
      ],
      color: "from-sky-600 to-indigo-700",
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-20"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
            About Me
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
          I'm a passionate Computer Science student at the University of Galway, specializing in
          full-stack development, game design,Ethical Hacking,AI Engineering,Cloud Computing and creative digital arts. I combine technical
          expertise with creative vision to build innovative digital experiences.
        </p>
      </motion.div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto mb-20"
      >
        <Card className="p-8 sm:p-12 bg-gradient-to-br from-blue-900/10 to-slate-800/10 border-sky-500/30 text-center">
          <div className="text-6xl text-sky-300 mb-4">"</div>
          <p className="text-xl sm:text-2xl text-gray-200 italic mb-6">
            Always work smarter not harder.
          </p>
          <p className="text-gray-400">— Dhurgham Alsaadi</p>
        </Card>
      </motion.div>

      {/* Journey Timeline */}
      <div className="max-w-6xl mx-auto mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
        >
          <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
            My Journey
          </span>
        </motion.h2>

        <div className="space-y-6">
          {journey.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 sm:p-8 bg-white/5 backdrop-blur-sm border-white/10 hover:border-sky-500/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div
                    className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center`}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <Badge className="mb-3 bg-sky-500/10 text-sky-100 border-sky-500/30">
                      {item.year}
                    </Badge>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="max-w-6xl mx-auto mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
        >
          <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
            Core Values
          </span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-6 bg-gradient-to-br from-blue-900/10 to-slate-800/10 border-sky-500/30 hover:border-sky-500/50 transition-all duration-300 h-full text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-slate-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expertise Areas */}
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
        >
          <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
            Expertise Areas
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {expertise.map((area, index) => (
            <motion.div
              key={index}
              className="flex"
            
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
             <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:border-sky-500/30 transition-all duration-300 w-full h-full flex flex-col">
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${area.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  <area.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{area.category}</h3>
                <div className="space-y-2">
                  {area.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="flex items-center text-gray-300 text-sm"
                    >
                      <div className="w-2 h-2 bg-sky-400 rounded-full mr-3" />
                      {skill}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hack The Box Spotlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-16"
      >
        <Card className="p-8 sm:p-10 bg-gradient-to-br from-blue-950/40 via-slate-900/80 to-slate-950 border-sky-500/30 text-center relative overflow-hidden shadow-xl shadow-sky-500/5">
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="w-12 h-12 bg-sky-500/20 border border-sky-500/40 rounded-xl flex items-center justify-center text-sky-400 mb-2.5 shadow-md shadow-sky-500/10">
              <Shield className="w-6 h-6" />
            </div>
            <Badge className="mb-2 bg-sky-500/20 text-sky-300 border-sky-500/40 text-xs px-3 py-1 font-semibold">
              Cybersecurity & Penetration Testing
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Active on Hack The Box
            </h3>
          </div>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-6">
            Constantly solving security labs, testing vulnerable machines, and practicing real-world penetration testing with Kali Linux, Burp Suite, Nmap, and Wireshark.
          </p>
          <Button
            asChild
            className="rounded-full px-8 py-5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold shadow-lg shadow-sky-500/20"
          >
            <a
              href="https://profile.hackthebox.com/profile/019e42b0-f185-72cc-8c58-2719e9977854?utm_medium=copy_url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Terminal className="w-4 h-4 mr-2" />
              View My Hack The Box Profile
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </Card>
      </motion.div>

      {/* Education Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-12"
      >
        <Card className="p-8 sm:p-12 bg-gradient-to-br from-blue-500/10 to-[#3d564f]/10 border-[#51697a]/30 text-center">
          <GraduationCap className="w-16 h-16 mx-auto mb-6 text-blue-400" />
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            University of Galway
          </h3>
          <p className="text-gray-300 text-lg mb-2">Computer Science Student</p>
          <p className="text-gray-400">
            Specializing in Full-Stack Development, Game Design, Ethical Hacking,Cloud Computing, and Creative Design.
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
