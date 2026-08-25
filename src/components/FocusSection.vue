<script setup lang="ts">
import '@m3e/web/heading';
import '@m3e/web/form-field';
import '@m3e/web/timepicker';
import '@m3e/web/icon-button';
import '@m3e/web/icon';
import type { M3eTimepickerElement } from '@m3e/web/timepicker';

function onTimepickerChange(el: M3eTimepickerElement) {
	console.log(el.date)
}
</script>

<template>
	<m3e-heading variant="title" size="large">Start Fokus Session</m3e-heading>
	<m3e-button variant="filled">
		<m3e-icon slot="icon" name="schedule"></m3e-icon>
		<m3e-timepicker-toggle for="focus-timepicker"></m3e-timepicker-toggle>
		Start fokusing
	</m3e-button>
	<m3e-timepicker id="focus-timepicker" variant="auto" @change="onTimepickerChange($event.target)"></m3e-timepicker>
</template>

<style scoped>
</style>
