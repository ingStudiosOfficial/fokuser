<script setup lang="ts">
//import { useSettings } from '@/stores/settings';
import '@m3e/web/heading';
import '@m3e/web/switch';
import FocusScheduleItem from './schedule/FocusScheduleItem.vue';

//const settingsStore = useSettings();
</script>

<template>
	<div class="settings-content">
		<m3e-heading variant="title" size="large">Fokus schedule</m3e-heading>

		<m3e-heading variant="label" size="large">Schedule</m3e-heading>

		<FocusScheduleItem></FocusScheduleItem>
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
