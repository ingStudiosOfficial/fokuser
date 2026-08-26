<script setup lang="ts">
import '@m3e/web/heading';
import '@m3e/web/form-field';
import '@m3e/web/timepicker';
import '@m3e/web/button';
import '@m3e/web/icon';
import type { M3eTimepickerElement } from '@m3e/web/timepicker';
import { getFocusTime, setFocusTime } from '@/utils/focus';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useDialog } from '@/composables/dialog';

chrome.runtime.onMessage.addListener((message) => {
	if (message === 'unblock-focus') {
		focusTiming.value = undefined;
		countdownLeft.value = null;
		if (timer) clearInterval(timer);
	}
});

const { focusDialog } = useDialog();

const focusTiming = ref<number | undefined>(0);
const countdownLeft = ref<number | null>(null);

let timer: number | null = null;

function clearTimer() {
	if (timer) {
		clearInterval(timer);
		timer = null;
	}
}

function onTimepickerChange(el: M3eTimepickerElement) {
	console.log(el.date);
	const date = el.date?.getTime() || Date.now();
	focusTiming.value = date;
	setFocusTime(date);
}

function getTimeTill(ms: number): string {
	if (ms <= 0) return '0 seconds';

	const totalSeconds = Math.floor(ms / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	if (hours > 0) {
		return `${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
	} else if (minutes > 0) {
		return `${minutes} minutes and ${seconds} seconds`;
	} else {
		return `${seconds} seconds`;
	}
}

function updateCountdown() {
	if (!focusTiming.value) return;

	const remaining = focusTiming.value - Date.now();
	if (remaining <= 0) {
		countdownLeft.value = null;
		clearTimer();
	} else {
		countdownLeft.value = remaining;
	}
}

onMounted(async () => {
	const ft = await getFocusTime();
	focusTiming.value = ft;
});

onUnmounted(() => {
	clearTimer();
});

watch(focusTiming, (time) => {
	clearTimer();

	if (time && time > Date.now()) {
		updateCountdown();
		timer = setInterval(updateCountdown, 1000);
	} else {
		countdownLeft.value = null;
	}
});
</script>

<template>
	<div v-if="countdownLeft" class="focus-section">
		<m3e-heading style="color: var(--md-sys-color-primary)" variant="display" size="large">{{
			getTimeTill(countdownLeft)
		}}</m3e-heading>
		<m3e-heading variant="title" size="large">of fokus left</m3e-heading>
		<m3e-button variant="text" @click="focusDialog?.show()">End fokus</m3e-button>
	</div>
	<div v-else class="focus-section">
		<m3e-heading variant="title" size="large">Start Fokus Session</m3e-heading>
		<m3e-button variant="filled">
			<m3e-icon slot="icon" name="schedule"></m3e-icon>
			<m3e-timepicker-toggle for="focus-timepicker"></m3e-timepicker-toggle>
			Start fokusing
		</m3e-button>
		<m3e-timepicker
			id="focus-timepicker"
			variant="auto"
			@change="onTimepickerChange($event.target)"
		></m3e-timepicker>
	</div>
</template>

<style scoped>
.focus-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 16px;
}
</style>
