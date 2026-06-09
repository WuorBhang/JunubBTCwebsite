import { useMemo, useState } from 'react';
import { ArrowRight, Zap, Smartphone } from 'lucide-react';

type Provider = 'mtn' | 'mgurush';

const SSP_PER_USD = 5870; // 1 USD = 5,870 SSP (illustrative)
const BTC_USD = 60_000; // illustrative spot used for sat conversion
const SATS_PER_BTC = 100_000_000;

function formatNumber(n: number): string {
    if (!isFinite(n) || isNaN(n)) return '0';
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n);
}

export default function BridgeCalculatorSection() {
    const [provider, setProvider] = useState<Provider>('mtn');
    // 28,333 sats ≈ $17 ≈ 99,790 SSP at the rates above — matches the spec example.
    const [sats, setSats] = useState<string>('28333');
    const [momo, setMomo] = useState<string>('92 345 6789');

    const sspOut = useMemo(() => {
        const raw = parseFloat(sats.replace(/,/g, ''));
        if (isNaN(raw) || raw <= 0) return 0;
        const usdValue = (raw / SATS_PER_BTC) * BTC_USD;
        return usdValue * SSP_PER_USD;
    }, [sats]);

    return (
        <section className="bg-[#F7F7F7] px-6 py-24 border-t border-black/10">
            <div className="max-w-[88rem] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 items-end">
                    <div>
                        <p className="text-black/60 text-sm mb-2">
                            Interactive Bridge App
                        </p>
                        <h2
                            className="text-black text-4xl md:text-5xl font-medium leading-tight"
                            style={{ letterSpacing: '-0.03em' }}
                        >
                            Conversion calculator.
                        </h2>
                    </div>
                    <p className="text-black/70 text-lg leading-relaxed max-w-md">
                        Instantly calculate Lightning to MoMo payouts. JunubBTC quotes the
                        rate live and only moves funds when your wallet signs the invoice —
                        no custody, no waiting.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    {/* LEFT: input card */}
                    <div className="lg:col-span-3 bg-white rounded-2xl p-8 md:p-10 flex flex-col gap-7 border border-black/5">
                        {/* Amount input */}
                        <div>
                            <label className="block text-black/60 text-sm mb-3">
                                You send (Bitcoin Lightning)
                            </label>
                            <div className="flex items-baseline gap-3 border-b border-black/10 pb-3">
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    value={sats}
                                    onChange={(e) =>
                                        setSats(e.target.value.replace(/[^\d.,]/g, ''))
                                    }
                                    className="flex-1 bg-transparent text-4xl md:text-5xl font-medium text-black outline-none placeholder-black/30"
                                    style={{ letterSpacing: '-0.03em' }}
                                    placeholder="0"
                                />
                                <span className="text-black/60 text-base font-medium uppercase tracking-wide">
                                    Sats
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mt-3 text-black/60 text-sm">
                                <Zap className="w-4 h-4 text-[#F7931A]" />
                                Rate standard:{' '}
                                <span className="text-black font-medium">
                                    1 USD = {formatNumber(SSP_PER_USD)} SSP
                                </span>
                            </div>
                        </div>

                        {/* MoMo destination */}
                        <div>
                            <label className="block text-black/60 text-sm mb-3">
                                MoMo destination account
                            </label>
                            <div className="flex items-center gap-2 border-b border-black/10 pb-3">
                                <span className="inline-flex items-center gap-2 text-black font-medium">
                                    <Smartphone className="w-4 h-4 text-black/60" />
                                    +211
                                </span>
                                <input
                                    type="tel"
                                    value={momo}
                                    onChange={(e) => setMomo(e.target.value)}
                                    className="flex-1 bg-transparent text-black outline-none placeholder-black/30"
                                    placeholder="92 345 6789"
                                />
                            </div>
                        </div>

                        {/* Provider toggle */}
                        <div>
                            <p className="text-black/60 text-sm mb-3">Provider</p>
                            <div className="inline-flex bg-black/5 rounded-full p-1">
                                <button
                                    type="button"
                                    onClick={() => setProvider('mtn')}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${provider === 'mtn'
                                        ? 'bg-black text-[#F5F5F5]'
                                        : 'text-black/60 hover:text-black'
                                        }`}
                                >
                                    MTN MoMo
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setProvider('mgurush')}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${provider === 'mgurush'
                                        ? 'bg-black text-[#F5F5F5]'
                                        : 'text-black/60 hover:text-black'
                                        }`}
                                >
                                    mGURUSH
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: payout card */}
                    <div className="lg:col-span-2 bg-black rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[460px]">
                        <div>
                            <p className="text-[#F5F5F5]/60 text-sm mb-2">
                                Local payout estimate
                            </p>
                            <div className="flex items-baseline gap-3 flex-wrap">
                                <span
                                    className="text-[#F5F5F5] text-5xl md:text-6xl font-medium"
                                    style={{ letterSpacing: '-0.04em' }}
                                >
                                    {formatNumber(sspOut)}
                                </span>
                                <span className="text-[#F5F5F5]/60 text-base">SSP</span>
                            </div>
                            <p className="text-[#F5F5F5]/60 text-sm mt-3">
                                South Sudanese Pound ·{' '}
                                {provider === 'mtn' ? 'MTN MoMo' : 'mGURUSH'} +211{' '}
                                {momo || '—'}
                            </p>
                        </div>

                        <div className="flex flex-col gap-5">
                            <p className="text-[#F5F5F5]/60 text-sm leading-relaxed">
                                Settles instantly on payment of the Lightning invoice. No
                                custody held.
                            </p>
                            <button
                                type="button"
                                className="inline-flex items-center justify-between gap-3 bg-[#F7931A] hover:bg-[#E47A0E] text-[#F5F5F5] text-base font-medium pl-6 pr-2 py-2 rounded-full transition-colors duration-200"
                            >
                                Initiate non-custodial handoff
                                <span className="bg-[#F5F5F5] rounded-full p-2 flex items-center justify-center">
                                    <ArrowRight className="w-4 h-4 text-black" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
