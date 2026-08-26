import { getFocusTime } from './focus';

chrome.runtime.onMessage.addListener((message) => {
	if (message === 'unblock-focus') {
		window.location.reload();
	} else if (message === 'block-focus') {
		checkFocus();
	}
});

function blockPage(blockTime: number) {
	console.log('Block page called.');

	window.stop();

	document.querySelectorAll('style, link[rel="stylesheet"]').forEach((el) => el.remove());
	document.querySelectorAll('*[style]').forEach((el) => el.removeAttribute('style'));

	const timeObject = new Date(blockTime);
	const hour = String(timeObject.getHours()).padStart(2, '0');
	const minute = String(timeObject.getMinutes()).padStart(2, '0');

	const blockedHtmlHead = `
	<title>${document.title} (Blocked)</title>
`;

	const blockedHtmlBody = `
<div class="blocked">
	<h1>^_^</h1>
	<h1>Time to focus buddy!</h1>
	<p id="block-time">Focus until ${hour}:${minute} to earn points!</p>
	<p>Page blocked by Fokuser</p>
</div>

<style>
:root {
	all: unset !important;
}

body {
	font-family: system-ui;
	width: 100vw;
	height: 100vh;
	padding: 0;
	margin: 0;
}

h1, p {
	margin: 0;
	font-weight: normal;
}

.blocked {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	width: 100%;
	height: 100%;
	gap: 16px;
}
</style>
`;

	document.documentElement.innerHTML = `
<!DOCTYPE html>
<html>
	<head>${blockedHtmlHead}</head>
	<body>${blockedHtmlBody}<body>
</html>
`;
}

async function checkFocus() {
	const focusTime = await getFocusTime();
	console.log('Focus time:', focusTime);
	if (focusTime) {
		blockPage(focusTime);
	}
}

checkFocus();
