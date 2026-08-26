import { M3eDialogElement } from '@m3e/web/dialog';
import { ref } from 'vue';

const focusDialog = ref<M3eDialogElement | null>(null);

export function useDialog() {
	return { focusDialog };
}
