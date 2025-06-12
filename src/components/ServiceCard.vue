<template>
    <div @click="expanded = !expanded" class="cursor-pointer">
        <div class="rounded-[24px] p-6 bg-white/20 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            ABC
            <div class="flex items-center justify-between">
                <h4 class="font-semibold">{{ title }}</h4>
                <ChevronDown :class="['w-5 h-5 transition-transform duration-300', expanded ? 'rotate-180' : '']"/>
            </div>
            <div>
                <span :class="{'bg-green-100 text-green-700': status ==='Online','bg-red-100 text-red-700': status ==='Offline','bg-yellow-100 text-yellow-700': status === 'Maintenance'}">
                    {{ status }}
                </span>
            </div>
            <div>
                <h4>{{ uptime }}</h4>
            </div>
            <div>
                <h4>{{ version }}</h4>
            </div>
        </div>
        <div class="flex justify-end gap-2 mt-4">
            <button title="Restart service" class="text-lg hover:scale-110 transition">
                <RefreshCw class="w-5 h-5 text-gray-800" />
            </button>
            <button title="View details" class="text-lg hover:scale-110 transition">
                <Info class="w-5 h-5 text-gray-800" />
            </button>
            <button title="Configure service" class="text-lg hover:scale-110 transition">
                <Settings class="w-5 h-5 text-gray-800" />
            </button>
        </div>
    </div>
    <Transition name="expand">
        <div v-if="expanded" class="mt-4">
            <Transition name="fade-slide" mode="out-in">
                <div :key="currentFace" class="mt-4 text-sm text-gray-700">
                    <!-- face #1 -->
                    <template v-if="faces[currentFace] === 'overview'">
                        <p>Statux: {{ status }}</p>
                        <p>Uptime: {{ uptime }}</p>
                        <p>Version: {{ version }}</p>
                    </template>
                    <!-- face #2 -->
                    <template v-else-if="faces[currentFace] === 'actions'">
                        <div class="flex justify-center gap-4">
                            <button title="Restart"><RefreshCw class="w-5 h-5"/></button>
                            <button title="Details"><Info class="w-5 h-5"/></button>
                            <button title="Setting"><Settings class="w-5 h-5"/></button>
                        </div>
                    </template>
                    <!-- face #3 -->
                    <template v-else-if="faces[currentFace] === 'metrics'">
                        <p>CPU Usage: 34%</p>
                        <p>Memory: 512 MB</p>
                        <p>Network I/O: 120 KB/s</p>
                    </template>
                </div>
            </Transition>
            <Transition :name="direction === 'right' ? 'slide-right' : 'slide-left'" mode="out-in">
                <div :key="currentFace" class="text-sm text-gray-700">
                    <div class="flex justify-between items-center mt-4">
                        <button @click.stop="prevFace()" :disabled="currentFace === 0">←</button>
                        <span class="text-sm">Page {{ currentFace + 1 }} / {{ faces.length }}</span>
                        <button @click.stop="nextFace()" :disabled="currentFace === faces.length -1" class="text-gray-500 hover:text-black disabled:opacity-30">→</button>
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