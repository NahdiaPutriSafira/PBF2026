import Navbar from "../navbar";

type AppShellProps = {
  children: React.ReactNode;
};

const AppShell = ({ children }: AppShellProps) => {
  return (
    <>
      <Navbar />

      <main style={{ minHeight: "80vh", padding: "20px" }}>
        {children}
      </main>

      <footer style={{ 
        padding: "15px", 
        textAlign: "center", 
        backgroundColor: "#f1f1f1" 
      }}>
        © 2026 Nahdia Putri Safira | TI3D
      </footer>
    </>
  );
};

export default AppShell;