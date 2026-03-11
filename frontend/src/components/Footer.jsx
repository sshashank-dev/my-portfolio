// import React, { useState, useRef } from 'react';
// import { motion, useSpring, AnimatePresence } from 'framer-motion';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Footer = () => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [hoveredY, setHoveredY] = useState(null);
//     const [hoveredWidth, setHoveredWidth] = useState(0);
//     const [hoveredX, setHoveredX] = useState(0);
//     const [activePolicy, setActivePolicy] = useState(null);

//     const [feedback, setFeedback] = useState("");
//     const [isSent, setIsSent] = useState(false);

//     const containerRef = useRef(null);
//     const pathY = useSpring(0, { stiffness: 300, damping: 35 });

//     const policyContent = {
//         cookies: {
//             title: "Cookie Policy",
//             text: "We use functional cookies to ensure a smooth user experience. No personal tracking data is collected."
//         },
//         privacy: {
//             title: "Privacy Policy",
//             text: "Your data remains private. Feedback messages are used solely to establish communication between the creator and the client."
//         }
//     };

//     const handleLinkHover = (e) => {
//         const rect = e.currentTarget.getBoundingClientRect();
//         const containerRect = containerRef.current.getBoundingClientRect();
//         const yPos = rect.top - containerRect.top + rect.height + 4;
//         const xPos = rect.left - containerRect.left;

//         setHoveredY(yPos);
//         setHoveredWidth(rect.width);
//         setHoveredX(xPos);
//         pathY.set(yPos);
//     };

//     const handleFeedbackSubmit = (e) => {
//         e.preventDefault();
//         if (feedback.trim()) {
//             setIsSent(true);
//             setTimeout(() => {
//                 setIsSent(false);
//                 setFeedback("");
//             }, 3000);
//         }
//     };

//     // UPDATED: Simple route navigation for dedicated pages
//     const handleRouteNavigation = (path) => {
//         navigate(path);
//         window.scrollTo(0, 0);
//     };

//     const linkClass = "relative z-10 text-[13px] py-1 text-white/40 hover:text-white transition-all duration-300 cursor-pointer block w-fit hover:translate-x-1 text-left";

//     return (
//         <footer
//             ref={containerRef}
//             className="relative w-full bg-black text-white px-10 py-16 overflow-hidden border-t border-white/10"
//             onMouseLeave={() => {
//                 setHoveredY(null);
//                 setHoveredWidth(0);
//             }}
//         >
//             {/* GLOW STRING */}
//             <svg className="absolute inset-0 pointer-events-none w-full h-full z-0">
//                 <defs>
//                     <filter id="glow">
//                         <feGaussianBlur stdDeviation="2" result="coloredBlur" />
//                         <feMerge>
//                             <feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" />
//                         </feMerge>
//                     </filter>
//                 </defs>
//                 <motion.path
//                     fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" filter="url(#glow)"
//                     initial={false}
//                     animate={{
//                         opacity: hoveredY ? 0.8 : 0,
//                         d: hoveredY ? `M ${hoveredX} ${hoveredY} Q ${hoveredX + hoveredWidth / 2} ${hoveredY + 2} ${hoveredX + hoveredWidth} ${hoveredY}` : `M 0 0 L 0 0`
//                     }}
//                     transition={{ type: "spring", stiffness: 400, damping: 30 }}
//                 />
//             </svg>

//             {/* QUOTE SECTION */}
//             <div className="mb-20 space-y-2 max-w-4xl relative z-10">
//                 <div className="flex flex-wrap gap-2">
//                     <span className="bg-white text-black px-3 py-1 text-lg md:text-xl font-medium tracking-tight">
//                         Over the years, coding has become more than just work for me.
//                     </span>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                     <span className="bg-white text-black px-3 py-1 text-lg md:text-xl font-medium tracking-tight">
//                         I enjoy building projects, learning new technologies, and improving my skills every day.
//                     </span>
//                     <span className="bg-white text-black px-3 py-1 text-lg md:text-xl font-medium tracking-tight">
//                         When I'm not coding, you’ll probably find me at the gym.
//                     </span>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                     <span className="bg-white text-black px-3 py-1 text-lg md:text-xl font-medium tracking-tight">
//                         Both require discipline, consistency, and the drive to keep getting better.
//                     </span>
//                 </div>
//             </div>

