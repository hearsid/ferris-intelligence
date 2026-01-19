import { ModuleFederationConfig } from '@nx/module-federation';

const isDev = process.env['NX_MF_DEV_REMOTES'] === '1';

const config: ModuleFederationConfig = {
  name: 'shell',
  // In Dev, Nx handles the URLs automatically when NX_MF_DEV_REMOTES=1 is set.
  // In Prod, we manually point to the subfolders we will create later.
  remotes: isDev
    ? ['comingSoon', 'contactUs', 'landingPage']
    : [
        ['comingSoon', '/remotes/coming-soon/remoteEntry.js'],
        ['contactUs', '/remotes/contact-us/remoteEntry.js'],
        ['landingPage', '/remotes/landing-page/remoteEntry.js'],
      ],
};

export default config;
