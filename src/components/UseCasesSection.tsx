import { ArrowRight } from 'lucide-react';

export default function UseCasesSection() {
    return (
        <section className="bg-[#F7F7F7] px-4 sm:px-6 py-16 sm:py-20 md:py-24 border-t border-black/10">
            <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="md:pr-12 md:pt-2">
                    <p className="text-black/60 text-sm mb-2">JunubBTC in Practice</p>
                    <h2
                        className="text-black text-4xl sm:text-5xl md:text-6xl font-medium leading-none mb-6"
                        style={{ letterSpacing: '-0.04em' }}
                    >
                        Use modes
                    </h2>
                    <p className="text-black/70 text-sm sm:text-base leading-relaxed max-w-sm">
                        From street merchants in Juba to families receiving remittances from
                        the diaspora, JunubBTC turns Lightning into a payment rail that
                        speaks the local language: South Sudanese Pounds, delivered straight
                        to MTN MoMo.
                    </p>
                </div>

                <div className="relative rounded-3xl overflow-hidden min-h-[480px] sm:min-h-[600px] md:min-h-[720px]">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="object-cover absolute inset-0 w-full h-full"
                    >
                        <source
                            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_183428_ab5e672a-f608-4dcb-b319-f3e040f02e2d.mp4"
                            type="video/mp4"
                        />
                    </video>
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ backgroundColor: 'rgba(250, 141, 8, 0.5)' }}
                    />

                    <div className="relative z-10 p-6 sm:p-10 md:p-12">
                        <h3
                            className="text-[#F5F5F5] text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-4 sm:mb-5 drop-shadow-lg"
                            style={{ letterSpacing: '-0.03em' }}
                        >
                            Commerce
                        </h3>
                        <p className="text-[#F5F5F5]/90 text-sm sm:text-base max-w-md mb-6 sm:mb-8 drop-shadow">
                            Let shoppers pay your shop in sats while you receive SSP on your
                            MTN MoMo line in seconds. No volatility on your side, no new
                            hardware, no custody of customer funds.
                        </p>

                        <a
                            href="/momo"
                            className="inline-flex items-center gap-3 bg-black text-[#F5F5F5] text-sm sm:text-base font-medium pl-2 pr-5 sm:pr-6 py-2 rounded-full hover:bg-black/80 transition-colors duration-200"
                        >
                            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F7931A] flex items-center justify-center">
                                <ArrowRight className="w-4 h-4 text-black" />
                            </span>
                            Know more
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
