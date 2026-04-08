import { render, screen } from "@testing-library/react";
import AboutPage from "@/pages/about";
import { describe, it, expect } from '@jest/globals';
import About from "@/pages/about";

describe("About Page", () => {
    it("renders about page correctly", () => {
        const page = render (<AboutPage />)
        expect (screen.getByTestId("title"). textContent).toBe("About Page")
        expect(page).toMatchSnapshot()
        // Gunakan asFragment() untuk mengambil struktur DOM yang bersih
        //const { asFragment } = render(<AboutPage />);
        
        // Lakukan snapshot pada fragment DOM tersebut
        //expect(asFragment()).toMatchSnapshot();
    });
}); 