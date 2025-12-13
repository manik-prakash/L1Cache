import { motion } from 'framer-motion';
import { memo } from 'react';

interface StepCardProps {
    step: number;
    icon: React.ReactNode;
    title: string;
    description: string;
    delay: number;
}

export const StepCard = memo(({ step, icon, title, description, delay }: StepCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay }}
        className="relative"
    >
        <motion.div
            className="bg-[#11181f]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#1a232c] h-full"
            whileHover={{ y: -5, borderColor: 'rgba(10, 207, 254, 0.3)' }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center gap-4 mb-6">
                <div className="shrink-0 w-12 h-12 rounded-full bg-[#0acffe]/10 border border-[#0acffe]/30 flex items-center justify-center">
                    <span className="text-[#0acffe] font-bold text-lg">{step}</span>
                </div>
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    {icon}
                </motion.div>
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-3">{title}</h3>
            <p className="text-text-muted leading-relaxed">{description}</p>
        </motion.div>

        {/* Connector line (hidden on last item) */}
        {step < 3 && (
            <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-linear-to-r from-[#0acffe]/30 to-transparent" />
        )}
    </motion.div>
));

StepCard.displayName = 'StepCard';
