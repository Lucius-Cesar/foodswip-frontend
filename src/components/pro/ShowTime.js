import { useState, useEffect } from "react";

export default function ShowTime() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateCurrentTime = () => {
      const date = new Date();
      // Ensure minutes are shown with two digits
      const minutes = date.getMinutes().toString().padStart(2, "0");
      setCurrentTime(
        date.toLocaleString("fr-FR", {
          hour: "2-digit", // Heure en deux chiffres
          minute: "2-digit", // Minute en deux chiffres
          hour12: false, // Utilise le format 24h
        })
      );
    };

    // Set initial time
    updateCurrentTime();

    // Set up an interval to update the time every minute
    const intervalId = setInterval(updateCurrentTime, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <p className="text-3xl font-medium">{currentTime}</p>
    </div>
  );
}
