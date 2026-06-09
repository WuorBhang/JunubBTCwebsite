import type { ReactNode } from 'react';

interface PageShellProps {
    eyebrow?: string;
    title: ReactNode;
    intro?: ReactNode;
    children: ReactNode;
}

/**
 * Shared layout for all sub-pages (News, Help, MoMo, Lightning, Network).
 * Wraps the page body with a hero header and the orange bg so the navbar
 * blends in seamlessly.
 */
export default function PageShell({
    eyebrow,
    title,
    intro,
    children,
}: PageShellProps) {
    return (
        <div className="bg-[#F7F7F7] pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6">
            <div className="max-w-[88rem] mx-auto">
                <header className="mb-10 sm:mb-12 md:mb-16 max-w-3xl">
                    {eyebrow && (
                        <p className="text-black/60 text-xs sm:text-sm mb-2 sm:mb-3 uppercase tracking-wider">
                            {eyebrow}
                        </p>
                    )}
                    <h1
                        className="text-black text-4xl sm:text-5xl md:text-6xl font-medium leading-tight sm:leading-none mb-4 sm:mb-6"
                        style={{ letterSpacing: '-0.04em' }}
                    >
                        {title}
                    </h1>
                    {intro && (
                        <p className="text-black/70 text-base sm:text-lg md:text-xl leading-relaxed">
                            {intro}
                        </p>
                    )}
                </header>
                {children}
            </div>
        </div>
    );
}
