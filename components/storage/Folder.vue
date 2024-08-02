<template>
    <div class="box-content w-32 cursor-pointer px-4 py-4 border space-y-2 hover:bg-gray-50">
        <NuxtLink :to="'/storage/' + props.folder.id">
            <p class="text-sm line-clamp-1 border-b border-black pb-1">{{
                props.folder.name }}</p>
        </NuxtLink>
        <NuxtLink :to="'/storage/' + props.folder.id" class="aspect-video block w-full">
            <img src="/folder.png" class="w-full" />
        </NuxtLink>
        <div class="flex justify-between items-center">
            <NuxtLink :to="'/storage/' + props.folder.id" class="text-xs">{{ timeString }}</NuxtLink>
            <IconWrapper class="px-0 py-1 flex items-center relative outline-none" @click="menuOpen = !menuOpen">
                <Icon name="ic:twotone-more-vert" />
                <div v-if="menuOpen"
                  class="absolute z-10 bg-gray-100 top-[-30px] left-[-50%] translate-y-[-50%] rounded py-1">
                    <div class="flex flex-col justify-center px-2 items-center text-xs">
                        <p class="hover:bg-gray-200 w-full px-4 py-2" @click="editFolder = props.folder">Edit</p>
                        <div class="border-t border-gray-700 w-full"></div>
                        <p class="hover:bg-gray-200 px-4 py-2" @click="deleteFolder = props.folder">Delete</p>
                    </div>
                </div>
            </IconWrapper>
        </div>
    </div>
    <!-- overlay -->
    <div v-if="menuOpen" class="fixed z-[1] w-screen h-screen overflow-hidden top-0 left-0 opacity-0"
      @click="menuOpen = false">
    </div>

    <EditFolderDialog :folder="editFolder" @close="editFolder = null" @confirm="editFolder = null; emits('edit')" />
    <DeleteFolderDialog :folder="deleteFolder" @close="deleteFolder = null"
      @confirm="deleteFolder = null; emits('delete')" />
</template>

<script lang="ts" setup>
import type { Folder } from '~/utils/types/storage';


interface Props {
    folder: Folder;
    class?: string;
}

const emits = defineEmits(['edit', 'delete']);

const props = withDefaults(defineProps<Props>(), {
    class: '',
});

const menuOpen = ref(false);
const editFolder = ref<Folder | null>(null);
const deleteFolder = ref<Folder | null>(null);

let timeString: string;

if (new Date().getTime() - props.folder.createdAt.getTime() < 1000 * 60 * 60 * 24) {
    timeString = 'Today, ';

    timeString += props.folder.createdAt.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

} else {
    timeString = formatDateToISOFormatUsingLocaleTime(props.folder.createdAt);
}

</script>

<style></style>