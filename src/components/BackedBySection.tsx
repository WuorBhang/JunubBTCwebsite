const BACKERS: Array<{ name: string; style: React.CSSProperties }> = [
    {
        name: 'bitcoin++ Nairobi',
        style: {
            fontFamily: '"Times New Roman", serif',
            fontWeight: 400,
            letterSpacing: '0.02em',
            fontSize: '14px',
        },
    },
    {
        name: 'BTRUST',
        style: {
            fontFamily: '"Arial Black", sans-serif',
            fontWeight: 900,
            letterSpacing: '0.08em',
            fontSize: '16px',
        },
    },
    {
        name: 'OPENSATS',
        style: {
            fontFamily: 'Impact, sans-serif',
            fontWeight: 700,
            letterSpacing: '0.05em',
            fontSize: '18px',
        },
    },
    {
        name: 'AfriBit',
        style: {
            fontFamily: 'Georgia, serif',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            fontSize: '17px',
        },
    },
    {
        name: 'Bitnob',
        style: {
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            fontSize: '15px',
        },
    },
    {
        name: 'GERIDA',
        style: {
            fontFamily: 'Verdana, sans-serif',
            fontWeight: 700,
            letterSpacing: '0.06em',
            fontSize: '14px',
            textTransform: 'uppercase',
        },
    },
    {
        name: 'ALBY',
        style: {
            fontFamily: '"Courier New", monospace',
            fontWeight: 700,
            letterSpacing: '0.18em',
            fontSize: '14px',
        },
    },
    {
        name: 'Spiral',
        style: {
            fontFamily: '"Palatino", serif',
            fontWeight: 500,
            letterSpacing: '0.03em',
            fontSize: '15px',
        },
    },
];

export default function BackedBySection() {
    return (
        <section className="bg-[#F7F7F7] px-4 sm:px-6 py-10 sm:py-12 border-t border-black/10">
            <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 items-center">
                <div className="md:col-span-1">
                    <p className="text-black/70 text-sm sm:text-base leading-relaxed">
                        Built with the open Bitcoin ecosystem
                        <br />
                        for the people of South Sudan.
                    </p>
                </div>

                <div className="md:col-span-3 overflow-hidden">
                    <style>{`
            @keyframes backers-marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .backers-track {
              display: flex;
              width: max-content;
              animation: backers-marquee 30s linear infinite;
            }
          `}</style>
                    <div className="backers-track">
                        {[...BACKERS, ...BACKERS].map((b, i) => (
                            <span
                                key={`${b.name}-${i}`}
                                className="mx-6 sm:mx-10 shrink-0 text-black/50 whitespace-nowrap"
                                style={b.style}
                            >
                                {b.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
