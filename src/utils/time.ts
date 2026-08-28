export function timeToString(ms: number, short: boolean = false): string {
	if (ms <= 0) return '0s';

	const totalSeconds = Math.floor(ms / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	if (hours > 0) {
		if (short) return `${hours}h`;
		return `${hours}h ${minutes}m ${seconds}s`;
	} else if (minutes > 0) {
		if (short) return `${minutes}m`;
		return `${minutes}m ${seconds}s`;
	} else {
		if (short) return `${seconds}s`;
		return `${seconds}s`;
	}
}
