import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

describe("<BlogForm />", () => {
  test("check that the event handler receives props with the right details when a new blog is created", async () => {
    const addBlog = vi.fn();
    const user = userEvent.setup();

    const { container } = render(<BlogForm addBlog={addBlog} />);

    const titleInput = container.querySelector("#title");
    const authorInput = container.querySelector("#author");
    const urlInput = container.querySelector("#url");
    const submitButton = container.querySelector("#submit");

    await user.type(titleInput, "TESTING");
    await user.type(authorInput, "TESTING");
    await user.type(urlInput, "TESTING");
    await user.click(submitButton);

    expect(addBlog.mock.calls).toHaveLength(1);
    expect(addBlog.mock.calls[0][0].title).toBe("TESTING");
    expect(addBlog.mock.calls[0][0].author).toBe("TESTING");
    expect(addBlog.mock.calls[0][0].url).toBe("TESTING");
  });
});
