// InteractiveCard.jsx
function InteractiveCard({ project }) {
    const cardRef = useRef(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * -10;
        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setHovered(false);
    };

    const handleMouseEnter = () => setHovered(true);

    return (
        <motion.div
            ref={cardRef}
            className="relative w-full h-[340px] cursor-pointer overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{ perspective: 1000 }}
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
            <motion.div
                className="w-full h-full overflow-hidden"
                style={{
                    rotateX: rotation.x,
                    rotateY: rotation.y,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 15 }}
            >
                {/* Image with sharp edges and no blur */}
                <motion.img
                    src={project.img}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? "scale-105" : "scale-100"
                        }`}
                />

                {/* Gradient overlay */}
                <motion.div
                    style={{
                        background: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 70%)`,
                    }}
                    className="absolute inset-0 pointer-events-none"
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                />

                {/* Project title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute bottom-4 left-4 text-lg font-semibold text-white pointer-events-none"
                >
                    {project.title}
                </motion.div>

                {/* Dynamic shadow */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ boxShadow: `0px 20px 40px rgba(0,0,0,0.5)` }}
                    animate={{
                        x: -rotation.y * 2,
                        y: rotation.x * 2,
                        transition: { type: "spring", stiffness: 120, damping: 15 },
                    }}
                />
            </motion.div>
        </motion.div>
    );
}