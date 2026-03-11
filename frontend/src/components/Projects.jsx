// import { useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const projects = [
//     {
//         title: "Cinematic Portfolio",
//         category: "React / UI Design"
//     },
//     {
//         title: "Task Tracker App",
//         category: "MERN Stack"
//     },
//     {
//         title: "AI Chat Application",
//         category: "OpenAI / React"
//     }
// ];

// export default function Projects() {

//     const sectionRef = useRef(null);

//     useEffect(() => {

//         gsap.fromTo(
//             ".project-card",
//             { y: 100, opacity: 0 },
//             {
//                 y: 0,
//                 opacity: 1,
//                 duration: 1,
//                 stagger: 0.3,
//                 ease: "power3.out",
//                 scrollTrigger: {
//                     trigger: sectionRef.current,
//                     start: "top 90%",
//                 }
//             }
//         );

//     }, []);

//     return (
//         <section
//             ref={sectionRef}
//             className="min-h-screen bg-black text-white px-10 py-32"
//         >

//             <h2 className="text-5xl font-bold">
//                 Selected Work
//             </h2>

//             <div className="grid md:grid-cols-2 gap-16 mt-20">

//                 {projects.map((project, index) => (
//                     <motion.div
//                         key={index}
//                         whileHover={{ scale: 1.05 }}
//                         className="project-card border border-gray-700 p-10 cursor-pointer hover:border-white transition duration-300"
//                     >

//                         <h3 className="text-3xl font-semibold">
//                             {project.title}
//                         </h3>

//                         <p className="text-gray-400 mt-4">
//                             {project.category}
//                         </p>

//                     </motion.div>
//                 ))}

//             </div>

//         </section>
//     );
// }





// import { motion } from "framer-motion";

// const projects = [
//     "https://picsum.photos/600/700?1",
//     "https://picsum.photos/600/700?2",
//     "https://picsum.photos/600/700?3",
//     "https://picsum.photos/600/700?4"
// ];

// export default function Projects() {
//     return (
//         <section className="bg-black text-white min-h-screen px-16 py-32">

//             <div className="grid lg:grid-cols-2 gap-20">

//                 {/* LEFT SIDE IMAGES */}
//                 <div className="grid grid-cols-2 gap-6">

//                     {projects.map((img, index) => (
//                         <motion.div
//                             key={index}
//                             whileHover={{ scale: 1.05 }}
//                             className="overflow-hidden"
//                         >
//                             <img
//                                 src={img}
//                                 className="w-full h-[320px] object-cover hover:scale-110 transition duration-700"
//                             />
//                         </motion.div>
//                     ))}

//                 </div>

//                 {/* RIGHT SIDE TEXT */}
//                 <div className="flex flex-col justify-start">

//                     <div className="flex justify-between items-start">

//                         <h2 className="text-7xl font-bold leading-none">
//                             Featured <br /> Projects
//                         </h2>

//                         <span className="text-6xl font-light">
//                             10
//                         </span>

//                     </div>

//                     <button className="mt-16 border border-gray-600 px-10 py-4 w-fit hover:border-white transition">
//                         View All
//                     </button>

//                 </div>

//             </div>

//         </section>
//     );
// }







import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Local Assets
import p1 from "../assets/project1.jpg";
import p2 from "../assets/project2.jpg";
import p3 from "../assets/project3.jpg";
import p4 from "../assets/project4.jpg";

export default function Projects() {
    const [dbProjects, setDbProjects] = useState([]);

    // 1. YOUR HARDCODED PROJECTS
    const staticProjects = [
        { imageUrl: p1, title: "E Commerce App ", projectUrl: "https://e-commerce-omega-tan-94.vercel.app/" },
        { imageUrl: p2, title: "React Ai Tool ", projectUrl: "https://react-ai-tool-six.vercel.app/" },
        { imageUrl: p3, title: "LEVELS A MUsic App ", projectUrl: "https://music-app-smoky-rho.vercel.app/" },
        { imageUrl: p4, title: "Flappy Bird ", projectUrl: "https://flappy-bird-react-tan.vercel.app/" },
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