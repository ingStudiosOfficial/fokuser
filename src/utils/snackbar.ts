import { M3eSnackbar } from '@m3e/web/snackbar';

export function showSnackbar(message: string) {
	M3eSnackbar.open(message);
}
