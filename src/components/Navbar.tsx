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
    const baseLink =
        'text-base font-medium transition-colors duration-200 relative';
    // Always black text — even on the hero overlay — so it never reads as a
    // white/cream navbar against the video.
    const linkTextActive = 'text-black';
    const linkTextInactive = 'text-black/60 hover:text-black';
    const brandText = 'text-black';
    const underline = 'bg-[#F7931A]';

    return (
        <nav
            className={`${overlay ? 'absolute' : 'sticky'} top-0 left-0 right-0 z-30 px-6 py-5 ${overlay ? '' : 'bg-[#F7F7F7]/95 backdrop-blur border-b border-black/10'
                }`}
        >
            <div className="max-w-[88rem] mx-auto flex items-center justify-between">
                <a
                    href={hrefFor('home')}
                    className={`flex items-center gap-2 ${brandText}`}
                >
                    <LogoIcon className="w-7 h-7 text-[#F7931A]" />
                    <span className="text-2xl font-medium tracking-tight">JunubBTC</span>
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

                <a
                    href={hrefFor('home')}
                    className="bg-black text-[#F5F5F5] text-base font-medium px-7 py-2.5 rounded-full hover:bg-black/80 transition-colors duration-200"
                >
                    Open App
                </a>
            </div>
        </nav>
    );
}