//             {/* BRANDING - UPDATED to click to /work */}
//             <div
//                 className="flex justify-between items-center mb-24 border-b border-white/10 pb-10 group cursor-pointer"
//                 onClick={() => handleRouteNavigation('/work')}
//             >
//                 <motion.span
//                     initial={{ opacity: 0.35 }}
//                     whileHover={{
//                         opacity: 1,
//                         color: "#ffffff",
//                         textShadow: "0 0 25px rgba(255,255,255,0.7), 0 0 50px rgba(255,255,255,0.3)"
//                     }}
//                     className="text-[60px] md:text-[90px] font-medium tracking-tighter italic leading-none transition-all duration-500"
//                 >
//                     Next
//                 </motion.span>
//                 <motion.span
//                     initial={{ opacity: 0.35 }}
//                     whileHover={{
//                         opacity: 1,
//                         color: "#ffffff",
//                         textShadow: "0 0 25px rgba(255,255,255,0.7), 0 0 50px rgba(255,255,255,0.3)"
//                     }}
//                     className="text-[60px] md:text-[90px] font-medium tracking-tighter leading-none transition-all duration-500"
//                 >
//                     Work
//                 </motion.span>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
//                 {/* MENU */}
//                 <div>
//                     <span className="bg-white text-black px-2 py-0.5 text-[10px] uppercase font-bold mb-8 inline-block tracking-widest">Menu</span>
//                     <div className="grid grid-cols-2 gap-8">
//                         <div className="flex flex-col">
//                             {/* UPDATED: Navigates directly to /work page */}
//                             <button
//                                 onClick={() => handleRouteNavigation('/work')}
//                                 onMouseEnter={handleLinkHover}
//                                 className={linkClass}
//                             >
//                                 Work
//                             </button>

//                             <button
//                                 onClick={() => handleRouteNavigation('/about')}
//                                 onMouseEnter={handleLinkHover}
//                                 className={linkClass}
//                             >
//                                 About
//                             </button>

//                             <button
//                                 onClick={() => handleRouteNavigation('/inquiry')}
//                                 onMouseEnter={handleLinkHover}
//                                 className={linkClass}
//                             >
//                                 Inquiries
//                             </button>
//                         </div>
//                         <div className="flex flex-col">
//                             <button onClick={() => setActivePolicy('cookies')} onMouseEnter={handleLinkHover} className={linkClass}>Cookies</button>
//                             <button onClick={() => setActivePolicy('privacy')} onMouseEnter={handleLinkHover} className={linkClass}>Privacy</button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* SOCIAL */}
//                 <div>
//                     <span className="bg-white text-black px-2 py-0.5 text-[10px] uppercase font-bold mb-8 inline-block tracking-widest">Social</span>
//                     <div className="flex flex-col">
//                         <a href="https://www.instagram.com/shashank.shx/" target="_blank" rel="noreferrer" onMouseEnter={handleLinkHover} className={linkClass}>Instagram</a>
//                         <a href="https://x.com/Shashankshx" target="_blank" rel="noreferrer" onMouseEnter={handleLinkHover} className={linkClass}>X</a>
//                         <a href="https://www.linkedin.com/in/shashank-sharma-9b7b2b257/" target="_blank" rel="noreferrer" onMouseEnter={handleLinkHover} className={linkClass}>LinkedIn</a>
//                     </div>
//                 </div>

