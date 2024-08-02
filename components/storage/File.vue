<template>
    <div class="box-content w-32 cursor-pointer px-4 py-4 border space-y-2 hover:bg-gray-50">
        <a :href="`http://localhost:8080/api/storage/download/${file.id}`" target="_blank">
            <p class="text-sm line-clamp-1 border-b border-black pb-1">{{
                props.file.name }}</p>
        </a>
        <a :href="`http://localhost:8080/api/storage/download/${file.id}`" target="_blank"
          class="aspect-video block w-full">
            <img src="/file.png" class="w-full object-cover aspect-square" />
        </a>
        <div class="flex justify-between items-center">
            <a :href="`http://localhost:8080/api/storage/download/${file.id}`" target="_blank" class="text-xs">{{
                timeString }}</a>
            <IconWrapper class="px-0 py-1 flex items-center relative outline-none" @click="menuOpen = !menuOpen">
                <Icon name="ic:twotone-more-vert" />
                <div v-if="menuOpen"
                  class="absolute z-10 bg-gray-100 top-[-30px] left-[-50%] translate-y-[-50%] rounded py-1">
                    <div class="flex flex-col justify-center px-2 items-center text-xs">
                        <p class="hover:bg-gray-200 w-full px-4 py-2" @click="moveFile = {
                            object: {
                                type: 'file',
                                property: props.file
                            }
                        }">
                            Move</p>
                        <div class="border-t border-gray-700 w-full"></div>
                        <p class="hover:bg-gray-200 w-full px-4 py-2" @click="editFile = props.file">Edit</p>
                        <div class="border-t border-gray-700 w-full"></div>
                        <p class="hover:bg-gray-200 px-4 py-2" @click="deleteFile = props.file">Delete</p>
                    </div>
                </div>
            </IconWrapper>
        </div>
    </div>
    <!-- overlay -->
    <div v-if="menuOpen" class="fixed z-[1] w-screen h-screen overflow-hidden top-0 left-0 opacity-0"
      @click="menuOpen = false">
    </div>

    <MoveFileAndFolderDialog :object="moveFile.object"
      @close="moveFile.object.type = null; moveFile.object.property = null"
      @confirm="moveFile.object.type = null; emits('move')" @error="onError" />
    <EditFileDialog :file="editFile" @close="editFile = null" @confirm="editFile = null; emits('edit')" />
    <DeleteFileDialog :file="deleteFile" @close="deleteFile = null" @confirm="deleteFile = null; emits('delete')" />
</template>

<script lang="ts" setup>
import type { _File, FileOrFolder } from '~/utils/types/storage';


interface Props {
    file: _File;
    class?: string;
}

const emits = defineEmits(['move', 'edit', 'delete', "error"]);

const props = withDefaults(defineProps<Props>(), {
    class: '',
});

const menuOpen = ref(false);
const moveFile = ref<FileOrFolder>({
    object: {
        type: null,
        property: null
    }
});
const editFile = ref<_File | null>(null);
const deleteFile = ref<_File | null>(null);

let timeString: string;

if (new Date().getTime() - props.file.createdAt.getTime() < 1000 * 60 * 60 * 24) {
    timeString = 'Today, ';

    timeString += props.file.createdAt.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

} else {
    timeString = formatDateToISOFormatUsingLocaleTime(props.file.createdAt);
}

const onError = (message: string) => {
    emits('error', message);
}

</script>

<style></style>