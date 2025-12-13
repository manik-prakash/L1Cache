import { motion } from 'framer-motion';
import { memo } from 'react';

export const AnimatedBackground = memo(() => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-[#0acffe] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
            animate={{
                x: [0, 30, -20, 0],
                y: [0, -50, 20, 0],
                scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
        <motion.div
            className="absolute top-40 right-10 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
            animate={{
                x: [0, -30, 20, 0],
                y: [0, 40, -30, 0],
                scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
            }}
        />
        <motion.div
            className="absolute bottom-20 left-1/2 w-72 h-72 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
            animate={{
                x: [0, 20, -30, 0],
                y: [0, -30, 40, 0],
                scale: [1, 1.05, 0.95, 1],
            }}
            transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4
            }}
        />
    </div>
));

AnimatedBackground.displayName = 'AnimatedBackground';
