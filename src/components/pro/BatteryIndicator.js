import { useState, useEffect } from "react";

// Initial battery info: battery level: 0-100, charging status: true/false, supported by the browser: true/false
const initialBatteryInfo = { level: 50, charging: false, supported: true };

export const BatteryIcon = ({ level, levelColor, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{
      width: "24px",
      height: "24px",
      ...style,
    }} // Converted 'size-6' to inline style
  >
    <path
      fillRule="evenodd"
      d="M.75 9.75a3 3 0 0 1 3-3h15a3 3 0 0 1 3 3v.038c.856.173 1.5.93 1.5 1.837v2.25c0 .907-.644 1.664-1.5 1.838v.037a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3v-6Zm19.5 0a1.5 1.5 0 0 0-1.5-1.5h-15a1.5 1.5 0 0 0-1.5 1.5v6a1.5 1.5 0 0 0 1.5 1.5h15a1.5 1.5 0 0 0 1.5-1.5v-6Z"
      clipRule="evenodd"
    />
    <rect x="3" y="9.8" width={0.16 * level} height="6" fill={levelColor} />
  </svg>
);

const ChargingIcon = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ width: "8.5px", height: "8.5px", ...style }} // Converted 'size-2' and additional className to inline style
  >
    <path
      fillRule="evenodd"
      d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
      clipRule="evenodd"
    />
  </svg>
);

const DynamicBattery = ({ batteryInfo, style }) => {
  const { level, charging } = batteryInfo;

  let levelColor;
  if (level > 80 || charging === true) {
    levelColor = "#2cb55b";
  } else if (level > 50) {
    levelColor = "#8fd501";
  } else if (level > 30) {
    levelColor = "#ffbe00";
  } else if (level > 10) {
    levelColor = "#f97247";
  } else {
    levelColor = "#e12d2e";
  }

  // BatteryIconStyle is used to change the color of the battery icon outline color when the battery level is less than or equal to 5 and not charging
  const BatteryIconStyle = level <= 5 && !charging ? { color: levelColor } : {};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        width: "24px", // Assuming 'size-6' corresponds to 24px width
        height: "24px", // Assuming 'size-6' corresponds to 24px height
        ...style,
      }}
    >
      {charging ? (
        <ChargingIcon
          style={{ position: "absolute", left: "7.4px", top: "8.3px" }}
        />
      ) : null}
      {level <= 5 && !charging ? (
        <p
          style={{
            color: "#e12d2e",
            position: "absolute",
            fontSize: "9px",
            fontWeight: "bold",
            left: "10px",
            top: "7px",
          }}
        >
          !
        </p>
      ) : null}

      <BatteryIcon
        level={level}
        levelColor={levelColor}
        style={BatteryIconStyle}
      ></BatteryIcon>
    </div>
  );
};

export default function BatteryIndicator({ style }) {
  const [batteryInfo, setBatteryInfo] = useState(initialBatteryInfo);

  console.log(batteryInfo);
  const updateBatteryInfo = (battery) => {
    setBatteryInfo({
      level: battery.level * 100,
      charging: battery.charging,
      supported: true,
    });
  };

  useEffect(() => {
    const checkBatteryAPIAndSetup = async () => {
      if (navigator.getBattery) {
        try {
          const battery = await navigator.getBattery();
          updateBatteryInfo(battery);

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
        <DynamicBattery style={style} batteryInfo={batteryInfo} />
      ) : null}
    </>
  );
}
