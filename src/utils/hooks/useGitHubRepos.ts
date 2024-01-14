import { useState } from "react";
import { fetchGitHubRepos } from "../../services/githubService";
import { IGitHubReposState } from "../../types/GithubRepoType";

export const useGitHubRepos = () => {
  const [repos, setRepos] = useState<IGitHubReposState>({
    totalCount: 0,
    items: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (page: number, perPage: number) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchGitHubRepos(page, perPage);

      setRepos(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return {
    repos,
    loading,
    error,
    fetchGitHubRepos: fetchData,
  };
};
