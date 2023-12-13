<script lang="ts" setup>
const props = defineProps<{
	title: string,
	type?: string,
	index?: string | number,
	_path: string,
}>()

const cover = computed(() => `url("/images${props._path}.webp") no-repeat center / cover`)
const delay = ref<boolean | string>(false)

if (props.index) {
	delay.value = parseInt(props.index as string) * 400 + 'ms'
}
</script>

<template>
	<NuxtLink :style="{transitionDelay: delay}" :to="props._path" class="project-link">
		<div class="project-link__overlay"></div>
		<div class="project-link__title">
			<span class="project-link__title_default">{{ props.title }}</span>
			<span class="project-link__title_hover">{{ props.title }}</span>
		</div>
		<template v-if="props.type">
			<span class="project-link__type">{{ props.type }}</span>
		</template>
	</NuxtLink>
</template>

<style lang="scss" scoped>
@use "sass:color";

.project-link {
	position: relative;
	height: 100px;
	display: flex;
	align-items: center;
	padding: space(8) var(--main-space) var(--main-space);
	background: v-bind(cover);

	&__overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to right, color.adjust($dark, $alpha: -0.2), color.adjust($dark, $alpha: -1));
	}

	&__title {
		max-height: 2.75rem;
		overflow: hidden;
		z-index: 1;
		display: flex;
		flex-direction: column;

		span {
			font-family: "PP Formula Condensed", sans-serif;
			font-size: 2rem;
			color: $light;
			text-transform: uppercase;
			transition: transform 0.4s cubic-bezier(0.83, 0, 0.17, 1), color 0.2s ease-in-out;
		}

		&_default {
			font-weight: bold;
		}

		&_hover {
			font-weight: 300;
		}
	}

	&__type {
		display: none;
		position: absolute;
		top: space(6);
		right: space(6);
		color: $light;
		padding: space(2) space(4);
		background: color.adjust($dark, $alpha: -0.5);
		border-radius: space(10);
		backdrop-filter: blur(space(2));
		font-size: 0.875rem;
	}

	&:is(:hover,:focus, :focus-visible) {
		.project-link__title {
			&_default, &_hover {
				transform: translateY(-100%);
			}
		}
	}

	&:is(:focus, :focus-visible) {
		outline: none;

		.project-link__title {
			span {
				color: var(--primary);
			}
		}
	}
}

@media screen and (min-width: $md) {
	.project-link {
		height: 200px;
		padding: space(13) var(--main-space) var(--main-space);

		&__title {
			max-height: 4rem;

			span {
				font-size: 3rem;
			}
		}

		&__type {
			display: initial;
		}

	}
}
</style>