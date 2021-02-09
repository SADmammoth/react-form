export default function useResponceProcessor(notifications) {
  function onSuccess(response) {
    notifications.success('Success', 'Data sent and accepted by server');
  }

  function onError(error) {
    notifications.error(
      'Server error',
      error.response ? error.response.data.Message : error.toString()
    );
  }

  return [onSuccess, onError];
}
