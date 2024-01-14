import React from "react";
import { GithubIcon, StarIcon, LicenseIcon, ForkIcon } from "../Icons";

export interface ICardDetails {
  githubUsername: string;
  githubDescription: string | undefined;
  numberOfStars?: string;
  githubLanguage: string;
  visibility: string;
  stargazersCount: number;
  updatedAt: string;
  repoName: string;
  license: {
    key: string;
    name: string;
  };
  forkCount: number;
  avatarUrl: string;
  onStarClick?: () => void;
  isStarred: boolean
}

export const Card: React.FC<ICardDetails> = ({
  githubUsername,
  githubDescription,
  githubLanguage,
  visibility,
  stargazersCount,
  updatedAt,
  repoName,
  license,
  forkCount,
  avatarUrl,
  onStarClick,
  isStarred
}) => {
  return (
    <div className="max-w-[52rem] w-full p-6 bg-white border border-gray-200 rounded-lg shadow flex flex-col md:flex-row md:items-center md:space-x-4">
      <img
        src={avatarUrl}
        alt={`${githubUsername}'s Avatar`}
        className="rounded-full w-36 h-36 mb-4 md:mb-0"
      />
      <div className="flex flex-col flex-grow">
        <div className="flex-star-container flex">
          <div className="flex items-center  mb-3 flex-1 ">
            <GithubIcon />
            <a
              href={`/detail?username=${githubUsername}&reponame=${repoName}`}
              target="_blank"
              className="ml-2 text-blue-500 hover:underline"
            >
              {repoName}
            </a>
            <div className="border text-sm text-gray-500 rounded-3xl w-16 h-[24px] ml-2 text-uppercase capitalize">
              {visibility}
            </div>
          </div>
          <div className="star cursor-pointer" onClick={onStarClick}>
            <StarIcon fill = {isStarred ? "#e3b341" : "#000;"} />
          </div>
        </div>
        <div className="flex items-start flex-wrap">
          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 text-sm text-justify">
            {githubDescription ? githubDescription : "-"}
          </p>
        </div>
        <div className="flex pt-2 text-xs flex-wrap">
          {!!stargazersCount && (
            <>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 mr-3">
                {githubLanguage}
              </p>
              <StarIcon />
              <div className="font-normal text-gray-400">{stargazersCount}</div>
            </>
          )}
          {!!forkCount && (
            <div className="flex pl-2">
              <ForkIcon />
              <div className="font-normal text-gray-500 dark:text-gray-400 mr-3">
                {forkCount}
              </div>
            </div>
          )}
          {!!license?.name && (
            <div className="flex pl-2">
              <LicenseIcon />
              <div className="font-normal text-gray-500 dark:text-gray-400 mr-3 whitespace-nowrap">
                {license?.name}
              </div>
            </div>
          )}
          <div className="text-gray-400 font-normal text-xs">
            Updated on {updatedAt}
          </div>
        </div>
      </div>
    </div>
  );
};

//#e3b341