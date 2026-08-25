chrome.runtime.onInstalled.addListener(async () => {
	console.log('Service worker active.');
	chrome.sidePanel
		.setPanelBehavior({ openPanelOnActionClick: true })
		.catch((error) => console.error('Failed to open panel:', error));
});
