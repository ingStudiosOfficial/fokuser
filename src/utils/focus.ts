import type { FocusData } from '@/interfaces/FocusData';

export async function setFocusTime(blockTime: number) {
	console.log('Block time:', blockTime);

	await chrome.alarms.create('focus-alarm', { when: blockTime, persistAcrossSessions: true });
	await chrome.storage.local.set({
		focusTime: { blockTime: blockTime, startTime: Date.now() } as FocusData,
	});

	await chrome.runtime.sendMessage('block-focus');

	const tabs = await chrome.tabs.query({});
	for (const tab of tabs) {
		try {
			if (tab.id) await chrome.tabs.sendMessage(tab.id, 'block-focus');
		} catch (error) {
			console.error(error);
		}
	}
}

export async function getFocusTime(): Promise<FocusData | undefined> {
	const { focusTime } = await chrome.storage.local.get('focusTime');
	return focusTime;
}

export async function endFocus() {
	console.log('Focus alarm ended.');

	try {
		await chrome.runtime.sendMessage('unblock-focus');
	} catch (error) {
		console.error(error);
	}

	const tabs = await chrome.tabs.query({});
	for (const tab of tabs) {
		if (tab.id) {
			console.log('Unblocking tab:', tab.id);
			try {
				await chrome.tabs.sendMessage(tab.id, 'unblock-focus');
			} catch (error) {
				console.error(error);
			}
		}
	}

	await chrome.alarms.clear('focus-alarm');
	await chrome.storage.local.remove('focusTime');
}

export async function saveTimeFocused(focus: FocusData) {
	const timeFocused = focus.blockTime - focus.startTime;
	const existingTimeFocused = await getTimeFocused();
	const totalFocused = existingTimeFocused + timeFocused;
	await chrome.storage.local.set({ timeFocused: totalFocused });
}

export async function getTimeFocused(): Promise<number> {
	const { timeFocused } = await chrome.storage.local.get('timeFocused');
	return timeFocused || 0;
}
