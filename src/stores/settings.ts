import {
	disableNotificationsBlocking,
	enableNotificationsBlocking,
	getNotificationsBlockingSetting,
} from '@/utils/notifications';
import { setWhitelistedSites, setBlacklistedSites } from '@/utils/sites';
import { defineStore } from 'pinia';
import { ref, toRaw } from 'vue';

export const useSettings = defineStore('settings', () => {
	const whitelisted = ref<string[]>([]);
	const blacklisted = ref<string[]>([]);
	const notificationsBlockingEnabled = ref<boolean>(false);

	async function setWhitelisted(sites: string[]) {
		const prefixedSites = sites
			.filter((s) => s !== '')
			.map((s) => {
				const url = /^https?:\/\//i.test(s) ? s : `http://${s}`;
				return url;
			});
		whitelisted.value = prefixedSites;
		await setWhitelistedSites(prefixedSites);
	}

	async function addToWhitelist(site: string) {
		if (site === '') return;
		const url = /^https?:\/\//i.test(site) ? site : `http://${site}`;
		whitelisted.value.push(url);
		await setWhitelistedSites(toRaw(whitelisted.value));
	}

	async function setBlacklisted(sites: string[]) {
		const prefixedSites = sites
			.filter((s) => s !== '')
			.map((s) => {
				const url = /^https?:\/\//i.test(s) ? s : `http://${s}`;
				return url;
			});
		blacklisted.value = prefixedSites;
		await setBlacklistedSites(prefixedSites);
	}

	async function addToBlacklist(site: string) {
		if (site === '') return;
		const url = /^https?:\/\//i.test(site) ? site : `http://${site}`;
		blacklisted.value.push(url);
		await setBlacklistedSites(toRaw(blacklisted.value));
	}

	async function toggleNotificationsBlocking(enabled: boolean) {
		notificationsBlockingEnabled.value = enabled;

		if (enabled) {
			await enableNotificationsBlocking();
		} else {
			await disableNotificationsBlocking();
		}
	}

	async function loadSettings() {
		const { whitelistedSites = [], blacklistedSites = [] } = await chrome.storage.local.get([
			'whitelistedSites',
			'blacklistedSites',
		]);
		whitelisted.value = whitelistedSites || [];
		blacklisted.value = blacklistedSites || [];

		notificationsBlockingEnabled.value = await getNotificationsBlockingSetting();
	}

	loadSettings();

	return {
		whitelisted,
		blacklisted,
		notificationsBlockingEnabled,
		setWhitelisted,
		addToWhitelist,
		setBlacklisted,
		addToBlacklist,
		toggleNotificationsBlocking,
	};
});
