<script lang="ts" setup>
const props = defineProps<{
	src: string
	alt: string
	caption?: string
}>()
</script>

<template>
	<figure role="group">
		<nuxt-img :alt="props.alt" :src="props.src" sizes="xs:640 md:100vw"/>
		<figcaption>{{ props.caption ? props.caption : props.alt }}</figcaption>
	</figure>
</template>

<style lang="scss" scoped>
figure {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: space(4);

	figcaption {
		color: var(--text-accent);
		font-size: 0.875rem;
	}
}
</style>