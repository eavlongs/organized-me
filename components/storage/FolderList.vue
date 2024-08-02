<template>
    <ul :class="computedClass">
        <template v-if="rootFolder !== null">
            <FolderListItem :folder="rootFolder" @select="selectFolder" :selectedFolder="selectedFolder"
              :expanding="true">
                <FolderList :allFolders="allFolders" :selectedFolder="selectedFolder" :folders="folders"
                  :expandingFolderIDs="expandingFolderIDs" @expand="expandFolder" @collapse="collapseFolder"
                  @select="selectFolder" :isRoot="false" />
            </FolderListItem>
        </template>
        <template v-else v-for="folder in folders" :key="folder.id">
            <FolderListItem :folder="folder" @expand="expandFolder" @collapse="collapseFolder" @select="selectFolder"
              :selectedFolder="selectedFolder" :expanding="expandingFolderIDs.includes(folder.id)">
                <template v-if="expandingFolderIDs.includes(folder.id)">
                    <FolderList :allFolders="allFolders" :selectedFolder="selectedFolder"
                      :folders="allFolders.filter(_folder => _folder.parentId == folder.id)"
                      :expandingFolderIDs="expandingFolderIDs" @expand="expandFolder" @collapse="collapseFolder"
                      @select="selectFolder" :isRoot="false" />
                </template>
            </FolderListItem>
        </template>
    </ul>
</template>

<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';
import type { Folder } from '~/utils/types/storage';

interface Props {
    folders: Folder[];
    allFolders: Folder[];
    expandingFolderIDs: string[];
    class?: string;
    selectedFolder: Folder | null;
    rootFolder?: Folder | null;
}

const props = withDefaults(defineProps<Props>(), {
    class: "",
    rootFolder: null
});

const computedClass = computed(() => twMerge("overflow-auto", props.class));

const emits = defineEmits(["expand", "collapse", "select"]);

const selectFolder = (id: string) => {
    emits("select", id);
}

const expandFolder = (id: string) => {
    emits("expand", id);
}

const collapseFolder = (id: string) => {
    emits("collapse", id);
}
</script>

<style></style>