import { ref, onMounted } from 'vue'
import type { Service } from '@/config/services.config'
import { loadConfigFromFile } from 'vite'


export function useKubernetes(){

    // reactive states
    const liveServices = ref<Service[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    
    //fake async fetch function
    async function fetchServices() {
        loading.value = true
        error.value = null
    
        try {
            //simulate delay and static data for now
            await new Promise((r) => setTimeout(r,800))
    
            liveServices.value = [
                {
                    title: 'AAS GUI',
                    status: 'Online',
                    uptime: '3 days',
                    version: '2.0.0',
                },
                { 
                    title: 'Registry',
                    status: 'Offline',
                    uptime: '1 day',
                    version: '1.1.0',
                },
                {
                    title: 'Submodel Repo',
                    status: 'Maintenance',
                    uptime: '5 days',
                    version: '2.2.1',
                },
            ]
        } catch (err) {
            error.value = 'Failed to load live services'
        } finally {
            loading.value = false
        }
    }
    
    //fetch on mount
    onMounted(fetchServices)
    
     
    return {
        liveServices,
        loading,
        error,
        fetchServices,
    }
}

