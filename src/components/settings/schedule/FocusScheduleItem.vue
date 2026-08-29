<script setup lang="ts">
import '@m3e/web/button-group';
import '@m3e/web/button';
</script>

<template>
	<div class="schedule-box">
		<m3e-button-group variant="connected">
			<m3e-button variant="outlined">Start time</m3e-button>
			<m3e-button variant="outlined">End time</m3e-button>
		</m3e-button-group>
	</div>
</template>

<style scoped>
.schedule-box {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	gap: 16px;
}
</style>
