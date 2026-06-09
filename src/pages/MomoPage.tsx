import {
    Smartphone,
    QrCode,
    ArrowRight,
    Wallet,
    CheckCircle2,
} from 'lucide-react';
import PageShell from '../components/PageShell';
import { hrefFor } from '../lib/router';

const STEPS = [
    {
        icon: QrCode,
        title: 'Scan a merchant or paste a MoMo number',
        body: 'Open the JunubBTC app and scan a merchant QR, paste an mGURUSH till, or type a +211 MTN MoMo number. Enter the amount in SSP the recipient should receive.',
    },
    {
        icon: Wallet,
        title: 'JunubBTC quotes the rate and builds the invoice',
        body: 'Behind the scenes we convert SSP → USD → sats using the live market rate and generate a BOLT11 Lightning invoice for the exact amount. The quote is locked for the invoice expiry.',
    },
    {
        icon: Smartphone,
        title: 'Your Lightning wallet signs the payment',
        body: 'A `lightning:` deep link wakes up Phoenix, Wallet of Satoshi, Muun, Strike, or any wallet you already use. You see the amount in sats and the merchant, then tap pay. Funds never touch JunubBTC.',
    },
    {
        icon: CheckCircle2,
        title: 'SSP lands on the recipient\u2019s MoMo line',
        body: 'The instant the Lightning invoice settles, a webhook fires a payout through MTN MoMo or mGURUSH. The recipient gets an SMS in seconds; you get a confirmation receipt with both the payment hash and the MoMo reference.',
    },
];

const PROVIDERS = [
    {
        name: 'MTN MoMo',
        tag: 'Largest mobile money network in South Sudan',
        bullets: [
            'Direct push to MTN MoMo wallet via official disbursement API.',
            'Supports any +211 92x / +211 91x number — no recipient enrollment needed.',
            'Typical settlement time: under 30 seconds.',
        ],
    },
    {
        name: 'mGURUSH',
        tag: 'Local fintech with deep merchant penetration',
        bullets: [
            'Push payment to mGURUSH wallet or merchant till number.',
            'Used by thousands of shops, fuel stations and restaurants in Juba.',
            'Settlement reference returned and verifiable on the mGURUSH dashboard.',
        ],
    },
];

export default function MomoPage() {
    return (
        <PageShell
            eyebrow="MoMo Bridge"
            title="Bitcoin in. SSP on the MoMo line."
            intro="JunubBTC turns Lightning payments into instant Mobile Money payouts — MTN MoMo and mGURUSH, both on the +211 country code, with the same trusted SMS confirmations recipients already know."
        >
            {/* How it works */}
            <div className="mb-12 sm:mb-16">
                <h2
                    className="text-[#F5F5F5] text-2xl sm:text-3xl md:text-4xl font-medium mb-6 sm:mb-8"
                    style={{ letterSpacing: '-0.03em' }}
                >
                    How a MoMo payout flows
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {STEPS.map((step, idx) => (
                        <div
                            key={step.title}
                            className="bg-white rounded-2xl p-6 sm:p-7 flex flex-col gap-3 sm:gap-4 border border-black/5"
                        >
                            <div className="flex items-center justify-between">
                                <span className="inline-flex items-center gap-3 text-black/60 text-sm">
                                    <span className="w-8 h-8 rounded-full bg-black text-[#F5F5F5] inline-flex items-center justify-center text-sm font-medium">
                                        {idx + 1}
                                    </span>
                                    Step {idx + 1}
                                </span>
                                <step.icon className="w-5 h-5 text-[#F7931A]" />
                            </div>
                            <h3
                                className="text-black text-lg sm:text-xl font-medium leading-snug"
                                style={{ letterSpacing: '-0.01em' }}
                            >
                                {step.title}
                            </h3>
                            <p className="text-black/70 text-sm sm:text-base leading-relaxed">
                                {step.body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Providers */}
            <div className="mb-12 sm:mb-16">
                <h2
                    className="text-[#F5F5F5] text-2xl sm:text-3xl md:text-4xl font-medium mb-6 sm:mb-8"
                    style={{ letterSpacing: '-0.03em' }}
                >
                    Supported providers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PROVIDERS.map((p) => (
                        <div key={p.name} className="bg-black rounded-2xl p-6 sm:p-8 md:p-10">
                            <p className="text-[#F7931A] text-xs sm:text-sm uppercase tracking-wider mb-2">
                                +211 · South Sudan
                            </p>
                            <h3
                                className="text-[#F5F5F5] text-2xl sm:text-3xl md:text-4xl font-medium mb-2"
                                style={{ letterSpacing: '-0.03em' }}
                            >
                                {p.name}
                            </h3>
                            <p className="text-[#F5F5F5]/60 text-sm mb-5 sm:mb-6">{p.tag}</p>
                            <ul className="space-y-3">
                                {p.bullets.map((b) => (
                                    <li
                                        key={b}
                                        className="flex items-start gap-3 text-[#F5F5F5]/80 text-sm sm:text-base"
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-[#F7931A] mt-1 shrink-0" />
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="bg-black rounded-2xl p-6 sm:p-10 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-6">
                <div>
                    <h3
                        className="text-[#F5F5F5] text-2xl sm:text-3xl md:text-4xl font-medium mb-2"
                        style={{ letterSpacing: '-0.03em' }}
                    >
                        Try the live calculator
                    </h3>
                    <p className="text-[#F5F5F5]/70 text-sm sm:text-base max-w-xl">
                        Type a sat amount, pick MTN MoMo or mGURUSH, and see exactly how
                        many SSP would land on the recipient\u2019s phone.
                    </p>
                </div>
                <a
                    href={hrefFor('home')}
                    className="inline-flex items-center gap-3 bg-[#F7931A] text-[#F5F5F5] text-sm sm:text-base font-medium pl-5 sm:pl-6 pr-2 py-2 rounded-full hover:bg-[#E47A0E] transition-colors duration-200 shrink-0 self-start md:self-auto"
                >
                    Open calculator
                    <span className="bg-[#F5F5F5] rounded-full p-2 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-black" />
                    </span>
                </a>
            </div>
        </PageShell>
    );
}
