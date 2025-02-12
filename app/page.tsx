import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="bg-white">
        <nav className=" container mx-auto p-2 flex justify-between items-center">
          <h2 className="text-xl ">Login_Page</h2>
          <div>
            <Link href="/signUp" className="mx-4 hover:text-blue-600">Register</Link>
          </div>  
        </nav>
      </div>
    </div>
  );
}
