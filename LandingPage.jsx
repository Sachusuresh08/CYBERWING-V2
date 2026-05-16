import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
  viewport: { once: true, amount: 0.2 }
};

const NumberCounter = ({ targetValue, suffix = "", prefix = "", label, index = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 2000;
        const end = parseFloat(targetValue);
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const easeOut = progress * (2 - progress);
          setCount(start + (end - start) * easeOut);

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            setCount(end);
          }
        };
        requestAnimationFrame(updateCounter);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [targetValue]);

  const isFloat = targetValue.toString().includes('.');
  const formattedCount = isFloat ? count.toFixed(1) : Math.floor(count);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.2 }}
      ref={ref} 
      className="flex flex-col items-center p-8 bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 rounded-[2.5rem] border border-white/80 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-indigo-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <span className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-blue-500 z-10">
        {prefix}{formattedCount}{suffix}
      </span>
      <span className="text-indigo-400/80 mt-4 text-sm md:text-base uppercase tracking-[0.2em] font-semibold text-center z-10">
        {label}
      </span>
    </motion.div>
  );
};

const StickySection = () => {
  return (
    <section className="py-32 relative bg-transparent flex flex-col gap-32">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
        className="relative flex flex-col items-center text-center px-6 w-full max-w-5xl mx-auto"
      >
        <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-slate-900 mb-8 drop-shadow-2xl">Mission</h2>
        <p className="text-xl md:text-3xl text-slate-600 font-light leading-relaxed">
          To proactively defend our digital ecosystem through intelligent analysis, rapid response, and unwavering dedication to security.
        </p>
      </motion.div>

      {/* Vision */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
        className="relative flex flex-col items-center text-center px-6 w-full max-w-5xl mx-auto"
      >
        <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-slate-900 mb-8 drop-shadow-2xl">Vision</h2>
        <p className="text-xl md:text-3xl text-slate-600 font-light leading-relaxed">
          A secure digital future where innovation thrives without fear of compromise, empowered by advanced threat intelligence.
        </p>
      </motion.div>
    </section>
  );
};


const CryptoNetwork = () => {
  const { scrollY } = window.motion ? { scrollY: window.useScroll().scrollY } : { scrollY: { get: () => 0, onChange: () => {} } };
  const y1 = window.useTransform ? window.useTransform(scrollY, [0, 3000], [0, -800]) : 0;
  const y2 = window.useTransform ? window.useTransform(scrollY, [0, 3000], [0, 400]) : 0;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 mix-blend-multiply">
      <motion.svg width="100%" height="200%" style={{ y: y1 }} className="absolute top-0 left-0" viewBox="0 0 1000 2000" preserveAspectRatio="xMidYMid slice">
        <path d="M 100 200 L 300 100 L 400 300 L 200 500 Z" stroke="#a5b4fc" strokeWidth="1" fill="none" />
        <path d="M 400 300 L 600 200 L 800 400 L 700 700 L 300 600 Z" stroke="#c7d2fe" strokeWidth="1" fill="none" />
        <path d="M 700 700 L 900 800 L 800 1100 L 400 900 Z" stroke="#a5b4fc" strokeWidth="1" fill="none" />
        <circle cx="300" cy="100" r="4" fill="#818cf8" />
        <circle cx="400" cy="300" r="5" fill="#6366f1" />
        <circle cx="600" cy="200" r="3" fill="#818cf8" />
        <circle cx="800" cy="400" r="6" fill="#6366f1" />
        <circle cx="700" cy="700" r="4" fill="#818cf8" />
        <circle cx="900" cy="800" r="3" fill="#a5b4fc" />
        <circle cx="800" cy="1100" r="5" fill="#6366f1" />
        <circle cx="400" cy="900" r="4" fill="#818cf8" />
      </motion.svg>
      <motion.svg width="100%" height="200%" style={{ y: y2 }} className="absolute top-0 right-0 opacity-50" viewBox="0 0 1000 2000" preserveAspectRatio="xMidYMid slice">
        <path d="M 800 100 L 900 300 L 700 400 L 600 200 Z" stroke="#a5b4fc" strokeWidth="1" fill="none" />
        <path d="M 700 400 L 500 500 L 400 800 L 600 900 Z" stroke="#c7d2fe" strokeWidth="1" fill="none" />
        <circle cx="900" cy="300" r="5" fill="#6366f1" />
        <circle cx="700" cy="400" r="3" fill="#818cf8" />
        <circle cx="400" cy="800" r="6" fill="#6366f1" />
        <circle cx="600" cy="900" r="4" fill="#818cf8" />
      </motion.svg>
    </div>
  );
};

