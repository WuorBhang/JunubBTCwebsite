import { Zap, Code2, Link2, ShieldCheck, ArrowRight } from 'lucide-react';
import PageShell from '../components/PageShell';
import { hrefFor } from '../lib/router';

const WALLETS = [
    'Phoenix',
    'Wallet of Satoshi',
    'Muun',
    'Strike',
    'Alby',
    'Breez',
    'Zeus',
    'BlueWallet',
];

const FEATURES = [
    {
        icon: Zap,
        title: 'BOLT11 invoices',
        body: 'Every JunubBTC payment is a standard BOLT11 Lightning invoice. No proprietary protocol, no JunubBTC-locked wallet — any Lightning wallet from the open ecosystem works.',
    },
    {
        icon: Link2,
        title: 'lightning: deep link handoff',
        body: 'JunubBTC opens the user\u2019s installed Lightning wallet via the `lightning:` URI scheme, the same standard that powers Lightning across iOS and Android.',
    },
    {
        icon: ShieldCheck,
        title: 'Non-custodial by design',
        body: 'Funds never sit in a JunubBTC wallet. The sats go directly from your wallet to a routing node that settles the invoice; the SSP payout is triggered only after the payment is verified.',
    },
    {
        icon: Code2,
        title: 'Open-source backend',
        body: 'The bridge runs on Node.js + LNbits or Alby for invoice generation, with a SQLite ledger. Every line of code is auditable on GitHub under the MIT License.',
    },
];

const SAMPLE_INVOICE =
    'lnbc283330n1pjqxxqkpp5l4xkc... (truncated · 28,333 sats · expires in 600s)';

export default function LightningPage() {
    return (
        <PageShell
            eyebrow="Lightning Integration"
            title="Powered by the Lightning Network."
            intro="JunubBTC is built on the open Lightning Network — no new chain, no new token, no new wallet. We use BOLT11 invoices and the lightning: deep-link standard so every Lightning user on Earth can pay into South Sudan from day one."
        >
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                {FEATURES.map((f) => (
                    <div
                        key={f.title}
                        className="bg-white rounded-2xl p-7 flex flex-col gap-3 border border-black/5"
                    >
                        <f.icon className="w-6 h-6 text-[#F7931A] mb-2" />
                        <h3
                            className="text-black text-xl font-medium leading-snug"
                            style={{ letterSpacing: '-0.01em' }}
                        >
                            {f.title}
                        </h3>
                        <p className="text-black/70 text-base leading-relaxed">{f.body}</p>
                    </div>
                ))}
            </div>

            {/* Sample invoice */}
            <div className="bg-black rounded-2xl p-8 md:p-10 mb-16">
                <p className="text-[#F7931A] text-sm uppercase tracking-wider mb-3">
                    Example BOLT11 invoice
                </p>
                <code
                    className="block text-[#F5F5F5] text-base md:text-lg break-all"
                    style={{ fontFamily: '"Courier New", monospace' }}
                >
                    {SAMPLE_INVOICE}
                </code>
                <p className="text-[#F5F5F5]/60 text-sm mt-4 max-w-2xl">
                    Generated server-side, served to your phone, and signed by your
                    Lightning wallet. The exact moment this invoice is settled, JunubBTC
                    triggers the SSP payout on the recipient\u2019s MoMo line.
                </p>
            </div>

            {/* Supported wallets */}
            <div className="mb-16">
                <h2
                    className="text-[#F5F5F5] text-3xl md:text-4xl font-medium mb-6"
                    style={{ letterSpacing: '-0.03em' }}
                >
                    Works with any Lightning wallet
                </h2>
                <p className="text-[#F5F5F5]/80 text-base max-w-2xl mb-8">
                    These are the wallets we\u2019ve tested end-to-end in South Sudan and
                    Nairobi. Any other BOLT11-compatible wallet will work the same way.
                </p>
                <div className="flex flex-wrap gap-3">
                    {WALLETS.map((w) => (
                        <span
                            key={w}
                            className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium border border-black/10"
                        >
                            {w}
                        </span>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="bg-black rounded-2xl p-10 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3
                        className="text-[#F5F5F5] text-3xl md:text-4xl font-medium mb-2"
                        style={{ letterSpacing: '-0.03em' }}
                    >
                        See it route end-to-end
                    </h3>
                    <p className="text-[#F5F5F5]/70 text-base max-w-xl">
                        Check the live network status and watch the Lightning node settle
                        invoices in real time.
                    </p>
                </div>
                <a
                    href={hrefFor('network')}
                    className="inline-flex items-center gap-3 bg-[#F7931A] text-[#F5F5F5] text-base font-medium pl-6 pr-2 py-2 rounded-full hover:bg-[#E47A0E] transition-colors duration-200 shrink-0"
                >
                    View network
                    <span className="bg-[#F5F5F5] rounded-full p-2 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-black" />
                    </span>
                </a>
            </div>
        </PageShell>
    );
}
