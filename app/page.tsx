'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Mail, Linkedin, Github, X, ChevronDown, ExternalLink } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } })
}

const projects: { id: number; title: string; role: string; category: string; description: string; tech: string[]; images: string[]; link?: string; liveUrl?: string; gradient: string }[] = [
  {
    id: 7,
    title: 'Catalyst Chart Connect',
    role: 'Software Development Assistant',
    category: 'Healthcare Technology',
    description: 'Contributed to the maintenance and improvement of a healthcare operations platform supporting daily clinical workflows. Resolved production-level bugs, delivered feature enhancements, and improved data flow across forms, logs, and reporting tools.',
    tech: ['Web Application', 'Healthcare Ops', 'Production Support'],
    images: ['/images/projects/catalyst-1.png', '/images/projects/catalyst-2.png', '/images/projects/catalyst-3.png'],
    gradient: 'from-[#E4EEF0] to-[#EAE8F4]',
  },
  {
    id: 8,
    title: 'Serenity HCF',
    role: 'Software Development Assistant',
    category: 'Healthcare Website',
    description: 'Supported the development and maintenance of a healthcare facility website, ensuring reliable access to service information, operational content, and patient-facing resources.',
    tech: ['Healthcare', 'Web Development', 'Production Support'],
    images: ['/images/projects/serenity-1.png', '/images/projects/serenity-2.png'],
    link: 'https://serenityhcf.com/',
    gradient: 'from-[#EAF0EA] to-[#F0EAE8]',
    liveUrl: 'https://serenityhcf.com/',
  },
  {
    id: 9,
    title: 'Trinity Plumbing & Drains',
    role: 'Web Developer',
    category: 'Business Website',
    description: 'A professional service-oriented website for a plumbing and drain services company, presenting its services, coverage areas, customer information, and contact options in a clear and accessible format.',
    tech: ['HTML', 'CSS', 'Web Design'],
    images: ['/images/projects/trinity-1.png', '/images/projects/trinity-2.png'],
    link: 'https://trinity.plumbing/',
    gradient: 'from-[#E8EEF0] to-[#F0EDE8]',
    liveUrl: 'https://trinity.plumbing/',
  },
  {
    id: 1,
    title: 'IT Service Desk System',
    role: 'Project Lead',
    category: 'Web Application',
    description: 'Led enhancement of an internal ticketing system for IT and service-related concerns. Refined workflows, implemented priority-based routing, and ensured system stability for production deployment.',
    tech: ['Laravel', 'MySQL', 'Git'],
    images: ['/images/projects/project-1-1.png', '/images/projects/project-1-2.png', '/images/projects/project-1-3.png'],
    gradient: 'from-[#E8E0F0] to-[#F0E8E8]',
  },
  {
    id: 2,
    title: '4PH Beneficiary Application Platform',
    role: 'Lead Developer',
    category: 'Government Platform',
    description: 'Developed a secure application system with admin monitoring, status tracking, and CAPTCHA validation. Configured staging environment with Ubuntu and Nginx for production deployment.',
    tech: ['Laravel', 'MySQL', 'JavaScript', 'Ubuntu', 'Nginx'],
    images: ['/images/projects/project-2-1.png', '/images/projects/project-2-2.png', '/images/projects/project-2-3.png', '/images/projects/project-2-4.png', '/images/projects/project-2-5.png'],
    gradient: 'from-[#E0EAF0] to-[#E8F0E8]',
  },
  {
    id: 3,
    title: 'Action Tracker & Monitoring System',
    role: 'Lead Developer',
    category: 'Enterprise Tool',
    description: 'Built an integrated system for form submission, application monitoring, and ticketing. Implemented security measures and managed GitHub workflows for a multi-team environment.',
    tech: ['Laravel', 'MySQL', 'Git', 'Ubuntu', 'Nginx'],
    images: ['/images/projects/project-3-1.png', '/images/projects/project-3-2.png', '/images/projects/project-3-3.png', '/images/projects/project-3-4.png', '/images/projects/project-3-5.png'],
    gradient: 'from-[#E8F0E0] to-[#F0EAE0]',
  },
  {
    id: 4,
    title: 'Library Management with QR Code',
    role: 'Developer',
    category: 'Web Application',
    description: 'Developed backend and frontend for a library system featuring QR code scanning, secure data handling, and CAPTCHA protection for member authentication.',
    tech: ['Laravel', 'MySQL', 'JavaScript'],
    images: ['/images/projects/project-4.png'],
    gradient: 'from-[#F0E8E0] to-[#E8E8F0]',
  },
  {
    id: 5,
    title: 'Kindergarten Courseware',
    role: 'Developer',
    category: 'Education Platform',
    description: 'Built an interactive educational courseware system for kindergarten students with learning modules, progress tracking, and teacher management tools.',
    tech: ['Laravel', 'MySQL', 'Git'],
    images: ['/images/projects/project-5-1.png', '/images/projects/project-5-2.png', '/images/projects/project-5-3.png', '/images/projects/project-5-4.png', '/images/projects/project-5-5.png'],
    gradient: 'from-[#F0EAE8] to-[#EAE8F0]',
  },
  {
    id: 6,
    title: 'USAsales101 Website',
    role: 'Web Developer',
    category: 'Website',
    description: 'Enhanced a GoDaddy-hosted website with custom HTML, created Figma mockups, and improved responsive design for a better user experience.',
    tech: ['HTML', 'CSS', 'Figma', 'GoDaddy'],
    images: ['/images/projects/project-6.png'],
    link: 'https://usasales101.com/',
    gradient: 'from-[#EAF0E8] to-[#F0E8EA]',
  },
]

