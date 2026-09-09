<script setup lang="ts">
import FocusSection from '@/components/FocusSection.vue';
import EndFocusDialog from '@/components/dialogs/EndFocusDialog.vue';
import '@m3e/web/icon-button';
import '@m3e/web/icon';
import '@m3e/web/tooltip';
import { onMounted, onUnmounted, ref } from 'vue';

const isFullscreen = ref<boolean>(false);

async function openSettings() {
	await chrome.runtime.openOptionsPage();
	isFullscreen.value = false;
}

async function openPoopup() {
	if (isFullscreen.value) exitFullscreen();
	window.close();
	await chrome.action.openPopup();
}

async function requestFullscreen() {
	if (isFullscreen.value) return;

	try {
		await document.documentElement.requestFullscreen();
		isFullscreen.value = true;
	} catch (error) {
		console.error('Failed to launch fullscreen:', error);
	}
}

function exitFullscreen() {
	if (!isFullscreen.value) return;

	if (!document.fullscreenElement) {
		isFullscreen.value = false;
		return;
	}

	document.exitFullscreen();
	isFullscreen.value = false;
}

function handleFullscreenChange() {
	if (!document.fullscreenElement) {
		if (isFullscreen.value) isFullscreen.value = false;
	} else {
		if (!isFullscreen.value) isFullscreen.value = true;
	}
}

function handleKey(event: KeyboardEvent) {
	if (event.key === 'F11') {
		event.preventDefault();
		if (!document.fullscreenElement) {
			requestFullscreen();
		} else {
			exitFullscreen();
		}
	}
}

onMounted(() => {
	document.addEventListener('fullscreenchange', handleFullscreenChange);
	document.addEventListener('keydown', handleKey);
});

onUnmounted(() => {
	document.removeEventListener('fullscreenchange', handleFullscreenChange);
	document.addEventListener('keydown', handleKey);
});
</script>

<template>
	<div class="popup-root">
		<div class="actions">
			<div v-if="!isFullscreen">
				<m3e-icon-button
					id="fullscreen-btn"
					class="action-button"
					@click="requestFullscreen()"
					><m3e-icon name="fullscreen"></m3e-icon>
				</m3e-icon-button>
				<m3e-tooltip for="fullscreen-btn">Enter fullscreen</m3e-tooltip>
			</div>
			<div v-else>
				<m3e-icon-button
					id="exit-fullscreen-btn"
					class="action-button"
					@click="exitFullscreen()"
					><m3e-icon name="fullscreen_exit"></m3e-icon>
				</m3e-icon-button>
				<m3e-tooltip for="exit-fullscreen-btn">Exit fullscreen</m3e-tooltip>
			</div>

			<m3e-icon-button id="open-in-popup-btn" class="action-button" @click="openPoopup()"
				><m3e-icon name="open_in_new"></m3e-icon>
			</m3e-icon-button>
			<m3e-icon-button id="settings-btn" class="action-button" @click="openSettings()"
				><m3e-icon name="settings"></m3e-icon>
			</m3e-icon-button>

			<m3e-tooltip for="open-in-popup-btn">Open in popup</m3e-tooltip>
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
