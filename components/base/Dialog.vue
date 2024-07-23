<!-- https://www.material-tailwind.com/docs/html/dialog#dialog-with-form?ref=devto -->
<template>
    <div v-if="props.open"
      class="fixed inset-0 z-[998] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 transition-opacity duration-300 cursor-pointer"
      @click="onClose">
    </div>
    <div v-if="props.open"
      class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[999] m-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white text-base leading-relaxed text-blue-gray-500 antialiased shadow-2xl pointer-events-auto">
        <div v-if="props.title !== ''"
          class="flex items-center p-4 text-xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">
            {{ props.title }}
        </div>
        <div class="px-4">
            <slot />
        </div>
        <div class="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
            <button @click="onClose"
              class="px-6 py-3 mr-1 text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer">
                Cancel
            </button>
            <button @click="onConfirm"
              class="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer">
                Confirm
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    open: boolean
    title?: string;
}

const props = withDefaults(defineProps<Props>(), {
    title: '',
});

const emits = defineEmits(['close', 'confirm'])

const onClose = () => {
    emits("close")
}

const onConfirm = () => {
    emits("confirm")
}
</script>

<style></style>