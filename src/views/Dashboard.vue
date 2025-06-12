<template>
  
  <div class="min-h-screen w-full bg-gradient-to-br from-white/40 to-blue-100 p-8">
    <!-- Header block -->
  <div
  class="rounded-2xl backdrop-blur bg-white/30 p-6 shadow max-w-xl mx-auto mt-4 mb-8 text-center"
  >
    <h2 class="text-xl font-bold">AAS Dataspace for Everybody</h2>
    <p class="text-sm">Tenant: Tenant 3</p>
    <p class="text-sm">Owner: Fraunhofer IESE</p>
  </div>

  <!--
    <div v-if="loading" class="text-center text-sm text-gray-500">Loading services...</div>
    <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
  -->

  <!-- Card grid -->
    <div class="grid grid-cols-3 gap-6 mt-8 w-full">
      <ServiceCard
        v-for="(service, i) in services"
        :key="i"
        v-bind="service"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
//import { computed } from 'vue'
import ServiceCard from "../components/ServiceCard.vue";
import { services } from "../config/services.config";
//import { useKubernetes } from '../composables/useKubernetes'

//const { services: liveServices, loading, error } = useKubernetes()

/*const servicesToShow = computed(() => 
  liveServices.value.length > 0 
    ? liveServices.value 
    : configServices
)*/
</script>


