import { getWhitelistedSites, setWhitelistedSites } from '@/utils/sites';
import { defineStore } from 'pinia';
import { ref, toRaw } from 'vue';

export const useSettings = defineStore('settings', () => {
	const whitelisted = ref<string[]>([]);

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

	async function loadSettings() {
		whitelisted.value = await getWhitelistedSites();
	}

	loadSettings();

	return { whitelisted, setWhitelisted, addToWhitelist };
});
