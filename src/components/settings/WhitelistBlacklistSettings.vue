<script setup lang="ts">
import { useSettings } from '@/stores/settings';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import '@m3e/web/heading';
import '@m3e/web/form-field';
import '@m3e/web/textarea-autosize';

const settingsStore = useSettings();
const { setWhitelisted, setBlacklisted } = settingsStore;

const { whitelisted, blacklisted } = storeToRefs(settingsStore);

const whitelistedSitesText = ref<string>('');
const blacklistedSitesText = ref<string>('');

async function parseWhitelisted(target: HTMLTextAreaElement) {
	const sites = target.value.split('\n');
	console.log('Whitelisted sites:', sites);
	await setWhitelisted(sites);
}

async function parseBlacklisted(target: HTMLTextAreaElement) {
	const sites = target.value.split('\n');
	console.log('Blacklisted sites:', sites);
	await setBlacklisted(sites);
}

watch(
	whitelisted,
	(sites) => {
		console.log('Sites:', sites);
		if (sites && sites.length !== 0) {
			console.log('Setting whitelisted sites text value.');
			whitelistedSitesText.value = sites.filter((s) => s !== '').join('\n');
		}
	},
	{ deep: true },
);

watch(
	blacklisted,
	(sites) => {
		console.log('Sites:', sites);
		if (sites && sites.length !== 0) {
			console.log('Setting blacklisted sites text value.');
			blacklistedSitesText.value = sites.filter((s) => s !== '').join('\n');
		}
	},
	{ deep: true },
);
</script>

<template>
	<div class="settings-content">
		<m3e-heading variant="title" size="large">Allowed & blocked sites</m3e-heading>

		<m3e-form-field>
			<label slot="label" for="whitelist-fld">Allowed sites</label>
			<label slot="hint">Separate each site with a newline</label>
			<textarea
				id="whitelist-fld"
				v-model="whitelistedSitesText"
				autocorrect="false"
				spellcheck="false"
				@change="parseWhitelisted($event.target as HTMLTextAreaElement)"
			></textarea>
		</m3e-form-field>
		<m3e-textarea-autosize for="whitelist-fld"></m3e-textarea-autosize>

		<m3e-form-field>
			<label slot="label" for="blacklist-fld">Blocked sites</label>
			<label slot="hint">Separate each site with a newline</label>
			<textarea
				id="blacklist-fld"
				v-model="blacklistedSitesText"
				autocorrect="false"
				spellcheck="false"
				@change="parseBlacklisted($event.target as HTMLTextAreaElement)"
			></textarea>
		</m3e-form-field>
		<m3e-textarea-autosize for="blacklist-fld"></m3e-textarea-autosize>
	</div>
</template>

<style scoped>
.settings-content {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	gap: 16px;
}
</style>
