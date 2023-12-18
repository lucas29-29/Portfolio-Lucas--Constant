<script lang="ts" setup>
import {Legal} from "~/types/pages/legal";

const {path} = useRoute()
const lang = useLang()

useHead({
	link: [{
		rel: 'canonical',
		href: 'https://rigetheo.netlify.app' + path
	}]
})

const {data: content} = await useAsyncData('legal', () => queryContent<Legal>().where({
	_path: path,
	_locale: lang.value
}).findOne(), {watch: [() => lang.value]})

useSeoMeta({
	title: content.value!.title,
	description: content.value!.description,
})
</script>

<template>
	<div id="legal" class="page">
		<AppEffect/>
		<AppHeader/>
		<main>
			<AppSection id="about__description">
				<div class="cell cell--triple-column content">
					<ContentRenderer :value="content" class="content"/>
				</div>
			</AppSection>
		</main>
		<AppFooter/>
	</div>
</template>

<style lang="scss">
#legal {
	grid-template-rows: space(20) auto space(20);

	.content {
		display: flex;
		flex-direction: column;
		gap: 24px;

		p {
			strong {
				font-weight: 500;
			}
		}

		a {
			color: var(--primary);
			text-decoration: underline;
			text-decoration-color: var(--background);
			text-underline-offset: 4px;
			transition: text-decoration-color 0.2s ease-in-out;

			&:is(:hover, :focus, :focus-visible) {
				text-decoration-color: var(--primary);
			}
		}
	}
}
</style>