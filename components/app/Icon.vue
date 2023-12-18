<script lang="ts" setup>
import {Icon} from "~/types/icon";

const props = defineProps<{
	icon: string | Icon
}>()
</script>

<template>
	<svg :viewBox="props.icon === 'logo' ?'0 0 466 400' :'0 0 24 24'" fill="none"
		 height="24" stroke="currentColor"
		 stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
		 width="24"
		 xmlns="http://www.w3.org/2000/svg">
		<template v-if="props.icon === 'logo'">
			<path d="M300 0L0 4.82053e-06V100H100V400H200V100H300V0Z" fill="currentColor"/>
			<path clip-rule="evenodd"
				  d="M388.582 157.403C396.12 139.204 400 119.698 400 100H300C300 106.566 298.707 113.068 296.194 119.134C293.681 125.2 289.998 130.712 285.355 135.355C280.712 139.998 275.2 143.681 269.134 146.194C263.068 148.707 256.566 150 250 150L250 250C269.698 250 289.204 246.12 307.403 238.582C325.601 231.044 342.137 219.995 356.066 206.066C369.995 192.137 381.044 175.601 388.582 157.403Z"
				  fill="currentColor" fill-rule="evenodd"/>
			<path d="M350 400L300 300H415.5L465.5 400H350Z" fill="currentColor"/>
		</template>
		<template v-if="props.icon === 'arrow'">
			<line x1="7" x2="17" y1="17" y2="7"></line>
			<polyline points="7 7 17 7 17 17"></polyline>
		</template>
		<template v-if="props.icon === Icon.Moon">
			<path d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
		</template>
		<template v-if="props.icon === Icon.Sun">
			<circle cx="12" cy="12" r="4"></circle>
			<path d="M12 2v2"></path>
			<path d="M12 20v2"></path>
			<path d="m4.93 4.93 1.41 1.41"></path>
			<path d="m17.66 17.66 1.41 1.41"></path>
			<path d="M2 12h2"></path>
			<path d="M20 12h2"></path>
			<path d="m6.34 17.66-1.41 1.41"></path>
			<path d="m19.07 4.93-1.41 1.41"></path>
		</template>
		<template v-else>Wrong icon name</template>
	</svg>
</template>