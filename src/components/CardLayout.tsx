import React from "react";
import { Arrow } from "../Icons";

interface ICardLayout {
  CardHeading: string;
  CardDescription: string;
}
export const CardLayout: React.FC<ICardLayout> = ({
  CardHeading,
  CardDescription,
}) => {
  return (
    <div className="max-w-sm p-6 h-[300px] bg-white border border-gray-200 rounded-lg shadow dark:text-gray-400 pt-16">
      <a href="#">
        <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-gray-400">
          {CardHeading}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 pt-8">
        {CardDescription}
      </p>
      <div className="pt-8">
      <a
        href="#"
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Read more
        <Arrow/>
      </a>
      </div>
    </div>
  );
};