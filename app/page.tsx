'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { 
  Mail, Phone, MapPin, Github, Linkedin, 
  Code, Database, Server, Globe, Users, 
  MessageSquare, Zap, Sun, Moon,
  ExternalLink, Calendar, Award, BookOpen,
  ChevronDown, Menu, X, Heart, Star, Sparkles
} from 'lucide-react'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [typingText, setTypingText] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hearts, setHearts] = useState<Array<{ id: number; left: number }>>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        e.currentTarget,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      
      alert('Thank you! Your message has been sent successfully. I\'ll respond within 24 hours.')
      e.currentTarget.reset()
      
    } catch (error) {
      console.error('EmailJS Error:', error)
      alert('Sorry, there was an error sending your message. Please email me directly at kylalacson0430@gmail.com')
    } finally {
      setIsSubmitting(false)
    }
  }
  const typingTexts = [
    'Full-Stack Developer, Web Developer & IT Professional ✨',
    'Creating scalable web solutions 🌿',
    'Delivering exceptional user experiences 🦋',
    '3+ years of technical expertise 🌙'
  ]
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newFloating = {
        id: Date.now(),
        left: Math.random() * 100
      }
      setHearts(prev => [...prev, newFloating])
      
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== newFloating.id))
      }, 8000)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])
  
  useEffect(() => {
    let textIndex = 0
    let charIndex = 0
    let isDeleting = false
    
    const typeText = () => {
      const currentText = typingTexts[textIndex]
      
      if (isDeleting) {
        setTypingText(currentText.substring(0, charIndex - 1))
        charIndex--
      } else {
        setTypingText(currentText.substring(0, charIndex + 1))
        charIndex++
      }
      
      let typeSpeed = isDeleting ? 50 : 100
      
      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % typingTexts.length
        typeSpeed = 500
      }
      
      setTimeout(typeText, typeSpeed)
    }
    
    typeText()
  }, [])
  
  const skills = {
    soft: [
      { name: 'Quick Learner', icon: Zap, color: 'from-amber-300 to-yellow-300' },
      { name: 'Team Player', icon: Users, color: 'from-purple-300 to-lavender-300' },
      { name: 'Communication Skills', icon: MessageSquare, color: 'from-indigo-300 to-purple-300' }
    ],
    technical: [
      { name: 'Java', icon: Code, color: 'from-violet-300 to-purple-300' },
      { name: 'HTML/CSS', icon: Globe, color: 'from-teal-300 to-cyan-300' },
      { name: 'PHP', icon: Server, color: 'from-indigo-300 to-purple-300' },
      { name: 'SQL Server', icon: Database, color: 'from-emerald-300 to-teal-300' },
      { name: 'React', icon: Code, color: 'from-sky-300 to-blue-300' },
      { name: 'Laravel', icon: Server, color: 'from-orange-300 to-amber-300' }
    ]
  }
  
  const projects = [
    {
      title: 'IT Service Desk System',
      role: 'Project Lead',
      description: 'Led enhancement of internal ticketing system for IT and service-related concerns. Refined workflows and ensured system stability for production deployment.',
      tech: ['Laravel', 'MySQL', 'Git'],
      gradient: 'from-purple-400 to-violet-400'
    },
    {
      title: '4PH Beneficiary Application Platform',
      role: 'Lead Developer',
      description: 'Developed secure application system with admin monitoring, status tracking, and CAPTCHA validation. Configured staging with Ubuntu and Nginx.',
      tech: ['Laravel', 'MySQL', 'JavaScript', 'Ubuntu', 'Nginx'],
      gradient: 'from-indigo-400 to-purple-400'
    },
    {
      title: 'Action Tracker & Monitoring System',
      role: 'Lead Developer',
      description: 'Built integrated system for form submission, application monitoring, and ticketing. Implemented security measures and managed GitHub workflows.',
      tech: ['Laravel', 'MySQL', 'Git', 'Ubuntu', 'Nginx'],
      gradient: 'from-teal-400 to-cyan-400'
    },
    {
      title: 'Library Management with QR Code',
      role: 'Developer',
      description: 'Developed backend and frontend for library system with QR code scanning, secure data handling, and CAPTCHA protection.',
      tech: ['Laravel', 'MySQL', 'JavaScript'],
      gradient: 'from-emerald-400 to-green-400'
    },
    {
      title: 'Academic Services Portal',
      role: 'Co-Developer',
      description: 'Created specialized Google Site for UST Engineering Department, accessible to email holders with comprehensive faculty communication features.',
      tech: ['Google Sites', 'HTML', 'CSS'],
      gradient: 'from-amber-400 to-yellow-400'
    },
    {
      title: 'USAsales101 Website Modification',
      role: 'Web Developer',
      description: 'Enhanced GoDaddy website with custom HTML, created Figma mockups, and improved responsive design for better user experience.',
      tech: ['HTML', 'CSS', 'Figma', 'GoDaddy'],
      gradient: 'from-rose-400 to-pink-400'
    }
  ]

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Mouse Follower */}
      <motion.div
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <div className="w-full h-full bg-purple-300 rounded-full opacity-60"></div>
      </motion.div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full glass-card z-50 border-b border-purple-200/30">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold"
              style={{ fontFamily: 'Dancing Script' }}
            >
              <span className="text-gradient">K</span>
              <Sparkles className="inline ml-2 text-purple-400" size={24} />
            </motion.div>
            
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-purple-500 transition-colors font-medium"
                  whileHover={{ scale: 1.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-full glass-card hover:bg-purple-100/20 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-purple-400" />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center section-padding pt-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1 
                className="text-6xl md:text-7xl font-bold mb-6"
                style={{ fontFamily: 'Dancing Script' }}
              >
                <span className="text-gradient">Kyla S. Lacson</span>
              </motion.h1>
              <h2 className="text-2xl md:text-3xl text-gray-600 mb-4 font-medium">
                Full-Stack Developer | IT Support Officer
              </h2>
              <p className="text-lg text-gray-500 mb-6 max-w-2xl">
                <strong>3+ years</strong> of proven expertise in web development and IT solutions. 
                A Junior Web Developer with hands-on experience in designing, developing, and deploying web-based systems for government and academic institutions. Proficient in PHP, Laravel, React JS, SQL, and modern web technologies, with exposure to system analysis, requirements documentation, deployment using Ubuntu and Nginx, and user support. Has led and contributed to multiple production-ready platforms including ticketing systems, application portals, and monitoring systems. Seeking a junior web developer role where I can continuously grow and deliver impactful digital solutions.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8 max-w-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">10+</div>
                  <div className="text-sm text-gray-500">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">99%</div>
                  <div className="text-sm text-gray-500">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">24/7</div>
                  <div className="text-sm text-gray-500">Support Available</div>
                </div>
              </div>
              <div className="text-xl text-gray-500 mb-8 h-8 font-medium">
                {typingText}<motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1 }}>|</motion.span>
              </div>
              <div className="flex flex-wrap gap-6">
                <motion.a 
                  href="#projects" 
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                >
                  <Code className="inline mr-2" size={20} />
                  View My Work
                </motion.a>
                <motion.a 
                  href="#contact" 
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                >
                  <Phone className="inline mr-2" size={20} />
                  Start Project
                </motion.a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <motion.div 
                className="w-80 h-80 bg-gradient-to-br from-purple-400 via-indigo-400 to-teal-400 rounded-3xl flex items-center justify-center text-white shadow-2xl"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div style={{ fontFamily: 'Dancing Script' }} className="text-6xl mb-2">KL</div>
                  <div className="text-sm font-medium opacity-90">Developer</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h2 
              className="text-5xl font-bold mb-8 text-gradient"
              style={{ fontFamily: 'Dancing Script' }}
            >
              Why Choose Me
              <Award className="inline ml-4 text-purple-400" size={40} />
            </motion.h2>
            <motion.div className="glass-card p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="text-white" size={24} />
                  </div>
                  <h4 className="font-semibold mb-2">Technical Excellence</h4>
                  <p className="text-gray-600 text-sm">Clean, scalable code with modern best practices</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="text-white" size={24} />
                  </div>
                  <h4 className="font-semibold mb-2">Fast Delivery</h4>
                  <p className="text-gray-600 text-sm">On-time project completion with quality assurance</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-white" size={24} />
                  </div>
                  <h4 className="font-semibold mb-2">Client-Focused</h4>
                  <p className="text-gray-600 text-sm">Clear communication and ongoing support</p>
                </div>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed font-medium text-center">
                I build reliable, secure, and scalable web applications using modern technologies. From concept to deployment, I turn business requirements into digital solutions that are built to last.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding bg-gradient-to-br from-purple-50/50 to-indigo-50/50">
        <div className="container-custom">
          <motion.h2
            className="text-5xl font-bold text-center mb-16 text-gradient"
            style={{ fontFamily: 'Dancing Script' }}
          >
            Services & Expertise
            <Sparkles className="inline ml-4 text-purple-400" size={40} />
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div className="card p-8 text-center" whileHover={{ scale: 1.05 }}>
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Web Development</h3>
              <p className="text-gray-600 mb-4">Custom web applications, responsive design, and modern frameworks</p>
              <div className="text-sm text-purple-600 font-medium">Laravel • React • JavaScript • PHP</div>
            </motion.div>
            
            <motion.div className="card p-8 text-center" whileHover={{ scale: 1.05 }}>
              <div className="w-20 h-20 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Server className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">System Administration</h3>
              <p className="text-gray-600 mb-4">Server management, deployment, and infrastructure setup</p>
              <div className="text-sm text-purple-600 font-medium">Ubuntu • Nginx • MySQL • Git</div>
            </motion.div>
            
            <motion.div className="card p-8 text-center" whileHover={{ scale: 1.05 }}>
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">IT Support</h3>
              <p className="text-gray-600 mb-4">Technical support, troubleshooting, and system maintenance</p>
              <div className="text-sm text-purple-600 font-medium">24/7 Support • Problem Solving • Training</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding">
        <div className="container-custom">
          <motion.h2
            className="text-5xl font-bold text-center mb-16 text-gradient"
            style={{ fontFamily: 'Dancing Script' }}
          >
            Client Success Stories
            <Award className="inline ml-4 text-purple-400" size={40} />
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="card p-6 group cursor-pointer relative overflow-hidden"
                whileHover={{ y: -10 }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-bl-3xl flex items-center justify-center">
                  <ExternalLink className="text-purple-600" size={20} />
                </div>
                
                <div className="mb-4">
                  <span className={`bg-gradient-to-r ${project.gradient} text-white px-4 py-2 rounded-full text-sm font-medium`}>
                    {project.role}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 pr-16">{project.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-2">Technologies Used:</div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium border border-purple-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">Client Satisfied</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <motion.a 
              href="#contact" 
              className="btn-primary inline-flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <MessageSquare className="inline mr-2" size={20} />
              Start Your Project
            </motion.a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-gradient-to-br from-purple-50/50 to-indigo-50/50">
        <div className="container-custom">
          <motion.h2
            className="text-5xl font-bold text-center mb-16 text-gradient"
            style={{ fontFamily: 'Dancing Script' }}
          >
            Ready to Start Your Project?
            <MessageSquare className="inline ml-4 text-purple-400" size={40} />
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-3xl font-semibold mb-6 text-gradient" style={{ fontFamily: 'Dancing Script' }}>
                Let's Discuss Your Needs
              </h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Free Consultation</h4>
                    <p className="text-gray-600 text-sm">30-minute discovery call to understand your requirements</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Code className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Custom Solutions</h4>
                    <p className="text-gray-600 text-sm">Tailored development approach for your specific needs</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Fast Turnaround</h4>
                    <p className="text-gray-600 text-sm">Quick response time and efficient project delivery</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-100">
                <h4 className="font-semibold mb-2 text-purple-800">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="text-purple-600" size={16} />
                    <a href="mailto:kylalacson0430@gmail.com" className="text-purple-600 hover:underline">
                      kylalacson0430@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Linkedin className="text-blue-600" size={16} />
                    <a href="www.linkedin.com/in/kyla-lacson-a075532a1" className="text-blue-600 hover:underline">
                      linkedin.com/in/kyla-lacson
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="text-green-600" size={16} />
                    <span className="text-gray-700">Available for calls Mon-Fri 9AM-6PM</span>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div className="glass-card p-8">
              <h4 className="text-xl font-semibold mb-6 text-center">Get Your Free Quote</h4>
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full px-4 py-3 border-2 border-purple-200/30 rounded-2xl focus:ring-2 focus:ring-purple-400 bg-white/50 transition-all"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      className="w-full px-4 py-3 border-2 border-purple-200/30 rounded-2xl focus:ring-2 focus:ring-purple-400 bg-white/50 transition-all"
                      placeholder="Company Name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 border-2 border-purple-200/30 rounded-2xl focus:ring-2 focus:ring-purple-400 bg-white/50 transition-all"
                    placeholder="your.email@company.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Project Type</label>
                  <select name="title" className="w-full px-4 py-3 border-2 border-purple-200/30 rounded-2xl focus:ring-2 focus:ring-purple-400 bg-white/50 transition-all">
                    <option>Web Development</option>
                    <option>System Administration</option>
                    <option>IT Support</option>
                    <option>Custom Application</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Project Details *</label>
                  <textarea
                    rows={4}
                    name="projectDetails"
                    className="w-full px-4 py-3 border-2 border-purple-200/30 rounded-2xl focus:ring-2 focus:ring-purple-400 bg-white/50 transition-all"
                    placeholder="Tell me about your project requirements, timeline, and budget..."
                    required
                  ></textarea>
                </div>
                
                <motion.button 
                  type="submit" 
                  className="w-full btn-primary text-lg py-4"
                  whileHover={{ scale: 1.02 }}
                  disabled={isSubmitting}
                >
                  <Zap className="inline mr-2" size={20} />
                  {isSubmitting ? 'Sending...' : 'Get Free Quote & Consultation'}
                </motion.button>
                
                <p className="text-xs text-gray-500 text-center">
                  * I'll respond within 24 hours with a detailed proposal
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-500 text-white py-12">
        <div className="container-custom text-center">
          <div className="flex justify-center items-center space-x-4 mb-4">
            <Heart className="text-white/80" size={24} />
            <p className="text-lg font-medium">Made with love by Kyla S. Lacson</p>
            <Heart className="text-white/80" size={24} />
          </div>
          <p className="text-white/80">&copy; 2024 All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}