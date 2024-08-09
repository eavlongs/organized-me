<template>

    <div class="block border border-gray-400 max-h-[15rem] w-[250px] rounded cursor-pointer hover:bg-gray-50">

        <NuxtLink :to="`/tracker/${tracker.id}`">
            <img :src="tracker.imgUrl ? tracker.imgUrl : 'default.png'"
              class="w-[250px] h-[150px] object-cover p-1 outline-none" />

        </NuxtLink>
        <div class="relative pb-4 px-2">
            <NuxtLink :to="`/tracker/${tracker.id}`">
                <p class="font-semibold mb-2 pr-2">{{ tracker.title }}</p>
                <p class="text-sm">{{ tracker.description }}</p>
            </NuxtLink>
            <div class="absolute right-1 top-0">
                <IconWrapper class="px-0 py-1 flex items-center relative outline-none" @click="menuOpen = !menuOpen">
                    <Icon name="ic:twotone-more-vert" :size="20" />
                    <div v-if="menuOpen"
                      class="absolute z-10 bg-gray-100 top-[-30px] left-[-50%] translate-y-[-50%] rounded py-1">
                        <div class="flex flex-col justify-center px-2 items-center text-xs">
                            <p class="hover:bg-gray-200 w-full px-4 py-2" @click="editTracker = tracker">Edit</p>
                            <div class="border-t border-gray-700 w-full"></div>
                            <p class="hover:bg-gray-200 px-4 py-2" @click="deleteTracker = tracker">Delete</p>
                        </div>
                    </div>
                </IconWrapper>
            </div>
        </div>
        <!-- overlay -->
        <div v-if="menuOpen" class="fixed z-[1] w-screen h-screen overflow-hidden top-0 left-0 opacity-0"
          @click="menuOpen = false">
        </div>
    </div>

    <EditTrackerDialog :tracker="editTracker" @close="editTracker = null" @confirm="editTracker = null; emits('edit')"
      @error="onError" />
    <DeleteTrackerDialog :tracker="deleteTracker" @close="deleteTracker = null"
      @confirm="deleteTracker = null; emits('delete')" @error="onError" />
</template>

<script lang="ts" setup>
import type { Tracker } from '~/utils/types/tracker';

interface Props {
    tracker: Tracker
}
const props = defineProps<Props>()
const emits = defineEmits(["edit", "delete", "error"])
const menuOpen = ref(false)
const editTracker = ref<Tracker | null>(null)
const deleteTracker = ref<Tracker | null>(null)

const onError = (message: string) => {
    emits("error", message)
}

</script>

<style></style>