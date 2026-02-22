import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/**
 * A custom interactive cursor that follows the mouse with a golden glow trail.
 * Only visible on desktop (hidden on touch devices).
 */
export default function InteractiveCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springX = useSpring(cursorX, { damping: 25, stiffness: 300 });
    const springY = useSpring(cursorY, { damping: 25, stiffness: 300 });

    const trailRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Detect touch device — hide custom cursor entirely
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [cursorX, cursorY]);

    // Hide on touch devices
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        return null;
    }

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-screen"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                    background: 'radial-gradient(circle, rgba(196,154,42,0.9) 0%, rgba(196,154,42,0) 70%)',
                }}
            />

            {/* Trailing glow */}
            <motion.div
                ref={trailRef}
                className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-[9998] mix-blend-screen"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                    background: 'radial-gradient(circle, rgba(196,154,42,0.06) 0%, rgba(196,154,42,0) 70%)',
                    filter: 'blur(20px)',
                }}
            />
        </>
    );
}
