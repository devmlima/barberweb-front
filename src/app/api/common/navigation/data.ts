/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboards',
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: 'Dashboard Principal',
                type: 'basic',
                icon: 'grid_view',
                link: '/dashboards/dashboard-principal',
            },
        ],
    },
    {
        id: 'operations',
        title: 'Operações',
        type: 'group',
        children: [
            {
                id: 'client',
                title: 'Clientes',
                type: 'basic',
                icon: 'groups',
                link: '/operations/client',
            },
            {
                id: 'services',
                title: 'Serviços',
                type: 'basic',
                icon: 'design_services',
                link: '/operations/services',
            },
            {
                id: 'schedules',
                title: 'Agenda',
                type: 'basic',
                icon: 'event',
                link: '/operations/schedules',
            },
        ],
    },
    {
        id: 'auth',
        title: 'Autenticação',
        type: 'group',
        children: [
            {
                id: 'users',
                title: 'Usuários',
                type: 'basic',
                icon: 'person',
                link: '/authentication/user',
            },
            {
                id: 'profile',
                title: 'Perfil',
                type: 'basic',
                icon: 'perm_contact_calendar',
                link: '/authentication/profile',
            },
        ],
    },
];

export const compactNavigation: FuseNavigationItem[] = defaultNavigation;
export const futuristicNavigation: FuseNavigationItem[] = defaultNavigation;
export const horizontalNavigation: FuseNavigationItem[] = defaultNavigation;
