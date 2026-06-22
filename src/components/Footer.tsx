export default function Footer() {
  return (
    <footer
      id="main-footer"
      className="border-t border-white/10 bg-gray-950/60 py-6 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Built by{' '}
          <span className="font-medium text-gray-400">Cominn</span> &mdash;
          Arbisoft Web Internship 2026
        </p>
      </div>
    </footer>
  );
}
