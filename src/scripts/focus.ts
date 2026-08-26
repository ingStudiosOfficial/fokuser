export async function setFocusMode(blockTime: number) {
	chrome.alarms.create('focus-alarm', { when: blockTime, persistAcrossSessions: true });

	await chrome.storage.local.set({ isFocusMode: true });
}

export async function getFocusMode(): Promise<boolean> {
	const { isFocusMode } = await chrome.storage.local.get('isFocusMode');
	return isFocusMode;
}
