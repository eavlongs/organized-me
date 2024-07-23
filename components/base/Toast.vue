<template>
    <div role="alert" class="fixed bottom-4 right-4 flex px-4 py-4 text-sm rounded-lg font-regular"
      :class="{ 'text-white bg-gray-700': props.type === 'neutral', 'text-white bg-green-700': props.type === 'success', 'text-white bg-red-700': props.type === 'error' }"
      data-dismissible="alert">
        <div class="mr-12 ">{{ props.message }}</div>
        <button data-dismissible-target="alert" @click="onClose"
          class="!absolute top-[14px] right-3 h-6 max-h-[24px] w-6 max-w-[24px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button">
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  class="w-6 h-6" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </span>
        </button>
    </div>
</template>

<script lang="ts" setup>
import type { ToastProperty } from '~/utils/types/general';

const emits = defineEmits(["close"]);

const props = withDefaults(defineProps<ToastProperty>(), {
    type: "neutral",
});

const onClose = () => {
    emits("close");
};
</script>

<style></style>