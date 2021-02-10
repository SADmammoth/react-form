import { useState } from 'react';

export default function useNotifications(initConfig, notify) {
  const [config, setConfig] = useState(initConfig);
  const statuses = { success: 'success', error: 'error' };

  return [
    {
      success: () => {
        if (config.showNotifications === 'all') {
          notify(statuses.success);
        }
      },
      error: (error) => {
        console.trace();

        if (config.showNotifications !== 'hideAll') {
          notify(statuses.error, error);
        }
      },
    },
    setConfig,
  ];
}
