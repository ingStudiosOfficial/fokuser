import type { ScheduleData } from './interfaces/ScheduleData';

export async function setSchedule(schedule: ScheduleData[]) {
	await chrome.storage.local.set({ schedule: schedule });
}

export async function getSchedule(): Promise<ScheduleData[]> {
	const { schedule } = await chrome.storage.local.get('schedule');
	return schedule || [];
}
