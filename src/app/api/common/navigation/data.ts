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
            {
                id: 'cutsMade',
                title: 'Realizados',
                type: 'basic',
                icon: 'done',
                link: '/operations/cutsMade',
            },
        ],
    },
    {
        id: 'divider',
        type: 'divider'
    },
    {
        id: 'report',
        title: 'Relatórios',
        classes: {
            title: 'color-navigation'
        },
        subtitle: 'Relatórios da barbearia',
        type: 'group',
        children: [
            {
                id: 'client',
                title: 'Rel. Clientes',
                type: 'basic',
                icon: 'groups',
                link: '/report/client',
            },
            {
                id: 'services',
                title: 'Rel. Serviços Realizados',
                type: 'basic',
                icon: 'design_services',
                link: '/report/service',
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
            },
        ],
    },
];

export const compactNavigation: FuseNavigationItem[] = defaultNavigation;
export const futuristicNavigation: FuseNavigationItem[] = defaultNavigation;
export const horizontalNavigation: FuseNavigationItem[] = defaultNavigation;
