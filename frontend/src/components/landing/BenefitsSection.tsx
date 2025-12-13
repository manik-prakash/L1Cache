import { motion } from 'framer-motion';
import { Target, TrendingUp, Sparkles, Link2 } from 'lucide-react';
import { BenefitCard } from './cards/BenefitCard';

export function BenefitsSection() {
    return (
        <section id="benefits" className="py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                    Why Choose ThoughtCache?
                </h2>
                <p className="text-text-muted text-lg max-w-2xl mx-auto">
                    Built for thinkers, learners, and creators
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
                <BenefitCard
                    icon={<Target className="text-[#0acffe]" size={32} />}
                    title="Stay Focused"
                    description="Never lose a brilliant idea or important link. Capture everything in one place and focus on what matters."
                    gradient="from-[#0acffe]/20 to-transparent"
                />
                <BenefitCard
                    icon={<TrendingUp className="text-green-600" size={32} />}
                    title="Boost Productivity"
                    description="Access your knowledge instantly. Spend less time searching and more time creating."
                    gradient="from-green-600/20 to-transparent"
                />
                <BenefitCard
                    icon={<Sparkles className="text-pink-600" size={32} />}
                    title="Build Connections"
                    description="Discover relationships between ideas. Your second brain helps you think smarter."
                    gradient="from-pink-600/20 to-transparent"
                />
                <BenefitCard
                    icon={<Link2 className="text-orange-600" size={32} />}
                    title="Work Anywhere"
                    description="Access your knowledge from any device. Your brain travels with you."
                    gradient="from-orange-600/20 to-transparent"
                />
            </div>
        </section>
    );
}
