import { setFocusMode } from './scripts/focus';

chrome.runtime.onInstalled.addListener(async () => {
	console.log('Service worker active.');
	chrome.sidePanel
		.setPanelBehavior({ openPanelOnActionClick: true })
		.catch((error) => console.error('Failed to open panel:', error));
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
	if (alarm.name === 'focus-alarm') {
		console.log('Focus alarm ended.');

		const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
		for (const tab of tabs) {
			if (tab.id) await chrome.tabs.sendMessage(tab.id, 'unblock-focus');
		}

		await chrome.storage.local.set({ isFocusMode: false });
	}
});

setFocusMode(Date.now() + 3000);
