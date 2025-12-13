import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

interface CTASectionProps {
    onGetStarted: () => void;
}

export function CTASection({ onGetStarted }: CTASectionProps) {
    return (
        <section className="py-20">
            <motion.div
                className="bg-gradient-to-br from-[#11181f] to-[#0a0f14] rounded-3xl shadow-2xl p-12 text-center border border-[#1a232c] relative overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#0acffe]/5 via-transparent to-pink-600/5"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />
                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                            Ready to enhance your memory?
                        </h2>
                        <p className="text-lg text-text-muted mb-8 max-w-xl mx-auto">
                            Join thousands who are building their second brain and unlock your full potential
                        </p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button onClick={onGetStarted} size="lg">
                                Get Started Free
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
