import { endFocus } from './utils/focus';

chrome.runtime.onInstalled.addListener(async () => {
	console.log('Service worker active.');
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
	if (alarm.name === 'focus-alarm') {
		await endFocus();
	}
});
