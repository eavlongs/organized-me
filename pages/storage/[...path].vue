<template>
    <PageWrapper>
        <div class="flex items-center gap-x-2">
            <NuxtLink to="/storage" class="font-bold text-xl mr-2">Storage</NuxtLink>
            <template v-if="path.length > 0">
                <template v-for="(p, i) in path">
                    <span v-if="i > 0" class="text-gray-500">{{ ">" }}</span>
                    <NuxtLink :to="'/storage/' + p.id" class="hover:underline">
                        {{ p.name }}
                    </NuxtLink>
                </template>
            </template>
        </div>

        <template v-if="loading || folders.length > 0">
            <div
              class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-y-4 gap-x-4 mt-4">
                <template v-for="folder in folders">
                    <Folder :folder="folder" @edit="forceRefresh = !forceRefresh"
                      @delete="forceRefresh = !forceRefresh" />
                </template>
            </div>
        </template>

        <template v-else>
            <p class="text-center mt-20">This folder is emtpy</p>
        </template>

        <CreateFolderButton @create="forceRefresh = !forceRefresh" />
    </PageWrapper>
</template>

<script lang="ts" setup>
import type { ApiResponse } from '~/utils/types/general';
import type { FolderMetaData, _File, GetFolderResponse, Folder } from '~/utils/types/storage';


definePageMeta({
    layout: "sidebar",
    title: 'Organized Me - Storage',
})

const route = useRoute();

const forceRefresh = ref(false)

watch(() => forceRefresh.value, () => {
    fetchData()
})

const path = ref<FolderMetaData[]>([])

const id = typeof route.params.path === 'string' ? "root" : (route.params.path.length > 1 ? null : route.params.path[0])

const folders = ref<FolderMetaData[]>([])
const files = ref<_File[]>([])
const folder = ref<Folder | null>(null)
const loading = ref(true)

async function fetchData() {
    try {
        const { data } = await useAPI<ApiResponse>(`/storage/folder/${id}`)
        folders.value = data.value.data!.folders
        files.value = data.value.data!.files
        folder.value = data.value.data!.folder as Folder | null;
        path.value = []
        path.value.push(...data.value.data!.parents)
        if (folder.value !== null) {
            path.value.push({
                id: folder.value.id,
                name: folder.value.name,
                userId: folder.value.userId,
                createdAt: folder.value.createdAt,
                updatedAt: folder.value.updatedAt,
            })
        }
        loading.value = false


        folders.value = folders.value.map(folder => {
            folder.createdAt = new Date(folder.createdAt)
            folder.updatedAt = new Date(folder.updatedAt)

            return folder
        })

        files.value = files.value.map(file => {
            file.createdAt = new Date(file.createdAt)
            file.updatedAt = new Date(file.updatedAt)

            return file
        })

    } catch (error) {
        console.error(error)
    }
}

onBeforeMount(() => {
    nextTick(() => {
        fetchData()
    })
})
</script>

<style></style>