export default function LandingPage() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
      const sections = ['home', 'services', 'collaborators', 'awareness', 'team', 'report-incident'];
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bentoItems = [
    { title: "Phishing Scams", desc: "Deceptive emails designed to steal your credentials." },
    { title: "Strong Passwords & 2FA", desc: "Your password is a key to your digital life." },
    { title: "Public Wi-Fi Risks", desc: "Unsecured public networks are a hunting ground." },
    { title: "Mobile Security", desc: "Your phone contains a wealth of personal data." },
    { title: "Cloud Security", desc: "While convenient, cloud services need strong security." },
    { title: "Social Engineering", desc: "Attackers manipulate human psychology rather than code." },
    { title: "Ransomware Protection", desc: "Malicious software locks your files until a ransom is paid." },
    { title: "Secure Remote Work", desc: "Working from home introduces new security challenges." },
    { title: "IoT Device Security", desc: "Smart devices can be weak points in your network." },
    { title: "Recognizing Scams", desc: "Scammers constantly invent new ways to trick you." }
  ];

  const services = [
    {
      title: "Incident Response",
      desc: "Our 24/7 rapid response team mitigates threats in real-time to minimize impact and restore operations swiftly.",
      img: "./images/incident report.jpeg"
    },
    {
      title: "Threat Intelligence",
      desc: "Stay ahead of attackers with proactive threat hunting and intelligence powered by our global network.",
      img: "./images/threat intelligence.jpeg"
    },
    {
      title: "Risk Assessment",
      desc: "Identify vulnerabilities in your infrastructure with our in-depth analysis and actionable security roadmaps.",
      img: "./images/risk asscessment.jpeg"
    },
    {
      title: "Security Training",
      desc: "Empower your team to be your first line of defense with our engaging and effective awareness programs.",
      img: "./images/security training.jpeg"
    }
  ];

  const teamMembers = [
    { name: "Dr. Rosna P Haroon", role: "Director", desc: "Cyber Wing ICET" },
    { name: "Nurjahan V A", role: "Advisor", desc: "Cyber Wing ICET" },
    { name: "Haseena M K", role: "Advisor", desc: "Cyber Wing ICET" },
    { name: "Abhiram S", role: "senior Analyst & Lead (Website)", cert: "" },
    { name: "Sachu Suresh", role: "senior Analyst & Lead (Technical)", cert: "" },
    { name: "Joel Johnson", role: "senior Analyst & Lead (Design)", cert: "" },
    { name: "Alvin Biju", role: "senior Analyst & Lead (Documentation)", cert: "" },
    { name: "Aman Krishna K M", role: "Junior Analyst & Co-Lead (Design)", cert: "" },
    { name: "Hasseb P H", role: "Junior Analyst & Co-Lead (Design)", cert: "" },
    { name: "Amar Ashique", role: "Junior Analyst & Co-Lead (Design)", cert: "" },
    { name: "Muhammed Thaha", role: "Junior Analyst & Co-Lead (Design)", cert: "" },
    { name: "Alshifa Rajeesh", role: "Junior Analyst & Co-Lead (Design)", cert: "" },
    { name: "Aparna J Nair", role: "Junior Analyst & Co-Lead (Design)", cert: "" }
  ];

  return (
    <div className="bg-transparent text-slate-700 min-h-screen font-sans selection:bg-indigo-500/30 selection:text-indigo-900 overflow-x-hidden">
      <CryptoNetwork />

      {/* 1. Glassmorphism Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${navScrolled ? 'bg-transparent/50 backdrop-blur-md border-slate-200 py-4' : 'bg-transparent border-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="./images/logo.png" alt="CyberWing Logo" className="h-12 w-auto object-contain" />
            <div className="text-xl font-bold tracking-widest text-slate-900">CYBERWING</div>
          </div>
          <div className="hidden md:flex space-x-10 text-sm font-medium tracking-wide">
            {['Home', 'Services', 'Collaborators', 'Awareness', 'Report Incident'].map((item) => {
              const id = item.toLowerCase().replace(' ', '-');
              const isActive = activeSection === id;
              return (
                <a 
                  key={item} 
                  href={`#${id}`} 
                  className={`transition-all duration-500 hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] ${
                    isActive 
                      ? 'text-indigo-500 font-bold scale-110 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                      : 'text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {item}
                </a>
              );
            })}
          </div>
          <button className="md:hidden text-slate-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Cinematic Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-white to-white"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
            className="font-['Teko'] uppercase text-7xl md:text-9xl lg:text-[14rem] font-bold tracking-normal text-slate-800 leading-[0.8] mb-8"
          >
            {/* Staggered text reveal */}
            <motion.span className="inline-block mr-4 md:mr-8" variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } } }}>CYBER</motion.span>
            <motion.span className="inline-block mr-4 md:mr-8" variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } } }}>WING</motion.span>
            <motion.span className="inline-block" variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } } }}>ICET</motion.span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-xl md:text-3xl font-light text-slate-500 mb-12 tracking-wide font-sans"
          >
            Intelligent Defense for the Digital Age.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-indigo-400 font-semibold text-lg md:text-xl uppercase tracking-[0.3em]"
          >
            We provide 24/7 Incident Response.
          </motion.p>
        </div>


      </section>

      {/* 3. Sticky Scroll Section (Mission & Vision) */}
      <StickySection />

      {/* 4. Comprehensive Protection Suite */}
      <section id="services" className="py-40 px-6 bg-transparent relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-32">
            <motion.h2 {...fadeUp} className="font-['Teko'] text-6xl md:text-8xl lg:text-9xl font-semibold mb-6 text-slate-800 tracking-wide uppercase leading-none">Our Solutions:<br /><span className="text-indigo-400">Comprehensive Protection Suite.</span></motion.h2>
            <motion.p {...fadeUp} className="text-xl text-slate-600 max-w-3xl mx-auto font-light">We offer a full spectrum of services designed to protect your digital assets at every level.</motion.p>
          </div>

          <div className="space-y-32 md:space-y-48">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotate: index % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }}
                className={`flex flex-col md:flex-row items-center gap-16 lg:gap-32 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 w-full h-[300px] md:h-[500px] bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 rounded-[3rem] border border-white/80 relative overflow-hidden group">
                  {service.img ? (
                    <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border border-indigo-300/10 rounded-full rotate-45 group-hover:rotate-90 transition-transform duration-1000"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 border border-indigo-200/20 rounded-full -rotate-45 group-hover:-rotate-90 transition-transform duration-1000 delay-100"></div>
                    </>
                  )}
                </div>
                <div className="flex-1 space-y-8">
                  <div className="text-indigo-400 text-sm font-bold tracking-[0.3em] uppercase">0{index + 1}</div>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">{service.title}</h3>
                  <p className="text-xl text-slate-600 font-light leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Impact Metrics */}
      <section className="py-40 px-6 bg-transparent border-y border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div {...fadeUp} className="text-center mb-24">
            <h2 className="font-['Teko'] text-6xl md:text-8xl lg:text-9xl font-semibold mb-6 text-slate-800 tracking-wide uppercase leading-none">Our Impact In Numbers</h2>
            <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <NumberCounter index={0} targetValue="99.8" suffix="%" label="Threats Neutralized" />
            <NumberCounter index={1} targetValue="500" suffix="+" label="Clients Protected" />
            <NumberCounter index={2} targetValue="24" suffix=" x 7" label="Monitoring" />
            <NumberCounter index={3} targetValue="15" suffix=" Min" label="Response Time" />
          </div>
        </div>
      </section>

      {/* 6. Collaborators */}
      <section id="collaborators" className="py-40 px-6 bg-transparent text-center">
        <motion.h2 {...fadeUp} className="font-['Teko'] text-4xl md:text-6xl font-medium text-slate-500 mb-16 uppercase tracking-widest">
          Our Partners - Trusted By Industry Leaders
        </motion.h2>
        <motion.div {...fadeUp} className="flex justify-center items-center">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-indigo-400 blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
            <h3 className="text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-800 group-hover:from-slate-900 group-hover:to-cyan-400 transition-all duration-700 relative z-10">
              FaceIn
            </h3>
          </div>
        </motion.div>
      </section>

      {/* 7. Cyber Awareness Hub */}
      <section id="awareness" className="py-40 px-6 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <motion.h2 {...fadeUp} className="font-['Teko'] text-6xl md:text-8xl lg:text-9xl font-semibold mb-6 text-slate-800 tracking-wide uppercase leading-none">Knowledge is Power:<br /><span className="text-indigo-400">Cyber Awareness Hub</span></motion.h2>
            <motion.p {...fadeUp} className="text-xl text-slate-600 max-w-2xl font-light">Stay informed with essential security tips to protect your digital life at work and at home.</motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bentoItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index % 4) * 0.1, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.1 }}
                className={`group relative p-10 rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/80 hover:border-indigo-300 hover:bg-white/90 transition-all duration-500 cursor-pointer overflow-hidden ${index === 0 || index === 5 ? 'md:col-span-2 lg:col-span-2' : ''}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 h-full flex flex-col">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 flex-grow font-light text-lg">{item.desc}</p>
                  <div className="mt-12 flex items-center text-indigo-400 text-sm font-semibold tracking-widest uppercase group-hover:text-cyan-300 transition-colors">
                    Click to know more
                    <svg className="w-5 h-5 ml-3 transform group-hover:translate-x-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Team Section */}
      <section id="team" className="py-40 px-6 bg-transparent relative border-t border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-24 text-center">
            <motion.h2 {...fadeUp} className="font-['Teko'] text-6xl md:text-8xl lg:text-9xl font-semibold mb-6 text-slate-800 tracking-wide uppercase leading-none">Meet The<br /><span className="text-indigo-400">Experts</span></motion.h2>
            <motion.p {...fadeUp} className="text-xl text-slate-600 max-w-3xl mx-auto font-light">We are a dedicated team of certified cybersecurity professionals, researchers, and academic leaders from Ilahia College of Engineering and Technology, committed to safeguarding your digital future.</motion.p>
          </div>

          <div className="flex flex-col space-y-24">
            {[
              { id: 'director', members: teamMembers.slice(0, 1), className: "grid grid-cols-1 max-w-sm mx-auto w-full gap-8" },
              { id: 'advisors', members: teamMembers.slice(1, 3), className: "grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto w-full gap-8" },
              { id: 'leads', members: teamMembers.slice(3, 7), className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-8" },
              { id: 'coleads', members: teamMembers.slice(7), className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl mx-auto gap-8" }
            ].map((tier, tierIndex) => (
              <div key={tier.id} className={tier.className}>
                {tier.members.map((member, index) => (
                  <motion.div
                    key={`${tier.id}-${index}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.1 }}
                    className="group relative p-8 rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/80 hover:border-indigo-300 hover:bg-white/90 transition-all duration-500 overflow-hidden flex flex-col items-center text-center"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="w-20 h-20 mb-6 rounded-full bg-slate-100 border border-indigo-300/20 flex items-center justify-center group-hover:border-indigo-200 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-indigo-400/10 group-hover:bg-indigo-400/20 transition-colors"></div>
                      <span className="text-2xl font-light text-indigo-300">{member.name.charAt(0)}</span>
                    </div>

                    <div className="relative z-10 w-full flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                      <p className="text-indigo-400 font-semibold text-xs tracking-wide uppercase mb-3">{member.role}</p>

                      {member.cert && (
                        <div className="mt-auto pt-4 border-t border-slate-200">
                          <p className="text-xs text-slate-600 tracking-wider uppercase font-light"><span className="text-emerald-400/80 mr-1">✦</span> {member.cert}</p>
                        </div>
                      )}
                      {member.desc && (
                        <div className="mt-auto pt-4 border-t border-slate-200">
                          <p className="text-xs text-slate-600 tracking-wider uppercase font-light">{member.desc}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Emergency Incident Report */}
      <section id="report-incident" className="py-40 bg-transparent relative border-t border-red-900/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-50 via-white to-white pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.h2 {...fadeUp} className="font-['Teko'] text-6xl md:text-8xl lg:text-9xl font-semibold mb-6 text-red-600 tracking-wide uppercase leading-none drop-shadow-[0_0_15px_rgba(220,38,38,0.2)]">Emergency: Report a Security Incident</motion.h2>
          <motion.p {...fadeUp} className="text-xl text-red-800/60 mb-20 font-light max-w-2xl mx-auto">If you're experiencing a breach, provide as much detail as possible. Our team will contact you immediately.</motion.p>

          <motion.form {...fadeUp} className="max-w-md mx-auto space-y-16 text-left">
            <div className="relative group">
              <input
                type="text"
                id="fullName"
                placeholder=" "
                className="block w-full bg-transparent border-b border-red-200 text-slate-900 py-4 text-lg focus:outline-none focus:border-red-500 transition-colors peer"
              />
              <label htmlFor="fullName" className="absolute left-0 -top-6 text-xs text-red-600/80 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-xs peer-focus:text-red-500">
                Full Name *
              </label>
            </div>
            <div className="relative group">
              <input
                type="text"
                id="contact"
                placeholder=" "
                className="block w-full bg-transparent border-b border-red-200 text-slate-900 py-4 text-lg focus:outline-none focus:border-red-500 transition-colors peer"
              />
              <label htmlFor="contact" className="absolute left-0 -top-6 text-xs text-red-600/80 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-xs peer-focus:text-red-500">
                Email or Phone Number *
              </label>
            </div>
            <button
              type="button"
              className="w-full py-6 mt-8 bg-transparent border border-red-300 text-red-500 font-bold tracking-[0.4em] uppercase hover:bg-red-600 hover:text-slate-900 transition-all duration-500 hover:shadow-[0_0_40px_rgba(220,38,38,0.6)]"
            >
              Next
            </button>
          </motion.form>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="bg-slate-100 pt-32 pb-12 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <img src="./images/logo.png" alt="CyberWing Logo" className="h-16 w-auto object-contain" />
                <div className="text-3xl font-bold tracking-[0.2em] text-slate-900">CYBERWING</div>
              </div>
              <p className="text-slate-9000 max-w-md leading-relaxed font-light text-lg">
                Intelligent Defense, backed by academic excellence from Ilahia College of Engineering and Technology, Muvattupuzha.
              </p>
            </div>

            <div>
              <h4 className="text-slate-900 font-semibold mb-8 tracking-widest uppercase text-sm">Services</h4>
              <ul className="space-y-6 text-slate-600 text-sm font-light">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Incident Response</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Threat Intelligence</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Risk Assessment</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Security Training</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-slate-900 font-semibold mb-8 tracking-widest uppercase text-sm">Company</h4>
              <ul className="space-y-6 text-slate-600 text-sm font-light">
                <li><a href="#home" className="hover:text-indigo-400 transition-colors">Home</a></li>
                <li><a href="#team" className="hover:text-indigo-400 transition-colors">Our Team</a></li>
                <li><a href="#report-incident" className="hover:text-indigo-400 transition-colors">Report Incident</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Social Media</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-12 flex flex-col md:flex-row justify-between items-center text-sm text-slate-600 tracking-wider font-light">
            <p>© 2026 CyberWing | All Rights Reserved.</p>
            <p className="mt-4 md:mt-0 text-center">Developed by Sachu Suresh, Website Team, Cyber Wing</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
