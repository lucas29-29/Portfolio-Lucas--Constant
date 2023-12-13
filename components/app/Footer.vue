<script lang="ts" setup>
import {Lang} from "~/types/lang";

const lang = useLang()

const {data: links} = await useAsyncData('links', () => queryContent('/').where({
	_path: {$in: ['/about', '/legal']},
	_locale: lang.value
}).find(), {watch: [() => lang.value]})
</script>

<template>
	<footer>
		<div class="cell">
		</div>
		<div class="cell name">
			<NuxtLink :aria-label="lang === Lang.Fr ? 'Retour à la page d\'accueil' : 'Back to homepage'" to="/">
				<AppIcon icon="logo"/>
				<span>Théo Rigé</span>
			</NuxtLink>
		</div>
		<div class="cell  links">
			<NuxtLink v-for="link in links" :key="link._path" :to="link._path">
				{{ link.title }}
			</NuxtLink>
		</div>
		<div class="cell date cell--desktop">
			2023
		</div>
		<div class="cell">
		</div>
	</footer>
</template>

<style lang="scss">
footer {
	display: contents;

	.cell {
		&.name, &.links, &.date {
			align-items: center;
			font-size: 1.125rem;
			font-weight: 500;
			padding: space(2) var(--main-space);

			&:not(.cell--desktop) {
				display: flex;
			}
		}

		&.name {
			justify-content: flex-start;

			a {
				display: flex;
				align-items: center;
				gap: space(4);
				@include transition(color);

				span {
					display: none;
				}

				&:is(:hover, :focus, :focus-visible) {
					color: var(--primary);
					outline: none;
				}
			}
		}

		&.links {
			justify-content: space-between;

			a {
				font-size: 0.875rem;
				@include transition(color);

				&:is(:hover, :focus, :focus-visible) {
					color: var(--primary);
					outline: none;
				}
			}
		}

		&.date {
			justify-content: flex-end;
		}
	}
}

@media screen and (min-width: $md) {
	footer {
		.cell {
			&.name {
				a span {
					display: block;
				}
			}

			&.links a {
				font-size: 1.125rem;
			}
		}
	}
}
</style>