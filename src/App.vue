<script setup lang="ts">
import FocusSection from '@/components/FocusSection.vue';
import EndFocusDialog from '@/components/dialogs/EndFocusDialog.vue';
</script>

<template>
	<div class="sidebar-root">
		<div class="sidebar-app">
			<FocusSection></FocusSection>
		</div>
		<EndFocusDialog></EndFocusDialog>
	</div>
</template>

<style scoped>
.sidebar-root {
	display: flex;
	flex-direction: column;
	height: 100vh;
}

.sidebar-app {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	gap: 16px;
	padding: 16px 8px;
	flex-grow: 1;
}
</style>
