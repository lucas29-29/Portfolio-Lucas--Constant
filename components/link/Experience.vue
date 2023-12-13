<script lang="ts" setup>
import {Experience} from "~/types/experience";

const props = defineProps<{
	experience: Experience
}>()
</script>

<template>
	<div class="experience">
		<h3>{{ experience.position }}</h3>
		<div class="experience__infos">
			<span>{{ experience.compagny }}</span>
			<hr>
			<span>{{ experience.type }}</span>
		</div>
		<div class="experience__dates">
			<span>{{ experience.from }}</span>
			<hr>
			<span>{{ experience.to }}</span>
			<span>({{ experience.duration }})</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.experience {
	display: flex;
	flex-direction: column;
	gap: space(2);

	&:not(:last-child) {
		border-bottom: 1px solid var(--accent);
		padding-bottom: space(6);
	}

	h3 {
		font-size: 1.125rem;
		font-weight: 500;
	}

	&__infos, &__dates {
		display: flex;
		align-items: center;
		gap: space(2);

		hr {
			height: 1px;
			margin: 0;
			border: none;
		}
	}

	&__infos {
		hr {
			width: space(2);
			background: var(--text);
		}
	}

	&__dates {
		font-size: 0.875rem;
		color: var(--text-accent);

		hr {
			width: space(4);
			background: var(--text-accent);
		}
	}
}
</style>