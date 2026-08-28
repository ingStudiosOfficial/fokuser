import { timeToString } from './time';

let timer: number | null = null;

function clearTimer() {
	if (timer !== null) {
		clearInterval(timer);
		timer = null;
	}
}

export async function setFocusBadge() {
	const { focusTime } = await chrome.storage.local.get('focusTime');

	chrome.action.setBadgeBackgroundColor({ color: '#D6E3FF' });
	chrome.action.setBadgeTextColor({ color: '#274777' });

	const timeRemaining = timeToString(focusTime.blockTime - Date.now(), true);
	await chrome.action.setBadgeText({ text: timeRemaining });

	timer = setInterval(async () => {
		const msRemaining = focusTime.blockTime - Date.now();
		if (msRemaining <= 0) {
			await clearFocusBadge();
			return;
		}

		const timeRemaining = timeToString(msRemaining, true);
		await chrome.action.setBadgeText({ text: timeRemaining });
	}, 5000);
}

export async function clearFocusBadge() {
	clearTimer();
	await chrome.action.setBadgeText({ text: '' });
}
