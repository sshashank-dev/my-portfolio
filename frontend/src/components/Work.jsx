import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Assets
import p1 from "../assets/project1.jpg";
import p2 from "../assets/project2.jpg";
import p3 from "../assets/project3.jpg";
import p4 from "../assets/project4.jpg";

const allProjects = [
    {
        title: "E Commerce App",
        category: "Full-Stack / MERN",
        year: "2024",
        img: p1,
        status: "Deployed",
        id: "01",
        link: "https://e-commerce-omega-tan-94.vercel.app/",
        description: "A high-performance retail engine featuring real-time inventory tracking, secure Stripe integration, and a custom dashboard."
    },
    {
        title: "React AI Tool",
        category: "AI / GPT-4",
        year: "2024",
        img: p2,
        status: "Active",
        id: "02",
        link: "https://react-ai-tool-six.vercel.app/",
        description: "Harnessing LLMs to automate frontend workflow. Translates wireframes into functional React components instantly."
    },
    {
        title: "LEVELS Music",
        category: "UX / Audio",
        year: "2024",
        img: p3,
        status: "Legacy",
        id: "03",
        link: "https://music-app-smoky-rho.vercel.app/",
        description: "An immersive spatial audio experience built for artists. Focused on low-latency streaming and high-fidelity UI."
    },
    {
        title: "Flappy Bird",
        category: "Game Design",
        year: "2023",
        img: p4,
        status: "Stable",
        id: "04",
        link: "https://flappy-bird-react-tan.vercel.app/",
        description: "A physics-based arcade clone optimized for mobile browsers using Framer Motion for frame-perfect collisions."
    },
];

export default function Work() {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white pt-12 pb-24 font-mono overflow-x-hidden"
        >
            {/* BACKGROUND SCANLINE EFFECT */}
            <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]" />

            <div className="max-w-[1700px] mx-auto px-4 md:px-10">

                {/* UTILITY NAV */}
                <nav className="flex justify-between items-start mb-32 border-l border-red-600 pl-4">
                    <div className="text-[10px] uppercase tracking-[0.3em] leading-relaxed">
                        <Link to="/" className="text-white/40 hover:text-white transition-colors block">Index.Root</Link>
                        <span className="text-red-600 italic">Work.Directory</span>
                    </div>
                    <div className="text-right text-[9px] uppercase tracking-widest text-white/20">
                        <p>Loc: 26.9124° N, 75.7873° E</p>
                        <p>Status: Available for Hire</p>
                    </div>
                </nav>

                {/* HERO TITLE */}
                <div className="mb-40">
                    <h1 className="text-[18vw] font-black leading-[0.75] tracking-tighter uppercase inline-block">
                        PRO<br />JECTS<span className="text-red-600 animate-pulse">_</span>
                    </h1>
                </div>

                {/* THE GRID SYSTEM */}
                <div className="space-y-[-1px]">
                    {allProjects.map((project, i) => (
                        <motion.a
                            key={i}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="group block border-y border-white/10 relative overflow-hidden hover:bg-white/[0.01] transition-colors"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-12 items-start py-12 md:py-20 relative z-10">

                                {/* 01. INDEX */}
                                <div className="col-span-1 hidden md:flex flex-col items-center border-r border-white/10 h-full pt-2">
                                    <span className="text-[10px] text-white/20 group-hover:text-red-600 transition-colors font-bold tracking-tighter uppercase">
                                        ID-{project.id}
                                    </span>
                                </div>

                                {/* 02. MAIN CONTENT & DESCRIPTION */}
                                <div className="col-span-1 md:col-span-7 px-4 md:px-12">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-[10px] text-red-600 font-bold bg-red-600/10 px-2 py-0.5">'{project.year.slice(-2)}</span>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">{project.category}</span>
                                    </div>

                                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase group-hover:tracking-normal transition-all duration-700 ease-in-out">
                                        {project.title}
                                    </h2>

                                    {/* DESCRIPTION REVEAL */}
                                    <motion.p className="mt-6 text-sm md:text-lg text-white/40 max-w-xl leading-relaxed opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-500 delay-100">
                                        {project.description}
                                    </motion.p>
                                </div>

                                {/* 03. STATUS / CALL TO ACTION */}
                                <div className="col-span-1 md:col-span-4 px-4 md:px-12 mt-8 md:mt-0 flex flex-col md:items-end justify-start pt-2 gap-4">
                                    <div className="h-[1px] w-full md:w-32 bg-white/10 group-hover:bg-red-600 transition-colors" />
                                    <div className="text-[10px] uppercase tracking-[0.4em] text-white/20 group-hover:text-white transition-colors">
                                        Launch_Deployment.Sys
                                    </div>
                                </div>
                            </div>

                            {/* HOVER IMAGE PREVIEW (Refined for background depth) */}
                            <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[35%] aspect-video opacity-0 group-hover:opacity-40 transition-all duration-1000 translate-x-20 group-hover:translate-x-0 pointer-events-none hidden lg:block z-0 overflow-hidden">
                                <img
                                    src={project.img}
                                    alt=""
                                    className="w-full h-full object-cover grayscale brightness-50 contrast-150 scale-125 group-hover:scale-100 transition-transform duration-[2000ms]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* FOOTER METRICS */}
                <div className="mt-32 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: "Total_Builds", val: allProjects.length.toString().padStart(2, '0') },
                        { label: "Success_Rate", val: "100%" },
                        { label: "System_Core", val: "React/MERN" },
                        { label: "Design_Phil", val: "Brutalist" }
                    ].map((stat, i) => (
                        <div key={i}>
                            <p className="text-[9px] uppercase text-white/20 mb-1">{stat.label}</p>
                            <p className="text-sm font-bold text-white/60 tracking-widest">{stat.val}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}