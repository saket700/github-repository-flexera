import React, { useState, useEffect } from "react";
import { IGithubUserDetails } from "../../../types/GithubUserDetailsType";
import { formatDate } from "../../../utils";
import { Card } from "../../../components/Card";

interface IRepoList {
  currentPosts: IGithubUserDetails[];
}

export const RepoList: React.FC<IRepoList> = ({ currentPosts }) => {
  const [starredMap, setStarredMap] = useState(new Map<string, boolean>());

  useEffect(() => {
    const initialMap = new Map<string, boolean>();
    currentPosts.forEach((item) => {
      const storageKey = `${item?.owner?.login}-${item.name}`;
      const storedStarred = localStorage.getItem(`${storageKey}-starred`);
      initialMap.set(
        storageKey,
        storedStarred ? JSON.parse(storedStarred) : false
      );
    });
    setStarredMap(initialMap);
  }, [currentPosts]);

  const handleStarClick = (githubUsername: string, repoName: string) => {
    const storageKey = `${githubUsername}-${repoName}-starred`;
    const storedStarred = localStorage.getItem(storageKey);
    const newStarred = storedStarred ? !JSON.parse(storedStarred) : true;

    if (newStarred) {
      localStorage.setItem(storageKey, JSON.stringify(true));
    } else {
      localStorage.removeItem(storageKey);
    }
    setStarredMap(
      (prevMap) =>
        new Map(prevMap.set(`${githubUsername}-${repoName}`, newStarred))
    );
  };

  return (
    <div className="pt-8">
      {currentPosts?.map((item: IGithubUserDetails) => (
        <div key={item.id} className="mb-8">
          <Card
            githubUsername={item?.owner?.login}
            githubDescription={item?.description}
            numberOfStars={item.stargazers_url}
            repoName={item.name || ""}
            githubLanguage={item?.language}
            visibility={item?.visibility}
            stargazersCount={item?.stargazers_count}
            updatedAt={formatDate(item.updated_at, {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            license={item?.license}
            forkCount={item.forks_count}
            avatarUrl={item?.owner?.avatar_url || ""}
            onStarClick={() =>
              handleStarClick(item?.owner?.login || "", item.name || "")
            }
            isStarred={
              starredMap.get(`${item?.owner?.login}-${item.name}`) || false
            }
          />
        </div>
      ))}
    </div>
  );
};
