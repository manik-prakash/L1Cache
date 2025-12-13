import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';
import { memo } from 'react';

interface NavLinkProps {
    onClick: () => void;
    children: React.ReactNode;
}

const NavLink = memo(({ onClick, children }: NavLinkProps) => (
    <motion.button
        onClick={onClick}
        className="text-text-muted hover:text-[#0acffe] transition-colors font-medium cursor-pointer"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
    >
        {children}
    </motion.button>
));

NavLink.displayName = 'NavLink';

interface NavbarProps {
    isScrolled: boolean;
    onGetStarted: () => void;
    scrollToSection: (sectionId: string) => void;
}

export const Navbar = memo(({ isScrolled, onGetStarted, scrollToSection }: NavbarProps) => (
    <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        initial={{
            backgroundColor: 'rgba(10, 15, 20, 0.3)',
            borderColor: 'rgba(10, 207, 254, 0.1)',
        }}
        animate={{
            backgroundColor: isScrolled ? 'rgba(10, 15, 20, 0.8)' : 'rgba(10, 15, 20, 0.3)',
            borderBottom: isScrolled ? '1px solid rgba(10, 207, 254, 0.2)' : '1px solid rgba(10, 207, 254, 0.1)',
            boxShadow: isScrolled ? '0 8px 32px 0 rgba(10, 207, 254, 0.1)' : '0 4px 16px 0 rgba(0, 0, 0, 0.1)',
        }}
        style={{
            backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(10px) saturate(150%)',
            WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(10px) saturate(150%)',
        }}
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <motion.div
                    className="flex items-center gap-2 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => scrollToSection('hero')}
                >
                    <motion.div
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <BrainCircuit className="text-[#0acffe]" size={32} />
                    </motion.div>
                    <span className="text-xl font-bold text-text-primary tracking-tight">ThoughtCache</span>
                </motion.div>

                {/* Navigation Menu - Hidden on mobile, visible on desktop */}
                <div className="hidden md:flex items-center gap-8">
                    <NavLink onClick={() => scrollToSection('features')}>Features</NavLink>
                    <NavLink onClick={() => scrollToSection('how-it-works')}>How It Works</NavLink>
                    <NavLink onClick={() => scrollToSection('benefits')}>Benefits</NavLink>
                    <NavLink onClick={() => scrollToSection('demo')}>Demo</NavLink>
                </div>

                {/* CTA Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button
                        onClick={onGetStarted}
                        className="px-4 py-2 bg-[#0acffe] text-[#0a0f14] rounded-lg font-medium hover:bg-[#0acffe]/90 transition-colors"
                    >
                        Get Started
                    </button>
                </motion.div>
            </div>
        </div>
    </motion.nav>
));

Navbar.displayName = 'Navbar';
