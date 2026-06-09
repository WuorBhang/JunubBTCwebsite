import { TrendingDown, Shield } from 'lucide-react';

export default function CurrencyCrisisSection() {
    return (
        <section className="bg-[#F7F7F7] px-4 sm:px-6 py-16 sm:py-20 md:py-24 border-t border-black/10">
            <div className="max-w-[88rem] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 sm:mb-16 items-end">
                    <div>
                        <p className="text-black/60 text-sm mb-2">
                            South Sudan Currency Crisis
                        </p>
                        <h2
                            className="text-black text-3xl sm:text-4xl md:text-5xl font-medium leading-tight"
                            style={{ letterSpacing: '-0.03em' }}
                        >
                            Inflation stripping
                            <br />
                            local power.
                        </h2>
                    </div>
                    <p className="text-black/70 text-base sm:text-xl md:text-2xl leading-relaxed">
                        In 2011, South Sudan celebrated independence with a strong-hold
                        currency pegged at{' '}
                        <span className="text-black font-medium">150 SSP per USD&nbsp;$100</span>.
                        Today, a devastating run has collapsed value down to an astronomical{' '}
                        <span className="text-black font-medium">587,000 SSP per USD&nbsp;$100</span>.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 bg-black rounded-2xl p-6 sm:p-8 md:p-10 min-h-[360px] sm:min-h-[420px] flex flex-col">
                        <div className="flex items-center gap-2 text-[#F5F5F5]/60 text-xs sm:text-sm mb-6 sm:mb-8">
                            <TrendingDown className="w-4 h-4" />
                            Financial Erosion (SSP required per US&nbsp;$100)
                        </div>

                        <div className="flex-1 flex items-end">
                            <div className="w-full grid grid-cols-2 gap-4 sm:gap-8 items-end">
                                {/* 2011 bar */}
                                <div className="flex flex-col items-start">
                                    <div className="flex items-baseline gap-2 mb-3">
                                        <span
                                            className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#F5F5F5]"
                                            style={{ letterSpacing: '-0.03em' }}
                                        >
                                            150
                                        </span>
                                        <span className="text-[#F5F5F5]/60 text-xs sm:text-sm">SSP</span>
                                    </div>
                                    <div
                                        className="w-full bg-[#F7931A]/40 rounded-xl"
                                        style={{ height: '12px' }}
                                    />
                                    <p className="mt-3 text-[#F5F5F5]/60 text-xs sm:text-sm">
                                        2011 · Independence Day
                                    </p>
                                </div>

                                {/* 2026 bar */}
                                <div className="flex flex-col items-start">
                                    <div className="flex items-baseline gap-2 mb-3">
                                        <span
                                            className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#F5F5F5] break-all"
                                            style={{ letterSpacing: '-0.03em' }}
                                        >
                                            587,000
                                        </span>
                                        <span className="text-[#F5F5F5]/60 text-xs sm:text-sm">SSP</span>
                                    </div>
                                    <div
                                        className="w-full bg-[#F7931A] rounded-xl h-[160px] sm:h-[220px]"
                                    />
                                    <p className="mt-3 text-[#F5F5F5]/60 text-xs sm:text-sm">
                                        2026 · Current Exchange Rate
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#F7931A] rounded-2xl p-6 sm:p-8 md:p-10 min-h-[320px] sm:min-h-[420px] flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 text-[#F5F5F5]/80 text-xs sm:text-sm mb-4 sm:mb-6">
                                <Shield className="w-4 h-4" />
                                The hedge
                            </div>
                            <p
                                className="text-[#F5F5F5] text-2xl sm:text-3xl md:text-4xl font-medium leading-tight"
                                style={{ letterSpacing: '-0.02em' }}
                            >
                                SSP lost <span className="text-black">99.97%</span> of its
                                value.
                            </p>
                        </div>
                        <p className="text-[#F5F5F5]/90 text-sm sm:text-base leading-relaxed">
                            Uncapped Bitcoin protects you. Every sat you hold sits outside the
                            reach of local money printing — and JunubBTC turns it into
                            spendable SSP only at the moment you transact.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
