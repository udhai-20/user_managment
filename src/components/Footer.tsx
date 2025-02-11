export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white text-center p-4 mt-10">
            <p>© {new Date().getFullYear()} MyApp. All rights reserved.</p>
            <div className="flex justify-center space-x-6 mt-2">
                <a
                    href="https://github.com/udhai-20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400 transition"
                >
                    GitHub
                </a>
                <a
                    href="https://www.linkedin.com/in/udhayaprakash-1898upa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400 transition"
                >
                    LinkedIn
                </a>
            </div>
        </footer>
    );
}
