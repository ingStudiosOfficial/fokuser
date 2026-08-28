import { endFocus, getFocusTime, saveTimeFocused } from './utils/focus';

chrome.runtime.onInstalled.addListener(async () => {
	console.log('Service worker active.');
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
	if (alarm.name === 'focus-alarm') {
		const focusTime = await getFocusTime();
		await endFocus();
		if (focusTime) await saveTimeFocused(focusTime);
	}
});
