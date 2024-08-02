<template>
    <li>
        <div class="text-sm flex items-center"
          :class="selectedFolder !== null && selectedFolder.id == folder.id ? 'bg-green-200' : ''">
            <template v-if="expanding">
                <IconWrapper class="hover:bg-transparent cursor-pointer" @click="emits('collapse', props.folder.id)">
                    <Icon name="ic:baseline-keyboard-arrow-down" />
                </IconWrapper>
            </template>
            <template v-else>
                <IconWrapper class="hover:bg-transparent cursor-pointer" @click="emits('expand', props.folder.id)">
                    <Icon name="ic:baseline-chevron-right" />
                </IconWrapper>
            </template>
            <div class="flex gap-x-2 cursor-pointer flex-1" @click="emits('select', props.folder.id)">
                <img src="/folder.png" class="aspect-square w-4" />
                <p>{{ folder.name }}</p>
            </div>
        </div>

        <div class="ml-6">
            <slot />
        </div>
    </li>
</template>

<script lang="ts" setup>
import type { Folder } from '~/utils/types/storage';

interface Props {
    folder: Folder;
    expanding: boolean;
    selectedFolder: Folder | null;
}

const props = defineProps<Props>();

const emits = defineEmits(["expand", "collapse", "select"]);
</script>

<style></style>