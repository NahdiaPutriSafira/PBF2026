import { render } from "@testing-library/react";
import AboutPage from "@/pages/about";
import { describe, it, expect } from '@jest/globals';

describe("About Page", () => {
    it("renders about page correctly", () => {
        // Gunakan asFragment() untuk mengambil struktur DOM yang bersih
        const { asFragment } = render(<AboutPage />);
        
        // Lakukan snapshot pada fragment DOM tersebut
        expect(asFragment()).toMatchSnapshot();
    });
});