import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function useSocket() {
  const [socket, setSocket] = useState(null);
  const token = useSelector((state) => state.auth.data?.token);
  useEffect(() => {
    if (!token) {
      return;
    }
    //only if socket does not exists yet and token exists
    if (!socket && token) {
      const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
        extraHeaders: {
          authorization: `bearer ${token}`,
        },
        reconnection: true, // Enable automatic reconnection
        reconnectionAttempts: Infinity, // Attempt to reconnect forever
        reconnectionDelay: 1000, // Start with 1 second delay
        reconnectionDelayMax: 5000, // Maximum delay of 5 seconds
      });
      if (newSocket) {
        setSocket(newSocket);
      }

      newSocket.on("connect", () => {
        const currentDate = new Date();
        console.log("connected to socket", currentDate.toLocaleTimeString());
      });

      newSocket.on("connect_error", () => {
        console.log("socket connection error" + new Date());
      });

      newSocket.on("disconnect", () => {
        const currentDate = new Date();
        console.log(
          "disconnected from socket",
          currentDate.toLocaleTimeString()
        );
      });
    }
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [token, socket]);

  useEffect(() => {
    //reload page every  minute if socket is not connected
    let intervalId;
    intervalId = setInterval(() => {
      if (!socket?.connected || !socket) {
        window.location.reload();
      }
    }, 60000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [socket]);

  return socket;
}

export default useSocket;
