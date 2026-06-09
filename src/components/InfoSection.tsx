import { ArrowRight } from 'lucide-react';

export default function InfoSection() {
    return (
        <section className="bg-[#F7F7F7] px-6 py-24">
            <div className="max-w-[88rem] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
                    <div>
                        <h2
                            className="text-black text-4xl md:text-5xl font-medium leading-tight mb-8"
                            style={{ letterSpacing: '-0.03em' }}
                        >
                            Meet JunubBTC.
                        </h2>
                        <a
                            href="/lightning"
                            className="inline-flex items-center gap-3 bg-black text-[#F5F5F5] text-base font-medium pl-8 pr-2 py-2 rounded-full hover:bg-black/80 transition-colors duration-200"
                        >
                            Discover it
                            <span className="bg-[#F7931A] rounded-full p-2 flex items-center justify-center">
                                <ArrowRight className="w-5 h-5 text-black" />
                            </span>
                        </a>
                    </div>

                    <p className="text-black/70 text-2xl md:text-3xl leading-relaxed">
                        JunubBTC is a non-custodial Lightning rail that turns Bitcoin into
                        South Sudanese Pounds the moment you need them — protecting your
                        savings from inflation while keeping you in full control of your
                        keys.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div
                        className="lg:col-span-2 rounded-2xl p-7 min-h-80 flex flex-col justify-between relative overflow-hidden"
                        style={{
                            backgroundImage:
                                "url('https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260423_164207_f243351d-ed59-48ec-83a0-a5e996bdbe3c.png&w=1280&q=85')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{ backgroundColor: 'rgba(250, 141, 8, 0.5)' }}
                        />
                        <h3
                            className="relative text-[#F5F5F5] text-2xl font-medium leading-snug"
                            style={{ letterSpacing: '-0.02em' }}
                        >
                            Savings that hold
                        </h3>
                        <p className="relative text-[#F5F5F5]/90 text-base max-w-xs">
                            While the SSP has slid from 150 to over 587,000 per USD 100, sats
                            held in your own wallet keep their value — ready to spend the
                            moment you do.
                        </p>
                    </div>

                    <div className="bg-black rounded-2xl p-7 min-h-80 flex flex-col justify-between">
                        <h3 className="text-[#F5F5F5] text-2xl font-medium leading-snug">
                            Always liquid,
                            <br />
                            always yours.
                        </h3>
                        <p className="text-[#F5F5F5]/70 text-base">
                            We never touch your funds. JunubBTC routes the payment, your own
                            Lightning wallet signs it — no lockups, no custodial risk.
                        </p>
                    </div>

                    <div className="bg-[#F7931A] rounded-2xl p-7 min-h-80 flex flex-col justify-between">
                        <h3 className="text-[#F5F5F5] text-2xl font-medium leading-snug">
                            Fully
                            <br />
                            automated
                        </h3>
                        <p className="text-[#F5F5F5]/90 text-base">
                            Scan a merchant or paste a MoMo number. JunubBTC quotes the rate,
                            builds the invoice, and triggers the SSP payout the second the
                            sats land.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
