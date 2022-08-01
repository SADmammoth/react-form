import { UseNotificationsResult } from '../types/basic';

export default function useResponceProcessor(
  notifications: UseNotificationsResult,
): [() => void, (error: any) => void] {
  function onSuccess() {
    notifications.success();
  }

  function onError(error: any) {
    notifications.error(
      error.response ? error.response.data.Message : error.toString(),
    );
  }

  return [onSuccess, onError];
}
