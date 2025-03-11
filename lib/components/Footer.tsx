export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-gray-500 mb-3">Built by Jacob.</p>
        <a
          href="https://x.com/jacobmtucker"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-gray-600 hover:text-black transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1.5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="text-sm font-medium">@jacobmtucker</span>
        </a>
      </div>
    </footer>
  );
}
