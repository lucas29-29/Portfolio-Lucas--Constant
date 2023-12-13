<script lang="ts" setup>
import "@lottiefiles/lottie-player";
import {create} from '@lottiefiles/lottie-interactivity';

const theme = ref<HTMLInputElement | null>(null)

onMounted(() => {
	theme.value?.addEventListener('load', () => {
		create({
			player: '#theme',
			mode: "cursor",
			actions: [
				{
					type: "toggle"
				}
			]
		});
	});
})
</script>

<template>
	<div id="error" class="page">
		<AppEffect/>
		<AppHeader/>
		<main>
			<AppSection id="error__empty_before">
				<div class="cell cell--triple-column animation">
				</div>
			</AppSection>
			<AppSection id="error_animation">
				<div class="cell cell--triple-column animation">
					<lottie-player
						autoplay
						intermission="2"
						loop
						mode="normal"
						src="/lottie/hero.json"
						style="width: 1200px"
					>
					</lottie-player>
				</div>
			</AppSection>
			<AppSection id="error_animation">
				<div class="cell cell--triple-column animation">
					<lottie-player
						autoplay
						intermission="2"
						loop
						mode="normal"
						src="/lottie/404.json"
						style="width: 1200px"
					>
					</lottie-player>
				</div>
			</AppSection>
			<AppSection id="error_animation">
				<div class="cell cell--triple-column animation">
					<lottie-player
						autoplay
						intermission="2"
						loop
						mode="bounce"
						src="/lottie/logo.json"
						style="width: 200px"
					>
					</lottie-player>
				</div>
			</AppSection>
			<AppSection id="error_animation">
				<div class="cell cell--triple-column animation">
					Cliquez !
					<lottie-player
						id="theme"
						ref="theme"
						mode="normal"
						src="/lottie/theme.json"
						style="width: 200px"
					>
					</lottie-player>
				</div>
			</AppSection>
			<AppSection id="error__empty_after">
				<div class="cell cell--triple-column animation">
				</div>
			</AppSection>
		</main>
		<AppFooter/>
	</div>
</template>

<style lang="scss">
#error {
	grid-template-rows: space(20) auto 140px auto space(20);

	.cell {
		&.animation {
			align-items: center;
			justify-content: center;
			overflow: hidden;
			padding: 0
		}
	}
}

@media screen and (min-width: $md) {
	#error {
		grid-template-rows: space(20) auto 600px repeat(3, 300px) auto space(20);
	}
}
</style>