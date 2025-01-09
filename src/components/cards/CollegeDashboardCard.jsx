import { useState } from "react";

const CollegeDashboardCard = ({
  icon: Icon,
  bgColor, // Background color for the icon container
  iconColor,
  count, // Count to display
  title, // Title of the card
  onClick, // Optional action for the card
  actionLabel, // Optional action label
  actionIcon: ActionIcon, // Optional action icon
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={`card w-full sm:w-[18%] bg-[#fff] p-4 md:p-8 items-center justify-center text-center space-y-2 border hover:shadow-md transition-all duration-300  `}
      style={{
        borderColor: isHovered ? iconColor : "#E5E7EB", // Default border color when not hovered
      }}
      onMouseEnter={() => setIsHovered(true)} // Trigger hover effect
      onMouseLeave={() => setIsHovered(false)} // Remove hover effect
    >
      <div
        className={`rounded-md w-10 h-10 flex justify-center`}
        style={{ backgroundColor: bgColor }}
      >
        <Icon className="self-center w-6 h-6" style={{ color: iconColor }} />
      </div>
      <h2 className="text-[30px] text-center font-bold mb-1 text-[#171717]">
        {count}
      </h2>
      <h2 className="text-[#8F92A1] font-bold text-base">{title}</h2>
      {onClick && (
        <span
          className="flex gap-2 justify-center hover:cursor-pointer"
          onClick={onClick}
        >
          <h2 className="text-blued font-bold text-center text-base">
            {actionLabel}
          </h2>
          {ActionIcon && <ActionIcon className="text-blued self-center" />}
        </span>
      )}
    </div>
  );
};

export default CollegeDashboardCard;
