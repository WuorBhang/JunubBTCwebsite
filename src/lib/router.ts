import { useEffect, useState } from 'react';

export type Page = 'home' | 'network' | 'lightning' | 'momo' | 'help' | 'news';

export const PAGES: Page[] = ['network', 'lightning', 'momo', 'help', 'news'];

export const PAGE_LABEL: Record<Page, string> = {
    home: 'Home',
    network: 'Network',
    lightning: 'Lightning',
    momo: 'MoMo',
    help: 'Help',
    news: 'News',
};

function parsePath(pathname: string): Page {
    const clean = pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    if (!clean) return 'home';
    if (PAGES.includes(clean as Page)) return clean as Page;
    return 'home';
}

/**
 * History-API powered route hook. Produces clean URLs like /news, /help, /momo
 * instead of /#/news. Falls back to home for unknown paths.
 *
 * Internal links should be plain <a href="/news"> — the hook intercepts
 * left-clicks on same-origin links and calls `history.pushState` instead of
 * triggering a full page reload.
 */
export function useHistoryRoute(): [Page, (p: Page) => void] {
    const [page, setPage] = useState<Page>(() =>
        typeof window === 'undefined' ? 'home' : parsePath(window.location.pathname)
    );

    useEffect(() => {
        const onPop = () => setPage(parsePath(window.location.pathname));
        window.addEventListener('popstate', onPop);

        // Intercept clicks on internal anchor links so we get SPA navigation
        // without a full reload. Skip when modifiers are pressed or the link
        // opens a new tab, downloads, points to a different origin, etc.
        const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented) return;
            if (e.button !== 0) return;
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

            const anchor = (e.target as HTMLElement | null)?.closest('a');
            if (!anchor) return;
            if (anchor.target && anchor.target !== '_self') return;
            if (anchor.hasAttribute('download')) return;

            const href = anchor.getAttribute('href');
            if (!href) return;
            // Only intercept root-relative paths (e.g. "/", "/news").
            if (!href.startsWith('/') || href.startsWith('//')) return;

            const url = new URL(href, window.location.origin);
            if (url.origin !== window.location.origin) return;

            e.preventDefault();
            if (url.pathname !== window.location.pathname) {
                window.history.pushState({}, '', url.pathname);
                setPage(parsePath(url.pathname));
            }
        };
        document.addEventListener('click', onClick);

        return () => {
            window.removeEventListener('popstate', onPop);
            document.removeEventListener('click', onClick);
        };
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }, [page]);

    const navigate = (p: Page) => {
        const path = hrefFor(p);
        if (path !== window.location.pathname) {
            window.history.pushState({}, '', path);
            setPage(p);
        }
    };

    return [page, navigate];
}

export function hrefFor(p: Page): string {
    return p === 'home' ? '/' : `/${p}`;
}
