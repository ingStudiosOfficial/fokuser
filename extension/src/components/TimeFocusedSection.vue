<script setup lang="ts">
import { useTimeFocused } from '@/stores/timeFocused';
import { timeToString } from '@/utils/time';
import '@m3e/web/heading';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const timeFocusedStore = useTimeFocused();
const { refresh } = timeFocusedStore;

const { timeFocused } = storeToRefs(timeFocusedStore);

onMounted(async () => {
	await refresh();
});
</script>

<template>
	<m3e-heading variant="display" size="small" style="color: var(--md-sys-color-primary)"
		>You've fokused a total of {{ timeToString(timeFocused) }}</m3e-heading
	>
</template>
