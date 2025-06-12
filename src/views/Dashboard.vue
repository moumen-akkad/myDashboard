<template>
  
  <div class="h-full w-full bg-gradient-to-br from-white/40 to-blue-100 p-4">
    <!-- Header block -->
    <div
    class="max-w-3xl mx-auto rounded-3xl bg-white/40 backdrop-blur-sm p-6 md:p-10 shadow-lg shadow-black/5 text-center mt-4 mb-10"
    >
    <h2 class="text-xl font-bold mb-2">AAS Dataspace for Everybody</h2>
    <p class="text-sm flex justify-center items-center gap-2">
      <Building class="w-4 h-4" />
      <span>Tenant: Tenant 3</span>
    </p>
    <p class="text-sm flex justify-center items-center gap-2 mt-1">
      <CircleUser class="w-4 h-4" />
      <span>Owner: Fraunhofer IESE</span>
    </p>
  </div>

  <!--
    <div v-if="loading" class="text-center text-sm text-gray-500">Loading services...</div>
    <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
  -->

  <!-- Card grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 max-w-screen-xl mx-auto">
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
import { Building, CircleUser } from 'lucide-vue-next';
//import { useKubernetes } from '../composables/useKubernetes'

//const { services: liveServices, loading, error } = useKubernetes()

/*const servicesToShow = computed(() => 
  liveServices.value.length > 0 
    ? liveServices.value 
    : configServices
)*/
</script>


