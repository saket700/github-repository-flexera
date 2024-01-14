import { IGitHubReposState, IGithubRepoDetails } from "../types/GithubRepoType";

// to convert date format
export const formatDate = (dateString: string, formatOptions = {}) => {
  const inputDate = new Date(dateString || new Date());
  const options = { ...formatOptions };
  return new Intl.DateTimeFormat("en-US", options).format(inputDate);
};

// To calculate the pagination index
export const paginate = (
  repos: IGitHubReposState,
  currentPage: number,
  pageSize: number
): IGitHubReposState => {
  const { totalCount, items } = repos;

  const startIndex = 0;

  const endIndex = Math.min(startIndex + pageSize, totalCount);

  const slicedItems = items.slice(startIndex, endIndex);

  return {
    totalCount,
    items: slicedItems,
  };
};

// to sort the options
export const sortRepos = (repos: IGithubRepoDetails[], sortOption: string) => {
  return [...repos].sort((a, b) => {
    switch (sortOption) {
      case "Name":
        return a.name.localeCompare(b.name);
      case "Stars":
        return b.stargazers_count - a.stargazers_count;
      default:
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
    }
  });
};

export const truncateDescription = (
  description: string,
  maxLength: number
): string => {
  if (!description || description.length <= maxLength) {
    return description;
  }

  return `${description.substring(0, maxLength)}...`;
};