//                 {/* FEEDBACK FORM */}
//                 <div>
//                     <span className="bg-white text-black px-2 py-0.5 text-[10px] uppercase font-bold mb-8 inline-block tracking-widest">Feedback</span>
//                     <p className="text-[13px] mb-6 text-white/40 font-light italic">Have a project in mind or just want to say hi?</p>
//                     <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-4">
//                         <textarea
//                             required
//                             value={feedback}
//                             onChange={(e) => setFeedback(e.target.value)}
//                             placeholder={isSent ? "Message sent successfully." : "Your message..."}
//                             disabled={isSent}
//                             className={`bg-transparent border-b ${isSent ? 'border-green-500/50' : 'border-white/20 hover:border-white/50 focus:border-white'} outline-none text-sm w-full py-2 resize-none transition-all placeholder:text-white/10`}
//                             rows="2"
//                         />
//                         <button
//                             type="submit"
//                             disabled={isSent || !feedback.trim()}
//                             className={`text-[11px] uppercase font-bold tracking-widest w-fit self-end transition-all ${isSent ? 'text-green-500' : 'text-white/30 hover:text-white'}`}
//                         >
//                             {isSent ? "Sent" : "Submit"}
//                         </button>
//                     </form>
//                 </div>
//             </div>

//             {/* BOTTOM INFO */}
//             <div className="mt-40 flex justify-between text-[11px] uppercase tracking-[0.5em] opacity-20 font-light">
//                 <button
//                     className="cursor-pointer hover:opacity-100 transition-opacity"
//                     onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//                 >
//                     To top
//                 </button>
//                 <div className="flex gap-10">
//                     <span> Jaipur, India </span>
//                     <span>©2026 Shashank Sharma</span>
//                 </div>
//             </div>

//             {/* POLICY MODAL */}
//             <AnimatePresence>
//                 {activePolicy && (
//                     <motion.div
//                         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                         onClick={() => setActivePolicy(null)}
//                         className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
//                     >
//                         <motion.div
//                             initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
//                             onClick={(e) => e.stopPropagation()}
//                             className="max-w-md w-full bg-[#0a0a0a] border border-white/10 p-10 relative shadow-2xl"
//                         >
//                             <button onClick={() => setActivePolicy(null)} className="absolute top-4 right-4 text-white/40 hover:text-white uppercase text-[10px] tracking-widest">Close [x]</button>
//                             <h3 className="text-white uppercase tracking-[0.2em] mb-6 font-bold text-sm">{policyContent[activePolicy].title}</h3>
//                             <p className="text-white/60 text-sm leading-relaxed font-light">{policyContent[activePolicy].text}</p>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </footer>
//     );
// };

// export default Footer;



