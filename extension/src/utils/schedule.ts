import type { ScheduleData } from '../interfaces/ScheduleData';
import { setFocusTime } from './focus';

export async function setSchedule(schedule: ScheduleData[]) {
	await registerSchedule(schedule);
	await chrome.storage.local.set({ schedule: schedule });
}

export async function getSchedule(): Promise<ScheduleData[]> {
	const { schedule } = await chrome.storage.local.get('schedule');
	return schedule || [];
}

export async function getScheduleItem(key: string): Promise<ScheduleData | undefined> {
	const schedule = await getSchedule();
	return schedule.find((s) => s.key === key);
}

export async function registerSchedule(schedule: ScheduleData[]) {
	for (const item of schedule) {
		await clearScheduleItemAlarm(item.key);

		const now = new Date();

		const start = new Date(item.startTime);
		start.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
		if (start.getTime() <= now.getTime()) {
			start.setDate(start.getDate() + 1);
		}

		console.log('Setting alarm for:', start.toTimeString());

		await chrome.alarms.create(`start-focus-${item.key}`, {
			when: start.getTime(),
			persistAcrossSessions: true,
		});
	}
}

export async function startScheduledFocus(key: string) {
	const item = await getScheduleItem(key);
	if (!item) {
		throw new Error('No schedule found');
	}

	console.log('Starting scheduled focus:', item);

	const now = new Date();

	const start = new Date(item.startTime);
	const end = new Date(item.endTime);

	let duration = end.getTime() - start.getTime();
	if (duration <= 0) {
		duration += 24 * 60 * 60 * 1000;
	}

	const targetEnd = now.getTime() + duration;

	await setFocusTime(targetEnd);
}

export async function clearScheduleItemAlarm(key: string) {
	await chrome.alarms.clear(`start-focus-${key}`);
}
