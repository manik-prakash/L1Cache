import { motion } from 'framer-motion';
import { BrainCircuit, Code2, Briefcase, MessageCircle, Mail } from 'lucide-react';
import { memo } from 'react';

interface SocialLinkProps {
    href: string;
    children: React.ReactNode;
    'aria-label': string;
}

const SocialLink = memo(({ href, children, 'aria-label': ariaLabel }: SocialLinkProps) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className="text-text-muted hover:text-[#0acffe] transition-colors"
        whileHover={{ scale: 1.2, y: -2 }}
        whileTap={{ scale: 0.9 }}
    >
        {children}
    </motion.a>
));

SocialLink.displayName = 'SocialLink';

export function Footer() {
    return (
        <footer className="border-t border-[#1a232c] mt-16 py-12 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="flex flex-col items-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-2 mb-6">
                        <BrainCircuit className="text-[#0acffe]" size={28} />
                        <span className="text-lg font-bold text-text-primary">ThoughtCache</span>
                    </div>

                    <div className="flex gap-6 mb-8">
                        <SocialLink href="https://github.com/manik-prakash" aria-label="GitHub">
                            <Code2 size={24} />
                        </SocialLink>
                        <SocialLink href="https://www.linkedin.com/in/manik-prakash/" aria-label="LinkedIn">
                            <Briefcase size={24} />
                        </SocialLink>
                        <SocialLink href="https://x.com/manikprakash74" aria-label="X">
                            <MessageCircle size={24} />
                        </SocialLink>
                        <SocialLink href="mailto:manikprakash74@gmail.com" aria-label="Email">
                            <Mail size={24} />
                        </SocialLink>
                    </div>
                </motion.div>

                <div className="text-center text-text-muted text-sm border-t border-[#1a232c] pt-8">
                    <p>ThoughtCache 2025. Built with ❤️ by Manik</p>
                </div>
            </div >
        </footer >
    );
}
