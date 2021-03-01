import { AccountService } from '@app/_services';

export function appInitializer(accountService: AccountService) {
    return () => new Promise(resolve => {
        // Try to refresh the token on application launch to provide automatic authentication
        accountService.refreshToken()
            .subscribe()
            .add(resolve);
    });
}
