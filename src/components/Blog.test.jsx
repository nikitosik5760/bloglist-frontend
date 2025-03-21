import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

describe("<Blog/>", () => {
  const blog = {
    author: "Dima",
    likes: 0,
    title: "dimatitle",
    url: "https://aboba.com",
    user: {
      name: "Hambur",
      username: "crazyhamburger",
    },
  };
  const currentUser = {
    name: "Hambur",
    username: "crazyhamburger",
  };

  test("before view button pressed display only title and author", () => {
    const { container } = render(
      <Blog blog={blog} currentUser={currentUser} />,
    );

    const title = container.querySelector("#title");
    const author = container.querySelector("#author");

    expect(title).toBeDefined();
    expect(author).toBeDefined();

    const likes = container.querySelector("#likes");
    const url = container.querySelector("#url");
    expect(likes, null);
    expect(url, null);
  });

  test("likes and url shown after view pressed", async () => {
    const { container } = render(
      <Blog blog={blog} buttonLabel="view" currentUser={currentUser} />,
    );

    const user = userEvent.setup();
    const toggleButton = container.querySelector("#toggleVisibility-button");
    await user.click(toggleButton);

    const likes = container.querySelector("#likes");
    const url = container.querySelector("#url");
    expect(likes).toBeDefined();
    expect(url).toBeDefined();
  });

  test("when likes pressed 2 times, handler called twice", async () => {
    const mockHandler = vi.fn();
    const { container } = render(
      <Blog
        blog={blog}
        buttonLabel="view"
        currentUser={currentUser}
        likeBlog={mockHandler}
      />,
    );

    const user = userEvent.setup();

    const toggleButton = container.querySelector("#toggleVisibility-button");
    await user.click(toggleButton);

    const likeButton = container.querySelector("#like-button");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
