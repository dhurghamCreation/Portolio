import { motion } from "motion/react";
import { useState, useMemo } from "react";
import {
  ExternalLink,
  Github,
  Gamepad2,
  Globe,
  Palette,
  Filter,
  FileCode,
  Award,
  Search,
  X,
  Sparkles,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const projects = [
    {
      title: "DairyFresh",
      category: "web",
      tags: ["TypeScript", "React", "E-Commerce"],
      description:
        "Interactive dairy products web shop with multilingual support, chatbot support, brochure content, and account workflows.",
      image: "/assets/images/dairy.png",
      demoUrl: "https://dairy-fresh.vercel.app",
      codeUrl: "https://github.com/dhurghamCreation/DairyFresh",
      gradient: "from-stone-500/15 to-slate-600/15",
    },
    {
      title: "ShopVibe",
      category: "web",
      tags: ["TypeScript", "Frontend", "UI"],
      description:
        "Clothing shop project focused on practical storefront structure, browsing experience, and clear product presentation.",
      image: "/assets/images/shop.png",
      demoUrl: "https://e-commerce-website-design-eight.vercel.app",
      codeUrl: "https://github.com/dhurghamCreation/ShopVibe",
      gradient: "from-stone-500/15 to-zinc-600/15",
    },
    {
      title: "FireTech-Messager-Server",
      category: "web",
      tags: ["JavaScript", "Backend", "Messaging"],
      description:
        "Server-side messaging backend project with routing, request handling, and practical API structure.",
      image: "/assets/images/message.png",
      
      codeUrl: "https://github.com/dhurghamCreation/FireTech-Messager-Server",
      gradient: "from-slate-500/20 to-stone-500/15",
    },
    {
      title: "croc-playtime",
      category: "game",
      tags: ["JavaScript", "Gameplay", "Web"],
      description:
        "Browser game project focused on responsive controls, simple mechanics, and engaging interaction loops.",
      image: "/assets/images/croc (2).png",
      demoUrl: "https://croc-play.vercel.app/",
      codeUrl: "https://github.com/dhurghamCreation/croc-playtime",
      gradient: "from-slate-600/20 to-zinc-700/20",
    },
    {
      title: "SlainteAI-Core",
      category: "design",
      tags: ["Python", "AI", "Core Logic"],
      description:
        "Core AI-focused Python project built around reusable modules and practical backend logic organization.",
      image: "/assets/images/slainteai-core.png",
      demoUrl: null,
      codeUrl: "https://github.com/dhurghamCreation/SlainteAI-Core",
      gradient: "from-stone-600/20 to-neutral-700/20",
    },
    {
      title: "tictactoe-server",
      category: "game",
      tags: ["TypeScript", "Backend", "Game Service"],
      description:
        "Backend service for multiplayer tic-tac-toe style interactions, with clean TypeScript API patterns.",
      image: "/assets/images/tic.png",
      demoUrl: "https://mkak.itch.io/neon-galaxy",
      codeUrl: "https://github.com/dhurghamCreation/tictactoe-server",
      gradient: "from-slate-500/20 to-stone-700/20",
    },
    {
      title: "Galactic-Explorer",
      category: "game",
      tags: ["Rust", "Bevy", "Python", "HTML", "JavaScript"],
      description:
        "A cinematic space exploration app built with Rust + Bevy featuring third-person shuttle flight, planetary orbits, and scanner progression.",
      image: "/assets/images/exp.png",
      demoUrl: "https://galactic-explorer-six.vercel.app/",
      codeUrl: "https://github.com/dhurghamCreation/Galactic-Explorer",
      gradient: "from-slate-500/20 to-stone-700/20",
    },
    {
      title: "topological-data-analysis-tda-visualizer",
      category: "web",
      tags: ["Topological Data Analysis", "TypeScript", "HTML", "Math"],
      description:
        "Interactive topological data analysis (TDA) visualizer for exploring high-dimensional point clouds, simplicial complexes, and persistence diagrams.",
      image: "/assets/images/data.png",
      demoUrl: "https://topological-data-analysis-tda-visua.vercel.app",
      codeUrl: "https://github.com/dhurghamCreation/topological-data-analysis-visualizer",
      gradient: "from-slate-500/20 to-stone-700/20",
    },
    {
      title: "VeggieCraft3D",
      category: "web",
      tags: ["TypeScript", "HTML", "Three.js", "3D WebGL"],
      description:
        "Interactive 3D animated vegetable showcase built with TypeScript and Three.js featuring real-time lighting and procedural motion.",
      image: "/assets/images/3ddd.png",
      demoUrl: "https://interactive1-3d-animated-veggie.vercel.app",
      codeUrl: "https://github.com/dhurghamCreation/VeggieCraft3D",
      gradient: "from-slate-500/20 to-stone-700/20",
    },
    {
      title: "streamalign",
      category: "web",
      tags: ["Python", "PyTorch", "CUDA", "KV-Cache"],
      description:
        "Drop-in, memory-efficient attention for PyTorch with CPU ⟷ GPU KV-cache offloading for long-context transformers.",
      image: "/assets/images/streamalign.png",
      demoUrl: "https://streamalign-gm7xbdgtzopbr73ditgspr.streamlit.app/",
      codeUrl: "https://github.com/dhurghamCreation/streamalign",
      gradient: "from-slate-500/20 to-stone-700/20",
    },
    {
      title: "sentinel-dashboard",
      category: "web",
      tags: ["HTML", "JavaScript", "Cryptography", "Data Integrity"],
      description:
        "Self-contained, polyglot data-integrity platform that transforms files into a cryptographically-bound shard vault with continuous verification.",
      image: "/assets/images/sentinel.png",
      demoUrl: "https://sentinel-dashboard-lime-one.vercel.app",
      codeUrl: "https://github.com/dhurghamCreation/sentinel-dashboard",
      gradient: "from-slate-500/20 to-stone-700/20",
    },
    {
      title: "TheTacticalEcho",
      category: "game",
      tags: ["HTML5", "JavaScript", "Browser Game", "Zero-Dependency"],
      description:
        "Single-file, self-contained browser game set in the Chrono-Archive with tactical corridor progression and responsive controls.",
      image: "/assets/images/croc.png",
      demoUrl: "https://tactical-3ag51vgq1-dhurgham-s-projects.vercel.app/",
      codeUrl: "https://github.com/dhurghamCreation/TheTacticalEcho",
      gradient: "from-slate-600/20 to-zinc-700/20",
    },
    {
      title: "UFT — University of Fire Tech",
      category: "web",
      tags: ["HTML5", "CSS3", "JavaScript", "EdTech"],
      description:
        "Complete digital campus and admissions web platform walking prospective students through course discovery, application workspace, and enrollment.",
      image: "/assets/images/uft.png",
      demoUrl: "https://uft-nu.vercel.app/",
      codeUrl: "https://github.com/dhurghamCreation/UFT",
      gradient: "from-stone-500/15 to-slate-600/15",
    },
    {
      title: "Sortline",
      category: "web",
      tags: ["JavaScript", "On-Device AI", "HTML", "Sustainability"],
      description:
        "Hyper-local, privacy-first waste and recycling advisor with on-device machine learning item recognition and city-specific bin routing.",
      image: "/assets/images/sortline.png",
      demoUrl: "https://sortline.vercel.app",
      codeUrl: "https://github.com/dhurghamCreation/Sortline",
      gradient: "from-slate-500/20 to-stone-700/20",
    },
    {
      title: "ForgeUP",
      category: "web",
      tags: ["JavaScript", "React", "Fitness", "AI Coaching"],
      description:
        "Feature-rich fitness application bringing intelligent workout logging, AI voice coaching, recovery analytics, and nutrition tracking into one place.",
      image: "/assets/images/forgeup.png",
      demoUrl: "https://forgeup-five.vercel.app",
      codeUrl: "https://github.com/dhurghamCreation/ForgeUP",
      gradient: "from-stone-500/15 to-zinc-600/15",
    },
    {
      title: "D-BrilliantMedia",
      category: "web",
      tags: ["HTML", "JavaScript", "Media Hub", "UI"],
      description:
        "Interactive digital media hub and streaming showcase designed with rich visual artwork cards and smooth playback navigation.",
      image: "/assets/images/brilliant-media.png",
      demoUrl: "https://media-server-one.vercel.app",
      codeUrl: "https://github.com/dhurghamCreation/D-BrilliantMedia",
      gradient: "from-slate-500/20 to-stone-500/15",
    },
    {
      title: "PremiumBarbershop",
      category: "web",
      tags: ["HTML", "CSS", "JavaScript", "Storefront"],
      description:
        "Modern barbershop storefront and grooming brand website showcasing services, stylist portfolios, and grooming collections.",
      image: "/assets/images/barbershop.png",
      demoUrl: "https://premiumbarbershop-two.vercel.app",
      codeUrl: "https://github.com/dhurghamCreation/PremiumBarbershop",
      gradient: "from-stone-600/20 to-neutral-700/20",
    },
    {
      title: "Globetrotter",
      category: "web",
      tags: ["Kotlin", "Multiplatform", "Desktop & Mobile", "Web"],
      description:
        "Kotlin Multiplatform timezone and currency companion running across Android, Desktop, and Web with an animated day/night-aware interface.",
      image: "/assets/images/A Beautiful day.png",
      demoUrl: null,
      codeUrl: "https://github.com/dhurghamCreation/Globetrotter",
      gradient: "from-slate-500/20 to-stone-700/20",
    },
    {
      title: "fin_sentiment",
      category: "web",
      tags: ["Python", "NLP", "ONNX", "Financial ML"],
      description:
        "End-to-end production-grade sentiment classification project on the Financial PhraseBank dataset with classical TF-IDF and transformer tracks.",
      image: "/assets/images/fin-sentiment.png",
      demoUrl: null,
      codeUrl: "https://github.com/dhurghamCreation/fin_sentiment",
      gradient: "from-slate-500/20 to-stone-700/20",
    },
    {
      title: "llm-sentinel",
      category: "web",
      tags: ["Python", "LLM Security", "RAG Defense", "Red-Teaming"],
      description:
        "Framework-agnostic LLM security toolkit for intercepting multi-turn jailbreaks, defending RAG pipelines against indirect prompt injection, and automated red-teaming.",
      image: "/assets/images/lllllm.png",
      demoUrl: null,
      codeUrl: "https://github.com/dhurghamCreation/llm-sentinel",
      gradient: "from-stone-600/20 to-neutral-700/20",
    },
    {
      title: "detection-engineering-arsenal",
      category: "web",
      tags: ["Python", "Cybersecurity", "Sigma & YARA", "MITRE ATT&CK"],
      description:
        "Production-grade Sigma rules, YARA hunting signatures, and threat hunting playbooks mapped to MITRE ATT&CK and CI-validated on every commit.",
      image: "/assets/images/dete.png",
      demoUrl: null,
      codeUrl: "https://github.com/dhurghamCreation/detection-engineering-arsenal",
      gradient: "from-slate-600/20 to-zinc-700/20",
    },
    {
      title: "BlueBrintStudio",
      category: "design",
      tags: ["HTML", "CSS", "Creative Studio", "Micro-Animations"],
      description:
        "Pocket-sized creative studio presented inside a realistic phone frame with a splash screen and smooth micro-animations in a single self-contained HTML file.",
      image: "/assets/images/illur.png",
      demoUrl: "https://blue-brint-studio.vercel.app",
      codeUrl: "https://github.com/dhurghamCreation/BlueBrintStudio",
      gradient: "from-stone-600/20 to-neutral-700/20",
    },
    {
      title: "Baskey",
      category: "game",
      tags: ["TypeScript", "Game", "Arcade", "Web"],
      description:
        "Interactive arcade basketball browser game built with TypeScript featuring responsive shooting mechanics and court visuals.",
      image: "/assets/images/baskey.png",
      demoUrl: "https://baskey.vercel.app",
      codeUrl: "https://github.com/dhurghamCreation/Baskey",
      gradient: "from-slate-600/20 to-zinc-700/20",
    },
    {
      title: "Agentic-OCR",
      category: "web",
      tags: ["Python", "OCR", "Financial Auditing", "AI"],
      description:
        "Financial Intelligence Platform for automated receipt processing, heuristic extraction, and structured financial auditing.",
      image: "/assets/images/agentic.png",
      demoUrl: "https://agentic-oc.vercel.app",
      codeUrl: "https://github.com/dhurghamCreation/Agentic-OCR",
      gradient: "from-slate-500/20 to-stone-700/20",
    },
  ];

  const counts = useMemo(() => {
    return {
      all: projects.length,
      web: projects.filter((p) => p.category === "web").length,
      game: projects.filter((p) => p.category === "game").length,
      design: projects.filter((p) => p.category === "design").length,
    };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeFilter === "all" || project.category === activeFilter;
      const matchesTag =
        !selectedTag || project.tags.includes(selectedTag);
      const matchesSearch =
        searchQuery.trim() === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [projects, activeFilter, selectedTag, searchQuery]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "web":
        return Globe;
      case "game":
        return Gamepad2;
      case "design":
        return Palette;
      default:
        return FileCode;
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-stone-200 via-slate-200 to-stone-300 bg-clip-text text-transparent">
            My Projects
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
          A collection of my work spanning web development, game design, and creative arts. Each
          project represents a unique challenge and learning experience.
        </p>
      </motion.div>

      {/* Filter Tabs & Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-7xl mx-auto mb-12 space-y-6"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Tabs */}
          <Tabs value={activeFilter} onValueChange={(val) => { setActiveFilter(val); }} className="w-full md:w-auto">
            <TabsList className="grid w-full md:w-[480px] grid-cols-4 bg-slate-900/80 border border-white/10 p-1">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-sky-500 data-[state=active]:text-slate-950 font-medium text-xs sm:text-sm"
              >
                <Filter className="w-3.5 h-3.5 mr-1.5" />
                All ({counts.all})
              </TabsTrigger>
              <TabsTrigger
                value="web"
                className="data-[state=active]:bg-sky-500 data-[state=active]:text-slate-950 font-medium text-xs sm:text-sm"
              >
                <Globe className="w-3.5 h-3.5 mr-1.5" />
                Web ({counts.web})
              </TabsTrigger>
              <TabsTrigger
                value="game"
                className="data-[state=active]:bg-sky-500 data-[state=active]:text-slate-950 font-medium text-xs sm:text-sm"
              >
                <Gamepad2 className="w-3.5 h-3.5 mr-1.5" />
                Games ({counts.game})
              </TabsTrigger>
              <TabsTrigger
                value="design"
                className="data-[state=active]:bg-sky-500 data-[state=active]:text-slate-950 font-medium text-xs sm:text-sm"
              >
                <Palette className="w-3.5 h-3.5 mr-1.5" />
                Design ({counts.design})
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search tech, title, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all backdrop-blur-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Selected Tag Indicator */}
        {selectedTag && (
          <div className="flex items-center gap-2 pt-2">
            <span className="text-xs text-slate-400">Filtering by tech:</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 text-xs font-medium">
              #{selectedTag}
              <button
                onClick={() => setSelectedTag(null)}
                className="hover:text-white"
                title="Clear tag filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          </div>
        )}
      </motion.div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto">
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => {
            const CategoryIcon = getCategoryIcon(project.category);
            return (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card
                  className={`overflow-hidden bg-gradient-to-br ${project.gradient} backdrop-blur-sm border-white/10 hover:border-stone-400/30 transition-all duration-300 h-full flex flex-col handcrafted-hover`}
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(event) => {
                        event.currentTarget.src = "/assets/images/Eagle.png";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-60" />
                    <div className="absolute top-4 right-4">
                      <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <CategoryIcon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 flex-1">{project.description}</p>

                    {/* Tags (Clickable to filter) */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <button
                          key={tagIndex}
                          onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                          className={`px-2.5 py-0.5 rounded-full text-xs font-normal border transition-colors ${
                            selectedTag === tag
                              ? "bg-sky-500 text-slate-950 border-sky-400 font-semibold"
                              : "border-white/15 text-slate-300 hover:border-sky-400/40 hover:text-white bg-slate-800/40"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10 mt-auto">
                      {project.demoUrl && (
                        <Button
                          size="sm"
                          className="flex-1 bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-500/30 text-xs"
                          asChild
                        >
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                            Demo
                          </a>
                        </Button>
                      )}
                      {project.codeUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-white/20 text-gray-300 hover:bg-white/5 text-xs"
                          asChild
                        >
                          <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-3.5 h-3.5 mr-1.5" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 px-4 bg-slate-900/40 rounded-2xl border border-white/10 max-w-xl mx-auto my-8"
          >
            <Search className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No matching projects found</h3>
            <p className="text-slate-400 text-sm mb-6">
              Try adjusting your search query or category filter to discover projects.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setActiveFilter("all");
                setSearchQuery("");
                setSelectedTag(null);
              }}
              className="border-sky-500/40 text-sky-300 hover:bg-sky-500/20"
            >
              Clear All Filters
            </Button>
          </motion.div>
        )}
      </div>

      {/* GitHub Link Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-20"
      >
        <Card className="p-8 sm:p-12 bg-gradient-to-br from-slate-800/50 to-stone-900/50 border-white/10 text-center">
          <Award className="w-16 h-16 mx-auto mb-6 text-stone-200" />
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            View All My Repositories
          </h3>
          <p className="text-gray-300 mb-6">
            Check out my complete collection of projects, experiments, and open-source contributions
            on GitHub.
          </p>
          <Button
            size="lg"
            className="bg-slate-200 text-slate-900 hover:bg-white px-8"
            asChild
          >
            <a
              href="https://github.com/dhurghamCreation"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 mr-2" />
              Visit GitHub Profile
            </a>
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}
