import { ArrowRight } from 'lucide-react';

const BRANDS: Array<{
    name: string;
    style: React.CSSProperties;
}> = [
        {
            name: 'Phoenix',
            style: {
                fontFamily: 'Georgia, serif',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                fontSize: '15px',
            },
        },
        {
            name: 'WALLET OF SATOSHI',
            style: {
                fontFamily: 'Arial, sans-serif',
                fontWeight: 900,
                letterSpacing: '0.08em',
                fontSize: '13px',
                textTransform: 'uppercase',
            },
        },
        {
            name: 'Muun',
            style: {
                fontFamily: '"Trebuchet MS", sans-serif',
                fontWeight: 600,
                letterSpacing: '0.01em',
                fontSize: '15px',
                fontStyle: 'italic',
            },
        },
        {
            name: 'MTN MOMO',
            style: {
                fontFamily: '"Courier New", monospace',
                fontWeight: 700,
                letterSpacing: '0.12em',
                fontSize: '13px',
                textTransform: 'uppercase',
            },
        },
        {
            name: 'Strike',
            style: {
                fontFamily: '"Palatino", "Book Antiqua", serif',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                fontSize: '16px',
            },
        },
        {
            name: 'mGURUSH',
            style: {
                fontFamily: 'Impact, "Arial Narrow", sans-serif',
                fontWeight: 400,
                letterSpacing: '0.04em',
                fontSize: '14px',
            },
        },
        {
            name: 'LNbits',
            style: {
                fontFamily: 'Verdana, sans-serif',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                fontSize: '13px',
            },
        },
    ];

export default function HeroSection() {
    return (
        <section className="flex-1 px-4 sm:px-6 pt-20 sm:pt-20 pb-4 sm:pb-6 flex items-end">
            <div className="max-w-[88rem] mx-auto w-full">
                <div
                    className="relative w-full rounded-2xl overflow-hidden min-h-[560px] sm:min-h-[640px]"
                    style={{ height: 'calc(100vh - 100px)' }}
                >
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="object-cover absolute inset-0 w-full h-full"
                    >
                        <source
                            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4"
                            type="video/mp4"
                        />
                    </video>

                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ backgroundColor: 'rgba(250, 141, 8, 0.5)' }}
                    />

                    <div className="relative z-10 flex flex-col items-start justify-start h-full p-6 sm:p-10 md:p-12 pt-24 sm:pt-32 md:pt-36">
                        <h1
                            className="text-[#F5F5F5] text-4xl sm:text-5xl md:text-6xl font-medium leading-tight max-w-xl mb-4 drop-shadow-lg"
                            style={{ letterSpacing: '-0.04em' }}
                        >
                            Bitcoin Spends
                            <br />
                            in South Sudan
                        </h1>

                        <p
                            className="text-[#F5F5F5]/90 text-sm sm:text-base md:text-lg max-w-md mb-6 sm:mb-8 leading-relaxed drop-shadow"
                            style={{
                                fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
                            }}
                        >
                            A non-custodial Lightning bridge that lets anyone turn sats into
                            South Sudanese Pounds through MTN Mobile Money — instantly, with
                            no middleman holding your coins.
                        </p>

                        <a
                            href="/momo"
                            className="inline-flex items-center gap-3 bg-black text-[#F5F5F5] text-sm sm:text-base md:text-lg font-medium pl-6 sm:pl-8 pr-2 py-2 rounded-full hover:bg-black/80 transition-colors duration-200"
                        >
                            Get the App
                            <span className="bg-[#F5F5F5] rounded-full p-1.5 sm:p-2 flex items-center justify-center">
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                            </span>
                        </a>

                        <BrandMarquee />
                    </div>
                </div>
            </div>
        </section>
    );
}

function BrandMarquee() {
    return (
        <div className="mt-12 sm:mt-16 md:mt-24 w-full max-w-md overflow-hidden">
            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
      `}</style>
            <div className="marquee-track">
                {[...BRANDS, ...BRANDS].map((brand, i) => (
                    <span
                        key={`${brand.name}-${i}`}
                        className="mx-7 shrink-0 text-[#F5F5F5]/80 whitespace-nowrap drop-shadow"
                        style={brand.style}
                    >
                        {brand.name}
                    </span>
                ))}
            </div>
        </div>
    );
}
