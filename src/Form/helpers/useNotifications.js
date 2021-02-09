import { useState } from 'react';

import notify from '../../helpers/formHelpers/notify';

export default function useNotifications(initConfig) {
  const [config, setConfig] = useState(initConfig);

  return [
    {
      success: (title, message) => {
        if (config.showNotifications === 'all') {
          notify('success', title, message);
        }
      },
      error: (title, message) => {
        console.trace();

        if (config.showNotifications !== 'hideAll') {
          notify('error', title, message);
        }
      },
    },
    setConfig,
  ];
}
