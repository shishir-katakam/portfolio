import { Code2, Music, Volume2, VolumeX, Volume1, GraduationCap, Award, Briefcase, Globe, Github, Linkedin, Mail, Sparkles, Rocket, Terminal, Brain, Zap, Star, TrendingUp, Coffee, Lightbulb, Target } from 'lucide-react';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import PixelCard from '@/components/PixelCard';
import ElasticSlider from '@/components/ElasticSlider';
import TextPressure from '@/components/TextPressure';
import FadeContent from '@/components/FadeContent';
import GlassBorder from '@/components/GlassBorder';
import TargetCursor from '@/components/TargetCursor';
import LightRays from '@/components/LightRays';
import Aurora from '@/components/Aurora';

const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/shishir-katakam/niora/main';

const Index = () => {
  const [volumeLevel, setVolumeLevel] = useState(50);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    // Only set up audio when intro is dismissed
    if (showIntro) return;

    // Find or create the audio element
    let audio = document.getElementById('bg-audio') as HTMLAudioElement;
    if (!audio) {
      audio = document.createElement('audio');
      audio.id = 'bg-audio';
      audio.src = `${GITHUB_BASE_URL}/odyssey/track2.mp3`;
      audio.loop = true;
      audio.preload = 'auto';
      document.body.appendChild(audio);
    }
    
    audioRef.current = audio;
    audio.volume = volumeLevel / 100;

    // Start audio immediately when intro is dismissed
    audio.play().catch(e => console.log('Audio play error:', e));

    return () => {
      // Don't cleanup audio, let it keep playing
    };
  }, [showIntro, volumeLevel]);

  const handleEnterSite = useCallback(async () => {
    setIsEntering(true);

    // Reset cursor state by removing hover
    const allCursorTargets = document.querySelectorAll('.cursor-target');
    allCursorTargets.forEach(el => {
      el.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    });

    // Blur any focused element
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // Force cursor position update to center of screen
    setTimeout(() => {
      const resetEvent = new MouseEvent('mousemove', {
        bubbles: true,
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2
      });
      document.body.dispatchEvent(resetEvent);
    }, 100);

    // Wait for fade animation
    setTimeout(() => {
      setShowIntro(false);
    }, 800);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volumeLevel / 100;
    }
  }, [volumeLevel]);

  const getVolumeIcon = useCallback(() => {
    if (volumeLevel === 0) return <VolumeX size={20} />;
    if (volumeLevel < 50) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  }, [volumeLevel]);

  const featuredProjects = useMemo(() => [
    {
      icon: Code2,
      title: 'Codevance',
      tagline: 'Code. Track. Conquer.',
      description: 'Comprehensive coding analytics platform tracking your journey across LeetCode, CodeChef & HackerRank with real-time statistics and achievement badges.',
      href: 'https://code.endiidishishir.qzz.io',
      tech: ['React', 'Firebase', 'REST APIs', 'Data Viz'],
      color: 'blue'
    },
    {
      icon: Music,
      title: 'Niora',
      tagline: 'Focus. Flow. Flourish.',
      description: 'Immersive ambient soundscape generator with custom audio mixing, designed for deep focus and peak productivity with adaptive sound layers.',
      href: 'https://music.endiidishishir.qzz.io',
      tech: ['Web Audio API', 'React', 'UI/UX', 'Sound Design'],
      color: 'pink'
    },
  ], []);

  const innovativeProjects = useMemo(() => [
    {
      icon: Brain,
      title: 'AI-powered AR Keyboard',
      description: 'Revolutionary AR keyboard with Gemini AI integration, real-time spelling correction, predictive text, and gesture controls',
      date: 'May 2025',
      tech: ['Augmented Reality', 'Gemini AI', 'Computer Vision', 'MediaPipe'],
      impact: 'Real-time AI corrections'
    },
    {
      icon: Target,
      title: 'MGIT Bus Tracker',
      description: 'Smart campus transportation system with live GPS tracking, route optimization, ETA predictions, and student notifications',
      date: 'Dec 2024 - Feb 2025',
      tech: ['Kotlin', 'Firebase Realtime DB', 'Google Maps SDK', 'Push Notifications'],
      impact: '500+ daily users'
    },
    {
      icon: Zap,
      title: 'Universal File Converter Bot',
      description: 'High-performance Telegram bot supporting 20+ formats with cloud storage integration and batch processing',
      date: 'Mar 2025',
      tech: ['Python', 'Telegram Bot API', 'FFmpeg', 'AsyncIO'],
      impact: '10K+ conversions'
    },
    {
      icon: Lightbulb,
      title: 'Smart Auto-Reply Bot',
      description: 'Context-aware Telegram bot with NLP-powered responses, voice notes, time-based logic, and activity tracking',
      date: 'Jan 2025',
      tech: ['Python', 'Natural Language Processing', 'Pattern Matching', 'Automation'],
      impact: 'Intelligent automation'
    },
  ], []);

  const internships = useMemo(() => [
    {
      icon: TrendingUp,
      title: 'Uber Fare Prediction',
      company: 'ASPIRE KNOWLEDGE AND SKILLS (P) Ltd',
      date: 'July - August 2025',
      description: 'Developed and evaluated multiple regression models (Linear, Lasso, Ridge) for fare prediction. Applied advanced data preprocessing, feature engineering, and outlier removal techniques to achieve high accuracy on real-world ride data.',
      certified: 'Certified by UBER',
      skills: ['Machine Learning', 'Python', 'scikit-learn', 'Data Analysis'],
      href: 'https://raw.githubusercontent.com/shishir-katakam/portfolio/main/public/Screenshot 2025-10-12 173419.png'
    },
    {
      icon: Globe,
      title: 'CISCO Virtual Internship',
      company: 'CISCO',
      date: 'July 2025',
      description: 'Completed comprehensive programs in Introduction to Cyber Security and Network Essentials, gaining hands-on experience with network protocols, security fundamentals, and infrastructure management.',
      skills: ['Network Security', 'Protocols', 'Infrastructure', 'Cybersecurity']
    },
    {
      icon: Rocket,
      title: 'Summer of AI',
      company: 'Viswam AI, IIIT-Hyderabad',
      date: 'March 2025',
      description: 'Participated in collaborative AI development projects under mentorship of IIITH faculty. Gained practical experience in ML model development, open-source tools, and research methodologies.',
      skills: ['AI Development', 'Research', 'Collaboration', 'Open Source']
    }
  ], []);

  const skills = useMemo(() => ({
    Expert: ['Python', 'Problem Solving', 'Data Structures'],
    Advanced: ['JavaScript', 'React', 'Firebase', 'Google Cloud'],
    Intermediate: ['Kotlin', 'TensorFlow', 'Android Studio', 'REST APIs'],
    Exploring: ['Java', 'C', 'MediaPipe', 'Machine Learning', 'AI Integration']
  }), []);

  const certifications = useMemo(() => [
    { name: 'Neo4j Certified Professional', org: 'Neo4j', href: 'https://graphacademy.neo4j.com/c/f5f586e2-cba3-4ad4-bf3a-dea4bed55d4b/' },
    { name: 'Data Analyst Certification', org: 'OneRoadmap', href: 'https://oneroadmap.io/skills/da/certificate/CERT-A07318AE' },
    { name: 'AWS Solutions Architecture', org: 'Forage', href: 'https://raw.githubusercontent.com/shishir-katakam/portfolio/main/public/image.png' },
    { name: 'Deloitte Cyber Security', org: 'Forage', href: 'https://raw.githubusercontent.com/shishir-katakam/portfolio/main/public/Screenshot 2025-10-12 173902.png' },
    { name: 'Introduction to Cybersecurity', org: 'Cisco Networking Academy', href: 'https://raw.githubusercontent.com/shishir-katakam/portfolio/main/public/Screenshot 2025-10-12 174119.png' },
    { name: 'Generative AI & LLMs', org: 'Google', href: null },
    { name: 'Elements of AI', org: 'University of Helsinki', href: 'https://raw.githubusercontent.com/shishir-katakam/portfolio/main/public/Screenshot 2025-10-12 173648.png' }
  ], []);

  // Intro Screen
  if (showIntro) {
    return (
      <div 
        className={`fixed inset-0 z-[9999] transition-opacity duration-800 ${
          isEntering ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: '#000000',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          perspective: 1000,
          willChange: 'opacity'
        }}
      >
        {/* TargetCursor for intro screen */}
        <TargetCursor 
          key="intro-cursor"
          spinDuration={2}
          hideDefaultCursor={true}
        />

        {/* LightRays WebGL Background */}
        <div style={{ 
          width: '100%', 
          height: '100%', 
          position: 'absolute', 
          top: 0, 
          left: 0,
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          willChange: 'transform'
        }}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#00ffff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8" style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}>
          <div className="text-center space-y-8">
            {/* Title */}
            <h1 className="text-6xl md:text-8xl font-black text-white mb-4 animate-fade-in drop-shadow-2xl" style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              willChange: 'opacity, transform'
            }}>
              Shishir Katakam
            </h1>
            <p className="text-2xl md:text-3xl text-white/80 mb-12 animate-fade-in drop-shadow-lg" style={{ 
              animationDelay: '0.2s',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              willChange: 'opacity, transform'
            }}>
              Portfolio
            </p>

            {/* Enter Button */}
            <button
              onClick={handleEnterSite}
              className="cursor-target group relative px-12 py-6 bg-white text-black rounded-full font-bold text-xl overflow-hidden hover:scale-110 transition-all duration-300 cursor-pointer animate-fade-in shadow-2xl"
              style={{ 
                animationDelay: '0.4s',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                willChange: 'opacity, transform'
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles size={24} />
                Enter
                <Rocket size={24} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-black">
      {/* TargetCursor - separate instance for main site */}
      <TargetCursor 
        key="main-cursor"
        spinDuration={2}
        hideDefaultCursor={true}
      />

      {/* Aurora Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
        {/* Overlay gradient for better contrast */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)', pointerEvents: 'none' }} />
      </div>
          
      {/* Floating Particles - Minimal */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/15 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${7 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
              willChange: 'transform'
            }}
          />
        ))}
      </div>

      {/* ElasticSlider - Responsive positioning for all devices */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:bottom-8 md:right-8 z-50 w-40 sm:w-48 md:w-64 pr-8 sm:pr-10 md:pr-16 overflow-visible">
        <ElasticSlider
          leftIcon={getVolumeIcon()}
          rightIcon={null}
          startingValue={0}
          defaultValue={50}
          maxValue={100}
          isStepped={false}
          stepSize={1}
          onValueChange={setVolumeLevel}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        
        {/* HERO SECTION - Epic Entrance */}
        <section className="min-h-0 md:min-h-screen flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 py-16 md:py-0 relative">
          
          {/* Animated Background Orbs - Optimized */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse will-change-transform" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse will-change-transform" style={{ animationDelay: '1s' }} />

          <div className="max-w-6xl mx-auto text-center relative">
            
            {/* Status Badge */}
            <FadeContent blur={false} duration={600} easing="ease-out" initialOpacity={0}>
              <div className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 mb-6 md:mb-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full cursor-target group hover:scale-105 transition-transform will-change-transform">
                <span className="relative flex h-3 w-3 mr-2 md:mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white/90"></span>
                </span>
                <Sparkles className="mr-1 md:mr-2 text-white/80" size={16} />
                <span className="text-white font-medium text-sm md:text-base">Open to Internships & Collaborations</span>
              </div>
            </FadeContent>

            {/* Main Name - Massive */}
            <FadeContent blur={false} duration={800} easing="ease-out" initialOpacity={0} delay={200}>
              <div style={{ position: 'relative', height: '180px', marginBottom: '3rem' }}>
                <TextPressure
                  text="Shishir Katakam"
                  flex={true}
                  alpha={false}
                  stroke={false}
                  width={true}
                  weight={true}
                  italic={true}
                  textColor="#ffffff"
                  strokeColor="#ff0000"
                  minFontSize={72}
                />
              </div>
            </FadeContent>

            {/* Headline */}
            <FadeContent blur={false} duration={500} easing="ease-out" initialOpacity={0} delay={400}>
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 md:mb-8 leading-tight">
                Building the{' '}
                <span className="relative inline-block text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white">
                  Future
                  <Star className="absolute -top-3 md:-top-4 -right-6 md:-right-8 text-white/60 animate-spin-slow" size={20} />
                </span>
                <br />
                with <span className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white">AI</span> & <span className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white">Innovation</span>
              </h2>
            </FadeContent>

            {/* Subtitle */}
            <FadeContent blur={false} duration={500} easing="ease-out" initialOpacity={0} delay={600}>
              <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed">
                Second-year <span className="font-bold text-white">IT student at MGIT</span>, passionate about transforming ideas into 
                <span className="text-white/90"> intelligent solutions</span> that make a real-world impact.
              </p>
            </FadeContent>

            {/* CTA Buttons */}
            <FadeContent blur={false} duration={500} easing="ease-out" initialOpacity={0} delay={800}>
              <div className="flex flex-row flex-nowrap justify-center gap-2 md:gap-6 mb-0 max-w-full px-4">
                <a href="mailto:shishirkatakam8@gmail.com" className="cursor-target group">
                  <div className="w-[110px] sm:w-[140px] md:w-auto relative px-3 py-3 md:px-8 md:py-4 bg-white text-black rounded-2xl font-bold text-xs sm:text-sm md:text-lg overflow-hidden group-hover:scale-105 transition-all hover:bg-white/90 text-center">
                    <span className="relative flex items-center justify-center">
                      <Mail className="mr-1 md:mr-2" size={14} />
                      <span className="hidden md:inline">Let's </span>Collab
                      <Sparkles className="ml-1 md:ml-2 hidden sm:inline" size={12} />
                    </span>
                  </div>
                </a>
                <a href="https://github.com/Shishir-Katakam" target="_blank" rel="noopener noreferrer" className="cursor-target group">
                  <div className="w-[110px] sm:w-[140px] md:w-auto px-3 py-3 md:px-8 md:py-4 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl font-bold text-xs sm:text-sm md:text-lg text-white hover:bg-white/20 hover:border-white/40 transition-all group-hover:scale-105 text-center">
                    <span className="flex items-center justify-center">
                      <Github className="mr-1 md:mr-2" size={14} />
                      GitHub
                    </span>
                  </div>
                </a>
                <a href="https://linkedin.com/in/shishir-katakam" target="_blank" rel="noopener noreferrer" className="cursor-target group">
                  <div className="w-[110px] sm:w-[140px] md:w-auto px-3 py-3 md:px-8 md:py-4 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl font-bold text-xs sm:text-sm md:text-lg text-white hover:bg-white/20 hover:border-white/40 transition-all group-hover:scale-105 text-center">
                    <span className="flex items-center justify-center">
                      <Linkedin className="mr-1 md:mr-2" size={14} />
                      LinkedIn
                    </span>
                  </div>
                </a>
              </div>
            </FadeContent>

          </div>
        </section>

        {/* FEATURED PROJECTS - Compact & Clean */}
        <section className="px-8 md:px-16 lg:px-24 py-12 md:py-20 lg:py-32 relative">
          
          <div className="max-w-7xl mx-auto">
            <FadeContent blur={false} duration={500} easing="ease-out" initialOpacity={0}>
              <div className="text-left mb-8 md:mb-12 lg:mb-16">
                <span className="inline-block px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/90 text-sm font-semibold mb-4">
                  FEATURED WORK
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 md:mb-6 flex items-center">
                  <Rocket className="mr-4 md:mr-6 text-white/90" size={48} />
                  Flagship Projects
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl">
                  Production-ready applications serving real users and solving real problems.
                </p>
              </div>
            </FadeContent>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {featuredProjects.map((project, index) => (
                <FadeContent key={index} blur={false} duration={600} easing="ease-out" initialOpacity={0} delay={300 + index * 200}>
                  <a href={project.href} target="_blank" rel="noopener noreferrer" className="block cursor-target group">
                    <div className="relative h-[220px] sm:h-[210px] md:h-[200px] w-full">
                      <GlassBorder color={project.color}>
                        <div className="relative w-full h-[220px] sm:h-[210px] md:h-[200px]">
                          <PixelCard variant={project.color} className="cursor-pointer">
                            <div className="relative z-10 p-4 flex flex-col justify-between h-full">
                              <div>
                                <div className="flex items-center mb-2">
                                  <project.icon className="mr-2 text-white" size={22} />
                                  <h3 className="text-xl font-black text-white group-hover:scale-105 transition-transform origin-left">
                                    {project.title}
                                  </h3>
                                </div>
                                <p className="text-white/70 text-sm leading-snug mb-2">
                                  {project.description}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {project.tech.map((tech, i) => (
                                    <span key={i} className="px-1.5 py-0.5 bg-white/20 backdrop-blur-xl border border-white/30 rounded text-white text-[8px] md:text-[10px] font-semibold">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                                <div className="inline-block px-3 py-2 md:px-4 md:py-2 bg-white/30 backdrop-blur-xl border-2 border-white/50 rounded-lg">
                                  <span className="text-white text-xs md:text-sm font-black flex items-center">
                                    Click here to visit
                                    <span className="ml-2 text-base">→</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </PixelCard>
                        </div>
                      </GlassBorder>
                    </div>
                  </a>
                </FadeContent>
              ))}
            </div>
          </div>
        </section>

        {/* INNOVATIVE PROJECTS - Asymmetric Grid */}
        <section className="px-8 md:px-16 lg:px-24 py-12 md:py-20 lg:py-32 relative">
          <div className="max-w-7xl mx-auto">
            <FadeContent blur={false} duration={500} easing="ease-out" initialOpacity={0}>
              <div className="text-right mb-8 md:mb-12 lg:mb-16">
                <span className="inline-block px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/90 text-sm font-semibold mb-4">
                  INNOVATION LAB
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 md:mb-6 flex items-center justify-end">
                  Experimental Projects
                  <Terminal className="ml-4 md:ml-6 text-white/90" size={48} />
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl ml-auto">
                  Pushing boundaries with cutting-edge tech and creative solutions.
                </p>
              </div>
            </FadeContent>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {innovativeProjects.map((project, index) => (
                <FadeContent key={index} blur={false} duration={500} easing="ease-out" initialOpacity={0} delay={200 + index * 100}>
                  <div className={`cursor-target group ${index === 0 ? 'md:col-span-2' : ''}`}>
                    <div className="relative h-full">
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-2xl blur-xl transition-opacity duration-500"></div>
                      <div className="relative p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/30 transition-all h-full group-hover:scale-105 will-change-transform flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                          <project.icon className="text-white" size={18} />
                          <div className="px-2 py-0.5 bg-white/20 backdrop-blur-xl rounded-full text-white text-[9px] font-bold">
                            {project.impact}
                          </div>
                        </div>
                        <h3 className="text-sm font-black text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-white/70 text-xs leading-relaxed mb-3 flex-grow">{project.description}</p>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {project.tech.map((tech, i) => (
                            <span key={i} className="px-2 py-0.5 bg-white/10 border border-white/20 rounded text-white/90 text-[9px] font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="text-white/50 text-[9px] font-medium">{project.date}</div>
                      </div>
                    </div>
                  </div>
                </FadeContent>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE - Timeline */}
        <section className="px-8 md:px-16 lg:px-24 py-12 md:py-20 lg:py-32 relative">
          <div className="max-w-7xl mx-auto">
            <FadeContent blur={false} duration={500} easing="ease-out" initialOpacity={0}>
              <div className="text-center mb-10 md:mb-16 lg:mb-20">
                <span className="inline-block px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/90 text-sm font-semibold mb-4">
                  PROFESSIONAL JOURNEY
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 md:mb-6">
                  <Briefcase className="inline-block mr-4 md:mr-6 text-white/90" size={48} />
                  Experience
                </h2>
              </div>
            </FadeContent>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {internships.map((internship, index) => {
                const content = (
                  <FadeContent key={index} blur={false} duration={500} easing="ease-out" initialOpacity={0} delay={200 + index * 150}>
                    <div className="relative cursor-target group">
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-2xl blur-xl transition-opacity duration-500"></div>
                      <div className="relative p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/30 transition-all group-hover:scale-105 will-change-transform h-full flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                          <div className="p-2 bg-white/10 backdrop-blur-xl rounded-lg">
                            <internship.icon className="text-white" size={20} />
                          </div>
                          {internship.certified && (
                            <div className="px-2 py-0.5 bg-white/20 border border-white/30 rounded-full text-white text-[9px] font-bold">
                              UBER
                            </div>
                          )}
                        </div>
                        <h3 className="text-base font-black text-white mb-1">{internship.title}</h3>
                        <div className="text-xs font-bold text-white/80 mb-1">
                          {internship.company}
                        </div>
                        <div className="text-white/50 text-[10px] font-medium mb-3">{internship.date}</div>
                        <p className="text-white/70 text-xs leading-relaxed mb-3 flex-grow">{internship.description}</p>
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-1.5">
                            {internship.skills.map((skill, i) => (
                              <span key={i} className="px-2 py-0.5 bg-white/10 border border-white/20 rounded text-white text-[9px] md:text-[10px] font-medium">
                                {skill}
                              </span>
                            ))}
                          </div>
                          {internship.href && (
                            <div className="inline-block px-3 py-2 bg-white/30 backdrop-blur-xl border-2 border-white/50 rounded-lg mt-2">
                              <span className="text-white text-xs md:text-sm font-black flex items-center">
                                Click here to view
                                <span className="ml-2 text-base">→</span>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </FadeContent>
                );

                return internship.href ? (
                  <a key={index} href={internship.href} target="_blank" rel="noopener noreferrer" className="block">
                    {content}
                  </a>
                ) : (
                  <div key={index}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SKILLS - Interactive Grid */}
        <section className="px-8 md:px-16 lg:px-24 py-12 md:py-20 lg:py-32 relative">
          <div className="max-w-7xl mx-auto">
            <FadeContent blur={false} duration={500} easing="ease-out" initialOpacity={0}>
              <div className="text-left mb-12">
                <span className="inline-block px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/90 text-sm font-semibold mb-4">
                  TECH ARSENAL
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                  <Brain className="inline-block mr-4 text-white/90" size={48} />
                  Skills & Expertise
                </h2>
              </div>
            </FadeContent>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {Object.entries(skills).map(([level, skillList], index) => (
                <FadeContent key={level} blur={false} duration={500} easing="ease-out" initialOpacity={0} delay={200 + index * 100}>
                  <div className="cursor-target group">
                    <div className="relative h-full">
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-xl blur-lg transition-opacity duration-500"></div>
                      <div className="relative p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all h-full group-hover:scale-105 will-change-transform">
                        <div className="text-sm font-black text-white mb-2">
                          {level}
                        </div>
                        <div className="space-y-1.5">
                          {skillList.map((skill, i) => (
                            <div key={i} className="flex items-center text-[10px]">
                              <div className="w-1 h-1 bg-white/60 rounded-full mr-1.5"></div>
                              <span className="text-white/80 font-medium">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeContent>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS - Split Layout */}
        <section className="px-8 md:px-16 lg:px-24 py-12 md:py-20 lg:py-32 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Education */}
              <FadeContent blur={false} duration={500} easing="ease-out" initialOpacity={0}>
                <div>
                  <span className="inline-block px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/90 text-sm font-semibold mb-6">
                    EDUCATION
                  </span>
                  <h2 className="text-3xl font-black text-white mb-8 flex items-center">
                    <GraduationCap className="mr-3 text-white/90" size={36} />
                    Academic Path
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="cursor-target group">
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-xl blur-lg transition-opacity duration-500"></div>
                        <div className="relative p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all group-hover:scale-105 will-change-transform">
                          <div className="flex items-start justify-between mb-1">
                            <div className="flex-1">
                              <h3 className="text-sm font-black text-white mb-0.5">
                                MGIT
                              </h3>
                              <p className="text-xs text-white/90 font-bold">
                                B.Tech in IT
                              </p>
                            </div>
                            <span className="px-2 py-0.5 bg-white/20 border border-white/30 rounded-full text-white text-[9px] font-bold whitespace-nowrap">
                              Ongoing
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="cursor-target group">
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-xl blur-lg transition-opacity duration-500"></div>
                        <div className="relative p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all group-hover:scale-105 will-change-transform">
                          <h3 className="text-sm font-black text-white mb-0.5">
                            UoH Kendriya Vidyalaya
                          </h3>
                          <p className="text-xs text-white/70 mb-0.5">Schooling</p>
                          <p className="text-white/50 text-[10px] font-medium">2012 - 2022</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeContent>

              {/* Certifications */}
              <FadeContent blur={false} duration={500} easing="ease-out" initialOpacity={0} delay={200}>
                <div>
                  <span className="inline-block px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/90 text-sm font-semibold mb-6">
                    CREDENTIALS
                  </span>
                  <h2 className="text-3xl font-black text-white mb-8 flex items-center">
                    <Award className="mr-3 text-white/90" size={36} />
                    Certifications
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {certifications.map((cert, i) => {
                      const content = (
                        <div className="relative">
                          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-lg blur-lg transition-opacity duration-500"></div>
                          <div className="relative p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all h-full group-hover:scale-105 will-change-transform">
                            <h4 className="text-white font-bold text-[11px] mb-1 leading-tight line-clamp-1">{cert.name}</h4>
                            <p className="text-white/50 text-[10px] font-medium mb-2">{cert.org}</p>
                            {cert.href && (
                              <div className="inline-block px-2 py-1 bg-white/20 backdrop-blur-xl border border-white/30 rounded">
                                <p className="text-white text-[9px] font-bold">Click here to view →</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );

                      return cert.href ? (
                        <a key={i} href={cert.href} target="_blank" rel="noopener noreferrer" className="cursor-target group block">
                          {content}
                        </a>
                      ) : (
                        <div key={i} className="cursor-target group">
                          {content}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </FadeContent>
            </div>
          </div>
        </section>


        {/* Footer */}
        <footer className="px-8 py-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-white/50 text-sm">
              © 2025 Shishir Katakam. Crafted with <span className="text-red-400">♥</span> and lots of <Coffee className="inline" size={14} />
            </p>
        </div>
        </footer>

      </div>

      <style>{`
        /* Performance optimizations for 120 FPS */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* GPU-accelerated animations */
        @keyframes float {
          0%, 100% { 
            transform: translate3d(0, 0, 0);
            will-change: transform;
          }
          50% { 
            transform: translate3d(0, -20px, 0);
            will-change: transform;
          }
        }
        
        @keyframes gradient {
          0%, 100% { 
            background-position: 0% 50%;
          }
          50% { 
            background-position: 100% 50%;
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
            will-change: transform, opacity;
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            will-change: auto;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale3d(1, 1, 1);
            opacity: 0.3;
            will-change: transform, opacity;
          }
          50% {
            transform: scale3d(1.1, 1.1, 1);
            opacity: 0.5;
            will-change: transform, opacity;
          }
        }
        
        /* Optimized animation classes */
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
          will-change: background-position;
        }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
          will-change: transform;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          opacity: 0;
        }
        
        .will-change-transform {
          will-change: transform;
        }

        /* Enable hardware acceleration */
        .group, .cursor-target, [class*="hover:"] {
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Optimize transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Reduce motion for accessibility while maintaining performance */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Index;

