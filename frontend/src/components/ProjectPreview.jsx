import { useEffect, useState } from "react";

export default function ProjectPreview({ image }) {

    const [pos, setPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const move = (e) => {
            setPos({
                x: e.clientX + 20,
                y: e.clientY + 20
            });
        };

        window.addEventListener("mousemove", move);

        return () => window.removeEventListener("mousemove", move);

    }, []);

    if (!image) return null;

    return (
        <img
            src={image}
            style={{
                position: "fixed",
                top: pos.y,
                left: pos.x,
                width: "300px",
                pointerEvents: "none",
                zIndex: 999
            }}
        />
    );
}