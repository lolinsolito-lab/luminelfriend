import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// The emotions that fall — a mix of feelings
const EMOTIONS = [
    { emoji: '😊', mood: 'happy' },
    { emoji: '😢', mood: 'sad' },
    { emoji: '😌', mood: 'peaceful' },
    { emoji: '🥺', mood: 'vulnerable' },
    { emoji: '💭', mood: 'thinking' },
    { emoji: '😔', mood: 'melancholy' },
    { emoji: '🤗', mood: 'warmth' },
    { emoji: '😶', mood: 'silent' },
    { emoji: '🌙', mood: 'lonely' },
    { emoji: '✨', mood: 'hope' },
    { emoji: '💛', mood: 'love' },
    { emoji: '😮‍💨', mood: 'relief' },
];

interface Droplet {
    id: number;
    emoji: string;
    mood: string;
    x: number;        // % from left
    delay: number;     // seconds
    duration: number;  // fall duration
    size: number;      // font size
    drift: number;     // horizontal drift in px
    sparkle: boolean;  // whether it has a golden sparkle
}

function generateDroplet(id: number): Droplet {
    const emotion = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)];
    return {
        id,
        emoji: emotion.emoji,
        mood: emotion.mood,
        x: 5 + Math.random() * 90,            // 5-95% from left
        delay: Math.random() * 12,              // stagger over 12s
        duration: 10 + Math.random() * 8,       // 10-18s to fall
        size: 12 + Math.random() * 10,          // 12-22px
        drift: -30 + Math.random() * 60,        // -30 to +30 px drift
        sparkle: Math.random() > 0.5,
    };
}

interface EmotionRainProps {
    showEmotions: boolean;
}

export default function EmotionRain({ showEmotions }: EmotionRainProps) {
    const [drops, setDrops] = useState<Droplet[]>([]);

    // Generate initial droplets
    const initialDrops = useMemo(() => {
        return Array.from({ length: 20 }, (_, i) => generateDroplet(i));
    }, []);

    useEffect(() => {
        setDrops(initialDrops);

        // Continuously spawn new drops
        let counter = 20;
        const interval = setInterval(() => {
            setDrops(prev => {
                // Remove old drops to prevent memory leak, keep max 30
                const trimmed = prev.length > 30 ? prev.slice(-25) : prev;
                return [...trimmed, generateDroplet(counter++)];
            });
        }, 2000); // New drop every 2s

        return () => clearInterval(interval);
    }, [initialDrops]);

    // Clear drops immediately when toggled off
    useEffect(() => {
        if (!showEmotions) {
            setDrops([]);
        } else {
            setDrops(initialDrops);
        }
    }, [showEmotions, initialDrops]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
            {/* Shooting Stars — golden streaks falling from top-right */}
            {[...Array(4)].map((_, i) => (
                <div
                    key={`star-${i}`}
                    className="shooting-star"
                    style={{
                        top: `-10%`,
                        right: `${10 + i * 20}%`, // They spawn on the top-right
                        animationDuration: `${12 + i * 4}s`, // Longer duration = appears less often (20% active, 80% hidden)
                        animationDelay: `${i * 3 + 2}s`,
                    }}
                />
            ))}

            {/* Gold dust particles falling slowly from top */}
            {[...Array(12)].map((_, i) => (
                <div
                    key={`dust-${i}`}
                    className={i % 3 === 0 ? "particle-soft" : i % 3 === 1 ? "particle-light" : "particle"}
                    style={{
                        left: `${5 + (i * 8)}%`,
                        top: `-2%`, // spawn at top
                        animationDuration: `${12 + i * 2}s`,
                        animationDelay: `${i * 0.8}s`,
                    }}
                />
            ))}

            {/* Emotion droplets */}
            <AnimatePresence>
                {showEmotions && drops.map(drop => (
                    <motion.div
                        key={drop.id}
                        initial={{
                            top: '-5%',
                            left: `${drop.x}%`,
                            opacity: 0,
                            scale: 0.3,
                        }}
                        animate={{
                            top: '105%',
                            left: `calc(${drop.x}% + ${drop.drift}px)`,
                            opacity: [0, 0.7, 0.8, 0.6, 0],
                            scale: [0.3, 1, 1, 0.8, 0.2],
                        }}
                        transition={{
                            duration: drop.duration,
                            delay: drop.delay,
                            ease: 'linear',
                            opacity: {
                                times: [0, 0.1, 0.5, 0.85, 1],
                                duration: drop.duration,
                                delay: drop.delay,
                            },
                            scale: {
                                times: [0, 0.1, 0.5, 0.85, 1],
                                duration: drop.duration,
                                delay: drop.delay,
                            },
                        }}
                        onAnimationComplete={() => {
                            setDrops(prev => prev.filter(d => d.id !== drop.id));
                        }}
                        className="absolute flex items-center justify-center"
                        style={{ fontSize: drop.size }}
                    >
                        {/* Golden sparkle ring around emotion */}
                        {drop.sparkle && (
                            <motion.div
                                animate={{
                                    scale: [1, 1.4, 1],
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: 'radial-gradient(circle, rgba(212,171,58,0.3) 0%, transparent 70%)',
                                    width: drop.size * 2.5,
                                    height: drop.size * 2.5,
                                    marginLeft: -(drop.size * 0.75),
                                    marginTop: -(drop.size * 0.75),
                                }}
                            />
                        )}
                        <span className="relative z-10 drop-shadow-[0_0_8px_rgba(196,154,42,0.4)]">
                            {drop.emoji}
                        </span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
