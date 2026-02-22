import { motion } from 'motion/react';

/**
 * AnimatedOrb — The living heart of Luminel.
 * Multi-layered animation: rotation, breathing, glow pulse, floating particles.
 * Uses the OG orb image as base, then adds life through CSS.
 */
export default function AnimatedOrb({ size = 300, className = '' }: { size?: number; className?: string }) {
    return (
        <div
            className={`relative flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
        >
            {/* Layer 0: Deep ambient glow */}
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.15, 0.3, 0.15],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute rounded-full bg-amber/20 blur-3xl"
                style={{ width: size * 1.5, height: size * 1.5 }}
            />

            {/* Layer 1: Outer ring glow — slow counter-rotation */}
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute rounded-full"
                style={{
                    width: size * 1.1,
                    height: size * 1.1,
                    background: 'conic-gradient(from 0deg, transparent, rgba(196,154,42,0.15), transparent, rgba(232,168,56,0.1), transparent)',
                    filter: 'blur(8px)',
                }}
            />

            {/* Layer 2: The Orb Image — slow clockwise rotation + breathing */}
            <motion.div
                animate={{
                    rotate: 360,
                    scale: [1, 1.03, 1],
                }}
                transition={{
                    rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="relative rounded-full overflow-hidden"
                style={{ width: size, height: size }}
            >
                <img
                    src="/luminel-orb.png"
                    alt="Luminel Orb"
                    className="w-full h-full object-cover"
                />

                {/* Inner glass highlight — moves opposite */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: 'conic-gradient(from 90deg, transparent 0%, rgba(255,255,255,0.12) 15%, transparent 30%, transparent 100%)',
                    }}
                />
            </motion.div>

            {/* Layer 3: Pulsing golden halo */}
            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.6, 0.3],
                    boxShadow: [
                        '0 0 30px rgba(196,154,42,0.2), inset 0 0 30px rgba(196,154,42,0.1)',
                        '0 0 60px rgba(232,168,56,0.4), inset 0 0 40px rgba(196,154,42,0.15)',
                        '0 0 30px rgba(196,154,42,0.2), inset 0 0 30px rgba(196,154,42,0.1)',
                    ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute rounded-full border border-amber/20"
                style={{ width: size * 1.05, height: size * 1.05 }}
            />

            {/* Layer 4: Orbiting spark particles */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                    key={i}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 8 + i * 3,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * 1.2,
                    }}
                    className="absolute"
                    style={{ width: size, height: size }}
                >
                    <motion.div
                        animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 2 + i * 0.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.4,
                        }}
                        className="absolute rounded-full bg-amber-glow"
                        style={{
                            width: 3 + (i % 3),
                            height: 3 + (i % 3),
                            top: '0%',
                            left: '50%',
                            transform: `translateX(-50%) translateY(${-5 - i * 3}px)`,
                            boxShadow: '0 0 8px rgba(232,168,56,0.8)',
                        }}
                    />
                </motion.div>
            ))}

            {/* Layer 5: Radial light rays — subtle pulsing */}
            <motion.div
                animate={{
                    rotate: 180,
                    opacity: [0.05, 0.12, 0.05],
                }}
                transition={{
                    rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
                    opacity: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute rounded-full"
                style={{
                    width: size * 1.3,
                    height: size * 1.3,
                    background: `repeating-conic-gradient(from 0deg, transparent 0deg, rgba(232,168,56,0.08) 5deg, transparent 10deg)`,
                }}
            />
        </div>
    );
}
