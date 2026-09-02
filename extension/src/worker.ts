import { clearFocusBadge, setFocusBadge } from '@/utils/badge';
import { endFocus, getFocusTime, saveTimeFocused } from '@/utils/focus';
import { enableNotificationsBlocking } from '@/utils/notifications';
import { startScheduledFocus } from './utils/schedule';

chrome.runtime.onInstalled.addListener(async () => {
	console.log('Service worker active.');
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
	if (alarm.name === 'focus-alarm') {
		const focusTime = await getFocusTime();
		await endFocus();
		if (focusTime) await saveTimeFocused(focusTime);
		chrome.action.setBadgeText({ text: '' });
	} else if (alarm.name.startsWith('start-focus-')) {
		try {
			await startScheduledFocus(alarm.name.replace('start-focus-', ''));
		} catch (error) {
			console.error(error);
		}
	}
});

chrome.runtime.onMessage.addListener(async (message) => {
	switch (message) {
		case 'block-focus': {
			await setFocusBadge();
			break;
		}
		case 'unblock-focus': {
			await clearFocusBadge();
			break;
		}
		case 'enable-notif-blocking': {
			await enableNotificationsBlocking();
			break;
		}
	}
});
