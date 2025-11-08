import { Outlet } from "react-router-dom";


export default function AdminMainLayout({ children }) {
  return (
    <div>
      <header>Header quản trị</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}