import React, { useState, useRef } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [hoveredY, setHoveredY] = useState(null);
    const [hoveredWidth, setHoveredWidth] = useState(0);
    const [hoveredX, setHoveredX] = useState(0);
    const [activePolicy, setActivePolicy] = useState(null);

    const [feedback, setFeedback] = useState("");
    const [isSent, setIsSent] = useState(false);

    const containerRef = useRef(null);
    const pathY = useSpring(0, { stiffness: 300, damping: 35 });

    const policyContent = {
        cookies: {
            title: "Cookie Policy",
            text: "We use functional cookies to ensure a smooth user experience. No personal tracking data is collected."
        },
        privacy: {
            title: "Privacy Policy",
            text: "Your data remains private. Feedback messages are used solely to establish communication between the creator and the client."
        }
    };

    const handleLinkHover = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const yPos = rect.top - containerRect.top + rect.height + 4;
        const xPos = rect.left - containerRect.left;

        setHoveredY(yPos);
        setHoveredWidth(rect.width);
        setHoveredX(xPos);
        pathY.set(yPos);
    };

    // UPDATED: Logic to actually send the feedback to your backend
    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        if (!feedback.trim()) return;

        try {
            const response = await fetch('http://localhost:5000/api/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_name: "Footer User",
                    user_email: "no-email-provided@feedback.com",
                    user_project: "Footer Feedback",
                    message: feedback
                })
            });

            if (response.ok) {
                setIsSent(true);
                // Visual feedback reset
                setTimeout(() => {
                    setIsSent(false);
                    setFeedback("");
                }, 3000);
            } else {
                alert("Failed to send. Please check if your server is running.");
            }
        } catch (error) {
            console.error("Feedback error:", error);
            alert("Server connection failed.");
        }
    };

    const handleRouteNavigation = (path) => {
        navigate(path);
        window.scrollTo(0, 0);
    };

    const linkClass = "relative z-10 text-[13px] py-1 text-white/40 hover:text-white transition-all duration-300 cursor-pointer block w-fit hover:translate-x-1 text-left";

    return (
        <footer
            ref={containerRef}
            className="relative w-full bg-black text-white px-10 py-16 overflow-hidden border-t border-white/10"
            onMouseLeave={() => {
                setHoveredY(null);
                setHoveredWidth(0);
            }}
        >
            {/* GLOW STRING EFFECT */}
            <svg className="absolute inset-0 pointer-events-none w-full h-full z-0">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <motion.path
                    fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" filter="url(#glow)"
                    initial={false}
                    animate={{
                        opacity: hoveredY ? 0.8 : 0,
                        d: hoveredY ? `M ${hoveredX} ${hoveredY} Q ${hoveredX + hoveredWidth / 2} ${hoveredY + 2} ${hoveredX + hoveredWidth} ${hoveredY}` : `M 0 0 L 0 0`
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
            </svg>

            {/* QUOTE SECTION */}
            <div className="mb-20 space-y-2 max-w-4xl relative z-10">
                <div className="flex flex-wrap gap-2">
                    <span className="bg-white text-black px-3 py-1 text-lg md:text-xl font-medium tracking-tight">
                        Over the years, coding has become more than just work for me.
                    </span>
                </div>
                <div className="flex flex-wrap gap-2">
                    <span className="bg-white text-black px-3 py-1 text-lg md:text-xl font-medium tracking-tight">
                        I enjoy building projects and improving my skills every day.
                    </span>
                    <span className="bg-white text-black px-3 py-1 text-lg md:text-xl font-medium tracking-tight">
                        When I'm not coding, you’ll probably find me at the gym.
                    </span>
                </div>
                <div className="flex flex-wrap gap-2">
                    <span className="bg-white text-black px-3 py-1 text-lg md:text-xl font-medium tracking-tight">
                        Both require discipline and the drive to keep getting better.
                    </span>
                </div>
            </div>

            {/* BRANDING */}
            <div
                className="flex justify-between items-center mb-24 border-b border-white/10 pb-10 group cursor-pointer"
                onClick={() => handleRouteNavigation('/work')}
            >
                <motion.span
                    initial={{ opacity: 0.35 }}
                    whileHover={{
                        opacity: 1,
                        color: "#ffffff",
                        textShadow: "0 0 25px rgba(255,255,255,0.7), 0 0 50px rgba(255,255,255,0.3)"
                    }}
                    className="text-[60px] md:text-[90px] font-medium tracking-tighter italic leading-none transition-all duration-500"
                >
                    Next
                </motion.span>
                <motion.span
                    initial={{ opacity: 0.35 }}
                    whileHover={{
                        opacity: 1,
                        color: "#ffffff",
                        textShadow: "0 0 25px rgba(255,255,255,0.7), 0 0 50px rgba(255,255,255,0.3)"
                    }}
                    className="text-[60px] md:text-[90px] font-medium tracking-tighter leading-none transition-all duration-500"
                >
                    Work
                </motion.span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                {/* MENU */}
                <div>
                    <span className="bg-white text-black px-2 py-0.5 text-[10px] uppercase font-bold mb-8 inline-block tracking-widest">Menu</span>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex flex-col">
                            <button onClick={() => handleRouteNavigation('/work')} onMouseEnter={handleLinkHover} className={linkClass}>Work</button>
                            <button onClick={() => handleRouteNavigation('/about')} onMouseEnter={handleLinkHover} className={linkClass}>About</button>
                            <button onClick={() => handleRouteNavigation('/inquiry')} onMouseEnter={handleLinkHover} className={linkClass}>Inquiries</button>
                        </div>
                        <div className="flex flex-col">
                            <button onClick={() => setActivePolicy('cookies')} onMouseEnter={handleLinkHover} className={linkClass}>Cookies</button>
                            <button onClick={() => setActivePolicy('privacy')} onMouseEnter={handleLinkHover} className={linkClass}>Privacy</button>
                        </div>
                    </div>
                </div>

                {/* SOCIAL */}
                <div>
                    <span className="bg-white text-black px-2 py-0.5 text-[10px] uppercase font-bold mb-8 inline-block tracking-widest">Social</span>
                    <div className="flex flex-col">
                        <a href="https://www.instagram.com/shashank.shx/" target="_blank" rel="noreferrer" onMouseEnter={handleLinkHover} className={linkClass}>Instagram</a>
                        <a href="https://x.com/Shashankshx" target="_blank" rel="noreferrer" onMouseEnter={handleLinkHover} className={linkClass}>X</a>
                        <a href="https://www.linkedin.com/in/shashank-sharma-9b7b2b257/" target="_blank" rel="noreferrer" onMouseEnter={handleLinkHover} className={linkClass}>LinkedIn</a>
                    </div>
                </div>

                {/* FEEDBACK FORM */}
                <div>
                    <span className="bg-white text-black px-2 py-0.5 text-[10px] uppercase font-bold mb-8 inline-block tracking-widest">Feedback</span>
                    <p className="text-[13px] mb-6 text-white/40 font-light italic">Have a project in mind or just want to say hi?</p>
                    <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-4">
                        <textarea
                            required
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder={isSent ? "Message received. Thanks!" : "Your message..."}
                            disabled={isSent}
                            className={`bg-transparent border-b ${isSent ? 'border-green-500/50' : 'border-white/20 hover:border-white/50 focus:border-white'} outline-none text-sm w-full py-2 resize-none transition-all placeholder:text-white/10`}
                            rows="2"
                        />
                        <button
                            type="submit"
                            disabled={isSent || !feedback.trim()}
                            className={`text-[11px] uppercase font-bold tracking-widest w-fit self-end transition-all ${isSent ? 'text-green-500' : 'text-white/30 hover:text-white'}`}
                        >
                            {isSent ? "Sent" : "Submit"}
                        </button>
                    </form>
                </div>
            </div>

            {/* BOTTOM INFO */}
            <div className="mt-40 flex justify-between text-[11px] uppercase tracking-[0.5em] opacity-20 font-light">
                <button
                    className="cursor-pointer hover:opacity-100 transition-opacity"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    To top
                </button>
                <div className="flex gap-10">
                    <span> Jaipur, India </span>
                    <span>©2026 Shashank Sharma</span>
                </div>
            </div>

            {/* POLICY MODAL */}
            <AnimatePresence>
                {activePolicy && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setActivePolicy(null)}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-md w-full bg-[#0a0a0a] border border-white/10 p-10 relative shadow-2xl"
                        >
                            <button onClick={() => setActivePolicy(null)} className="absolute top-4 right-4 text-white/40 hover:text-white uppercase text-[10px] tracking-widest">Close [x]</button>
                            <h3 className="text-white uppercase tracking-[0.2em] mb-6 font-bold text-sm">{policyContent[activePolicy].title}</h3>
                            <p className="text-white/60 text-sm leading-relaxed font-light">{policyContent[activePolicy].text}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </footer>
    );
};

export default Footer;