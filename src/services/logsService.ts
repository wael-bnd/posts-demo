const sendLogsToAPI = async (username: string | null, logs: any[]) => {
  const apiUrl = 'https://dummyjson.com/http/200';
  if (!username) return;

  try {
    const payload = {
      username: username,
      data: logs,
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log('Logs sent successfully', payload);
    } else {
      console.error('Failed to send logs to API:', response.statusText);
    }
  } catch (error) {
    console.error('Error sending logs:', error);
  }
};
export {sendLogsToAPI};
