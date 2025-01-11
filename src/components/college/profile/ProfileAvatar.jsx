import React, { useRef } from "react";

export const ProfileAvatar = ({
  editable,
  avatar,
  college,
  handleAvatarChange,
}) => {
  const imgRef = useRef(null);

  return (
    <div className="w-14 h-14 bg-gray-200 self-center rounded-md relative flex items-center justify-center">
      <img
        src={avatar || college?.avatar?.url || "/images/defaultUser.jpg"}
        alt=""
        width="56px"
        className="rounded-md"
      />
      {editable && (
        <>
          <div
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-md p-[.35rem] bg-accent bg-opacity-80 cursor-pointer"
            onClick={() => imgRef.current?.click()}
          >
            <img src="/images/icons/pen.png" alt="Edit" />
          </div>
          <input
            ref={imgRef}
            type="file"
            name="avatar"
            id="file"
            className="hidden"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </>
      )}
    </div>
  );
};
