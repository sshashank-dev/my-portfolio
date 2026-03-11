import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDownRight } from 'react-icons/fi';

const About = () => {
    const [identity, setIdentity] = useState({
        tagline: "Merging logic with aesthetics.",
        resumeLink: "/resume.pdf" // Default fallback to public folder
    });

    useEffect(() => {
        // 1. Check if we have an environment variable, otherwise use your Render URL
        const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://my-portfolio-2cb8.onrender.com';

        fetch(`${apiBase}/identity`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setIdentity(prev => ({
                        ...prev,
                        ...data,
                        resumeLink: data.resumeLink || "/resume.pdf"
                    }));
                }
            })
            .catch(err => console.error("Identity fetch error:", err));
    }, []);

    const transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] };

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    return (
        <motion.section
            id="about"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={transition}
            className="relative w-full bg-black text-white px-6 md:px-16 py-32 font-sans border-t border-white/10 scroll-mt-20 min-h-screen"
        >
            <div className="max-w-[1400px] mx-auto">

                {/* 1. HEADLINE */}
                <div className="border-b border-white/10 pb-10 mb-20 overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        className="text-[12vw] md:text-[8vw] font-bold leading-[0.85] tracking-tighter uppercase"
                    >
                        Full Stack <br /> Developer .
                    </motion.h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* 2. STATUS & RESUME */}
                    <div className="lg:col-span-4 space-y-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <p className="text-white/30 text-[11px] uppercase tracking-[0.2em] mb-4 font-bold">Status</p>
                            <p className="text-xl leading-snug uppercase">
                                Pursuing <span className="text-white underline underline-offset-4 decoration-white/20">B.Tech CS</span>.
                                <br />
                                <span className="text-white/60 lowercase italic">{identity.tagline}</span>
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <p className="text-white/30 text-[11px] uppercase tracking-[0.2em] mb-4 font-bold">Location</p>
                            <p className="text-xl">India / Jaipur</p>
                        </motion.div>

                        {/* RESUME BUTTON - FIXED LOGIC */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="pt-6"
                        >
                            <a
                                href={identity.resumeLink}
                                download="Shashank_Sharma_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-4 border border-white/10 px-6 py-4 hover:bg-white hover:text-black transition-all duration-500 cursor-pointer"
                            >
                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Download_CV</span>
                                <FiArrowDownRight size={18} className="group-hover:rotate-[-45deg] transition-transform duration-500" />
                            </a>
                        </motion.div>
                    </div>

                    {/* 3. LISTS */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12 border-l border-white/10 md:pl-16">

                        {/* FOCUS LIST */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <p className="text-white/30 text-[11px] uppercase tracking-[0.2em] mb-8 font-bold">Focus</p>
                            <ul className="space-y-4">
                                {["Interface Design", "3D Interactive", "System Architecture", "Motion"].map((item) => (
                                    <motion.li
                                        key={item}
                                        whileHover={{ x: 10, opacity: 1 }}
                                        className="group text-2xl font-light opacity-40 cursor-pointer flex items-center gap-3"
                                    >
                                        <span className="w-1.5 h-1.5 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* STACK LIST */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <p className="text-white/30 text-[11px] uppercase tracking-[0.2em] mb-8 font-bold">Stack</p>
                            <ul className="space-y-4">
                                {["React / Next.js", "Three.js / WebGL", "Tailwind / GSAP", "Framer Motion"].map((item) => (
                                    <motion.li
                                        key={item}
                                        whileHover={{ x: 10, opacity: 1 }}
                                        className="group text-2xl font-light opacity-40 cursor-pointer flex items-center gap-3"
                                    >
                                        <span className="w-1.5 h-1.5 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* PHILOSOPHY */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="md:col-span-2 pt-10 mt-10 border-t border-white/10"
                        >
                            <p className="text-white/30 text-[11px] uppercase tracking-[0.2em] mb-6 font-bold">Philosophy</p>
                            <p className="text-3xl md:text-5xl font-medium tracking-tighter leading-[1.1]">
                                "Code is not the goal. <br />
                                <span className="italic text-white/90">Experience is the goal.</span>"
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default About;