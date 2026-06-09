import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import LogoIcon from './LogoIcon';
import { PAGES, PAGE_LABEL, hrefFor, type Page } from '../lib/router';

interface NavbarProps {
    /** Page currently active. */
    current: Page;
    /**
     * When true, the navbar is overlaid on top of a video/hero (transparent).
     * When false, it sits on the orange page bg with a subtle bottom border.
     */
    overlay?: boolean;
}

export default function Navbar({ current, overlay = false }: NavbarProps) {
    const [open, setOpen] = useState(false);

    const baseLink =
        'text-base font-medium transition-colors duration-200 relative';
    // Always black text — even on the hero overlay — so it never reads as a
    // white/cream navbar against the video.
    const linkTextActive = 'text-black';
    const linkTextInactive = 'text-black/60 hover:text-black';
    const brandText = 'text-black';
    const underline = 'bg-[#F7931A]';

    // Close the mobile menu whenever the active page changes (after navigation).
    useEffect(() => {
        setOpen(false);
    }, [current]);

    // Prevent body scroll while the mobile menu is open.
    useEffect(() => {
        if (typeof document === 'undefined') return;
        const prev = document.body.style.overflow;
        if (open) document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    return (
        <nav
            className={`${overlay ? 'absolute' : 'sticky'} top-0 left-0 right-0 z-30 px-4 sm:px-6 py-4 sm:py-5 ${overlay ? '' : 'bg-[#F7F7F7]/95 backdrop-blur border-b border-black/10'
                }`}
        >
            <div className="max-w-[88rem] mx-auto flex items-center justify-between gap-3">
                <a
                    href={hrefFor('home')}
                    className={`flex items-center gap-2 ${brandText}`}
                >
                    <LogoIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#F7931A]" />
                    <span className="text-xl sm:text-2xl font-medium tracking-tight">JunubBTC</span>
                </a>

                <div className="hidden md:flex items-center gap-8">
                    {PAGES.map((p) => {
                        const isActive = p === current;
                        return (
                            <a
                                key={p}
                                href={hrefFor(p)}
                                className={`${baseLink} ${isActive ? linkTextActive : linkTextInactive
                                    }`}
                            >
                                {PAGE_LABEL[p]}
                                {isActive && (
                                    <span
                                        className={`absolute -bottom-1 left-0 right-0 h-[2px] ${underline}`}
                                    />
                                )}
                            </a>
                        );
                    })}
                </div>

                <div className="flex items-center gap-2">
                    <a
                        href={hrefFor('home')}
                        className="bg-black text-[#F5F5F5] text-sm sm:text-base font-medium px-4 sm:px-7 py-2 sm:py-2.5 rounded-full hover:bg-black/80 transition-colors duration-200"
                    >
                        Open App
                    </a>
                    <button
                        type="button"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                        className="md:hidden w-10 h-10 inline-flex items-center justify-center rounded-full border border-black/10 text-black hover:bg-black/5 transition-colors duration-200"
                    >
                        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu panel */}
            {open && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-[#F7F7F7] border-b border-black/10 shadow-lg">
                    <div className="max-w-[88rem] mx-auto px-4 sm:px-6 py-4 flex flex-col">
                        {PAGES.map((p) => {
                            const isActive = p === current;
                            return (
                                <a
                                    key={p}
                                    href={hrefFor(p)}
                                    className={`py-3 text-lg font-medium border-b border-black/5 last:border-b-0 ${isActive ? 'text-black' : 'text-black/70'
                                        }`}
                                >
                                    <span className="inline-flex items-center gap-2">
                                        {PAGE_LABEL[p]}
                                        {isActive && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#F7931A]" />
                                        )}
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
}
