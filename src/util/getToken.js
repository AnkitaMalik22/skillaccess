export default function getCookie(name) {
    const value = `; ${document.cookie}`;  // Add semicolon to handle cases where the cookie is at the start
    const parts = value.split(`; ${name}=`);  // Split the cookie string by the `name=` part
    if (parts.length === 2) {
        return parts.pop().split(';').shift();  // Get the cookie value by splitting at the semicolon
    }
    return null;  // If the cookie doesn't exist, return null
}

export function clearCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Example usage:
// clearCookie("token");


// const token = getCookie("token");