import {
  fireEvent,
  render,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import HomePage from "../Pages/Home/HomePage";
import React from "react";
import { vi } from "vitest";
import { mockData } from "../mock-data/mockData";
import { Pagination } from "../components";
import renderer from "react-test-renderer";




describe("Snapshot testing suite", () => {
  it("Matches DOM Snapshot", () => {
    const domTree = renderer.create(<HomePage />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});

test("should render repositories from 1 to 10 on the first page", async () => {
  vi.mock("fetch", () => ({
    ok: true,
    json: () =>
      Promise.resolve({
        success: true,
        status: 200,
        data: mockData,
      }),
  }));
  
  render(<HomePage />);

  // Ensure that repositories from 1 to 10 are rendered
  await waitFor(() => {
    for (let i = 0; i < 10; i++) {
      const repoNameElement = screen.getByText(mockData[i].name);
      expect(repoNameElement).toBeInTheDocument();
    }
  });

  // Ensure that repositories from 11 onwards are not rendered
  for (let i = 10; i < mockData.length; i++) {
    const repoNameElement = screen.queryByText(mockData[i].name);
    expect(repoNameElement).toBeNull();
  }
});


beforeEach(() => {
  vi.resetAllMocks();
});

test("render error message on API failure", async () => {
  vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Failed to fetch GitHub repositories"));

  await act(async () => {
    render(<HomePage />);
  });

  await waitFor(() => {
    const errorMessage = screen.getByText("Failed to fetch GitHub repositories. Please try again.");
    expect(errorMessage).toBeInTheDocument();
  });
});



test("should render the pagination buttons ", () => {
  const onPageChangeMock = vi.fn();
  const component = render(
    <Pagination
      onPageChange={onPageChangeMock}
      totalCount={10}
      siblingCount={1}
      currentPage={1}
      pageSize={5}
    />
  );

  const previousButton = screen.queryByText("Previous");
  const nextButton = screen.queryByText("Next");

  expect(previousButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();

  // Find and click the "Next" button
  const nextButtonClick = screen.getByText("Next");
  fireEvent.click(nextButtonClick);

  expect(onPageChangeMock).toHaveBeenCalledWith(2);
});
