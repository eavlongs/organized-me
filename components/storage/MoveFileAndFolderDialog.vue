<template>
    <Dialog @close="onClose" @confirm="handleSubmit"
      :open="props.object.type !== null && props.object.property !== null"
      :title="props.object?.type == 'file' ? 'Move File' : 'Move Folder'">
        <FolderList class="max-h-[25rem] max-w-[40rem]" :allFolders="folders" :rootFolder="rootFolder"
          :expandingFolderIDs="expandingFolderIDs" :folders="rootFolders" @expand="expandFolder"
          @collapse="collapseFolder" @select="selectFolder" :selectedFolder="selectedFolder" />
    </Dialog>
</template>

<script lang="ts" setup>
import type { ApiResponse } from '~/utils/types/general';
import type { _File, FileOrFolder, Folder } from '~/utils/types/storage';

const emits = defineEmits(['close', 'confirm', "error"]);

const props = defineProps<FileOrFolder>();

const expandedFolderIDs = ref<string[]>([]);
const expandingFolderIDs = ref<string[]>([]);
const selectedFolder = ref<Folder | null>(null);
const rootFolders = ref<Folder[]>([]);
const folders = ref<Folder[]>([]);
const { $api } = useNuxtApp()

const rootFolder: Folder = { id: "root", name: "Storage" } as Folder

watch(expandedFolderIDs.value, () => {
    fetchData()
})

watch(props.object, () => {
    if (props.object) {
        expandedFolderIDs.value = []
        expandingFolderIDs.value = []
        fetchData()
    }
})

const onClose = () => {
    emits("close")
}

const handleSubmit = async () => {
    if (props.object.type == null || props.object.property == null) {
        emits('error', "Something went wrong. Please try again")
        return
    };

    if (!selectedFolder) {
        emits('error', "Please select a folder")
        return
    }

    const id = props.object.property.id;
    const folderId = selectedFolder.value?.id;
    const route = `/storage/${props.object.type}/move`

    try {
        const response = await $api<ApiResponse>(route, {
            method: "PATCH",
            body: JSON.stringify({ id, folderId })
        })

        if (response.success) {
            emits('confirm');
            return
        }

        if (response.error) {
            throw new Error(Object.values(response.error)[0])
        }

        throw new Error(props.object.type === "file" ? "Failed to move file" : "Failed to move folder")
    } catch (err: any) {
        emits('error', err.message)
    }
}

const fetchData = async () => {
    const ids = encodeURIComponent(expandedFolderIDs.value.join(","));
    try {
        const response = await $api<ApiResponse>("/storage/folder/expandable?ids=" + ids);

        if (response.success) {
            rootFolders.value = response.data!.rootFolders;
            folders.value = response.data!.folders;

            return
        }

        if (response.error) {
            throw new Error(Object.values(response.error)[0])
        }

        throw new Error("Failed to fetch folders")
    } catch (err: any) {
        emits('error', err.message)
    }
}

const expandFolder = (id: string) => {
    if (!expandedFolderIDs.value.includes(id)) {
        expandedFolderIDs.value.push(id)
    }
    if (!expandingFolderIDs.value.includes(id)) {
        expandingFolderIDs.value.push(id)
    }
}

const collapseFolder = (id: string) => {
    const index = expandingFolderIDs.value.indexOf(id)
    if (index !== -1) {
        expandingFolderIDs.value.splice(index, 1)
    }
}

const selectFolder = async (id: string) => {
    selectedFolder.value = rootFolders.value.concat(folders.value).concat(rootFolder).find(folder => folder.id === id) || null
    if (!selectedFolder.value) {
        emits('error', "Failed to select folder")
        return
    }
}

onBeforeMount(() => {
    nextTick(() => {
        fetchData()
    })
})
</script>

<style></style>