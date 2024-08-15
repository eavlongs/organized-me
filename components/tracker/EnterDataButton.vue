<template>
    <Button @click="open = true" class="fixed bottom-10 right-10 z-10">Enter New Data</Button>
    <EnterDataDialog :open="open" :tracker="tracker" @close="open = false" @confirm="open = false; emits('create')" />
</template>

<script lang="ts" setup>
import type { Tracker } from '~/utils/types/tracker';

const open = ref(false)
interface Props {
    tracker: Tracker | null
}

const props = defineProps<Props>()
const emits = defineEmits(["create"])

</script>

<style></style>