// import { useEffect, useRef } from "react";

// export default function Cursor() {
//     const canvasRef = useRef(null);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");

//         let width = window.innerWidth;
//         let height = window.innerHeight;

//         canvas.width = width;
//         canvas.height = height;

//         const points = [];
//         const totalPoints = 20;

//         for (let i = 0; i < totalPoints; i++) {
//             points.push({ x: width / 2, y: height / 2 });
//         }

//         let mouse = { x: width / 2, y: height / 2 };

//         window.addEventListener("mousemove", (e) => {
//             mouse.x = e.clientX;
//             mouse.y = e.clientY;
//         });

//         function animate() {
//             ctx.clearRect(0, 0, width, height);

//             points[0].x += (mouse.x - points[0].x) * 0.3;
//             points[0].y += (mouse.y - points[0].y) * 0.3;

//             for (let i = 1; i < points.length; i++) {
//                 points[i].x += (points[i - 1].x - points[i].x) * 0.3;
//                 points[i].y += (points[i - 1].y - points[i].y) * 0.3;
//             }

//             ctx.beginPath();
//             ctx.moveTo(points[0].x, points[0].y);

//             for (let i = 1; i < points.length - 1; i++) {
//                 const xc = (points[i].x + points[i + 1].x) / 2;
//                 const yc = (points[i].y + points[i + 1].y) / 2;
//                 ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
//             }

//             ctx.strokeStyle = "white";
//             ctx.lineWidth = 2;
//             ctx.stroke();

//             requestAnimationFrame(animate);
//         }

//         animate();

//         window.addEventListener("resize", () => {
//             width = window.innerWidth;
//             height = window.innerHeight;
//             canvas.width = width;
//             canvas.height = height;
//         });
//     }, []);

//     return (
//         <canvas
//             ref={canvasRef}
//             className="fixed top-0 left-0 pointer-events-none z-50"
//         />
//     );
// }



import { useEffect, useRef } from "react";

export default function Cursor() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        const points = [];
        const totalPoints = 20;

        for (let i = 0; i < totalPoints; i++) {
            points.push({ x: width / 2, y: height / 2 });
        }

        let mouse = { x: width / 2, y: height / 2 };

        window.addEventListener("mousemove", (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        function animate() {
            ctx.clearRect(0, 0, width, height);

            points[0].x += (mouse.x - points[0].x) * 0.3;
            points[0].y += (mouse.y - points[0].y) * 0.3;

            for (let i = 1; i < points.length; i++) {
                points[i].x += (points[i - 1].x - points[i].x) * 0.3;
                points[i].y += (points[i - 1].y - points[i].y) * 0.3;
            }

            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);

            for (let i = 1; i < points.length - 1; i++) {
                const xc = (points[i].x + points[i + 1].x) / 2;
                const yc = (points[i].y + points[i + 1].y) / 2;
                ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
            }

            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            ctx.stroke();

            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener("resize", () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        });
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 pointer-events-none z-50"
        />
    );
}