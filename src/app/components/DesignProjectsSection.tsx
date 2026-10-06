import { motion, AnimatePresence } from "motion/react";
import {
  Image as ImageIcon,
  Eye,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  FileText,
  Sparkles,
  ExternalLink,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { downloadAsset } from "../utils/download";

interface DesignProject {
  id: number;
  title: string;
  category: string;
  description: string;
  imagePath: string;
  pdfPath?: string;
  technologies?: string[];
  isVideo?: boolean;
}

const designProjects: DesignProject[] = [
  {
    id: 1,
    title: "FireTech Innovators Can",
    category: "Photoshop Artwork",
    description: "Photoshop artwork created for a fictional tech company, showcasing creativity and design skills in a visually striking composition",
    imagePath: "/assets/images/can.png",
    technologies: ["Photoshop", "Creative Design"]
  },
  {
    id: 2,
    title: "Cybersecurity Presentation",
    category: "PowerPoint Design",
    description: "Cybersecurity presentation designed for educational purposes, covering key concepts and best practices in information security",
    imagePath: "/assets/images/Cyber.png",
    pdfPath: "/assets/images/Advanced-Cybersecurity-Framework-3.pdf",
    technologies: ["PowerPoint Design", "Problem Solving"]
  },
  {
    id: 3,
    title: "A beautiful day",
    category: "Illustrator Artwork",
    description: "Illustrator artwork showcasing creativity and design skills, inspired by a beautiful random day.",
    imagePath: "/assets/images/a-beautiful-day.png",
    technologies: ["Illustrator", "Creative Design"]
  },
  {
    id: 4,
    title: "Chips",
    category: "Photoshop Artwork",
    description: "Photoshop artwork that creatively combines elements of technology and nature, designed to evoke a sense of wonder and curiosity.",
    imagePath: "/assets/images/Chips.png",
    isVideo: true,
    technologies: ["Photoshop", "Creative Design"]
  },
  {
    id: 5,
    title: "Photography Portfolio",
    category: "Photography",
    description: "This Portfolio contains curated photography and editing work completed as part of my Adobe Photoshop Certification.",
    imagePath: "/assets/images/Photo.png",
    pdfPath: "/assets/images/Photoshop-Portfolio.pdf",
    technologies: ["Photoshop", "Creative Design"]
  },
  {
    id: 6,
    title: "Illustrator Portfolio",
    category: "Illustration",
    description: "This Portfolio contains original vector illustrations and branding projects completed as part of my Adobe Illustrator Certification.",
    imagePath: "/assets/images/illu.png",
    pdfPath: "/assets/images/Illustrator-Portfolio.pdf",
    technologies: ["Illustrator", "Creative Design"]
  }
];

interface ProjectCardProps {
  project: DesignProject;
  index: number;
  onSelect: (project: DesignProject) => void;
  onQuickDownload: (project: DesignProject) => void;
  isDownloading: boolean;
}

function ProjectCard({ project, onSelect, onQuickDownload, isDownloading }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => onSelect(project)}
      className="group relative cursor-pointer block rounded-2xl overflow-hidden bg-slate-900/60 border border-slate-700/50 hover:border-sky-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10"
    >
      <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
        {!imageError ? (
          <img
            src={project.imagePath}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800">
            <ImageIcon className="w-16 h-16 text-slate-600" />
          </div>
        )}

        {/* Badge indicating PDF or Image */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {project.pdfPath ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/80 text-white backdrop-blur-md">
              <FileText className="w-3 h-3" />
              Document
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-sky-500/80 text-white backdrop-blur-md">
              <ImageIcon className="w-3 h-3" />
              Artwork
            </span>
          )}
        </div>

        {/* Quick Download Button in Top Right */}
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickDownload(project);
            }}
            disabled={isDownloading}
            className="p-2 rounded-full bg-slate-900/80 hover:bg-sky-500 hover:text-slate-950 text-slate-200 border border-white/10 transition-colors backdrop-blur-md shadow-md"
            title={project.pdfPath ? "Download Document directly" : "Download Artwork directly"}
          >
            {isDownloading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-400" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
        
        {/* Overlay showing 'View Artwork / Document' on hover */}
        <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center backdrop-blur-xs">
          <Eye className="w-8 h-8 text-sky-300 mb-2" />
          <span className="text-white font-bold text-sm">
            {project.pdfPath ? 'Open Document Viewer' : 'View High-Res Artwork'}
          </span>
          <span className="text-xs text-sky-300/80 mt-1">Click to view & download</span>
        </div>
      </div>
      
      {/* Title and Description */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">{project.title}</h3>
        <p className="text-slate-400 text-sm mt-1">{project.category}</p>
        {project.technologies && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-white/5">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function DesignProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<DesignProject | null>(null);
  const [viewMode, setViewMode] = useState<"preview" | "document">("preview");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (url: string, filename: string, id: string) => {
    setDownloadingId(id);
    await downloadAsset(url, filename);
    setDownloadingId(null);
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  const currentIndex = selectedProject
    ? designProjects.findIndex((p) => p.id === selectedProject.id)
    : -1;

  const handleNext = () => {
    if (currentIndex >= 0) {
      const nextIdx = (currentIndex + 1) % designProjects.length;
      setSelectedProject(designProjects[nextIdx]);
      setViewMode("preview");
    }
  };

  const handlePrev = () => {
    if (currentIndex >= 0) {
      const prevIdx = (currentIndex - 1 + designProjects.length) % designProjects.length;
      setSelectedProject(designProjects[prevIdx]);
      setViewMode("preview");
    }
  };

  const isCurrentDownloading =
    downloadingId === "modal-top-action" ||
    downloadingId === "modal-top-doc" ||
    downloadingId === "modal-top-art" ||
    downloadingId === "modal-embedded";

  const handleSaveCurrent = () => {
    if (!selectedProject) return;
    if (selectedProject.pdfPath && viewMode === "document") {
      const safeName = `${selectedProject.title.replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`;
      handleDownload(selectedProject.pdfPath, safeName, "modal-top-action");
    } else {
      const ext = selectedProject.imagePath.endsWith(".jpg") ? "jpg" : "png";
      const safeName = `${selectedProject.title.replace(/[^a-zA-Z0-9_-]/g, "_")}.${ext}`;
      handleDownload(selectedProject.imagePath, safeName, "modal-top-action");
    }
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Interactive Design Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 display-text">
            <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Creative & Visual Arts
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto elegant-text">
            Design-focused work across branding, compositing, visual storytelling, and Adobe certifications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {designProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isDownloading={downloadingId === `card-${project.id}`}
              onSelect={(p) => {
                setSelectedProject(p);
                setViewMode(p.pdfPath ? "document" : "preview");
              }}
              onQuickDownload={(p) => {
                const targetUrl = p.pdfPath || p.imagePath;
                const ext = p.pdfPath ? "pdf" : (p.imagePath.endsWith(".jpg") ? "jpg" : "png");
                const safeName = `${p.title.replace(/[^a-zA-Z0-9_-]/g, "_")}.${ext}`;
                handleDownload(targetUrl, safeName, `card-${p.id}`);
              }}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            asChild
            className="rounded-full px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all"
          >
            <a
              href="https://www.behance.net/dhurghamalsaadi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              <span>Browse More Artwork on Behance</span>
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              setSelectedProject(designProjects[0]);
              setViewMode("preview");
            }}
            className="rounded-full px-7 py-6 border-white/20 text-slate-200 hover:bg-white/10 text-sm"
          >
            <Eye className="w-4 h-4 mr-2" />
            <span>Open In-Page Gallery</span>
          </Button>
        </div>
      </div>

      {/* In-App Artwork & Document Modal Lightbox (No 403 Forbidden redirects!) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-sky-500/20 rounded-2xl shadow-2xl shadow-sky-500/10 overflow-hidden z-10 flex flex-col max-h-[86vh]"
            >
              {/* Elevated Action Bar - Raised High Above Content with Save Artwork & Close */}
              <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-white/10 bg-slate-900/98 sticky top-0 z-30 backdrop-blur-md shadow-md">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[11px] font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                    {currentIndex + 1} / {designProjects.length}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-[180px] sm:max-w-xs md:max-w-md">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs text-sky-400 font-medium truncate">{selectedProject.category}</p>
                  </div>
                </div>

                {/* Raised Buttons Row (Save Artwork + Close Elevated At Top) */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  {selectedProject.pdfPath && (
                    <div className="hidden xs:flex items-center bg-slate-800 rounded-lg p-0.5 border border-white/10">
                      <button
                        onClick={() => setViewMode("document")}
                        className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                          viewMode === "document"
                            ? "bg-sky-500 text-slate-950 font-bold"
                            : "text-slate-300 hover:text-white"
                        }`}
                      >
                        Document
                      </button>
                      <button
                        onClick={() => setViewMode("preview")}
                        className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                          viewMode === "preview"
                            ? "bg-sky-500 text-slate-950 font-bold"
                            : "text-slate-300 hover:text-white"
                        }`}
                      >
                        Cover Art
                      </button>
                    </div>
                  )}

                  {/* Raised "Save Artwork" / "Save Document" Button */}
                  <Button
                    size="sm"
                    disabled={isCurrentDownloading}
                    onClick={handleSaveCurrent}
                    className="bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm h-9 sm:h-10 px-3.5 sm:px-4 rounded-xl shadow-lg shadow-sky-500/25 active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    {isCurrentDownloading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="hidden sm:inline">Downloading...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 stroke-[2.5]" />
                        <span>
                          {selectedProject.pdfPath && viewMode === "document"
                            ? "Save Document"
                            : "Save Artwork"}
                        </span>
                      </>
                    )}
                  </Button>

                  {/* Raised "Close" Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedProject(null)}
                    className="bg-slate-800/90 hover:bg-slate-700/90 text-white border border-white/20 hover:border-white/40 h-9 sm:h-10 px-3 sm:px-3.5 rounded-xl text-xs sm:text-sm font-semibold active:scale-95 transition-all shadow-md flex items-center gap-1.5"
                    title="Close preview"
                  >
                    <X className="w-4 h-4 text-slate-300" />
                    <span className="hidden xs:inline">Close</span>
                  </Button>
                </div>
              </div>

              {/* Main Media Body - Comfortable Viewport Height */}
              <div className="relative flex-1 p-4 sm:p-5 bg-slate-950 flex items-center justify-center overflow-hidden min-h-[220px]">
                {selectedProject.pdfPath && viewMode === "document" ? (
                  <div className="w-full h-[42vh] max-h-[440px] flex flex-col rounded-xl overflow-hidden border border-white/10 bg-slate-900">
                    <object
                      data={selectedProject.pdfPath}
                      type="application/pdf"
                      className="w-full h-full"
                    >
                      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                        <FileText className="w-14 h-14 text-sky-400 mb-3" />
                        <h4 className="text-white font-semibold text-lg mb-1">
                          {selectedProject.title}
                        </h4>
                        <p className="text-slate-400 text-sm max-w-md mb-4">
                          Embedded PDF viewer is ready. You can download or view this document directly.
                        </p>
                        <Button
                          disabled={downloadingId === "modal-embedded"}
                          onClick={() => {
                            const safeName = `${selectedProject.title.replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`;
                            handleDownload(selectedProject.pdfPath!, safeName, "modal-embedded");
                          }}
                          className="inline-flex items-center px-4 py-2 rounded-lg bg-sky-500 text-slate-950 font-semibold text-sm hover:bg-sky-400 transition-colors"
                        >
                          {downloadingId === "modal-embedded" ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Downloading Document...
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4 mr-2" />
                              Download Document (.pdf)
                            </>
                          )}
                        </Button>
                      </div>
                    </object>
                  </div>
                ) : (
                  <div className="relative max-h-[42vh] flex items-center justify-center">
                    <img
                      src={selectedProject.imagePath}
                      alt={selectedProject.title}
                      referrerPolicy="no-referrer"
                      className="max-h-[42vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/images/Eagle.png";
                      }}
                    />
                  </div>
                )}

                {/* Navigation arrows */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 text-white border border-white/10 hover:bg-sky-500 hover:text-slate-950 transition-colors shadow-lg"
                  title="Previous project"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 text-white border border-white/10 hover:bg-sky-500 hover:text-slate-950 transition-colors shadow-lg"
                  title="Next project"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Footer Info - Clean Project Details (Nothing Stuck Down) */}
              <div className="px-5 py-3.5 bg-slate-900/95 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                <div className="space-y-1 max-w-2xl">
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{selectedProject.description}</p>
                  {selectedProject.technologies && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedProject.technologies.map((tech, idx) => (
                        <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-sky-500/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Controls - Quick Prev / Next pagination */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrev}
                    className="h-8 px-2.5 text-xs border-white/15 text-slate-300 hover:bg-white/10"
                    title="Previous project"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                    Prev
                  </Button>
                  <span className="text-xs text-slate-400 px-1 font-mono">
                    {currentIndex + 1} / {designProjects.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNext}
                    className="h-8 px-2.5 text-xs border-white/15 text-slate-300 hover:bg-white/10"
                    title="Next project"
                  >
                    Next
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
