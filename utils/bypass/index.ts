const MEDIUM_SITES = [
    "medium.com",
    "blog.nrwl.io"
];

/**
 * Automatically enable bypass mode for some known blocking sites
 * For example, medium.com,...
 */
export const enableByPassProxy = (url: string): boolean => {
    try {
        let fixedUrl = url.replace(/https?:\/(\w)/, 'https://$1');
        let parsedUrl = new URL(fixedUrl);
        if (MEDIUM_SITES.indexOf(parsedUrl.hostname) !== -1) {
            return true;
        }
    } catch {}
    return false;
}

export const byPassHeaders = () => ({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Referer': 'https://www.google.com'
    }
});