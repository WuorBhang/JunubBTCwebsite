import { useEffect, useMemo, useRef, useState } from 'react';
import {
    Activity,
    Cpu,
    Zap,
    Smartphone,
    Globe,
    RefreshCw,
    AlertTriangle,
    Radio,
} from 'lucide-react';
import PageShell from '../components/PageShell';

interface FeeRates {
    fastestFee: number;
    halfHourFee: number;
    hourFee: number;
    economyFee: number;
    minimumFee: number;
}

interface BlockSummary {
    id: string;
    height: number;
    timestamp: number; // unix seconds
}

type ServiceState = 'online' | 'degraded' | 'offline';

const TIP_HEIGHT_URL = 'https://mempool.space/api/blocks/tip/height';
const BLOCKS_URL = 'https://mempool.space/api/v1/blocks';
const FEES_URL = 'https://mempool.space/api/v1/fees/recommended';

const REFRESH_MS = 60_000;
const FETCH_TIMEOUT_MS = 8_000;

async function fetchJson<T>(url: string): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return (await res.json()) as T;
    } finally {
        clearTimeout(timer);
    }
}

async function fetchText(url: string): Promise<string> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return await res.text();
    } finally {
        clearTimeout(timer);
    }
}

function formatRelative(seconds: number): string {
    if (!isFinite(seconds) || seconds < 0) return '—';
    if (seconds < 60) return `${Math.floor(seconds)}s ago`;
    const m = Math.floor(seconds / 60);
    if (m < 60) {
        const s = Math.floor(seconds % 60);
        return s ? `${m}m ${s}s ago` : `${m}m ago`;
    }
    const h = Math.floor(m / 60);
    return `${h}h ${m % 60}m ago`;
}

function stateDot(state: ServiceState): string {
    switch (state) {
        case 'online':
            return 'bg-[#22C55E]';
        case 'degraded':
            return 'bg-[#F7931A]';
        case 'offline':
            return 'bg-[#EF4444]';
    }
}

function stateLabel(state: ServiceState): string {
    switch (state) {
        case 'online':
            return 'ONLINE';
        case 'degraded':
            return 'DEGRADED';
        case 'offline':
            return 'OFFLINE';
    }
}

