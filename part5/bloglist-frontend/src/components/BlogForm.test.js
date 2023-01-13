import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./blogForm";

describe("BlogForm />", () => {
  test("right data when creating blog", () => {
    const addBlog = jest.fn();

    const component = render(<BlogForm createBlog={addBlog} />);

    const title = component.container.querySelector("#title");
    const author = component.container.querySelector("#author");
    const url = component.container.querySelector("#url");
    const form = component.container.querySelector("form");

    fireEvent.change(title, {
      target: { value: "Jonin Otsikko" },
    });
    fireEvent.change(author, {
      target: { value: "Authorikkaa" },
    });
    fireEvent.change(url, {
      target: { value: "https://www.kissala.fi" },
    });

    fireEvent.submit(form);

    //console.log(addBlog.mock.calls[0][0].title)

    expect(addBlog.mock.calls).toHaveLength(1);
    expect(addBlog.mock.calls[0][0].title).toBe("Jonin Otsikko");
    expect(addBlog.mock.calls[0][0].author).toBe("Authorikkaa");
    expect(addBlog.mock.calls[0][0].url).toBe("https://www.kissala.fi");
  });
});
