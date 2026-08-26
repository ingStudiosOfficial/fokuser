import { endFocus } from './utils/focus';

chrome.runtime.onInstalled.addListener(async () => {
	console.log('Service worker active.');
	chrome.sidePanel
		.setPanelBehavior({ openPanelOnActionClick: true })
		.catch((error) => console.error('Failed to open panel:', error));
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
	if (alarm.name === 'focus-alarm') {
		await endFocus();
	}
});
