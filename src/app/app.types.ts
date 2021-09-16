import { FuseNavigationItem } from '@fuse/components/navigation';
import { User } from 'app/core/user/user.model';

export interface InitialData
{
    navigation: {
        compact: FuseNavigationItem[];
        default: FuseNavigationItem[];
        futuristic: FuseNavigationItem[];
        horizontal: FuseNavigationItem[];
    };
    user: User;
}
