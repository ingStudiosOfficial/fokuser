import type { ScheduleData } from '@/interfaces/ScheduleData';
import { getSchedule, setSchedule } from '@/utils/schedule';
import {
	disableNotificationsBlocking,
	enableNotificationsBlocking,
	getNotificationsBlockingSetting,
} from '@/utils/notifications';
import { setWhitelistedSites, setBlacklistedSites } from '@/utils/sites';
import { createFullUrl } from '@/utils/url';
import { defineStore } from 'pinia';
import { ref, toRaw } from 'vue';

export const useSettings = defineStore('settings', () => {
	const whitelisted = ref<string[]>([]);
	const blacklisted = ref<string[]>([]);
	const notificationsBlockingEnabled = ref<boolean>(false);
	const focusSchedule = ref<ScheduleData[]>([]);

	async function setWhitelisted(sites: string[]) {
		const prefixedSites = sites
			.filter((s) => s !== '')
			.map((s) => {
				const url = createFullUrl(s);
				return url;
			});
		whitelisted.value = prefixedSites;
		await setWhitelistedSites(prefixedSites);
	}

	async function addToWhitelist(site: string) {
		if (site === '') return;
		const url = createFullUrl(site);
		whitelisted.value.push(url);
		await setWhitelistedSites(toRaw(whitelisted.value));
	}

	async function setBlacklisted(sites: string[]) {
		const prefixedSites = sites
			.filter((s) => s !== '')
			.map((s) => {
				const url = createFullUrl(s);
				return url;
			});
		blacklisted.value = prefixedSites;
		await setBlacklistedSites(prefixedSites);
	}

	async function addToBlacklist(site: string) {
		if (site === '') return;
		const url = createFullUrl(site);
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

	async function addScheduleItem(item: ScheduleData) {
		focusSchedule.value.push(item);
		await setSchedule(toRaw(focusSchedule.value));
	}

	async function editScheduleItem(item: ScheduleData) {
		const index = focusSchedule.value.map((i) => i.key).indexOf(item.key);
		if (index < 0) return;

		focusSchedule.value[index] = item;

		await setSchedule(toRaw(focusSchedule.value));
	}

	async function deleteScheduleItem(key: string) {
		focusSchedule.value = focusSchedule.value.filter((s) => s.key !== key);
		await setSchedule(toRaw(focusSchedule.value));
	}

	async function loadSettings() {
		const { whitelistedSites = [], blacklistedSites = [] } = await chrome.storage.local.get([
			'whitelistedSites',
			'blacklistedSites',
		]);
		whitelisted.value = whitelistedSites || [];
		blacklisted.value = blacklistedSites || [];

		notificationsBlockingEnabled.value = await getNotificationsBlockingSetting();

		focusSchedule.value = await getSchedule();
	}

	loadSettings();

	return {
		whitelisted,
		blacklisted,
		notificationsBlockingEnabled,
		focusSchedule,
		setWhitelisted,
		addToWhitelist,
		setBlacklisted,
		addToBlacklist,
		toggleNotificationsBlocking,
		addScheduleItem,
		editScheduleItem,
		deleteScheduleItem,
	};
});
