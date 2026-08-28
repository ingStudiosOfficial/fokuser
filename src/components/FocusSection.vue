<script setup lang="ts">
import '@m3e/web/heading';
import '@m3e/web/form-field';
import '@m3e/web/timepicker';
import '@m3e/web/button';
import '@m3e/web/icon';
import type { M3eTimepickerElement } from '@m3e/web/timepicker';
import { getFocusTime, setFocusTime } from '@/utils/focus';
import { timeToString } from '@/utils/time';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useDialog } from '@/composables/dialog';
import TimeFocusedSection from './TimeFocusedSection.vue';

chrome.runtime.onMessage.addListener((message) => {
	if (message === 'unblock-focus') {
		endFocus();
	}
});

const { focusDialog, onFocusEnd } = useDialog();

const focusTiming = ref<number | null>(0);
const countdownLeft = ref<number | null>(null);
const completedFocusTime = ref<number | null>(null);

let timer: number | null = null;

function endFocus() {
	focusTiming.value = null;
	countdownLeft.value = null;
	completedFocusTime.value = null;
	clearTimer();
}

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

function updateCountdown() {
	if (!focusTiming.value) return;

	const remaining = focusTiming.value - Date.now();
	if (remaining <= 0) {
		endFocus();
	} else {
		countdownLeft.value = remaining;
	}
}

onMounted(async () => {
	const ft = await getFocusTime();
	focusTiming.value = ft?.blockTime || null;
	onFocusEnd.value = endFocus;
});

onUnmounted(() => {
	clearTimer();
	onFocusEnd.value = null;
});

watch(focusTiming, (time) => {
	clearTimer();

	if (time && time > Date.now()) {
		updateCountdown();
		timer = setInterval(updateCountdown, 1000);
	} else {
		countdownLeft.value = null;
		completedFocusTime.value = null;
	}
});
</script>

<template>
	<div v-if="countdownLeft" class="focus-section-running">
		<m3e-heading style="color: var(--md-sys-color-primary)" variant="display" size="large">{{
			timeToString(countdownLeft)
		}}</m3e-heading>
		<m3e-heading variant="title" size="large">of fokus left</m3e-heading>
		<m3e-button variant="text" @click="focusDialog?.show()">End fokus</m3e-button>
	</div>
	<div v-else class="focus-section">
		<TimeFocusedSection></TimeFocusedSection>
		<m3e-button variant="filled" size="large">
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
	gap: 48px;
}

.focus-section-running {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 16px;
}
</style>
