<script setup lang="ts">
import { useDialog } from '@/composables/dialog';
import '@m3e/web/dialog';
import { M3eDialogElement } from '@m3e/web/dialog';
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import '@m3e/web/form-field';
import '@m3e/web/textarea-autosize';
import '@m3e/web/button';
import '@m3e/web/icon';
import { useSettings } from '@/stores/settings';
import { storeToRefs } from 'pinia';

const settingsStore = useSettings();
const { setWhitelisted, addToWhitelist } = settingsStore;

const { settingsDialog } = useDialog();

const { whitelisted } = storeToRefs(settingsStore);

const dialog = useTemplateRef<M3eDialogElement>('dialog');

const whitelistedSitesText = ref<string>('');

async function parseWhitelisted(target: HTMLTextAreaElement) {
	const sites = target.value.split('\n');
	console.log('Whitelisted sites:', sites);
	await setWhitelisted(sites);
}

async function whitelistCurrentSite() {
	try {
		const [site] = await chrome.tabs.query({ active: true, currentWindow: true });
		if (!site?.url) {
			console.error('Current site URL not found.');
			return;
		}

		console.log('Current site:', site.url);

		const url = new URL(site.url);

		await addToWhitelist(url.hostname);
	} catch (error) {
		console.error(error);
	}
}

onMounted(() => {
	settingsDialog.value = dialog.value;
});

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
</script>

<template>
	<m3e-dialog ref="dialog" dismissible>
		<span slot="header">Settings</span>
		<div class="content">
			<span>Site whitelist and blacklist</span>

			<m3e-button
				variant="outlined"
				style="width: fit-content"
				@click="whitelistCurrentSite()"
			>
				<m3e-icon slot="icon" name="add"></m3e-icon>
				Whitelist current site
			</m3e-button>

			<m3e-form-field>
				<label slot="label" for="whitelist-fld">Site whitelist</label>
				<label slot="hint">Separate each site with a newline</label>
				<textarea
					id="whitelist-fld"
					v-model="whitelistedSitesText"
					@change="parseWhitelisted($event.target as HTMLTextAreaElement)"
				></textarea>
			</m3e-form-field>
			<m3e-textarea-autosize for="whitelist-fld"></m3e-textarea-autosize>
		</div>
	</m3e-dialog>
</template>

<style scoped>
.content {
	display: flex;
	flex-direction: column;
	gap: 16px;
}
</style>