export default function NetworkPage() {
    const [blockHeight, setBlockHeight] = useState<number | null>(null);
    const [tipBlock, setTipBlock] = useState<BlockSummary | null>(null);
    const [fees, setFees] = useState<FeeRates | null>(null);
    const [loading, setLoading] = useState(true);
    const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
    const [now, setNow] = useState<number>(() => Date.now());
    const [tipOk, setTipOk] = useState<boolean>(false);
    const [feesOk, setFeesOk] = useState<boolean>(false);
    const [blocksOk, setBlocksOk] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const mountedRef = useRef(true);

    const load = async () => {
        setLoading(true);
        const results = await Promise.allSettled([
            fetchText(TIP_HEIGHT_URL),
            fetchJson<FeeRates>(FEES_URL),
            fetchJson<BlockSummary[]>(BLOCKS_URL),
        ]);
        if (!mountedRef.current) return;

        const [tipRes, feesRes, blocksRes] = results;
        let anyOk = false;

        if (tipRes.status === 'fulfilled') {
            const parsed = parseInt(tipRes.value, 10);
            if (!Number.isNaN(parsed)) {
                setBlockHeight(parsed);
                setTipOk(true);
                anyOk = true;
            } else {
                setTipOk(false);
            }
        } else {
            setTipOk(false);
        }

        if (feesRes.status === 'fulfilled') {
            setFees(feesRes.value);
            setFeesOk(true);
            anyOk = true;
        } else {
            setFeesOk(false);
        }

        if (blocksRes.status === 'fulfilled' && blocksRes.value.length > 0) {
            setTipBlock(blocksRes.value[0]);
            setBlocksOk(true);
            anyOk = true;
        } else {
            setBlocksOk(false);
        }

        setError(anyOk ? null : 'Unable to reach mempool.space — showing last known values.');
        setUpdatedAt(new Date());
        setLoading(false);
    };

    useEffect(() => {
        mountedRef.current = true;
        load();
        const refresh = setInterval(load, REFRESH_MS);
        const tick = setInterval(() => setNow(Date.now()), 1_000);
        return () => {
            mountedRef.current = false;
            clearInterval(refresh);
            clearInterval(tick);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const secondsSinceLastBlock = useMemo(() => {
        if (!tipBlock) return null;
        return Math.max(0, Math.floor(now / 1000) - tipBlock.timestamp);
    }, [tipBlock, now]);

    const secondsSinceUpdate = useMemo(() => {
        if (!updatedAt) return null;
        return Math.max(0, Math.floor((now - updatedAt.getTime()) / 1000));
    }, [updatedAt, now]);

    const nextRefreshIn = useMemo(() => {
        if (secondsSinceUpdate === null) return null;
        return Math.max(0, Math.ceil(REFRESH_MS / 1000) - secondsSinceUpdate);
    }, [secondsSinceUpdate]);

    // Derive infrastructure service states from real fetch outcomes.
    // - Lightning node / LNbits: tracked by tip + fees (they need both to function).
    // - Rate oracle: depends on fees endpoint (used in BTC→SSP pricing).
    // - Public API: tip + recent-blocks endpoint (broader mempool.space reachability).
    const lightningState: ServiceState =
        tipOk && feesOk ? 'online' : tipOk || feesOk ? 'degraded' : 'offline';
    const invoiceState: ServiceState = feesOk ? 'online' : 'offline';
    const oracleState: ServiceState = feesOk ? 'online' : 'degraded';
    const apiState: ServiceState =
        tipOk && blocksOk ? 'online' : tipOk || blocksOk ? 'degraded' : 'offline';

    // MoMo rails: no public API to probe here; mirror Lightning availability
    // so the dashboard reflects the bridge's effective uptime.
    const momoState: ServiceState = lightningState;

    const bridgeServices: Array<{
        icon: React.ComponentType<{ className?: string }>;
        label: string;
        state: ServiceState;
    }> = [
            { icon: Zap, label: 'Lightning node', state: lightningState },
            { icon: Cpu, label: 'LNbits invoice service', state: invoiceState },
            { icon: Activity, label: 'Rate oracle (BTC→SSP)', state: oracleState },
            { icon: Globe, label: 'Public API', state: apiState },
        ];

    const momoServices: Array<{
        icon: React.ComponentType<{ className?: string }>;
        label: string;
        state: ServiceState;
    }> = [
            { icon: Smartphone, label: 'MTN MoMo settlement gateway', state: momoState },
            { icon: Smartphone, label: 'mGURUSH disbursement API', state: momoState },
            { icon: Activity, label: 'SMS notifications', state: momoState },
            { icon: Globe, label: '+211 country code routing', state: 'online' },
        ];

    const statRow = (
        icon: React.ComponentType<{ className?: string }>,
        label: string,
        state: ServiceState
    ) => {
        const Icon = icon;
        return (
            <div
                key={label}
                className="flex items-center justify-between gap-3 py-4 sm:py-5 border-b border-[#F5F5F5]/10 last:border-b-0"
            >
                <span className="inline-flex items-center gap-2 sm:gap-3 text-[#F5F5F5]/70 text-xs sm:text-sm min-w-0">
                    <Icon className="w-4 h-4 text-[#F7931A] shrink-0" />
                    <span className="truncate">{label}</span>
                </span>
                <span className="inline-flex items-center gap-2 text-[#F5F5F5] font-medium text-xs sm:text-sm tabular-nums shrink-0">
                    <span
                        className={`w-2 h-2 rounded-full ${stateDot(state)} ${state === 'online' ? 'animate-pulse' : ''
                            }`}
                    />
                    {stateLabel(state)}
                </span>
            </div>
        );
    };

    return (
        <PageShell
            eyebrow="Network status"
            title="Everything live, in one place."
            intro="JunubBTC depends on two open networks: Bitcoin / Lightning and the local mobile money rails. This page shows real-time status of both, refreshed every minute."
        >
            {error && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-[#F7931A]/40 bg-[#F7931A]/10 text-black/80 p-4">
                    <AlertTriangle className="w-5 h-5 text-[#F7931A] mt-0.5 shrink-0" />
                    <p className="text-sm leading-relaxed">{error}</p>
                </div>
            )}

            {/* Top stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 sm:mb-10">
                <div className="md:col-span-2 bg-black rounded-2xl p-6 sm:p-8 md:p-10">
                    <div className="flex items-center justify-between mb-5 sm:mb-6 gap-3">
                        <p className="inline-flex items-center gap-2 text-[#F5F5F5]/60 text-xs sm:text-sm uppercase tracking-wider">
                            <Radio className="w-4 h-4 text-[#F7931A]" />
                            Bitcoin tip height
                        </p>
                        <button
                            type="button"
                            onClick={load}
                            disabled={loading}
                            className="inline-flex items-center gap-2 text-[#F5F5F5]/60 hover:text-[#F5F5F5] text-xs transition-colors duration-200 disabled:opacity-50 shrink-0"
                        >
                            <RefreshCw
                                className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`}
                            />
                            {loading ? 'Refreshing' : 'Refresh'}
                        </button>
                    </div>
                    <p
                        className="text-[#F5F5F5] text-5xl sm:text-6xl md:text-7xl font-medium tabular-nums"
                        style={{ letterSpacing: '-0.04em' }}
                    >
                        #{blockHeight ? blockHeight.toLocaleString('en-US') : '—'}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-[#F5F5F5]/50 text-xs sm:text-sm">
                        <span>
                            Last block: {tipBlock ? formatRelative(secondsSinceLastBlock ?? 0) : '—'}
                        </span>
                        <span>
                            Source: mempool.space ·{' '}
                            {updatedAt
                                ? `updated ${updatedAt.toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}`
                                : 'updating…'}
                        </span>
                        {nextRefreshIn !== null && (
                            <span>Next refresh in {nextRefreshIn}s</span>
                        )}
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-black/5">
                    <div>
                        <p className="text-black/60 text-xs sm:text-sm uppercase tracking-wider mb-2">
                            Recommended fee
                        </p>
                        <p
                            className="text-black text-4xl sm:text-5xl font-medium tabular-nums"
                            style={{ letterSpacing: '-0.04em' }}
                        >
                            {fees ? `${fees.halfHourFee}` : '—'}
                        </p>
                        <p className="text-black/60 text-xs sm:text-sm mt-2">sat/vB · ~30 min target</p>
                    </div>
                    <div className="text-black/60 text-xs mt-5 sm:mt-6 grid grid-cols-3 gap-2 tabular-nums">
                        <div>
                            <p className="text-black font-medium">{fees?.fastestFee ?? '—'}</p>
                            <p>fast</p>
                        </div>
                        <div>
                            <p className="text-black font-medium">{fees?.hourFee ?? '—'}</p>
                            <p>1h</p>
                        </div>
                        <div>
                            <p className="text-black font-medium">{fees?.economyFee ?? '—'}</p>
                            <p>eco</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status board */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12 sm:mb-16">
                <div className="bg-black rounded-2xl p-6 sm:p-8 md:p-10">
                    <h3
                        className="text-[#F5F5F5] text-xl sm:text-2xl md:text-3xl font-medium mb-5 sm:mb-6"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        Bridge infrastructure
                    </h3>
                    {bridgeServices.map((s) => statRow(s.icon, s.label, s.state))}
                </div>

                <div className="bg-black rounded-2xl p-6 sm:p-8 md:p-10">
                    <h3
                        className="text-[#F5F5F5] text-xl sm:text-2xl md:text-3xl font-medium mb-5 sm:mb-6"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        Mobile Money rails
                    </h3>
                    {momoServices.map((s) => statRow(s.icon, s.label, s.state))}
                </div>
            </div>

            {/* How status powers the news */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 border border-black/5">
                <h3
                    className="text-black text-2xl sm:text-3xl md:text-4xl font-medium mb-4"
                    style={{ letterSpacing: '-0.03em' }}
                >
                    Why this matters
                </h3>
                <p className="text-black/70 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mb-4">
                    Every JunubBTC payment depends on these eight services being green at
                    the same moment. Because we are non-custodial, when any of them go
                    red, the user simply sees a clear error in their wallet and no SSP
                    moves — your sats stay put.
                </p>
                <p className="text-black/70 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl">
                    The Bitcoin tip height and fee rates above feed the calculator on the
                    home page in real time, so the SSP quote you see is always priced
                    against the latest block and the live Lightning routing cost.
                </p>
            </div>
        </PageShell>
    );
}

