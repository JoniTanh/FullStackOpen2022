import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;

  beforeEach(() => {
    component = render(
      <Blog
        key={blog.id}
        blog={blog}
        updateLikes={mockHandleUpdate}
        removeBlog={mockHandlerRemove}
        user={user}
      />
    );
  });

  const blog = {
    title: "Jonin testailut",
    author: "Lucia",
    url: "https://www.google.fi",
    likes: 666,
  };

  const user = {
    username: "Joni",
    name: "Joni",
  };

  const mockHandleUpdate = jest.fn();
  const mockHandlerRemove = jest.fn();

  test("renders title and author, but not by default url or likes", () => {
    const defaultContent = component.container.querySelector(".blog");

    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
    expect(defaultContent).not.toHaveStyle("display: none");
  });

  test("url, likes and user are shown when button is clicked", () => {
    const viewButton = component.getByText("view");
    fireEvent.click(viewButton);

    const allContent = component.container.querySelector(".allContent");

    expect(component.container).toHaveTextContent(blog.url);
    expect(component.container).toHaveTextContent(blog.likes);
    expect(component.container).toHaveTextContent(user.username);
    expect(allContent).not.toHaveStyle("display: none");
  });

  test("pressing like button twice calls event handler twice", () => {
    const likeButton = component.getByText("like");

    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandleUpdate.mock.calls).toHaveLength(2);
  });
});
