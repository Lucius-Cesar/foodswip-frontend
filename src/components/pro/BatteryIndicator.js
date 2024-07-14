import { useState, useEffect } from "react";

// Initial battery info: battery level: 0-100, charging status: true/false, supported by the browser: true/false
const initialBatteryInfo = { level: 50, charging: false, supported: true };

export const BatteryIcon = ({ level, levelColor }) => (
  //max level is width 16 -> divide by 100 -> 0.16 = 1% power
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6"
  >
    <path
      fillRule="evenodd"
      d="M.75 9.75a3 3 0 0 1 3-3h15a3 3 0 0 1 3 3v.038c.856.173 1.5.93 1.5 1.837v2.25c0 .907-.644 1.664-1.5 1.838v.037a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3v-6Zm19.5 0a1.5 1.5 0 0 0-1.5-1.5h-15a1.5 1.5 0 0 0-1.5 1.5v6a1.5 1.5 0 0 0 1.5 1.5h15a1.5 1.5 0 0 0 1.5-1.5v-6Z"
      clipRule="evenodd"
    />

    <rect x="3" y="9.8" width={0.16 * level} height="6" fill={levelColor} />
  </svg>
);

const ChargingIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`size-2 ${className}`}
  >
    <path
      fillRule="evenodd"
      d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
      clipRule="evenodd"
    />
  </svg>
);
const DynamicBattery = ({ batteryInfo, className }) => {
  const { level, charging } = batteryInfo;

  let levelColor;
  if (level > 80 || charging === true) {
    levelColor = "#2cb55b"; // Assuming levels above 80 should also be this color
  } else if (level > 50) {
    levelColor = "#8fd501";
  } else if (level > 30) {
    levelColor = "#ffbe00";
  } else if (level > 10) {
    levelColor = "#f97247";
  } else {
    levelColor = "#e12d2e"; // This will also cover the case for level <= 10
  }

  return (
    <div
      className={`${className} flex flex-row justify-center items-center relative size-6`}
    >
      {charging ? (
        <ChargingIcon className="absolute left-[7.4px] top-[8.8px]" />
      ) : null}
      {level <= 5 && !charging ? (
        <p
          style={{ color: "#e12d2e" }}
          className="absolute text-[9px] font-bold left-[10px] top-[7px]"
        >
          !
        </p>
      ) : null}
      <BatteryIcon level={level} levelColor={levelColor}></BatteryIcon>
    </div>
  );
};

export default function BatteryIndicator({ className }) {
  const [batteryInfo, setBatteryInfo] = useState(initialBatteryInfo);

  // Update the battery info
  const updateBatteryInfo = (battery) => {
    setBatteryInfo({
      level: battery.level * 100,
      charging: battery.charging,
      supported: true,
    });
  };

  useEffect(() => {
    // Check if the browser supports the Battery Status API and setup the event listeners
    const checkBatteryAPIAndSetup = async () => {
      if (navigator.getBattery) {
        try {
          // Get the battery status
          const battery = await navigator.getBattery();
          updateBatteryInfo(battery);

          // Setup the event listeners for the battery status changes
          battery.addEventListener("chargingchange", () =>
            updateBatteryInfo(battery)
          );
          battery.addEventListener("levelchange", () =>
            updateBatteryInfo(battery)
          );
        } catch (error) {
          console.error("Battery status is not supported.");
          setBatteryInfo((prev) => ({ ...prev, supported: false }));
        }
      } else {
        console.error("Battery status is not supported.");
        setBatteryInfo((prev) => ({ ...prev, supported: false }));
      }
    };

    checkBatteryAPIAndSetup();
  }, []);

  return (
    <>
      {batteryInfo?.supported ? (
        <DynamicBattery className={className} batteryInfo={batteryInfo} />
      ) : null}
    </>
  );
}
