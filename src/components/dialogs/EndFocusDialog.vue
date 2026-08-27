<script setup lang="ts">
import { useDialog } from '@/composables/dialog';
import '@m3e/web/dialog';
import { M3eDialogElement } from '@m3e/web/dialog';
import { onMounted, useTemplateRef } from 'vue';
import '@m3e/web/button';
import { endFocus } from '@/utils/focus';

const { focusDialog, onFocusEnd } = useDialog();

const dialog = useTemplateRef<M3eDialogElement>('dialog');

async function endFocusSession() {
	console.log('Ending focus session.');
	await endFocus();
	if (onFocusEnd.value) onFocusEnd.value();
	await dialog.value?.hide();
}

onMounted(() => {
	focusDialog.value = dialog.value;
});
</script>

<template>
	<m3e-dialog ref="dialog">
		<span slot="header">End fokus session</span>
		<span
			>Are you sure you want to end your current focus session? You will lose all points
			accumulated from this session.</span
		>
		<div slot="actions" end>
			<m3e-button variant="text" @click="endFocusSession()">Yes</m3e-button>
			<m3e-button variant="filled">
				<m3e-dialog-action>No</m3e-dialog-action>
			</m3e-button>
		</div>
	</m3e-dialog>
</template>
