<template>
    <div class="mx-auto w-[30rem] border border-black py-12 mt-20">
        <h2 class="font-roboto font-bold text-center text-2xl">Log In To Continue</h2>

        <div class="flex flex-col gap-y-4 mt-8 w-full justify-center">
            <ProviderButton class="mx-auto" providerName="Google" />
            <ProviderButton class="mx-auto" providerName="Facebook" />
            <ProviderButton class="mx-auto" providerName="Github" />
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: undefined,
    title: 'Log in - Organized Me',
})
</script>

<style></style>