import { motion } from 'framer-motion';
import { Layout, BookMarked, Zap } from 'lucide-react';
import { StepCard } from './cards/StepCard';

export function HowItWorksSection() {
    return (
        <section id="how-it-works" className="py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                    How It Works
                </h2>
                <p className="text-text-muted text-lg max-w-2xl mx-auto">
                    Simple steps to start building your knowledge base
                </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
                <StepCard
                    step={1}
                    icon={<Layout className="text-[#0acffe]" size={40} />}
                    title="Capture"
                    description="Add any content - links, notes, images, or ideas - with a single click or keyboard shortcut"
                    delay={0}
                />
                <StepCard
                    step={2}
                    icon={<BookMarked className="text-green-600" size={40} />}
                    title="Organize"
                    description="Tag and categorize your items automatically or manually for easy organization"
                    delay={0.15}
                />
                <StepCard
                    step={3}
                    icon={<Zap className="text-pink-600" size={40} />}
                    title="Retrieve"
                    description="Find anything instantly with powerful search and smart filters"
                    delay={0.3}
                />
            </div>
        </section>
    );
}
