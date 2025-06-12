<template>
    <div @click="expanded = !expanded" class="cursor-pointer">
        <div class="rounded-2xl p-6 bg-white/60 backdrop-blur-md shadow-lg flex flex-col justify-between min-h-[160px]">
            <div class="flex items-center justify-between">
                <h4 class="font-semibold">{{ title }}</h4>
                <ChevronDown :class="['w-5 h-5 transition-transform duration-300', expanded ? 'rotate-180' : '']"/>
            </div>
            <div class="mt-2 flex items-center gap-2 text-xs">
                <span class="px-2 py-0.5 rounded-full font-medium"
                    :class="{'bg-green-100 text-green-700': status === 'Online',
                             'bg-red-100 text-red-700': status === 'Offline',
                             'bg-yellow-100 text-yellow-700': status === 'Maintenance'}">
                    {{ status }}
                </span>
                <span class="text-gray-600">Uptime: {{ uptime }}</span>
                <span class="text-gray-600">Version: {{ version }}</span>
            </div>
        </div>
        <div class="flex justify-between gap-4 mt-6">
            <button title="Restart service" class="p-2 rounded-lg border border-transparent bg-white/20 backdrop-blur hover:bg-white/30 transition-colors focus:outline-none">
                <RefreshCw class="w-5 h-5 text-gray-800" />
            </button>
            <button title="View details" class="p-2 rounded-lg border border-transparent bg-white/20 backdrop-blur hover:bg-white/30 transition-colors focus:outline-none">
                <Info class="w-5 h-5 text-gray-800" />
            </button>
            <button title="Configure service" class="p-2 rounded-lg border border-transparent bg-white/20 backdrop-blur hover:bg-white/30 transition-colors focus:outline-none">
                <Settings class="w-5 h-5 text-gray-800" />
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
import { ref } from 'vue'
import { RefreshCw, Info, Settings, ChevronDown } from 'lucide-vue-next'
import type {Service} from '../config/Service'

const props = defineProps<Service>()
// destructed props for easier access
const {title, status, uptime, version} = props 
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