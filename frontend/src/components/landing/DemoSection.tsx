import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';

export function DemoSection() {
    return (
        <section id="demo" className="py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                    See It In Action
                </h2>
                <p className="text-text-muted text-lg max-w-2xl mx-auto">
                    Experience the power of your second brain
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative rounded-3xl overflow-hidden border border-[#1a232c] bg-gradient-to-br from-[#11181f] to-[#0a0f14] p-8 md:p-12"
            >
                <div className="aspect-video bg-[#0a0f14] rounded-2xl border border-[#0acffe]/30 flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center">
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <BrainCircuit className="text-[#0acffe] mx-auto mb-4" size={64} />
                        </motion.div>
                        <p className="text-text-muted text-lg">
                            Interactive demo coming soon
                        </p>
                        <p className="text-text-muted text-sm mt-2">
                            Click "Get Started" to try it now
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
