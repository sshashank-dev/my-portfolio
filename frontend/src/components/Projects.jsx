import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Local Assets
import p1 from "../assets/project1.jpg";
import p2 from "../assets/project2.jpg";
import p3 from "../assets/project3.jpg";
import p4 from "../assets/project4.jpg";
import p5 from "../assets/project5.jpg";
import p6 from "../assets/project6.jpg";
import p7 from "../assets/project7.jpg";
import p8 from "../assets/project8.jpg";

export default function Projects() {
    const [dbProjects, setDbProjects] = useState([]);

    // 1. YOUR HARDCODED PROJECTS
    const staticProjects = [
        { imageUrl: p1, title: "E Commerce App ", projectUrl: "https://e-commerce-omega-tan-94.vercel.app/" },
        { imageUrl: p2, title: "React Ai Tool ", projectUrl: "https://react-ai-tool-six.vercel.app/" },
        { imageUrl: p3, title: "LEVELS A MUsic App ", projectUrl: "https://levels-silk.vercel.app/" },
        { imageUrl: p4, title: "Flappy Bird ", projectUrl: "https://flappy-bird-react-tan.vercel.app/" },
        { imageUrl: p5, title: "LE GRAND HORIZON ", projectUrl: "https://le-grand-horizon-lhop.vercel.app/" },
        { imageUrl: p6, title: "STUDIO INT ", projectUrl: "https://studio-int.vercel.app/" },
        { imageUrl: p7, title: "TREAVELVERSE ", projectUrl: "https://travelverse-juj6.vercel.app/" },
        { imageUrl: p8, title: "ASH & ALDER ", projectUrl: "https://ash-and-alder.vercel.app/" },
    ];

    // 2. FETCH NEW PROJECTS FROM DASHBOARD
    useEffect(() => {
        fetch('http://localhost:5000/api/projects')
            .then(res => res.json())
            .then(data => setDbProjects(data))
            .catch(err => console.error("Project sync error:", err));
    }, []);

    // 3. COMBINE BOTH LISTS
    const allProjects = [...staticProjects, ...dbProjects];

    return (
        <section className="bg-black text-white py-20 md:py-40 px-6 md:px-10">
            <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-[60%]">
                    {allProjects.map((project, i) => (
                        <InteractiveCard
                            key={project._id || i}
                            project={project}
                            index={i}
                            isLive={i >= staticProjects.length}
                        />
                    ))}
                </div>

                <div className="flex flex-col justify-start w-full lg:w-[40%] lg:sticky lg:top-40 h-fit">
                    <div className="flex justify-between items-baseline mb-6 border-b border-white/10 pb-6 lg:border-none lg:pb-0">
                        <h2 className="text-[14vw] md:text-[60px] lg:text-[90px] font-medium leading-[0.85] tracking-tighter antialiased">
                            Featured <br className="hidden md:block" /> Projects
                        </h2>
                        <span className="text-[12vw] md:text-[60px] lg:text-[90px] font-light opacity-20 tabular-nums">
                            {allProjects.length}
                        </span>
                    </div>

                    <p className="text-white/40 text-[14px] md:text-[16px] max-w-sm mb-10 hidden lg:block">
                        A curated selection of digital experiences focused on motion, identity, and functional art.
                    </p>

                    <Link
                        to="/work"
                        className="group border border-white/10 px-4 py-3 flex justify-between items-center hover:bg-white hover:text-black transition-all duration-500 cursor-pointer rounded-full lg:rounded-none"
                    >
                        <span className="text-[11px] uppercase tracking-[0.2em] font-bold">View All Work</span>
                        <span className="text-[11px] opacity-50 group-hover:opacity-100 italic">Archive — </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

function InteractiveCard({ project, index, isLive }) {
    const cardRef = useRef(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (window.innerWidth < 1024) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((e.clientY - rect.top - centerY) / centerY) * 10;
        const rotateY = ((e.clientX - rect.left - centerX) / centerX) * -10;
        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setHovered(false);
    };

    return (
        <motion.a
            ref={cardRef}
            href={project.projectUrl || project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-full h-[350px] md:h-[450px] cursor-pointer overflow-hidden block border border-white/5"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setHovered(true)}
            style={{ perspective: 1000 }}
            whileHover={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <motion.div
                className="w-full h-full relative"
                animate={{
                    rotateX: rotation.x,
                    rotateY: rotation.y,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <img
                    src={project.imageUrl || project.img}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${hovered ? "scale-110" : "scale-100"}`}
                />

                {/* Live Badge for dashboard projects */}
                {isLive && (
                    <div className="absolute top-4 right-4 z-30 px-2 py-1 bg-indigo-600 text-[8px] uppercase font-bold tracking-widest rounded-sm">
                        Live_Node
                    </div>
                )}

                <div className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`} />

                <div className="absolute bottom-6 left-6 z-20">
                    <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">
                        {isLive ? "Registry" : "Featured"} 0{index + 1}
                    </p>
                    <h3 className="text-xl md:text-2xl font-medium text-white tracking-tight">
                        {project.title}
                    </h3>
                    {project.category && (
                        <p className="text-[9px] text-indigo-400 uppercase mt-1 tracking-tighter">{project.category}</p>
                    )}
                </div>
            </motion.div>
        </motion.a>
    );
}