<script setup lang="ts">
import { useDialog } from '@/composables/dialog';
import '@m3e/web/dialog';
import { M3eDialogElement } from '@m3e/web/dialog';
import '@m3e/web/form-field';
import { onMounted, ref, useTemplateRef } from 'vue';
import '@m3e/web/timepicker';
import '@m3e/web/icon-button';
import '@m3e/web/date-input';
import '@m3e/web/icon';
import { showSnackbar } from '@/utils/snackbar';
import { useSettings } from '@/stores/settings';
import type { ScheduleData } from '@/interfaces/ScheduleData';

const { addScheduleItem } = useSettings();

const { scheduleDialogOpen } = useDialog();

const dialog = useTemplateRef<M3eDialogElement>('dialog');
const key = ref<string>(window.crypto.randomUUID());
const sessionName = ref<string>('');
const startDate = ref<Date>(new Date());
const endDate = ref<Date>(new Date());

function openDialog(schedule?: ScheduleData) {
	if (schedule) {
		key.value = schedule.key;
		sessionName.value = schedule.name;
		startDate.value = new Date(schedule.startTime);
		endDate.value = new Date(schedule.endTime);
	}

	dialog.value?.show();
}

async function onSave() {
	console.log('Session name:', sessionName.value);
	console.log('Dates:', startDate.value, endDate.value);

	if (sessionName.value.trim() === '') {
		showSnackbar('Session name cannot be empty');
		return;
	}

	if (endDate.value.getTime() < startDate.value.getTime()) {
		showSnackbar('End time cannot be before start time');
		return;
	}

	await addScheduleItem({
		key: window.crypto.randomUUID(),
		name: sessionName.value,
		startTime: startDate.value.getTime(),
		endTime: endDate.value.getTime(),
	});

	key.value = window.crypto.randomUUID();
	sessionName.value = '';
	startDate.value = new Date();
	endDate.value = new Date();

	dialog.value?.hide();
}

onMounted(() => {
	scheduleDialogOpen.value = openDialog;
});
</script>

<template>
	<m3e-dialog ref="dialog">
		<span slot="header">Schedule fokus session</span>

		<div class="content">
			<m3e-form-field>
				<label slot="label" for="name-fld">Session name</label>
				<input id="name-fld" v-model="sessionName" />
			</m3e-form-field>

			<m3e-form-field variant="outlined">
				<label slot="label" for="field">Start at</label>
				<m3e-date-input
					id="start-field"
					type="time"
					:value="startDate"
					@change="startDate = $event.target.value"
				></m3e-date-input>
				<m3e-icon-button aria-label="Open time picker" slot="suffix">
					<m3e-icon name="schedule"></m3e-icon>
					<m3e-timepicker-toggle for="start-timepicker"></m3e-timepicker-toggle>
				</m3e-icon-button>
				<span slot="hint">HH:MM</span>
			</m3e-form-field>
			<m3e-timepicker id="start-timepicker" for="start-field"></m3e-timepicker>

			<m3e-form-field variant="outlined">
				<label slot="label" for="field">End at</label>
				<m3e-date-input
					id="end-field"
					type="time"
					:value="endDate"
					@change="endDate = $event.target.value"
				></m3e-date-input>
				<m3e-icon-button aria-label="Open time picker" slot="suffix">
					<m3e-icon name="schedule"></m3e-icon>
					<m3e-timepicker-toggle for="end-timepicker"></m3e-timepicker-toggle>
				</m3e-icon-button>
				<span slot="hint">HH:MM</span>
			</m3e-form-field>
			<m3e-timepicker id="end-timepicker" for="end-field"></m3e-timepicker>
		</div>

		<div slot="actions" end>
			<m3e-button variant="text">
				<m3e-icon slot="icon" name="close"></m3e-icon>
				<m3e-dialog-action>Close</m3e-dialog-action>
			</m3e-button>
			<m3e-button variant="filled" @click="onSave()">
				<m3e-icon slot="icon" name="save"></m3e-icon>
				Save
			</m3e-button>
		</div>
	</m3e-dialog>
</template>

<style scoped>
.content {
	display: flex;
	flex-direction: column;
	gap: 16px;
	margin-top: 8px;
	box-sizing: border-box;
}
</style>
