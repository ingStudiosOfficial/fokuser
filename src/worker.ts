chrome.runtime.onInstalled.addListener(async () => {
	console.log('Service worker active.');
	chrome.sidePanel
		.setPanelBehavior({ openPanelOnActionClick: true })
		.catch((error) => console.error('Failed to open panel:', error));
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
	if (alarm.name === 'focus-alarm') {
		console.log('Focus alarm ended.');

		await chrome.runtime.sendMessage('unblock-focus');

		const tabs = await chrome.tabs.query({});
		for (const tab of tabs) {
			if (tab.id) {
				console.log('Unblocking tab:', tab.id);
				await chrome.tabs.sendMessage(tab.id, 'unblock-focus');
			}
		}

		await chrome.alarms.clear('focus-alarm');
		await chrome.storage.local.remove('focusTime');
	}
});
