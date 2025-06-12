import { services } from '@/config/services.config'

export interface Service {
    title: string
    status: 'Online' | 'Offline' | 'Maintenance'
    uptime: string
    version: string 
}

export const services: Service[] = [
  { title: 'AAS GUI',          status: 'Online',      uptime: '3 days', version: '2.0.0' },
  { title: 'Environment',      status: 'Online',      uptime: '2 days', version: '1.2.0' },
  { title: 'Registry',         status: 'Offline',     uptime: '1 day',  version: '1.0.0' },
  { title: 'Submodel Repo',    status: 'Maintenance', uptime: '5 days', version: '3.0.1' },
  { title: 'AAS Repository',   status: 'Online',      uptime: '4 days', version: '2.1.0' },
  { title: 'Cert Manager',     status: 'Online',      uptime: '6 days', version: '1.3.2' },
  { title: 'Logger',           status: 'Offline',     uptime: '2 hrs',  version: '1.0.5' },
  { title: 'Metrics Service',  status: 'Online',      uptime: '8 hrs',  version: '0.9.4' },
  { title: 'Alerting Engine',  status: 'Maintenance', uptime: '12 hrs', version: '2.2.0' },
]
