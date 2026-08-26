export async function setFocusMode(blockTime: number) {
	console.log('Block time:', blockTime);

	await chrome.alarms.create('focus-alarm', { when: blockTime, persistAcrossSessions: true });
	await chrome.storage.local.set({ focusTime: blockTime });

	const tabs = await chrome.tabs.query({});
	for (const tab of tabs) {
		if (tab.id) await chrome.tabs.sendMessage(tab.id, 'block-focus');
	}
}

export async function getFocusTime(): Promise<number | undefined> {
	const { focusTime } = await chrome.storage.local.get('focusTime');
	return focusTime;
}
