export default function useResponceProcessor(notifications) {
  function onSuccess(response) {
    notifications.success();
  }

  function onError(error) {
    notifications.error(
      error.response ? error.response.data.Message : error.toString()
    );
  }

  return [onSuccess, onError];
}
