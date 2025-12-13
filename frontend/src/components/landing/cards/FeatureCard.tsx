import { motion } from 'framer-motion';
import { memo, useMemo } from 'react';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    accent: string;
    delay: number;
}

export const FeatureCard = memo(({ icon, title, description, accent, delay }: FeatureCardProps) => {
    const accentColors = useMemo(() => ({
        cyan: 'hover:border-[#0acffe]/50 hover:shadow-[0_0_30px_rgba(10,207,254,0.2)]',
        green: 'hover:border-green-600/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]',
        orange: 'hover:border-orange-600/50 hover:shadow-[0_0_30px_rgba(234,88,12,0.2)]',
        pink: 'hover:border-pink-600/50 hover:shadow-[0_0_30px_rgba(219,39,119,0.2)]',
    }), []);

    return (
        <motion.div
            className={`bg-[#11181f]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#1a232c] transition-all duration-300 cursor-pointer ${accentColors[accent as keyof typeof accentColors]}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
        >
            <motion.div
                className="mb-6"
                whileHover={{ scale: 1.1, rotate: 3 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {icon}
            </motion.div>
            <h3 className="text-xl font-bold text-text-primary mb-3">{title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{description}</p>
        </motion.div>
    );
});

FeatureCard.displayName = 'FeatureCard';
