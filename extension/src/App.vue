<script setup lang="ts">
import FocusSection from '@/components/FocusSection.vue';
import EndFocusDialog from '@/components/dialogs/EndFocusDialog.vue';
import '@m3e/web/icon-button';
import '@m3e/web/icon';

async function openSettings() {
	await chrome.runtime.openOptionsPage();
}
</script>

<template>
	<div class="popup-root">
		<m3e-icon-button class="action-button" @click="openSettings()">
			<m3e-icon name="settings"></m3e-icon>
		</m3e-icon-button>
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

.action-button {
	flex-shrink: 0;
	width: fit-content;
	height: fit-content;
	align-self: flex-end;
	margin: 16px;
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
