export interface ContainerView {
    id: string
    ports: string
    mounts: string
}

export interface Service {
    title: string;
    status: 'Online' | 'Offline' | 'Maintenance';
    uptime: string;
    version: string;
    containers?: ContainerView[] // list of details
}
