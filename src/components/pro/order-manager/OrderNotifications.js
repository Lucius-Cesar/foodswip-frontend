"use client";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const orderNotifications = ({ newOrders }) => {
  console.log(newOrders);
  const audioRef = useRef(null);
  const playButtonRef = useRef(null);
  const pendingOrderAlert = useSelector(
    (state) => state.restaurantAdmin.data?.privateSettings?.pendingOrderAlert
  );

  const playOrderAlert = () => {
    if (newOrders.length > 0 && pendingOrderAlert?.enabled) {
      playButtonRef.current.click();
      window.navigator.vibrate([2000, 1000, 2000, 1000, 2000, 1000, 2000]);
    }
  };

  useEffect(() => {
    playOrderAlert();
    const intervalId = setInterval(() => {
      playOrderAlert();
    }, pendingOrderAlert.interval * 6000);

    return () => clearInterval(intervalId);
  }, [newOrders, pendingOrderAlert]);

  const playAudio = () => {
    audioRef.current.play();
  };

  const pauseAudio = () => {
    audioRef.current.pause();
  };

  console.log(pendingOrderAlert);

  return (
    <div className="hidden">
      <audio ref={audioRef}>
        <source src="/sounds/new_order.wav" type="audio/wav" />
      </audio>
      <button ref={playButtonRef} onClick={playAudio}>
        Play
      </button>
      <button onClick={pauseAudio}>Pause</button>
    </div>
  );
};

export default orderNotifications;
