<script setup lang="ts"></script>

<template>
  <div class="allow-block-section-wrapper">
    <div class="section-title-container">
      <h2 class="section-title">Enhance your <span class="focus-emph">focus</span> experience</h2>
    </div>
    <div class="left">
      <div class="feature-box" style="text-align: left">
        <h3 class="feature-header">Focus on what's important</h3>
        <p class="feature-text">
          Add sites that matter the most to you to your allow list and those that don't to your
          block list.
        </p>
      </div>
      <img class="promo-img" src="/screenshots/allowlist.webp" loading="lazy" />
    </div>
    <div class="right">
      <div class="feature-box" style="text-align: left">
        <h3 class="feature-header">Block those buzzes</h3>
        <p class="feature-text">
          Do Not Disturb blocks notifications from sites to prevent your train of thought from
          getting distrupted.
        </p>
      </div>
      <img class="promo-img" src="/screenshots/dnd.webp" loading="lazy" />
    </div>
    <div class="left">
      <div class="feature-box" style="text-align: left">
        <h3 class="feature-header">Dedicate time to focus</h3>
        <p class="feature-text">Schedule your focus sessions to enhance your productivity.</p>
      </div>
      <img class="promo-img" src="/screenshots/schedule.webp" loading="lazy" />
    </div>
  </div>
</template>

<style scoped>
.allow-block-section-wrapper {
  width: 100%;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  box-sizing: border-box;
  gap: 30px;
}

.focus-emph {
  background-color: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  padding: 10px;
  border-radius: 100px;
  font-size: 3rem;
  font-weight: 500;
}

.left,
.right {
  width: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.promo-img {
  min-width: 70%;
  border-radius: 32px;
}

@supports (animation-timeline: scroll()) {
  .left {
    will-change: transform;
    animation: aiSidebarSlide ease-in-out both;
    animation-timeline: view();
  }

  .right {
    will-change: transform;
    animation: aiSidebarSlideReverse ease-in-out both;
    animation-timeline: view();
  }
}

@media (max-width: 768px) {
  .left,
  .right {
    flex-direction: column;
    width: 90%;
  }

  .left {
    align-items: flex-start;
  }

  .right {
    align-items: flex-end;
  }

  .promo-img {
    width: 100%;
  }
}

@keyframes aiSidebarSlide {
  0% {
    transform: translateX(-50svw);
  }
  100% {
    transform: translateX(50svw);
  }
}

@keyframes aiSidebarSlideReverse {
  0% {
    transform: translateX(50svw);
  }
  100% {
    transform: translateX(-50svw);
  }
}
</style>
