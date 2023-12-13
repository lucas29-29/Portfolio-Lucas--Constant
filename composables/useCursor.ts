export default function () {
	const x = ref(0)
	const y = ref(0)
	const visible = ref(false)
	const transform = computed(() => `translate(${x.value - 160}px, ${y.value - 160}px)`)

	function update(event: MouseEvent) {
		visible.value = true
		x.value = event.pageX
		y.value = event.pageY
	}

	onMounted(() => {
		window.addEventListener('mousemove', update)
	})
	onUnmounted(() => {
		window.removeEventListener('mousemove', update)
	})

	return {visible, transform}
}