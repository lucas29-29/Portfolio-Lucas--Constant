<script lang="ts" setup>
import {Lang} from "~/types/lang";

const theme = useTheme()
const lang = useLang()

useHead({
	titleTemplate(chunk) {
		const title = lang.value === Lang.Fr ? 'Théo Rigé - Développeur et designer web' : 'Théo Rigé - Web developer and designer'
		return chunk ? `${chunk} - ${title}` : title + ' - Portfolio'
	},
	htmlAttrs: {
		lang: () => lang.value,
		'data-theme': () => theme.value
	},
	link: [
		{
			rel: 'icon',
			href: '/favicon.svg',
			type: 'image/svg+xml',
		}
	],
	meta: [
		{
			name: 'google-site-verification',
			content: '9enTEnn4TDcfVaSIV1jMyTsCIZJhQEYHnzRlQhtEWDY'
		}
	],
	script: [
		{
			src: 'https://analytics.umami.is/script.js',
			'data-website-id': '12b2ec53-e4c6-44e9-b7ee-19a339dc0ea2',
			async: true
		},
	]
})</script>

<template>
	<NuxtPage :lang="lang"/>
</template>

<style lang="scss">
:root {
	--main-space: #{space(6)};
}

::-moz-selection {
	color: $dark;
	background: var(--primary);
}

::selection {
	color: $dark;
	background: var(--primary);
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html {
	font-size: 100%;
	font-family: 'Strawford', sans-serif;
	color: var(--text);
	background: var(--background);
}

body {
	background: var(--background);
}

.page {
	position: relative;
	display: grid;
	grid-template-columns: minmax(space(6), calc((100% - 1200px) / 2)) repeat(2, minmax(0, 600px)) minmax(space(6), calc((100% - 1200px) / 2));
	gap: 1px;
	background: var(--accent);
	overflow: hidden;
	min-height: 100vh;

	main {
		display: contents;
	}
}

a {
	color: var(--text);
	text-decoration: none;
}

p {
	line-height: 1.75rem;
}

ul {
	list-style-type: none;
	display: flex;
	flex-direction: column;
	gap: space(4);

	li {
		display: flex;
		align-items: center;
		gap: space(4);

		&:before {
			content: '';
			width: space(4);
			height: 1px;
			background: var(--text);
		}
	}
}

h2 {
	font-family: 'PP Formula Condensed', sans-serif;
	font-weight: bold;
	font-size: 1.125rem;
	letter-spacing: 1px;
	color: var(--primary);
	line-height: 1;

	a {
		color: var(--primary);
		text-decoration: underline;
		text-underline-offset: 8px;
		text-decoration-thickness: 1px;
		text-decoration-color: var(--background);
		transition: text-decoration-color 0.2s ease-in-out;

		&:is(:hover, :focus, :focus-visible) {
			text-decoration-color: var(--primary);
			outline: none;
		}
	}
}

[data-content-id] {
	h2:not(:first-child) {
		margin-top: space(10);
	}
}

.cell, section .cell {
	position: relative;
	background: var(--background);
	z-index: 2;

	&--desktop {
		display: none;
	}

	&--mobile {
		display: block;
		padding: 0;
	}

	&:before {
		content: '';
		position: absolute;
		inset: -1px calc(100% + 1px) -1px -1px;
		background: $primary;
		z-index: 2;
		transition: all 1s cubic-bezier(0.83, 0, 0.17, 1);
	}
}

@media screen and (min-width: $md) {
	:root {
		--main-space: #{space(10)};
	}

	.page {
		grid-template-columns: minmax(space(10), calc((100% - 1200px) / 2))  repeat(3, minmax(0, 400px)) minmax(space(10), calc((100% - 1200px) / 2));
	}

	.cell {
		&--desktop {
			display: flex;
		}

		&--mobile {
			display: none;
		}
	}

	h2 {
		font-size: 1.5rem;
	}
}

@media screen and (max-width: $md) {
	.cell {
		&.responsive {
			padding: 0;
		}
	}
}

@media (prefers-reduced-motion: no-preference) {
	.page-enter-active,
	.page-leave-active {
		transition: 1s inset 0.4s cubic-bezier(0.83, 0, 0.17, 1);
	}

	.page-enter-from,
	.page-leave-to {
		.cell:before {
			inset: -1px -1px -1px -1px;
		}
	}
}
</style>