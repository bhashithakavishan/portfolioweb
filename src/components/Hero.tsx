import { useState, useEffect, useMemo } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const titles = useMemo(
    () => ["Creative Designer", "Marketing Manager", "Digital Strategist", "UI/UX Designer"],
    []
  );
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);
  const navigate = useNavigate();

  // Typing animation logic
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handleTyping = () => {
      const currentTitle = titles[index];

      if (!isDeleting) {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
        setSpeed(100);

        if (displayText === currentTitle) {
          setSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
        setSpeed(50);

        if (displayText === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % titles.length);
          setSpeed(500);
        }
      }
    };

    timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, speed, titles]);

  const scrollToPortfolio = () => {
    navigate("/works");
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-[85vh] flex flex-col items-center pt-12 sm:pt-16 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden font-sans"
    >
      {/* 1. TOP HEADER SECTION */}
      <div className="relative text-center z-20 px-4">
        {/* Hello Bubble */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.5 },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative inline-flex items-center justify-center mb-6 lg:mb-8 transform-gpu"
        >
          <span className="px-8 py-2 border border-slate-800 dark:border-slate-300 rounded-full text-slate-900 dark:text-slate-100 font-medium bg-white dark:bg-slate-900 transition-colors">
            Hello!
          </span>
          <svg
            className="absolute -top-5 -right-6 w-8 h-8 text-brand dark:text-blue-400"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 20C15 10 25 5 35 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M20 30C25 20 32 15 40 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl md:text-[75px] font-bold text-slate-900 dark:text-white leading-[1.1] relative">
          I'm <span className="text-brand dark:text-blue-500">Bhashitha</span>,<br />
          <span className="inline-block min-h-[1.2em]">
            {displayText}
            <span className="inline-block w-1 h-10 md:h-14 bg-blue-500 ml-1 align-middle animate-pulse" />
          </span>

          {/* Decorative SVG */}
          <svg
            className="absolute -left-10 bottom-2 md:-left-16 md:bottom-6 w-12 h-12 md:w-16 md:h-16 text-brand dark:text-blue-400 opacity-50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M45 10C35 15 20 20 10 30" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M40 25C30 30 20 35 12 45" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M25 5C15 10 8 20 5 30" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        </h1>
      </div>

      {/* 2. MIDDLE VISUAL & SIDE CONTENT */}
      <div className="relative w-full max-w-[1400px] flex-1 flex justify-center items-end mt-8 lg:mt-0 min-h-[420px] pb-8 md:pb-12 transform-gpu">
        {/* Backdrop */}
        <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 w-[150%] sm:w-[850px] md:w-[950px] h-[300px] md:h-[420px] bg-brand dark:bg-blue-600 rounded-t-full z-0 will-change-transform" />

        {/* Central Hero Image */}
        <motion.img
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          src="/images/img.webp"
          alt="Bhashitha"
          className="relative z-10 h-[380px] md:h-[520px] lg:h-[620px] object-cover object-bottom transform-gpu will-change-transform -translate-y-8 md:-translate-y-12"
        />

        {/* Side Elements */}
        <div className="hidden lg:block absolute left-10 xl:left-20 top-1/4 z-10 max-w-[320px]">
          <div className="text-[#334155] dark:text-slate-600 text-7xl font-serif leading-none mb-[-10px]">"</div>
          <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed">
            Crafting visual stories that inspire and engage.
            <br />
            Specializing in Branding, Creative Design,
            <br />
            Digital Marketing, and Digital Experiences
          </p>
        </div>

        <div className="hidden lg:flex absolute right-10 xl:right-20 top-1/4 z-10 flex-col items-end">
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-brand dark:fill-blue-400 text-brand dark:text-blue-400" />
            ))}
          </div>
          <h3 className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">05 Years+</h3>
          <p className="text-slate-600 dark:text-slate-300 text-lg font-medium mt-1">Experience</p>
        </div>

        {/* 3. BOTTOM GLASSMORPHISM BUTTONS */}
        <div className="absolute bottom-20 md:bottom-32 left-1/2 -translate-x-1/2 z-30 w-auto transform-gpu">
          <div className="flex items-center justify-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-slate-100/40 dark:bg-slate-900/50 backdrop-blur-md border border-white/40 dark:border-slate-700/50 shadow-2xl transition-colors">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToPortfolio}
              className="px-4 sm:px-8 md:px-12 py-2 sm:py-3 bg-white dark:bg-slate-800 text-brand dark:text-blue-400 rounded-full font-bold text-sm sm:text-base shadow-sm whitespace-nowrap"
            >
              Portfolio
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToContact}
              className="px-4 sm:px-8 md:px-12 py-2 sm:py-3 bg-transparent text-slate-800 dark:text-white rounded-full font-bold text-sm sm:text-base hover:bg-white/10 whitespace-nowrap"
            >
              Hire me
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
