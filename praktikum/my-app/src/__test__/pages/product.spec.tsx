import { render, screen } from "@testing-library/react";
import TampilanProduk from "@/pages/produk";
import { jest, describe, it, expect } from '@jest/globals'; // node:test dihapus


jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/product",
      pathname: "",
      query: {},
      asPath: "",
      push: jest.fn(),
      event: {
        on: jest.fn(),
        off: jest.fn(),
      },
      isReady: true,
    };
  },
}));

describe("Product Page", () => {
    it("renders product page correctly", () => {
        const page = render(<TampilanProduk />);
        
        // Hapus spasi setelah titik pada .toBe
        // Pastikan teks "Product Page" persis sama dengan yang ada di file tampilan produkmu
        //expect(screen.getByTestId("title").textContent).toBe("Product Page");
        
        expect(page).toMatchSnapshot();
    });
});