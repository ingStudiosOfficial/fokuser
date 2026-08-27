<script setup lang="ts">
import FocusSection from '@/components/FocusSection.vue';
import EndFocusDialog from '@/components/dialogs/EndFocusDialog.vue';
import '@m3e/web/app-bar';
import '@m3e/web/icon-button';
import '@m3e/web/icon';
import SettingsDialog from './components/dialogs/SettingsDialog.vue';
import { useDialog } from './composables/dialog.ts';

const { settingsDialog } = useDialog();
</script>

<template>
	<div class="popup-root">
		<m3e-app-bar class="app-bar">
			<span slot="title">Fokuser</span>
			<m3e-icon-button slot="trailing" @click="settingsDialog?.show()">
				<m3e-icon name="settings"></m3e-icon>
			</m3e-icon-button>
		</m3e-app-bar>
		<div class="popup-app">
			<FocusSection></FocusSection>
		</div>
		<EndFocusDialog></EndFocusDialog>
		<SettingsDialog></SettingsDialog>
	</div>
</template>

<style scoped>
.popup-root {
	display: flex;
	flex-direction: column;
	height: 100vh;
}

.app-bar {
	flex-shrink: 0;
}

.popup-app {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	gap: 16px;
	padding: 16px 8px;
	flex-grow: 1;
}
</style>
