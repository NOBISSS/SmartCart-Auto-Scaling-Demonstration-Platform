export default function NotFound() {
  return (
    <main className="min-h-[65vh] grid place-content-center text-center p-8">
      <span className="text-[#276749] text-[4rem] font-extrabold leading-none">404</span>
      <h1 className="font-['Manrope',sans-serif] font-bold text-2xl text-[#20251f] my-3">Page not found</h1>
      <p className="text-[#747a71] text-base mb-4">The page you're looking for doesn't exist.</p>
      <a href="/" className="text-[#276749] font-bold hover:underline">Return to SmartCart</a>
    </main>
  );
}
