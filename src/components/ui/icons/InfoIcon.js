const InfoIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={53}
      height={54}
      fill="none"
      viewBox="0 0 53 54"
      {...props}
    >
      <path
        stroke="#A2A2A2"
        strokeLinecap="round"
        strokeWidth={4}
        d="M26.5 39.617v-14.7"
      />
      <path
        fill="#A2A2A2"
        d="M26.5 15.117a2.45 2.45 0 1 1 0 4.9 2.45 2.45 0 0 1 0-4.9Z"
      />
      <path
        stroke="#A2A2A2"
        strokeLinecap="round"
        strokeWidth={4}
        d="M14.25 6.145A24.387 24.387 0 0 1 26.5 2.867c13.53 0 24.5 10.97 24.5 24.5 0 13.531-10.97 24.5-24.5 24.5-13.531 0-24.5-10.969-24.5-24.5 0-4.462 1.193-8.646 3.278-12.25"
      />
    </svg>
  );
};

export default InfoIcon;