const skills = [
  { category: 'Frontend', items: ['HTML / CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Figma'] },
  { category: 'Backend', items: ['PHP', 'Laravel', 'Java', 'Node.js'] },
  { category: 'Database', items: ['MySQL', 'SQL Server'] },
  { category: 'DevOps & Tools', items: ['Git', 'GitHub', 'Ubuntu', 'Nginx', 'GoDaddy'] },
]

const experience: { role: string; company: string; period: string; current?: boolean; points: string[] }[] = [
  {
    role: 'Software Development Assistant',
    company: 'Part-Time',
    period: 'April 2026 — Present',
    current: true,
    points: [
      'Supported a healthcare operations platform used in daily workflows, maintaining system stability and reliability',
      'Diagnosed and resolved production-level bugs in real time to minimize disruptions',
      'Delivered timely feature updates and workflow enhancements based on user feedback',
      'Improved data flow, usability, and functionality across forms, logs, and reporting tools',
      'Assisted with integrations involving calendar systems, email services, and reporting tools',
      'Quickly adapted to an existing codebase to implement efficient fixes and improvements',
    ],
  },
  {
    role: 'Junior Web Developer / IT Support Officer',
    company: 'Government Agency',
    period: '2022 — Present',
    points: [
      'Led development of multiple production-ready web platforms',
      'Managed server deployment using Ubuntu and Nginx',
      'Collaborated with cross-functional teams on system requirements',
      'Provided IT support and system maintenance',
    ],
  },
  {
    role: 'Freelance Web Developer',
    company: 'Independent',
    period: '2021 — 2022',
    points: [
      'Built and modified client websites using HTML, CSS, and GoDaddy',
      'Created UI mockups and prototypes in Figma',
      'Delivered responsive, user-friendly web experiences',
    ],
  },
]

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [activeImg, setActiveImg] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!selectedProject) return
    setActiveImg(0)
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setLightbox(false); setSelectedProject(null) }
      if (e.key === 'ArrowRight') setActiveImg(i => Math.min(i + 1, (selectedProject.images?.length || 1) - 1))
      if (e.key === 'ArrowLeft') setActiveImg(i => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [selectedProject])

  const navLinks = ['Work', 'About', 'Skills', 'Experience', 'Contact']

  return (
    <div className="bg-[#FAFAF7] text-[#1C1C1E] min-h-screen">

      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C9A99A] to-[#B8A4B8] z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 60 ? 'bg-[#FAFAF7]/90 backdrop-blur-md border-b border-[#E8E4DF]' : ''}`}
      >
        <div className="container-custom flex items-center justify-between py-5">
          <a href="#" className="font-display text-2xl font-light tracking-wide text-[#1C1C1E]">
            KL<span className="text-[#C9A99A]">.</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="nav-link animated-underline">
                {link}
              </a>
            ))}
          </div>
          <a href="mailto:kylalacson0430@gmail.com" className="hidden md:inline-flex btn-primary text-xs py-2.5 px-5">
            Get in touch
          </a>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <div className={`w-5 h-px bg-[#1C1C1E] transition-all duration-300 mb-1.5 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-5 h-px bg-[#1C1C1E] transition-all duration-300 mb-1.5 ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-px bg-[#1C1C1E] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#FAFAF7] border-t border-[#E8E4DF] px-6 py-6 flex flex-col gap-5"
            >
              {navLinks.map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-[#6B6560]" onClick={() => setMenuOpen(false)}>
                  {link}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero */}
      <section id="home" className="min-h-screen flex flex-col justify-center pt-24 pb-16 section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.span
                variants={fadeUp} initial="hidden" animate="show" custom={0}
                className="section-label"
              >
                Available for opportunities
              </motion.span>
              <motion.h1
                variants={fadeUp} initial="hidden" animate="show" custom={1}
                className="font-display text-[clamp(3rem,8vw,6rem)] font-light leading-[1.05] tracking-tight mb-6"
              >
                Kyla<br />
                <span className="italic text-[#C9A99A]">Lacson</span>
              </motion.h1>
              <motion.p
                variants={fadeUp} initial="hidden" animate="show" custom={2}
                className="text-[#6B6560] text-lg leading-relaxed max-w-md mb-4"
              >
                Full-Stack Developer & IT Professional with 3+ years building production-ready web systems for government and academic institutions.
              </motion.p>
              <motion.p
                variants={fadeUp} initial="hidden" animate="show" custom={3}
                className="text-[#6B6560] text-base leading-relaxed max-w-md mb-10"
              >
                Specializing in Laravel, React, and scalable backend systems — from concept to deployment.
              </motion.p>
              <motion.div
                variants={fadeUp} initial="hidden" animate="show" custom={4}
                className="flex flex-wrap gap-4"
              >
                <a href="#work" className="btn-primary">
                  Explore My Work <ArrowUpRight size={15} />
                </a>
                <a href="#contact" className="btn-outline">
                  Let's Connect
                </a>
              </motion.div>
              <motion.div
                variants={fadeUp} initial="hidden" animate="show" custom={5}
                className="flex items-center gap-6 mt-12"
              >
                <a href="mailto:kylalacson0430@gmail.com" className="text-[#6B6560] hover:text-[#1C1C1E] transition-colors">
                  <Mail size={18} />
                </a>
                <a href="https://www.linkedin.com/in/kyla-lacson-a075532a1" target="_blank" rel="noopener noreferrer" className="text-[#6B6560] hover:text-[#1C1C1E] transition-colors">
                  <Linkedin size={18} />
                </a>
                <div className="w-px h-4 bg-[#E8E4DF]" />
                <span className="text-xs text-[#6B6560] tracking-wide">Based in the Philippines</span>
              </motion.div>
            </div>

            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-[320px] h-[400px] md:w-[380px] md:h-[480px]">
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#F2E8E4] to-[#E8E4F0] img-hover">
                  <img
                    src="/images/profile/kyla_photo.jpeg"
                    alt="Kyla S. Lacson"
                    className="w-full h-full object-cover rounded-[2rem]"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fb = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fb) fb.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#F2E8E4] to-[#E8E4F0] items-center justify-center" style={{ display: 'none' }}>
                    <span className="font-display text-7xl font-light text-[#C9A99A]">KL</span>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl bg-[#F2E8E4] -z-10" />
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-[#E8E4F0] -z-10" />
                <div className="absolute bottom-8 -right-6 bg-white rounded-2xl px-4 py-3 shadow-lg border border-[#E8E4DF]">
                  <p className="text-xs text-[#6B6560]">Projects delivered</p>
                  <p className="font-display text-2xl font-light text-[#1C1C1E]">10+</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="flex items-center gap-3 mt-20"
          >
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ChevronDown size={16} className="text-[#C9A99A]" />
            </motion.div>
            <span className="text-xs text-[#6B6560] tracking-widest uppercase">Scroll to explore</span>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section-padding bg-[#F7F5F0]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            >
              <span className="section-label">01 — About</span>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light leading-tight mb-6">
                Building things that<br />
                <span className="italic text-[#C9A99A]">matter.</span>
              </h2>
              <div className="divider" />
              <p className="text-[#6B6560] leading-relaxed mb-5">
                I'm a Full-Stack Developer and IT Professional based in the Philippines, with 3+ years of hands-on experience building, deploying, and maintaining web-based systems for government agencies, academic institutions, and healthcare operations platforms.
              </p>
              <p className="text-[#6B6560] leading-relaxed mb-5">
                My work spans the full development lifecycle — from system architecture and backend development, to production server configuration, bug resolution, and ongoing feature improvements on live applications.
              </p>
              <p className="text-[#6B6560] leading-relaxed mb-10">
                I take pride in writing reliable, maintainable code and adapting quickly to existing codebases — delivering real improvements to systems that people depend on every day.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[['10+', 'Projects'], ['3+', 'Years Exp.'], ['3', 'Industries']].map(([num, label]) => (
                  <div key={label}>
                    <p className="font-display text-4xl font-light text-[#1C1C1E]">{num}</p>
                    <p className="text-xs text-[#6B6560] tracking-wide mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" custom={1} viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-8 border border-[#E8E4DF]">
                <h3 className="text-sm font-medium tracking-wide text-[#1C1C1E] mb-5">Education</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-[#1C1C1E]">Bachelor of Science in Computer Science</p>
                    <p className="text-sm text-[#6B6560] mt-1">St. Clare College of Caloocan</p>
                    <p className="text-xs text-[#C9A99A] mt-1">Graduated 2022</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-[#E8E4DF]">
                <h3 className="text-sm font-medium tracking-wide text-[#1C1C1E] mb-5">What I bring</h3>
                <ul className="space-y-3">
                  {['Full-cycle web development', 'Server deployment & configuration', 'System analysis & documentation', 'IT support & user training', 'Cross-functional team collaboration'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[#6B6560]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A99A] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="work" className="section-padding">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
            <span className="section-label">02 — Work</span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light leading-tight">
              Selected <span className="italic text-[#C9A99A]">projects</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                variants={fadeUp} initial="hidden" whileInView="show" custom={i % 3} viewport={{ once: true }}
                className="project-card group"
                onClick={() => {
                  if (!project.images || project.images.length === 0) {
                    if (project.liveUrl || project.link) window.open(project.liveUrl || project.link, '_blank')
                  } else {
                    setSelectedProject(project)
                  }
                }}
              >
                <div className={`aspect-[4/3] bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  {project.images && project.images.length > 0 ? (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fb = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fb) fb.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-5xl font-light text-[#C9A99A]/30">{project.id.toString().padStart(2,'0')}</span>
                  </div>
                  <div className="absolute inset-0 bg-[#1C1C1E]/0 group-hover:bg-[#1C1C1E]/10 transition-all duration-300" />
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <ArrowUpRight size={14} className="text-[#1C1C1E]" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs bg-white/90 text-[#6B6560] px-3 py-1 rounded-full">{project.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-[#1C1C1E] leading-snug mb-1">{project.title}</h3>
                  <p className="text-xs text-[#C9A99A] mb-3">{project.role}</p>
                  <p className="text-sm text-[#6B6560] leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs text-[#6B6560] bg-[#FAFAF7] border border-[#E8E4DF] px-2.5 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                  {(project.liveUrl || project.link) && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#C9A99A] font-medium">
                      Visit Live Site <ArrowUpRight size={12} />
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section-padding bg-[#F7F5F0]">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
            <span className="section-label">03 — Skills</span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light leading-tight">
              Tech <span className="italic text-[#C9A99A]">stack</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((group, i) => (
              <motion.div
                key={group.category}
                variants={fadeUp} initial="hidden" whileInView="show" custom={i} viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-[#E8E4DF]"
              >
                <p className="text-xs font-medium tracking-widest uppercase text-[#C9A99A] mb-5">{group.category}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map(item => (
                    <span key={item} className="skill-chip">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="section-padding">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
            <span className="section-label">04 — Experience</span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light leading-tight">
              Career <span className="italic text-[#C9A99A]">journey</span>
            </h2>
          </motion.div>
          <div className="max-w-3xl space-y-8">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="show" custom={i} viewport={{ once: true }}
                className="grid md:grid-cols-[200px_1fr] gap-6 pb-8 border-b border-[#E8E4DF] last:border-0"
              >
                <div>
                  <p className="text-xs text-[#C9A99A] tracking-wide mb-1">{exp.period}</p>
                  <p className="text-sm text-[#6B6560]">{exp.company}</p>
                  {exp.current && (
                    <span className="inline-flex items-center gap-1.5 mt-2 text-xs bg-[#F2E8E4] text-[#C9A99A] px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A99A] animate-pulse" />
                      Current Role
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-[#1C1C1E] mb-4">{exp.role}</h3>
                  <ul className="space-y-2">
                    {exp.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-[#6B6560]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A99A] flex-shrink-0 mt-1.5" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-padding bg-[#1C1C1E] text-[#FAFAF7]">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-[#C9A99A] mb-4 block">05 — Contact</span>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-tight mb-8">
              Have something<br />
              in mind? <span className="italic text-[#C9A99A]">Let's talk.</span>
            </h2>
            <p className="text-[#FAFAF7]/60 text-lg leading-relaxed mb-10 max-w-lg">
              I'm open to full-time roles, freelance projects, and collaborations. If you have an idea or opportunity, I'd love to hear from you.
            </p>
            <div className="flex flex-wrap gap-4 mb-16">
              <a href="mailto:kylalacson0430@gmail.com" className="inline-flex items-center gap-2 bg-[#FAFAF7] text-[#1C1C1E] px-7 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:bg-[#F2E8E4] hover:scale-[1.02]">
                <Mail size={15} /> kylalacson0430@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/kyla-lacson-a075532a1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-[#FAFAF7]/20 text-[#FAFAF7] px-7 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:border-[#FAFAF7]/60">
                <Linkedin size={15} /> LinkedIn
              </a>
            </div>
            <div className="border-t border-[#FAFAF7]/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <p className="font-display text-2xl font-light text-[#FAFAF7]/40">Kyla S. Lacson<span className="text-[#C9A99A]">.</span></p>
              <p className="text-xs text-[#FAFAF7]/30 tracking-wide">© 2024 — All rights reserved</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#1C1C1E]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => { setLightbox(false); setSelectedProject(null) }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#FAFAF7] rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-[#E8E4DF] flex-shrink-0">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium tracking-[0.15em] uppercase text-[#C9A99A]">{selectedProject.category}</span>
                  {(selectedProject.liveUrl || selectedProject.link) && (
                    <>
                      <span className="text-[#E8E4DF]">·</span>
                      <a
                        href={selectedProject.liveUrl || selectedProject.link}
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#6B6560] hover:text-[#1C1C1E] transition-colors"
                        onClick={e => e.stopPropagation()}
                      >
                        Visit Live Site <ArrowUpRight size={11} />
                      </a>
                    </>
                  )}
                </div>
                <button
                  onClick={() => { setLightbox(false); setSelectedProject(null) }}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F0EDE8] transition-colors"
                  aria-label="Close modal"
                >
                  <X size={16} className="text-[#6B6560]" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto flex-1">
                <div className="grid md:grid-cols-[1fr_1.1fr] gap-0 min-h-0">

                  {/* Left — Project Info */}
                  <div className="px-8 py-7 border-r border-[#E8E4DF] flex flex-col gap-6">
                    <div>
                      <h3 className="font-display text-[1.75rem] font-light leading-tight text-[#1C1C1E] mb-1">{selectedProject.title}</h3>
                      <p className="text-sm text-[#6B6560]">{selectedProject.role}</p>
                    </div>
                    <div className="w-10 h-px bg-[#C9A99A]" />
                    <p className="text-sm text-[#6B6560] leading-[1.75]">{selectedProject.description}</p>
                    <div>
                      <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-[#1C1C1E] mb-3">Technologies</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((t: string) => (
                          <span key={t} className="text-xs text-[#6B6560] border border-[#E8E4DF] bg-white px-3 py-1.5 rounded-full hover:border-[#C9A99A] transition-colors">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right — Gallery */}
                  <div className="px-8 py-7 flex flex-col gap-4">
                    {selectedProject.images && selectedProject.images.length > 0 ? (
                      <>
                        {/* Featured image */}
                        <div
                          className="aspect-video bg-[#F0EDE8] rounded-xl overflow-hidden cursor-zoom-in relative group"
                          onClick={() => setLightbox(true)}
                        >
                          <AnimatePresence mode="wait">
                            <motion.img
                              key={activeImg}
                              src={selectedProject.images[activeImg]}
                              alt={`${selectedProject.title} screenshot ${activeImg + 1}`}
                              className="w-full h-full object-cover"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              onError={(e) => { e.currentTarget.style.display = 'none' }}
                            />
                          </AnimatePresence>
                          <div className="absolute inset-0 bg-[#1C1C1E]/0 group-hover:bg-[#1C1C1E]/5 transition-all duration-200 flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white bg-[#1C1C1E]/50 px-3 py-1.5 rounded-full">Click to enlarge</span>
                          </div>
                          {/* Prev/Next on featured */}
                          {selectedProject.images.length > 1 && (
                            <>
                              <button
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                                onClick={e => { e.stopPropagation(); setActiveImg(i => Math.max(i - 1, 0)) }}
                                aria-label="Previous image"
                              >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7.5 2L4 6l3.5 4" stroke="#1C1C1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              </button>
                              <button
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                                onClick={e => { e.stopPropagation(); setActiveImg(i => Math.min(i + 1, selectedProject.images.length - 1)) }}
                                aria-label="Next image"
                              >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2L8 6l-3.5 4" stroke="#1C1C1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              </button>
                            </>
                          )}
                        </div>

                        {/* Thumbnails */}
                        {selectedProject.images.length > 1 && (
                          <div className="flex gap-2 flex-wrap">
                            {selectedProject.images.map((img: string, idx: number) => (
                              <button
                                key={idx}
                                onClick={() => setActiveImg(idx)}
                                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                                  activeImg === idx ? 'border-[#C9A99A] opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                                }`}
                                aria-label={`View screenshot ${idx + 1}`}
                              >
                                <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className={`aspect-video rounded-xl bg-gradient-to-br ${selectedProject.gradient} flex items-center justify-center`}>
                        <span className="font-display text-5xl font-light text-[#C9A99A]/40">{selectedProject.id.toString().padStart(2,'0')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#1C1C1E]/95 z-[60] flex items-center justify-center p-6"
            onClick={() => setLightbox(false)}
          >
            <button className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors" onClick={() => setLightbox(false)}>
              <X size={16} className="text-white" />
            </button>
            {selectedProject.images.length > 1 && (
              <>
                <button className="absolute left-5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors" onClick={e => { e.stopPropagation(); setActiveImg(i => Math.max(i - 1, 0)) }}>
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M7.5 2L4 6l3.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className="absolute right-5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors" onClick={e => { e.stopPropagation(); setActiveImg(i => Math.min(i + 1, selectedProject.images.length - 1)) }}>
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M4.5 2L8 6l-3.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </>
            )}
            <motion.img
              key={activeImg}
              src={selectedProject.images[activeImg]}
              alt={`${selectedProject.title} ${activeImg + 1}`}
              className="max-w-full max-h-full object-contain rounded-xl"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
            />
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/40">
              {activeImg + 1} / {selectedProject.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
