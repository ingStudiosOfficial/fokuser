<script setup lang="ts">
import { useSettings } from '@/stores/settings';
import '@m3e/web/heading';
import '@m3e/web/switch';
import '@m3e/web/button';
import '@m3e/web/icon';
import '@m3e/web/list';
import '@m3e/web/card';
import { storeToRefs } from 'pinia';
import ScheduleDialog from '../dialogs/ScheduleDialog.vue';
import { useDialog } from '@/composables/dialog';

const settingsStore = useSettings();

const { focusSchedule } = storeToRefs(settingsStore);

const { scheduleDialogOpen } = useDialog();
</script>

<template>
	<div class="settings-content">
		<m3e-heading variant="title" size="large">Fokus schedule</m3e-heading>

		<m3e-button variant="filled" @click="scheduleDialogOpen?.()">
			<m3e-icon slot="icon" name="add"></m3e-icon>
			Add schedule rule
		</m3e-button>

		<m3e-card class="schedules">
			<m3e-action-list variant="segmented">
				<m3e-list-action
					v-for="session in focusSchedule"
					:key="session.key"
					@click="scheduleDialogOpen?.(session)"
				>
					<m3e-icon slot="leading" name="schedule"></m3e-icon>
					{{ session.name }}
					<span slot="supporting-text"
						>{{
							new Date(session.startTime).toLocaleTimeString([], {
								timeStyle: 'short',
							})
						}}
						-
						{{
							new Date(session.endTime).toLocaleTimeString([], { timeStyle: 'short' })
						}}</span
					>
				</m3e-list-action>
			</m3e-action-list>
		</m3e-card>

		<ScheduleDialog></ScheduleDialog>
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

.schedules {
	width: 100%;
}
</style>
