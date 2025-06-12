<template>
    <div @click="expanded = !expanded" class="cursor-pointer">
        <div :class="['rounded-3xl p-6 shadow-lg shadow-black/5 backdrop-blur-sm bg-white/30 flex flex-col h-[160px] transition-colors', backgroundClass]">
            <div class="flex items-center justify-between">
                <h4 class="font-semibold">{{ title }}</h4>
                <ChevronDown :class="['w-5 h-5 transition-transform duration-300', expanded ? 'rotate-180' : '']"/>
            </div>
            <div class="mt-2 flex items-center gap-4 text-xs">
                <div class="flex items-center gap-2">
                    <span :class="['w-2.5 h-2.5 rounded-full', statusColor]"></span>
                    <span class="text-sm font-medium text-gray-800">{{ status }}</span>
                </div>
                <span class="text-gray-600">Uptime: {{ uptime }}</span>
                <span class="text-gray-600">Version: {{ version }}</span>
            </div>
            <div class="flex justify-evenly items-center mt-auto pt-4">
                <button title="Restart service" class="w-10 h-10 rounded-full bg-white/40 hover:bg-white/60 shadow-md transition-all flex items-center justify-center">
                    <RefreshCw class="w-4 h-4 text-gray-700" />
                </button>
                <button title="View details" class="w-10 h-10 rounded-full bg-white/40 hover:bg-white/60 shadow-md transition-all flex items-center justify-center">
                    <Info class="w-4 h-4 text-gray-700" />
                </button>
                <button title="Configure service" class="w-10 h-10 rounded-full bg-white/40 hover:bg-white/60 shadow-md transition-all flex items-center justify-center">
                    <Settings class="w-4 h-4 text-gray-700" />
                </button>
            </div>
        </div>
    <Transition name="expand">
        <div v-if="expanded" class="mt-4">
            <Transition name="fade-slide" mode="out-in">
                <div :key="currentFace" class="mt-4 text-sm text-gray-700">
                    <!-- face #1 -->
                    <template v-if="faces[currentFace].id === 'overview'">
                        <p>Status: {{ status }}</p>
                        <p>Uptime: {{ uptime }}</p>
                        <p>Version: {{ version }}</p>
                    </template>
                    <!-- face #2 -->
                    <template v-else-if="faces[currentFace].id === 'actions'">
                        <div class="flex justify-center gap-4">
                            <button title="Restart"><RefreshCw class="w-5 h-5"/></button>
                            <button title="Details"><Info class="w-5 h-5"/></button>
                            <button title="Settings"><Settings class="w-5 h-5"/></button>
                        </div>
                    </template>
                    <!-- face #3 -->
                    <template v-else-if="faces[currentFace].id === 'metrics'">
                        <p>CPU Usage: 34%</p>
                        <p>Memory: 512 MB</p>
                        <p>Network I/O: 120 KB/s</p>
                    </template>
                </div>
            </Transition>
            <Transition :name="direction === 'right' ? 'slide-right' : 'slide-left'" mode="out-in">
                <div :key="currentFace" class="text-sm text-gray-700">
                    <div class="flex justify-between items-center mt-4">
                        <button @click.stop="prevFace()" :disabled="currentFace === 0" class="px-2 py-1 rounded-md hover:bg-white/30 disabled:opacity-30">←</button>
                        <div class="flex gap-1">
                            <span v-for="(face, idx) in faces" :key="idx" class="w-2 h-2 rounded-full" :class="idx === currentFace ? 'bg-gray-800' : 'bg-gray-400/50'"></span>
                        </div>
                        <button @click.stop="nextFace()" :disabled="currentFace === faces.length -1" class="px-2 py-1 rounded-md hover:bg-white/30 disabled:opacity-30">→</button>
                    </div>
                </div>
            </Transition>
        </div>
    </Transition>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { RefreshCw, Info, Settings, ChevronDown } from 'lucide-vue-next'
import type {Service} from '../config/Service'

const props = defineProps<Service>()
// destructed props for easier access
const {title, status, uptime, version} = props

const backgroundClass = computed(() => {
    if (status === 'Online') return 'bg-green-50'
    if (status === 'Offline') return 'bg-red-50'
    return 'bg-yellow-50'
})

const statusColor = computed(() => {
    if (status === 'Online') return 'bg-green-500'
    if (status === 'Offline') return 'bg-red-500'
    return 'bg-yellow-400'
})
// State for expand/collapse and face index
const expanded = ref(false)
const currentFace = ref(0)
// Array of faces to switch between by key
const faces = [
    { id: 'overview', label: 'Overview' },
    { id: 'actions', label: 'Actions' },
    { id: 'metrics', label: 'Metrics' },
]
// For face navigation slide effect
const direction = ref<'left' | 'right'>('right')

function prevFace() {
    direction.value = 'left'
    currentFace.value--
}
function nextFace() {
    direction.value = 'right'
    currentFace.value++
}

</script>
<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: scaleY(0.95);
}
/* slide right: new content comes from the right */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-right-enter-from {
  transform: translateX(20px);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
/* slide left: new content comes from the left */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-left-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
/* expand/collapse effect */
.expand-enter-active,
.expand-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-origin: top;
}
.expand-enter-from,
.expand-leave-to {
  transform: scaleY(0);
  opacity: 0;
}
</style>