const GITHUB_API_URL = "https://api.github.com";

export const fetchGitHubRepos = async (page: number, perPage: number) => {
  const url = `${GITHUB_API_URL}/search/repositories?sort=stars&q=javascript&per_page=${perPage}&page=${page}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return {
        totalCount: Math.min(data.total_count || 1000, 1000), //  "Only the first 1000 search results are available",
        items: Array.isArray(data?.items) ? data?.items : [],
      };
    } else {
      const errorData = await response.json();
      console.error("Error fetching GitHub repos:", errorData.message);
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error("Error fetching GitHub repos:", error.message);
    throw error;
  }
};
