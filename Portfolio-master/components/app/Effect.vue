<script lang="ts" setup>
const {visible, transform} = useCursor()
</script>

<template>
	<Transition>
		<div v-if="visible" :style="{transform: transform}" class="app__effect"></div>
	</Transition>
</template>

<style lang="scss" scoped>
.app__effect {
	position: absolute;
	top: 0;
	left: 0;
	width: space(80);
	height: space(80);
	border-radius: 50%;
	filter: blur(space(20));
	background: var(--primary);
}

.v-enter-active,
.v-leave-active {
	@include transition(opacity);
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>