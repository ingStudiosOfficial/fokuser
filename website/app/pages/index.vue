<script setup lang="ts">
useSeoMeta({
  title: "Home",
  description:
    "Install Foksuer, a FOSS M3E Chrome Extension Site Blocker and Focus Timer. Noew available on the Chrome Web Store. Fokuser is built by (ing) Studios.",
  ogType: "website",
  ogUrl: "https://fokuser.ingstudios.dev",
  ogTitle: "Turtlebrowse - A FOSS M3E Chrome Extension Site Blocker and Focus Timer",
  ogDescription:
    "Fokuser is a free and open-source Chrome Extension that lets you set a focus timer to block sites to help you focus on your priorities.",
  ogImage: "https://fokuser.ingstudios.dev/logo.png",
  ogImageWidth: 1000,
  ogImageHeight: 1000,
  ogSiteName: "Fokuser",
});

definePageMeta({
  sitemap: {
    images: [
      {
        loc: "/logo.png",
        title: "Fokuser Logo",
      },
      {
        loc: "/screenshots/allowlist.webp",
        title: "Fokuser site allow list and block list",
      },
      {
        loc: "/screenshots/dnd.webp",
        title: "Fokuser Do Not Disturb mode",
      },
      {
        loc: "/screenshots/schedule.webp",
        title: "Fokuser focus timer schedules",
      },
    ],
  },
});
</script>

<template>
  <div class="home-wrapper">
    <HeroSection />
    <AllowBlockSection />
    <OpenSourceSection />
  </div>
</template>

<style scoped>
.home-wrapper {
  width: 100svw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  box-sizing: border-box;
  overflow-x: clip;
}
</style>
