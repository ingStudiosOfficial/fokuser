function blockPage() {
	console.log('Block page called.');

	const blockedHtml = `
<div class="blocked">
	<h1>Page blocked by Fokuser</h1>
</div>

<style>
:root {
	all: unset !important;
}

body {
	font-family: system-ui;
	width: 100vw;
	height: 100vh;
}

.blocked {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	width: 100%;
	height: 100%;
}
</style>
`;

	document.body.innerHTML = blockedHtml;
}

blockPage();
