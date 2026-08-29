import { getWhitelistedSites } from './sites';
import { createFullUrl } from './url';

export async function checkContentSettingsPermission(): Promise<boolean> {
	const granted = await chrome.permissions.contains({
		permissions: ['contentSettings'],
	});
	return granted;
}

export async function requestContentSettingsPermission() {
	const granted = await chrome.permissions.request({
		permissions: ['contentSettings'],
	});

	console.log('Granted:', granted);

	if (!granted) throw new Error('content settings permission not granted');
}

export async function blockNotifications() {
	console.log('Block notifications called.');

	const granted = await checkContentSettingsPermission();

	if (!granted) {
		throw new Error('permission to adjust content settings not granted');
	}

	await chrome.contentSettings.notifications.set({
		primaryPattern: '<all_urls>',
		setting: 'block',
	});

	const whitelisted = await getWhitelistedSites();
	for (const site of whitelisted) {
		try {
			const hostname = createFullUrl(site);
			const pattern = `${hostname}/*`;
			console.log('Pattern:', pattern);
			await chrome.contentSettings.notifications.set({
				primaryPattern: pattern,
				setting: 'allow',
			});
		} catch (error) {
			console.error(error);
		}
	}
}

export async function unblockNotifications() {
	const granted = await checkContentSettingsPermission();

	if (!granted) {
		throw new Error('permission to adjust content settings not granted');
	}

	chrome.contentSettings.notifications.clear({}, () => {});
}

export async function enableNotificationsBlocking() {
	const granted = await checkContentSettingsPermission();
	if (!granted) {
		await requestContentSettingsPermission();
	}

	await chrome.storage.local.set({ blockNotifications: true });
}

export async function disableNotificationsBlocking() {
	try {
		await unblockNotifications();
	} catch (error) {
		console.error('Failed to unblock notifications:', error);
	}

	await chrome.storage.local.set({ blockNotifications: false });
}

export async function getNotificationsBlockingSetting(): Promise<boolean> {
	const { blockNotifications } = await chrome.storage.local.get('blockNotifications');
	return blockNotifications;
}
