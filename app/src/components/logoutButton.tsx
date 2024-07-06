"use client";

import { deleteCookies } from "@/action";

interface LogoutButtonProps {
  name: any;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ name }) => {
  return (
    <button className="btn" onClick={deleteCookies}>
      {name}
    </button>
  );
};

export default LogoutButton;
