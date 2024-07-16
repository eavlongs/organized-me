<template>
    <a :href="href">
        <button :class="computedClass">
            <template v-if="props.providerName === 'Google'">
                <img src="/public/google-logo.svg" alt="Google Logo" class="w-7 aspect-square" />
            </template>
            <template v-else-if="props.providerName === 'Facebook'">
                <img src="/public/facebook-logo.svg" alt="Google Logo" class="w-7 aspect-square" />
            </template>
            <template v-else-if="props.providerName === 'Github'">
                <img src="/public/github-logo.svg" alt="Google Logo" class="w-7 aspect-square" />
            </template>
            Continue With {{ props.providerName }}
        </button>
    </a>
</template>

<script lang="ts" setup>
import { twMerge } from 'tailwind-merge'
interface Props {
    providerName: "Google" | "Facebook" | "Github";
    class?: string
    href: string
}

const props = withDefaults(defineProps<Props>(), {
    class: ""
})

const defaultBtnClas = "w-72 px-3 py-2 flex gap-x-2 items-center font-semibold justify-center bg-white rounded-lg border border-black shadow-sm text-base hover:bg-gray-200"

const computedClass = computed(() => {
    return twMerge(defaultBtnClas, props.class)
})


</script>

<style></style>