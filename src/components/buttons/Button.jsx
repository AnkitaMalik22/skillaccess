import React from 'react'
import Loader from '../loaders/Loader'


const Button = ({ handleClick, saveText, disabled = false, loading = false }) => {
    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className="rounded-md bg-blued px-4 py-2 text-sm font-medium text-white hover:bg-blued focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:bg-opacity-75 disabled:cursor-not-allowed"
        >
            {!loading ? (saveText || "Confirm") : <Loader />}
        </button>
    )
}

export default Button