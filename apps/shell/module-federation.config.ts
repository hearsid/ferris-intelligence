import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shell',
  // In Dev, Nx handles the URLs automatically.
  // In Prod, we manually point to the subfolders we will create later.
  remotes: [
    ['comingSoon', '/remotes/coming-soon/remoteEntry.js'],
    ['contactUs', '/remotes/contact-us/remoteEntry.js'],
  ],
};

export default config;
