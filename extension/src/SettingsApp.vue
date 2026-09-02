<script setup lang="ts">
import '@m3e/web/icon';
import '@m3e/web/heading';
import '@m3e/web/nav-menu';
import WhitelistBlacklistSettings from './components/settings/WhitelistBlacklistSettings.vue';
import NotificationsSettings from './components/settings/NotificationsSettings.vue';
import { ref } from 'vue';
import FocusSchedule from './components/settings/FocusSchedule.vue';

const currentSettingsPage = ref<'whitelist' | 'notifications' | 'schedule'>('whitelist');
</script>

<template>
	<div class="settings-wrapper">
		<div class="title-wrapper">
			<m3e-heading variant="display" size="small">Settings</m3e-heading>
		</div>
		<div class="content-wrapper">
			<m3e-nav-menu class="menu">
				<m3e-nav-menu-item
					:selected="currentSettingsPage === 'whitelist'"
					@click="currentSettingsPage = 'whitelist'"
				>
					<m3e-icon slot="icon" name="block"></m3e-icon>
					<span slot="label">Allowed & blocked sites</span>
				</m3e-nav-menu-item>
				<m3e-nav-menu-item
					:selected="currentSettingsPage === 'notifications'"
					@click="currentSettingsPage = 'notifications'"
				>
					<m3e-icon slot="icon" name="do_not_disturb_on"></m3e-icon>
					<span slot="label">Do Not Disturb</span>
				</m3e-nav-menu-item>
				<m3e-nav-menu-item
					:selected="currentSettingsPage === 'schedule'"
					@click="currentSettingsPage = 'schedule'"
				>
					<m3e-icon slot="icon" name="schedule"></m3e-icon>
					<span slot="label">Fokus schedule</span>
				</m3e-nav-menu-item>
			</m3e-nav-menu>

			<div class="content">
				<WhitelistBlacklistSettings
					v-if="currentSettingsPage === 'whitelist'"
				></WhitelistBlacklistSettings>
				<NotificationsSettings
					v-if="currentSettingsPage === 'notifications'"
				></NotificationsSettings>
				<FocusSchedule v-if="currentSettingsPage === 'schedule'"></FocusSchedule>
			</div>
		</div>
	</div>
</template>

<style scoped>
.settings-wrapper {
	width: 100vw;
	height: 100vh;
	padding: 16px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
}

.title-wrapper {
	width: 50%;
	text-align: left;
	box-sizing: border-box;
	padding: 0 16px;
	width: clamp(50%, 1200px - 50vw, 100%);
}

.content-wrapper {
	display: flex;
	flex-direction: row;
	gap: 16px;
	flex: 1;
	width: clamp(50%, 1200px - 50vw, 100%);
}

.menu {
	flex-shrink: 0;
}

.content {
	display: flex;
	flex-direction: column;
	gap: 16px;
	background-color: var(--md-sys-color-surface-container);
	color: var(--md-sys-color-on-surface-container);
	box-sizing: border-box;
	padding: 16px;
	border-radius: 24px;
	flex: 1;
}
</style>
