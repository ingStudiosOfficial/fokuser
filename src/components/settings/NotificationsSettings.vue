<script setup lang="ts">
import { useSettings } from '@/stores/settings';
import { showSnackbar } from '@/utils/snackbar';
import type { M3eSwitchElement } from '@m3e/web/switch';
import { storeToRefs } from 'pinia';
import '@m3e/web/heading';
import '@m3e/web/switch';

const settingsStore = useSettings();
const { toggleNotificationsBlocking } = settingsStore;

const { notificationsBlockingEnabled } = storeToRefs(settingsStore);

async function toggleBlocking(target: M3eSwitchElement) {
	try {
		await toggleNotificationsBlocking(target.checked);
	} catch (error) {
		showSnackbar((error as Error).message);
		notificationsBlockingEnabled.value = false;
	}
}
</script>

<template>
	<div class="settings-content">
		<m3e-heading variant="title" size="large">Notifications</m3e-heading>

		<div class="switch-setting">
			<m3e-heading variant="label" size="large">Enable notification blocking</m3e-heading>
			<m3e-switch
				icons="both"
				:checked="notificationsBlockingEnabled"
				@change="toggleBlocking($event.target)"
			></m3e-switch>
		</div>
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

.switch-setting {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	gap: 16px;
}
</style>
