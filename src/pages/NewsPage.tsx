import { useEffect, useState } from 'react';
import { ArrowUpRight, MessageCircle, ThumbsUp, RefreshCw } from 'lucide-react';
import PageShell from '../components/PageShell';

interface HnHit {
    objectID: string;
    title: string | null;
    url: string | null;
    author: string;
    points: number;
    num_comments: number;
    created_at: string;
    story_text?: string | null;
}

interface PriceData {
    usd: number;
    usd_24h_change: number;
}

const HN_URL =
    'https://hn.algolia.com/api/v1/search_by_date?query=bitcoin&tags=story&hitsPerPage=20';
const PRICE_URL =
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true';

function timeAgo(iso: string): string {
    const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}

function host(url: string | null): string {
    if (!url) return 'discussion';
    try {
        return new URL(url).host.replace(/^www\./, '');
    } catch {
        return 'link';
    }
}

export default function NewsPage() {
    const [stories, setStories] = useState<HnHit[]>([]);
    const [price, setPrice] = useState<PriceData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

    const load = async () => {
        setLoading(true);
        setError(null);
        try {
            const [newsRes, priceRes] = await Promise.all([
                fetch(HN_URL),
                fetch(PRICE_URL),
            ]);
            if (!newsRes.ok) throw new Error(`News feed: ${newsRes.status}`);
            const newsJson = await newsRes.json();
            const filtered: HnHit[] = (newsJson.hits || []).filter(
                (h: HnHit) =>
                    h.title &&
                    /bitcoin|btc|lightning|sat[s]?\b|mining/i.test(h.title || '')
            );
            setStories(filtered.slice(0, 18));

            if (priceRes.ok) {
                const pj = await priceRes.json();
                if (pj.bitcoin) setPrice(pj.bitcoin as PriceData);
            }
            setUpdatedAt(new Date());
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : 'Failed to load';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
        // Auto-refresh every 5 minutes
        const id = setInterval(load, 5 * 60 * 1000);
        return () => clearInterval(id);
    }, []);

    const formattedPrice = price
        ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(price.usd)
        : '—';

    const change = price?.usd_24h_change ?? 0;
    const changeColor = change >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]';

    return (
        <PageShell
            eyebrow="Real-time news"
            title="What's moving Bitcoin."
            intro="A live feed of the latest Bitcoin, Lightning and on-chain stories pulled straight from Hacker News — refreshed every five minutes."
        >
            {/* Price + refresh strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 sm:mb-10">
                <div className="md:col-span-2 bg-black rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <p className="text-[#F5F5F5]/60 text-sm mb-2">
                            BTC / USD · live spot
                        </p>
                        <div className="flex items-baseline gap-3 sm:gap-4 flex-wrap">
                            <span
                                className="text-[#F5F5F5] text-4xl sm:text-5xl md:text-6xl font-medium tabular-nums"
                                style={{ letterSpacing: '-0.04em' }}
                            >
                                {formattedPrice}
                            </span>
                            {price && (
                                <span className={`text-sm sm:text-base font-medium ${changeColor}`}>
                                    {change >= 0 ? '+' : ''}
                                    {change.toFixed(2)}% 24h
                                </span>
                            )}
                        </div>
                    </div>
                    <p className="text-[#F5F5F5]/40 text-xs">
                        Source: CoinGecko · Hacker News
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col justify-between border border-black/5">
                    <div>
                        <p className="text-black/60 text-sm mb-1">Feed updated</p>
                        <p className="text-black text-xl sm:text-2xl font-medium tabular-nums">
                            {updatedAt
                                ? updatedAt.toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })
                                : '—'}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={load}
                        disabled={loading}
                        className="mt-4 inline-flex items-center justify-center gap-2 bg-black text-[#F5F5F5] text-sm font-medium px-5 py-2 rounded-full hover:bg-black/80 disabled:opacity-50 transition-colors duration-200"
                    >
                        <RefreshCw
                            className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
                        />
                        {loading ? 'Refreshing' : 'Refresh now'}
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-black rounded-2xl p-6 mb-6">
                    <p className="text-[#F5F5F5] text-sm">
                        Couldn’t reach the news feed: {error}. Try again in a moment.
                    </p>
                </div>
            )}

            {/* Stories grid */}
            {loading && stories.length === 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-black/5 rounded-2xl p-6 min-h-[180px] animate-pulse"
                        />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stories.map((s) => {
                        const href =
                            s.url || `https://news.ycombinator.com/item?id=${s.objectID}`;
                        return (
                            <a
                                key={s.objectID}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-2xl p-5 sm:p-6 flex flex-col justify-between min-h-[180px] sm:min-h-[200px] group hover:bg-[#F7931A] hover:text-[#F5F5F5] border border-black/5 transition-colors duration-200"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3 sm:mb-4 text-xs text-black/50">
                                        <span className="uppercase tracking-wider truncate max-w-[60%]">
                                            {host(s.url)}
                                        </span>
                                        <span>{timeAgo(s.created_at)}</span>
                                    </div>
                                    <h3
                                        className="text-black text-base sm:text-lg md:text-xl font-medium leading-snug"
                                        style={{ letterSpacing: '-0.02em' }}
                                    >
                                        {s.title}
                                    </h3>
                                </div>
                                <div className="flex items-center justify-between mt-5 sm:mt-6 text-sm text-black/60">
                                    <div className="flex items-center gap-4">
                                        <span className="inline-flex items-center gap-1">
                                            <ThumbsUp className="w-3.5 h-3.5" />
                                            {s.points}
                                        </span>
                                        <span className="inline-flex items-center gap-1">
                                            <MessageCircle className="w-3.5 h-3.5" />
                                            {s.num_comments}
                                        </span>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-black/40 group-hover:text-[#F7931A] transition-colors" />
                                </div>
                            </a>
                        );
                    })}
                </div>
            )}

            <p className="text-[#F5F5F5]/60 text-xs mt-10">
                Headlines are aggregated from the open Hacker News index via the
                Algolia public API. JunubBTC does not edit or endorse them.
            </p>
        </PageShell>
    );
}
