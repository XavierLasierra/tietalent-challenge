import TtButton, { ButtonTypes } from "@/common-components/ttButton/TtButton";
import { fireEvent, render, screen } from "@testing-library/react";

describe("TtButton", () => {
  it("should render a button with the correct text", () => {
    const text = "Test";
    render(<TtButton text={text} />);

    const button = screen.getByText(text);
    expect(button).toBeInTheDocument();
  });

  it("should render an anchor if href is provided", () => {
    render(<TtButton text="Test" href="/" />);

    const anchor = screen.queryByRole("link");
    const button = screen.queryByRole("button");
    expect(anchor).toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  });

  it("should render a button if href is not provided", () => {
    render(<TtButton text="Test" />);

    const button = screen.queryByRole("button");
    const anchor = screen.queryByRole("link");
    expect(button).toBeInTheDocument();
    expect(anchor).not.toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const onClick = jest.fn();
    render(<TtButton text="Test" onClick={onClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  const buttonTypes = ["primary", "secondary", "transparent"] as ButtonTypes[];
  buttonTypes.forEach((type) => {
    it(`should match the snapshot with the button type: ${type}`, () => {
      render(<TtButton text="Test" type={type} />);

      expect(screen).toMatchSnapshot();
    });
  });
});
