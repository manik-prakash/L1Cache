import { motion } from 'framer-motion';
import { BrainCircuit, BookMarked, Search, Share2 } from 'lucide-react';
import { FeatureCard } from './cards/FeatureCard';

export function FeaturesSection() {
    return (
        <section id="features" className="py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                    Powerful Features
                </h2>
                <p className="text-text-muted text-lg max-w-2xl mx-auto">
                    Everything you need to build and maintain your second brain
                </p>
            </motion.div>

            <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                <FeatureCard
                    icon={<BrainCircuit className="text-[#0acffe]" size={32} />}
                    title="Capture Anything"
                    description="Save thoughts, links, tweets, articles, and media in one place"
                    accent="cyan"
                    delay={0}
                />
                <FeatureCard
                    icon={<BookMarked className="text-green-600" size={32} />}
                    title="Organize Simply"
                    description="Tag and folder your items for easy retrieval later"
                    accent="green"
                    delay={0.1}
                />
                <FeatureCard
                    icon={<Search className="text-orange-600" size={32} />}
                    title="Find Instantly"
                    description="Full-text search across all your saved content and metadata"
                    accent="orange"
                    delay={0.2}
                />
                <FeatureCard
                    icon={<Share2 className="text-pink-600" size={32} />}
                    title="Share Effortlessly"
                    description="Create public links to share your knowledge with others"
                    accent="pink"
                    delay={0.3}
                />
            </motion.div>
        </section>
    );
}
