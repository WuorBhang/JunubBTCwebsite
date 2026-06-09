import { useState } from 'react';
import { ChevronDown, Mail, MessageSquare, BookOpen } from 'lucide-react';
import PageShell from '../components/PageShell';

interface Faq {
    q: string;
    a: string;
}

const FAQS: Faq[] = [
    {
        q: 'What is JunubBTC?',
        a: 'JunubBTC is a non-custodial Lightning-to-Fiat bridge for South Sudan. It lets you spend Bitcoin held in your own Lightning wallet and pays the recipient in South Sudanese Pounds via MTN Mobile Money or mGURUSH — instantly, without ever taking custody of your funds.',
    },
    {
        q: 'Do I need a JunubBTC account or wallet to use it?',
        a: 'No. You keep using your existing Lightning wallet (Phoenix, Wallet of Satoshi, Muun, Strike, Alby, etc.). JunubBTC simply produces a Lightning invoice for the SSP amount you want to pay, your own wallet signs the payment, and we trigger the local fiat payout when the invoice settles.',
    },
    {
        q: 'How does the conversion rate work?',
        a: 'When you initiate a transfer, JunubBTC quotes a live BTC→USD→SSP rate at that moment and locks it for the invoice expiry window. The amount in SSP the recipient receives is the amount you see on screen — no hidden spread surprises after the fact.',
    },
    {
        q: 'Which mobile money networks are supported?',
        a: 'At launch we support MTN MoMo and mGURUSH, the two largest mobile money networks operating in South Sudan. Both use the +211 country code, and the recipient does not need to know anything about Bitcoin.',
    },
    {
        q: 'Is JunubBTC custodial?',
        a: 'No. We never hold your sats. The Bitcoin only leaves your wallet when you sign the Lightning invoice, and the fiat payout to the MoMo line happens via a regulated local payment processor — JunubBTC is the routing layer in between.',
    },
    {
        q: 'What happens if the Lightning payment fails or expires?',
        a: 'If the invoice is not paid within the expiry window (usually 10 minutes), the bridge transaction is cancelled and no SSP is sent. You can always start a new transfer at the freshly quoted rate.',
    },
    {
        q: 'Can I receive Bitcoin into a MoMo account?',
        a: 'Yes — receive flow is on the roadmap. A merchant or family member in South Sudan will be able to share a JunubBTC pay-link that converts incoming Bitcoin into SSP delivered straight to their MTN MoMo number.',
    },
    {
        q: 'How is JunubBTC funded? Is it open source?',
        a: 'JunubBTC is open source under the MIT License and was built independently for presentation at bitcoin++ Nairobi (June 17–19, 2026). All code is available on GitHub, and the bridge is designed so anyone — including merchants and remittance senders — can audit how their money is moving.',
    },
    {
        q: 'I lost my Lightning wallet — can JunubBTC recover my funds?',
        a: 'No. Because JunubBTC never holds your keys, we cannot recover funds that lived in your Lightning wallet. Always back up the seed phrase of whichever wallet you use to sign JunubBTC invoices.',
    },
    {
        q: 'How can I get help if a transfer doesn\u2019t arrive?',
        a: 'Reach out at help@junubbtc.app with the Lightning invoice hash from your wallet and the destination MoMo number. We can trace every step of the handoff on-chain and through the MoMo provider and either confirm completion or refund.',
    },
];

export default function HelpPage() {
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    return (
        <PageShell
            eyebrow="Help & Support"
            title="Need a hand?"
            intro="Common questions, real answers, and the fastest ways to reach a human. JunubBTC is a small, open-source project — we read every message."
        >
            {/* Contact cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <a
                    href="mailto:help@junubbtc.app"
                    className="bg-black rounded-2xl p-6 hover:bg-black/80 transition-colors duration-200 group"
                >
                    <Mail className="w-6 h-6 text-[#F7931A] mb-4" />
                    <h3 className="text-[#F5F5F5] text-xl font-medium mb-2">
                        Email support
                    </h3>
                    <p className="text-[#F5F5F5]/60 text-sm">
                        help@junubbtc.app — we reply within 24 hours.
                    </p>
                </a>
                <a
                    href="https://t.me/junubbtc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black rounded-2xl p-6 hover:bg-black/80 transition-colors duration-200 group"
                >
                    <MessageSquare className="w-6 h-6 text-[#F7931A] mb-4" />
                    <h3 className="text-[#F5F5F5] text-xl font-medium mb-2">
                        Telegram community
                    </h3>
                    <p className="text-[#F5F5F5]/60 text-sm">
                        Join the open community of users, merchants and contributors.
                    </p>
                </a>
                <a
                    href="https://github.com/junubbtc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black rounded-2xl p-6 hover:bg-black/80 transition-colors duration-200 group"
                >
                    <BookOpen className="w-6 h-6 text-[#F7931A] mb-4" />
                    <h3 className="text-[#F5F5F5] text-xl font-medium mb-2">
                        Open-source docs
                    </h3>
                    <p className="text-[#F5F5F5]/60 text-sm">
                        Read the code, file issues, suggest improvements on GitHub.
                    </p>
                </a>
            </div>

            <h2
                className="text-[#F5F5F5] text-3xl md:text-4xl font-medium mb-6"
                style={{ letterSpacing: '-0.03em' }}
            >
                Frequently asked
            </h2>

            <div className="space-y-3">
                {FAQS.map((f, idx) => {
                    const open = openIdx === idx;
                    return (
                        <div
                            key={f.q}
                            className="bg-white rounded-2xl overflow-hidden border border-black/5"
                        >
                            <button
                                type="button"
                                onClick={() => setOpenIdx(open ? null : idx)}
                                className="w-full flex items-center justify-between gap-6 px-6 md:px-8 py-5 text-left"
                                aria-expanded={open}
                            >
                                <span
                                    className="text-black text-lg md:text-xl font-medium"
                                    style={{ letterSpacing: '-0.01em' }}
                                >
                                    {f.q}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-black shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            {open && (
                                <div className="px-6 md:px-8 pb-6 -mt-1">
                                    <p className="text-black/70 text-base leading-relaxed max-w-3xl">
                                        {f.a}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </PageShell>
    );
}
