import type { ScheduleData } from '@/interfaces/ScheduleData';
import { M3eDialogElement } from '@m3e/web/dialog';
import { ref } from 'vue';

const focusDialog = ref<M3eDialogElement | null>(null);
const onFocusEnd = ref<(() => void) | null>(null);
const scheduleDialogOpen = ref<((schedule?: ScheduleData) => void) | null>(null);

export function useDialog() {
	return { focusDialog, onFocusEnd, scheduleDialogOpen };
}
