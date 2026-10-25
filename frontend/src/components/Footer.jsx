export default function Footer() {
  return (
    <footer className="py-[26px] px-[7%] flex max-[600px]:flex-col justify-between items-center gap-4 border-t border-[#e8e9e2] text-[#747a71] text-[0.82rem] max-[600px]:text-center">
      <p className="m-0">© {new Date().getFullYear()} SmartCart</p>
      <p className="m-0">Built with React, Redux Toolkit, Node.js and MongoDB.</p>
    </footer>
  );
}
