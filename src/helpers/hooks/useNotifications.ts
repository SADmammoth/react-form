import { useState } from 'react';
import {
  NotificationStatus,
  NotificationsVisibility,
  NotifyCallback,
} from '../types/basic';

export interface NotificationsConfig {
  showNotifications?: NotificationsVisibility;
}

export default function useNotifications(
  initConfig: NotificationsConfig,
  notify: NotifyCallback,
) {
  const [config, setConfig] = useState(initConfig);

  return [
    {
      success: () => {
        if (config.showNotifications === 'all') {
          notify(NotificationStatus.Success);
        }
      },
      error: (error: unknown) => {
        if (config.showNotifications !== 'hideAll') {
          notify(NotificationStatus.Error, error);
        }
      },
    },
    setConfig,
  ];
}
