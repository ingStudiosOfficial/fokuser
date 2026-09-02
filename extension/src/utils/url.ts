export function createFullUrl(site: string) {
	const url = new URL(
		site.startsWith('http://') || site.startsWith('https://') ? site : `https://${site}`,
	);
	const hostname = url.hostname.replace(/^https?:\/\//, '').replace(/^www\./, '');
	return `https://www.${hostname}`;
}
