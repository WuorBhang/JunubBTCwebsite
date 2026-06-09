import LogoIcon from './LogoIcon';
import { hrefFor, type Page } from '../lib/router';

const TECHNOLOGY: Array<{ label: string; to: Page }> = [
    { label: 'Lightning Network', to: 'lightning' },
    { label: 'BOLT11 Invoices', to: 'lightning' },
    { label: 'mGURUSH Integration', to: 'momo' },
    { label: 'MTN API Payout', to: 'momo' },
];

const PRODUCT: Array<{ label: string; to: Page }> = [
    { label: 'Open App', to: 'home' },
    { label: 'Non-custodial Handoff', to: 'lightning' },
    { label: 'Network Status', to: 'network' },
    { label: 'Help & FAQ', to: 'help' },
];

export default function Footer() {
    const year = new Date().getFullYear();
    const blockHeight = 890_000 + (year - 2026) * 52_560;

    return (
        <footer className="bg-black text-[#F5F5F5] px-6 pt-16 pb-10">
            <div className="max-w-[88rem] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-2 mb-5">
                            <LogoIcon className="w-7 h-7 text-[#F7931A]" />
                            <span className="text-2xl font-medium tracking-tight text-[#F5F5F5]">
                                JunubBTC
                            </span>
                        </div>
                        <p className="text-[#F5F5F5]/80 text-base leading-relaxed max-w-sm mb-6">
                            JunubBTC is a non-custodial Lightning-to-Fiat bridge for South
                            Sudan. Shielding local wealth and connecting the Nile valley
                            economy to Bitcoin since {year}.
                        </p>
                        {/* <p className="text-[#F5F5F5]/60 text-sm leading-relaxed max-w-sm">
                            Built for presentation at{' '}
                            <span className="text-[#F5F5F5] font-medium">
                                bitcoin++ Nairobi (Open Source Edition)
                            </span>{' '}
                            · June 17–19, 2026.
                        </p> */}
                    </div>

                    {/* Technology */}
                    <div className="md:col-span-2">
                        <h4 className="text-[#F5F5F5] text-sm font-medium mb-4">
                            Technology
                        </h4>
                        <ul className="space-y-3">
                            {TECHNOLOGY.map((t) => (
                                <li key={t.label}>
                                    <a
                                        href={hrefFor(t.to)}
                                        className="text-[#F5F5F5]/60 text-sm hover:text-[#F7931A] transition-colors duration-200"
                                    >
                                        {t.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Product */}
                    <div className="md:col-span-2">
                        <h4 className="text-[#F5F5F5] text-sm font-medium mb-4">Product</h4>
                        <ul className="space-y-3">
                            {PRODUCT.map((p) => (
                                <li key={p.label}>
                                    <a
                                        href={hrefFor(p.to)}
                                        className="text-[#F5F5F5]/60 text-sm hover:text-[#F7931A] transition-colors duration-200"
                                    >
                                        {p.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Network Status */}
                    <div className="md:col-span-3">
                        <h4 className="text-[#F5F5F5] text-sm font-medium mb-4">
                            Network status
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center justify-between">
                                <span className="text-[#F5F5F5]/60">Lightning Node</span>
                                <span className="inline-flex items-center gap-2 text-[#F5F5F5] font-medium">
                                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                                    ONLINE
                                </span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-[#F5F5F5]/60">
                                    MTN Settlement Gateway
                                </span>
                                <span className="inline-flex items-center gap-2 text-[#F5F5F5] font-medium">
                                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                                    ONLINE
                                </span>
                            </li>
                            {/* <li className="flex items-center justify-between">
                                <span className="text-[#F5F5F5]/60">Block</span>
                                <span className="text-[#F5F5F5] font-medium tabular-nums">
                                    #{blockHeight.toLocaleString('en-US')}
                                </span>
                            </li> */}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-[#F5F5F5]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[#F5F5F5]/50 text-sm">
                    <p>© {year} JunubBTC Inc. · MIT Licensed · Open Source.</p>
                    <p>Juba, South Sudan</p>
                </div>
            </div>
        </footer>
    );
}
