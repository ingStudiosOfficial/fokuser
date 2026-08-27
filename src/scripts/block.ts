import { getBlacklistedSites, getWhitelistedSites } from '@/utils/sites';
import { getFocusTime, getTimeTill } from '../utils/focus';

chrome.runtime.onMessage.addListener((message) => {
	console.log('Received message:', message);

	if (message === 'unblock-focus') {
		window.location.reload();
	} else if (message === 'block-focus') {
		checkFocus();
	}
});

async function checkSiteWhitelisted(): Promise<boolean> {
	try {
		const whitelistedSites = await getWhitelistedSites();
		console.log('Whitelisted sites:', whitelistedSites);

		console.log('Current URL:', window.location.href);
		const currentUrl = new URL(window.location.href);
		console.log('Current URL hostname:', currentUrl.hostname);

		for (const url of whitelistedSites) {
			console.log('Whitelisted URL:', url);
			const whitelistedUrl = new URL(url);
			console.log('Whitelisted URL hostname:', whitelistedUrl.hostname);

			if (
				whitelistedUrl.hostname.replace(/^www\./, '') ===
				currentUrl.hostname.replace(/^www\./, '')
			)
				return true;
		}

		return false;
	} catch (error) {
		console.error(error);
		return false;
	}
}

async function checkSiteBlacklisted(): Promise<boolean> {
	try {
		const blacklistedSites = await getBlacklistedSites();
		console.log('Blacklisted sites:', blacklistedSites);

		console.log('Current URL:', window.location.href);
		const currentUrl = new URL(window.location.href);
		console.log('Current URL hostname:', currentUrl.hostname);

		for (const url of blacklistedSites) {
			console.log('Blacklisted URL:', url);
			const blacklistedUrl = new URL(url);
			console.log('Blacklisted URL hostname:', blacklistedUrl.hostname);

			if (
				blacklistedUrl.hostname.replace(/^www\./, '') ===
				currentUrl.hostname.replace(/^www\./, '')
			)
				return true;
		}

		return false;
	} catch (error) {
		console.error(error);
		return false;
	}
}

async function blockPage(blockTime?: number) {
	console.log('Block page called.');

	if (await checkSiteWhitelisted()) return;

	window.stop();

	document.querySelectorAll('style, link[rel="stylesheet"]').forEach((el) => el.remove());
	document.querySelectorAll('*[style]').forEach((el) => el.removeAttribute('style'));

	const blockedHtmlHead = `
	<title>${document.title} (Blocked)</title>
`;

	let blockedHtmlBody = '';

	if (blockTime) {
		const timeObject = new Date(blockTime);

		blockedHtmlBody = `
<div class="blocked">
	<h1>^_^</h1>
	<h1>Let's not sidetrack...</h1>
	<p>Focus for <span id="block-time">${getTimeTill(timeObject.getTime() - Date.now())}</span> to earn points!</p>
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

		setInterval(() => {
			const bt = document.querySelector('#block-time');
			if (bt) bt.textContent = getTimeTill(timeObject.getTime() - Date.now());
		}, 1000);
	} else {
		blockedHtmlBody = `
<div class="blocked">
	<h1>>_<</h1>
	<h1>Time to lock in!</h1>
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
	}

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
		await blockPage(focusTime);
	} else if (await checkSiteBlacklisted()) {
		await blockPage();
	}
}

checkFocus();
