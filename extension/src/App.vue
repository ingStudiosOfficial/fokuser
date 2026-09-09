<script setup lang="ts">
import FocusSection from '@/components/FocusSection.vue';
import EndFocusDialog from '@/components/dialogs/EndFocusDialog.vue';
import '@m3e/web/icon-button';
import '@m3e/web/icon';
import '@m3e/web/tooltip';

async function openSettings() {
	await chrome.runtime.openOptionsPage();
}

function openFullscreen() {
	const fullscreenUrl = chrome.runtime.getURL('fullscreen.html');
	window.open(fullscreenUrl, '_blank');
}
</script>

<template>
	<div class="popup-root">
		<div class="actions">
			<m3e-icon-button id="open-in-new-btn" class="action-button" @click="openFullscreen()"
				><m3e-icon name="open_in_new_down"></m3e-icon>
			</m3e-icon-button>
			<m3e-icon-button id="settings-btn" class="action-button" @click="openSettings()"
				><m3e-icon name="settings"></m3e-icon>
			</m3e-icon-button>

			<m3e-tooltip for="open-in-new-btn">Open in new tab</m3e-tooltip>
			<m3e-tooltip for="settings-btn">Settings</m3e-tooltip>
		</div>

		<div class="popup-app">
			<FocusSection></FocusSection>
		</div>
		<EndFocusDialog></EndFocusDialog>
	</div>
</template>

<style scoped>
.popup-root {
	display: flex;
	flex-direction: column;
	height: 100vh;
}

.actions {
	flex-shrink: 0;
	width: fit-content;
	height: fit-content;
	align-self: flex-end;
	margin: 16px;
	gap: 8px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: right;
}

.popup-app {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	gap: 32px;
	padding: 16px 8px;
	box-sizing: border-box;
	flex-grow: 1;
}
</style>
