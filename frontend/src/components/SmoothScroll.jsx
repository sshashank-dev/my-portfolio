import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll() {

    useEffect(() => {

        const lenis = new Lenis({
            duration: 1.2,
            smooth: true,
            direction: "vertical",
            gestureDirection: "vertical",
            smoothTouch: false,
            touchMultiplier: 2
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

    }, []);

    return null;
}