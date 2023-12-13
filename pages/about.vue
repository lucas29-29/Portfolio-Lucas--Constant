<script lang="ts" setup>
import {About} from "~/types/pages/about";

const {path} = useRoute()
const lang = useLang()

useHead({
	link: [{
		rel: 'canonical',
		href: 'https://rigetheo.netlify.app' + path
	}]
})

const {data: content} = await useAsyncData('about', () => queryContent<About>().where({
	_path: path,
	_locale: lang.value
}).findOne(), {watch: [() => lang.value]})

useSeoMeta({
	title: content.value!.title,
	description: content.value!.description,
})
</script>

<template>
	<div id="about" class="page">
		<AppEffect/>
		<AppHeader/>

		<main>
			<AppSection id="about__description">
				<div class="cell cell--triple-column content">
					<h2>{{ content!.title }}</h2>
					<ContentRenderer :value="content" class="content"/>
				</div>
			</AppSection>
			<AppSection id="about__experiences">
				<div class="cell cell--triple-column content">
					<h2>{{ content!.experience }}</h2>
					<LinkExperience v-for="experience in content!.experiences" :experience="experience"/>
				</div>
			</AppSection>
		</main>

		<AppFooter/>
	</div>
</template>

<style lang="scss">
#about {
	grid-template-rows: space(20) repeat(2, auto) space(20);

	&__description {
		H2 {
			text-transform: uppercase;
		}

		.content {
			display: flex;
			flex-direction: column;
			gap: 24px;
		}
	}
}
</style>