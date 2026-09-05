import { getTimeFocused } from '@/utils/focus';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTimeFocused = defineStore('timeFocused', () => {
	const timeFocused = ref<number>(0);

	async function init() {
		refresh();
	}

	async function refresh() {
		timeFocused.value = await getTimeFocused();
		console.log('New time focused:', timeFocused.value);
	}

	init();

	return { timeFocused, refresh };
});
