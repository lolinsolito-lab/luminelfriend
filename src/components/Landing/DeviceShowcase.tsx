import { motion } from 'motion/react';

export default function DeviceShowcase() {
    return (
        <section className="py-24 md:py-32 px-6 bg-space-surface relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-12 max-w-2xl"
                >
                    <h2 className="text-3xl md:text-5xl font-display font-600 text-text-warm leading-tight mb-4">
                        Con te ovunque: Mobile, Desktop e Immersione Vocale
                    </h2>
                    <p className="text-base text-text-muted font-light">
                        Dal divano alle 3 del mattino, nel comfort del tuo studio, o immerso
                        in un mondo di riflessione pura. Luminel si adatta a come vuoi essere ascoltato.
                    </p>
                </motion.div>

                {/* 3-Device Grid — Mindvalley style */}
                <div className="grid md:grid-cols-[1fr_1.5fr] gap-6">
                    {/* Left — Mobile Phone (Tall) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-space-deep/40 rounded-3xl p-8 flex items-center justify-center border border-white/[0.04] overflow-hidden group"
                    >
                        <img
                            src="/images/device-mobile.png"
                            alt="Luminel Mobile Experience"
                            className="w-full max-w-[280px] h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                    </motion.div>

                    {/* Right Column — Laptop and VR Stack */}
                    <div className="flex flex-col gap-6 h-full">
                        {/* Top Right — Laptop */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="bg-space-deep/40 rounded-3xl p-8 flex-1 flex items-center justify-center border border-white/[0.04] overflow-hidden group min-h-[250px]"
                        >
                            <img
                                src="/images/device-desktop.png"
                                alt="Luminel Desktop Experience"
                                className="w-full max-w-[500px] h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                            />
                        </motion.div>

                        {/* Bottom Right — VR / Immersive Voice */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-space-deep/40 rounded-3xl p-8 flex-1 flex items-center justify-center border border-white/[0.04] overflow-hidden group min-h-[250px]"
                        >
                            <img
                                src="/images/device-vr.png"
                                alt="Luminel Immersive Audio"
                                className="w-full max-w-[400px] h-auto object-contain transition-transform duration-700 group-hover:scale-105 brightness-110"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
