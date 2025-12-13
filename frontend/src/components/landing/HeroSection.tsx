import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

interface HeroSectionProps {
    onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
    return (
        <section id="hero" className="pt-32 pb-20">
            <div className="text-center mb-20">
                <motion.div
                    className="inline-block mb-6 px-4 py-2 bg-[#0acffe]/10 border border-[#0acffe]/30 rounded-full backdrop-blur-sm"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-[#0acffe] text-sm font-medium">Your Personal Knowledge Hub</span>
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-text-primary mb-6 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Your Digital<br />
                    <motion.span
                        className="bg-gradient-to-r from-[#0acffe] via-pink-500 to-green-500 text-transparent bg-clip-text"
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            backgroundSize: '200% auto',
                        }}
                    >
                        Memory Palace
                    </motion.span>
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Capture thoughts, save links, organize knowledge.<br />
                    Build your personal knowledge base with ease.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={onGetStarted} size="lg" className="group">
                            Start Building Your Brain
                            <motion.span
                                className="inline-block ml-2"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
