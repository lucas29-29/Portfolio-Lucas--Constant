<script lang="ts" setup>
const props = defineProps<{
	id: string,
	desktop?: boolean
}>()
</script>

<template>
	<section :id="props.id">
		<div class="cell cell--side">
		</div>
		<slot>
			<div class="cell">
			</div>
			<div class="cell">
			</div>
			<div class="cell">
			</div>
		</slot>
		<div :class="{'cell--desktop' : props.desktop}" class="cell cell--side">
		</div>
	</section>
</template>

<style lang="scss">
section {
	display: contents;

	.cell {
		display: flex;
		flex-direction: column;
		gap: space(6);

		&:not(&--side, &--mobile) {
			padding: var(--main-space);
		}

		&--desktop {
			display: none;
		}

		&--mobile {
			display: block;
			padding: 0;
		}

		&--double-column {
			grid-column: span 2;
		}

		&--triple-column {
			grid-column: span 2;
		}
	}
}

@media screen and (min-width: $md) {
	section {
		.cell {
			&--desktop {
				display: block;
			}

			&--mobile {
				display: none;
			}

			&--double-row {
				grid-row: span 2;
			}

			&--triple-column {
				grid-column: span 3;
			}
		}
	}
}
</style>