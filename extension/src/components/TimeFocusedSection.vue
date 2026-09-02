<script setup lang="ts">
import { getTimeFocused } from '@/utils/focus';
import { timeToString } from '@/utils/time';
import '@m3e/web/heading';
import { onMounted, ref } from 'vue';

const timeFocused = ref<number>(0);

onMounted(async () => {
	timeFocused.value = await getTimeFocused();
});
</script>

<template>
	<m3e-heading variant="display" size="small" style="color: var(--md-sys-color-primary)"
		>You've fokused a total of {{ timeToString(timeFocused) }}</m3e-heading
	>
</template>
