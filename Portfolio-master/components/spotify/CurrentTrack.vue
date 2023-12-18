<!--suppress TypeScriptUnresolvedReference -->
<script lang="ts" setup>
import {Spotify} from "~/types/spotify";
import {Lang} from "~/types/lang";

const lang = useLang()
const api = process.env.NODE_ENV === 'production' ? '/spotify' : '/api/spotify'

interface SpotifyAnimation {
	title: HTMLElement | null
	span: {
		element: HTMLElement | null
		width: string
	}
}

const {data: spotify, error, refresh} = await useFetch<Spotify>(api)

setInterval(() => {
	refresh()
}, 2000)

const url = computed(() => {
	if (typeof spotify.value === 'object' && spotify.value !== null && spotify.value.isConnected) {
		return spotify.value.url
	}

	return false
})

const spotifyAnimation: SpotifyAnimation = reactive({
	title: null,
	span: {
		element: null,
		width: '0',
	}
})

const assignTitleRef = (el: Element | ComponentPublicInstance | null) => {
	if (el instanceof HTMLElement) spotifyAnimation.title = el
}

const assignTitleSpanRef = (el: Element | ComponentPublicInstance | null) => {
	if (el instanceof HTMLElement) spotifyAnimation.span.element = el
}

onMounted(() => {
	if (spotifyAnimation.title && spotifyAnimation.span.element) {
		if (spotifyAnimation.span.element.scrollWidth > spotifyAnimation.title.offsetWidth) {
			spotifyAnimation.span.width = `-${spotifyAnimation.span.element.scrollWidth - spotifyAnimation.title.offsetWidth + 40}px`
			spotifyAnimation.span.element.classList.add('animated')
		}
	}
})
</script>

<template>
	<component :is="spotify.isConnected ? 'a' : 'div'" v-if="spotify" :class="{spotify__link : spotify.isConnected}"
			   :href="url"
			   class="spotify__pill"
			   target="_blank">
		<div :ref="assignTitleRef" class="spotify__pill_title">
			<span :ref="assignTitleSpanRef">{{
					spotify.isConnected ? `${spotify.title} - ${spotify.artist}` : lang === Lang.Fr ? 'Déconnecté' : 'Disconnected'
				}}</span>
		</div>
		<div :class="{'spotify__pill_icon--animated' : spotify.isConnected ? spotify.isPlaying : false  }"
			 aria-hidden="true"
			 class="spotify__pill_icon">
			<div class="spotify__pill_icon-bar"></div>
			<div class="spotify__pill_icon-bar"></div>
			<div class="spotify__pill_icon-bar"></div>
		</div>
	</component>
	<div v-else>
		<div class="spotify__pill_title">
			<span>{{ lang === Lang.Fr ? 'Déconnecté' : 'Disconnected' }}</span>
		</div>
		<div aria-hidden="true" class="spotify__pill_icon">
			<div class="spotify__pill_icon-bar"></div>
			<div class="spotify__pill_icon-bar"></div>
			<div class="spotify__pill_icon-bar"></div>
		</div>
	</div>
</template>

<style lang="scss">
.spotify__pill {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: space(4);
	padding: space(2) space(2) space(2) space(1);
	border: 1px solid var(--accent);
	border-radius: space(10);
	overflow: hidden;
	@include transition(border);

	&_title {
		position: relative;
		overflow: hidden;
		padding-left: space(4);
		flex-grow: 1;

		span {
			display: block;
			font-size: 1.125rem;
			font-weight: 500;
			white-space: nowrap;

			&.animated {
				animation: 8s translate 2s linear infinite;
			}
		}

		@keyframes translate {
			0%, 10% {
				transform: translateX(0);
			}
			65%, 75% {
				transform: translateX(v-bind('spotifyAnimation.span.width'));
			}
			90%, 100% {
				transform: translateX(0);
			}
		}

		&:before, &:after {
			content: '';
			position: absolute;
			z-index: 1;
			top: 0;
			display: block;
			width: space(3);
			height: 100%;
		}

		&:before {
			left: -1px;
			background: linear-gradient(to right, var(--background), transparent);
		}

		&:after {
			right: -1px;
			background: linear-gradient(to left, var(--background), transparent);
		}
	}

	&_icon {
		border-radius: 50%;
		background: var(--primary);
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: space(1);
		height: 44px;
		width: 44px;

		svg {
			display: block;
		}

		&-dot {
			fill: var(--text);
		}

		&-handle {
			stroke: var(--text);
		}

		&-bar {
			background: var(--background);
			width: 4px;
			height: 4px;
			border-radius: 8px;

			&:nth-child(2) {
				animation-delay: 0.8s;
			}

			&:nth-child(3) {
				animation-delay: 0.4s;
			}
		}

		&--animated .spotify__pill_icon-bar {
			animation-name: pulse;
			animation-duration: 1s;
			animation-iteration-count: infinite;
			animation-timing-function: linear;
		}

		@keyframes pulse {
			0% {
				height: 4px;
			}
			12.5% {
				height: 8px;
			}
			25% {
				height: 12px;
			}
			37.5% {
				height: 16px;
			}
			50% {
				height: 16px;
			}
			62.5% {
				height: 12px;
			}
			75% {
				height: 8px;
			}
			100% {
				height: 4px;
			}
		}
	}
}

.spotify__link:is(:hover, :focus, :focus-visible) {
	border: 1px solid var(--primary);
	outline: none;
}
</style>