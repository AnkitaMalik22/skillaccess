import React from 'react';
import { PiSlidersHorizontalLight } from 'react-icons/pi';

const Filter = ({ handleClick, isPopupOpen, size = 'large', colorScheme = 'default' }) => {
    // Define size-based styles
    const sizeStyles = {
        small: 'h-9 w-10 text-sm',
        medium: 'h-10 w-10 sm:h-12 sm:w-12 text-base',
        large: 'h-12 w-12 sm:h-14 sm:w-14 text-lg',
    };

    // Default to medium size if invalid size is provided
    const appliedSize = sizeStyles[size] || sizeStyles.medium;

    // Define color scheme styles
    const colorSchemes = {
        default: {
            base: 'bg-[#8f92a11a] hover:bg-blued hover:text-white',
            active: 'bg-[#0d9aac] text-white',
        },
        dark: {
            base: 'bg-blued hover:bg-cyan-600 text-white',
            active: 'bg-[#1c1c1c] text-white',
        },
        light: {
            base: 'bg-[#f5f5f5] hover:bg-gray-300  hover:text-black',
            active: 'bg-[#e0e0e0] text-black',
        },
        custom: {
            base: 'bg-custom-base hover:bg-custom-hover hover:text-custom-hover',
            active: 'bg-custom-active text-custom-active',
        },
    };

    // Default to 'default' color scheme if invalid scheme is provided
    const appliedColorScheme = colorSchemes[colorScheme] || colorSchemes.default;

    return (
        <span className="flex gap-2">
            <button
                onClick={handleClick}
                className={`self-center hover:cursor-pointer rounded-md flex items-center  justify-center transition-colors ${appliedSize} ${isPopupOpen ? appliedColorScheme.active : appliedColorScheme.base
                    }`}
            >
                <PiSlidersHorizontalLight
                    className={`h-${size === 'small' ? 5 : size === 'large' ? 8 : 7} w-${size === 'small' ? 5 : size === 'large' ? 8 : 7}`}
                />
            </button>
        </span>
    );
};

export default Filter;
