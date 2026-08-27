export async function setWhitelistedSites(sites: string[]) {
	await chrome.storage.local.set({ whitelistedSites: sites.filter((s) => s !== '') });
}

export async function getWhitelistedSites(): Promise<string[]> {
	const { whitelistedSites } = await chrome.storage.local.get('whitelistedSites');
	return whitelistedSites || [];
}

export async function setBlacklistedSites(sites: string[]) {
	await chrome.storage.local.set({ blacklistedSites: sites.filter((s) => s !== '') });
}

export async function getBlacklistedSites(): Promise<string[]> {
	const { blacklistedSites } = await chrome.storage.local.get('blacklistedSites');
	return blacklistedSites || [];
}
