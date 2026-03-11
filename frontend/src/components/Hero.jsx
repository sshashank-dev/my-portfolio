import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="h-screen bg-black text-white flex items-center px-20 relative overflow-hidden">

            {/* THE VIDEO - Positioned behind the text */}
            <div className="absolute right-0 top-0 w-full h-full md:w-1/2 z-0 opacity-60">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover grayscale brightness-75 contrast-125"
                >
                    {/* Ensure your video file is in the public folder */}
                    <source src="/hero-bg.mp4" type="video/mp4" />
                </video>
                {/* Gradient overlay to blend the video into your black background */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
            </div>

            {/* YOUR ORIGINAL CONTENT - Kept exactly the same */}
            <div className="relative z-10">
                <motion.h1
                    initial={{ y: 120, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-[120px] font-bold leading-[0.9]"
                >
                    Shashank <br /> Sharma
                </motion.h1>

                <motion.p
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="mt-8 text-gray-400 text-xl"
                >
                    Creative Developer & UI Designer
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-16 text-gray-500"
                >
                    Scroll to explore ↓
                </motion.div>
            </div>

        </section>
    );
}