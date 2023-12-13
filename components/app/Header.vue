<script lang="ts" setup>
import {Icon} from "~/types/icon";
import {Theme} from "~/types/theme";
import {Lang} from "~/types/lang";

enum Toogle {
	Theme = 'theme',
	Lang = 'lang',
}

const theme = useTheme()
const iconState = ref<Icon>(theme.value === (Theme.Dark as Theme) ? Icon.Moon : Icon.Sun)

const lang = useLang()
const switchState = ref(lang.value !== Lang.Fr)

const toogle = async (event: Event, type: Toogle) => {
	const {currentTarget} = event
	const html = document.querySelector('html')

	const setValue = (value: Lang | Theme) => {
		html?.classList.add('page-leave-to')

		setTimeout(() => {
			if (type === Toogle.Theme) {
				theme.value = value as Theme
				iconState.value = value === Theme.Dark ? Icon.Moon : Icon.Sun
			} else if (type === Toogle.Lang) {
				lang.value = value as Lang
				switchState.value = !switchState.value
			}
			(currentTarget as HTMLInputElement).blur()
			html?.classList.remove('page-leave-to')
		}, 1000)
	}

	if (type === Toogle.Theme) {
		if (theme.value === (Theme.Dark as Theme)) {
			setValue(Theme.Light)
		} else {
			setValue(Theme.Dark)
		}
	} else if (type === Toogle.Lang) {
		if (lang.value === Lang.Fr) {
			setValue(Lang.En)
		} else {
			setValue(Lang.Fr)
		}
	}
}
</script>

<template>
	<header>
		<div class="cell">
		</div>
		<div class="cell name">
			<NuxtLink :aria-label="lang === Lang.Fr ? 'Retour à la page d\'accueil' : 'Back to homepage'" to="/">
				<AppIcon icon="logo"/>
				<span>Théo Rigé</span>
			</NuxtLink>
		</div>
		<div class="cell cell--desktop">
		</div>
		<div class="cell control">
			<button :aria-checked="switchState" class="control__lang" role="switch" type="button"
					@click.stop="toogle($event,Toogle.Lang)">
				<span :class="{current: lang === Lang.Fr}" class="control__lang_side">FR</span>
				<span class="control__lang_switch">
					<span></span>
				</span>
				<span :class="{current: lang === (Lang.En as Lang)}" class="control__lang_side">EN</span>
			</button>
			<button :aria-label="lang === Lang.Fr ? 'Changer le theme de couleurs' : 'Change color theme'"
					class="control__theme" type="button"
					@click.stop="toogle($event,Toogle.Theme)">
				<AppIcon :icon="iconState" aria-hidden="true"/>
			</button>
		</div>
		<div class="cell">
		</div>
	</header>
</template>

<style lang="scss">
header {
	display: contents;

	.cell {
		&.name, &.control {
			display: flex;
			align-items: center;
			font-size: 1.125rem;
			font-weight: 500;
			padding: space(2) var(--main-space);
		}

		&.name {
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

		&.control {
			justify-content: space-between;

			.control__lang {
				all: unset;
				display: flex;
				align-items: center;
				gap: space(4);
				cursor: pointer;

				&_side {
					@include transition(color);
					font-size: 1rem;
				}

				&_switch {
					display: block;
					width: space(12);
					padding: space(2);
					border-radius: space(4);
					border: 1px solid var(--accent);
					@include transition(border);

					span {
						display: block;
						width: space(3);
						height: space(3);
						border-radius: 50%;
						background: var(--primary);
						@include transition(transform);
					}
				}

				&:is(:hover, :focus, :focus-visible) {
					.control__lang_switch {
						border: 1px solid var(--primary);
					}
				}

				&[aria-checked="true"] {
					.control__lang_switch {
						span {
							transform: translateX(space(4) + 2);
						}
					}
				}
			}

			.control__theme {
				all: unset;
				height: space(6);
				cursor: pointer;
				@include transition(color);

				&:is(:hover, :focus, :focus-visible) {
					color: var(--primary);
					outline: none;
				}
			}
		}
	}
}

@media screen and (min-width: $md) {
	header {
		.cell {
			&.name {
				a span {
					display: block;
				}
			}

			&.control {
				.control__lang_side {
					font-size: 1.125rem;
				}
			}
		}
	}
}
</style>