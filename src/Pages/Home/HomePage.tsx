import React, { useEffect, useState } from "react";
import { paginate, useGitHubRepos } from "../../utils";
import { Loader, Pagination } from "../../components";
import { RepoList } from "./components/RepoList";

const pageSize = 10;

export const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { repos, loading, error, fetchGitHubRepos } = useGitHubRepos();
  const currentPosts = paginate(repos, currentPage, pageSize);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchGitHubRepos(currentPage, pageSize);
      } catch (error) {
        console.error("Error fetching GitHub repos:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <div className="m-auto max-w-[900px]">
      <label
        htmlFor="github_username"
        className="text-sm font-medium leading-6 text-gray-900 flex justify-center"
      >
        Github Explorer Repository
      </label>

      {loading && !error && (
        <div className="flex justify-center pt-10">
          <Loader />
        </div>
      )}
      {error ? (
        <div className="flex justify-center pt-10">
          <p className="text-red-600">
            Failed to fetch GitHub repositories. Please try again.
          </p>
        </div>
      ) : (
        <>
          <RepoList currentPosts={currentPosts?.items} />
          <div className="w-full flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalCount={repos.totalCount}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
              siblingCount={0}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
