import { motion } from 'framer-motion';
import { memo } from 'react';

interface BenefitCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    gradient: string;
}

export const BenefitCard = memo(({ icon, title, description, gradient }: BenefitCardProps) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        className="relative overflow-hidden"
    >
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50`} />
        <div className="relative bg-[#11181f]/70 backdrop-blur-sm rounded-2xl p-8 border border-[#1a232c] h-full">
            <motion.div
                className="mb-6 inline-block p-3 rounded-xl bg-[#0a0f14]/50 border border-[#1a232c]"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {icon}
            </motion.div>
            <h3 className="text-2xl font-bold text-text-primary mb-3">{title}</h3>
            <p className="text-text-muted leading-relaxed">{description}</p>
        </div>
    </motion.div>
));

BenefitCard.displayName = 'BenefitCard';
