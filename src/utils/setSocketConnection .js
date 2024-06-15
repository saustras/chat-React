export const setSocketConnection = (socket) => {
    return {
      type: 'SET_SOCKET_CONNECTION',
      payload: {
        id: socket.id,
        connected: socket.connected,
      },
    };
  };
  