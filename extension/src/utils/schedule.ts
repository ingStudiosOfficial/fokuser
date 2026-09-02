import type { ScheduleData } from '../interfaces/ScheduleData';

export async function setSchedule(schedule: ScheduleData[]) {
	await chrome.storage.local.set({ schedule: schedule });
}

export async function getSchedule(): Promise<ScheduleData[]> {
	const { schedule } = await chrome.storage.local.get('schedule');
	return schedule || [];
}

export async function registerSchedule(schedule: ScheduleData[]) {
	for (const item of schedule) {
		await chrome.alarms.create(`start-focus-${item.key}`, {
			when: item.startTime,
			persistAcrossSessions: true,
		});

		await chrome.alarms.create(`end-focus-${item.key}`, {
			when: item.endTime,
			persistAcrossSessions: true,
		});
	}
}
