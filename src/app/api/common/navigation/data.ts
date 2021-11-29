/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboards',
        subtitle: 'Responsável por exibir informações agendamentos, financeiro, etc...',
        type: 'group',
        classes: {
            title: 'color-navigation'
        },
        children: [
            {
                id: 'dashboard',
                title: 'Dashboard Principal',
                type: 'basic',
                icon: 'grid_view',
                link: '/dashboards/dashboard-principal',
                disabled: true,
                badge: {
                    title: 'EM BREVE',
                    classes: 'px-2.5 bg-teal-400 text-black rounded-full'
                }
            },
        ],
    },
    {
        id: 'divider',
        type: 'divider'
    },
    {
        id: 'operations',
        title: 'Operações',
        classes: {
            title: 'color-navigation'
        },
        subtitle: 'Responsável por cadastros de todas as funcionalidades do sistema',
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
                id: 'schedule',
                title: 'Agenda',
                type: 'basic',
                icon: 'event',
                link: '/operations/schedule',
            },
        ],
    },
    {
        id: 'divider',
        type: 'divider'
    },
    {
        id: 'auth',
        title: 'Autenticação',
        classes: {
            title: 'color-navigation'
        },
        subtitle: 'Responsável por rotinas específicas do usuário que influencia no uso do sistema',
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
                disabled: true,
                badge: {
                    title: 'EM BREVE',
                    classes: 'px-2.5 bg-teal-400 text-black rounded-full'
                },
            },
        ],
    },
];

export const compactNavigation: FuseNavigationItem[] = defaultNavigation;
export const futuristicNavigation: FuseNavigationItem[] = defaultNavigation;
export const horizontalNavigation: FuseNavigationItem[] = defaultNavigation;
