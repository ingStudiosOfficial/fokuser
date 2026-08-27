<script setup lang="ts">
import { useDialog } from '@/composables/dialog';
import '@m3e/web/dialog';
import { M3eDialogElement } from '@m3e/web/dialog';
import { onMounted, useTemplateRef } from 'vue';
import '@m3e/web/form-field';
import '@m3e/web/textarea-autosize';
import '@m3e/web/button';
import '@m3e/web/icon';

const { settingsDialog } = useDialog();

const dialog = useTemplateRef<M3eDialogElement>('dialog');

function parseWhitelisted(target: HTMLTextAreaElement) {
	const sites = target.value.split('\n');
	console.log('Whitelisted sites:', sites);
}

onMounted(() => {
	settingsDialog.value = dialog.value;
});
</script>

<template>
	<m3e-dialog ref="dialog" dismissible>
		<span slot="header">Settings</span>
		<div class="content">
			<span>Site whitelist and blacklist</span>

			<m3e-button variant="outlined" style="width: fit-content">
				<m3e-icon slot="icon" name="add"></m3e-icon>
				Whitelist current site
			</m3e-button>

			<m3e-form-field>
				<label slot="label" for="whitelist-fld">Site whitelist</label>
				<label slot="hint">Separate each site with a newline</label>
				<textarea
					id="whitelist-fld"
					@change="parseWhitelisted($event.target as HTMLTextAreaElement)"
					@keydown.enter="parseWhitelisted($event.target as HTMLTextAreaElement)"
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
