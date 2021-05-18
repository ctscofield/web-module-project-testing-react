import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockFetchShow from "./../../api/fetchShow";
import Display from "./../Display";

jest.mock("./../../api/fetchShow");
const testShow = {
    name: "test show",
    summary: "still a test",
    seasons: [
        {
            id: 0,
            name: "Season 1",
            episodes: [],
        },
        {
            id: 1,
            name: "Season 2",
            episodes: [],
        }
    ]
};

test("renders without errors", () => {
    render(<Display />);
});

test("renders Show component when the button is clicked", async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);
    render(<Display />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    const show = await screen.findByTestId("show-container");
    expect(show).toBeInTheDocument();
});

test("renders season options matching fetch return when button is clicked", async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);
    render(<Display />);
    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(() => {
        const seasonOptions = screen.queryAllByTestId("season-option");
        expect(seasonOptions).toHaveLength(2);

    })
});

test("displayfunc is called when the button is pressed", async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);
    const displayFunc = jest.fn();
    render(<Display displayFunc={displayFunc}/>);
    const button = screen.getByRole("button");
    userEvent.click(button);
    await waitFor(() => {
        expect(displayFunc).toBeCalled();
    });
});















///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.