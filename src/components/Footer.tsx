
import {
  GitBranchIcon,
  Link2Icon,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {

  const resources = [
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Terms & Conditions", href: "/terms" },
    { title: "Contact", href: "/contact" },
    { title: "Support", href: "/support" },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 pb-14 pt-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight text-primary"
            >
              Blog App
            </Link>

            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Discover insightful articles, share your ideas, and stay updated
              with the latest trends in technology, programming, and design.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {[

                Link2Icon,
                GitBranchIcon,
              ].map((Icon, index) => (
                <a
                  key={index}
                  href={
                    index === 0 ? "https://www.linkedin.com/in/rabin-shrestha-8b57a3307gi" : "https://github.com/Rabyn-Collab"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border p-2 text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>



          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold">Resources</h3>

            <ul className="mt-5 space-y-3">
              {resources.map((link) => (
                <li key={link.title}>
                  <Link
                    to={'#'}
                    className="text-sm text-muted-foreground transition hover:text-primary"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold">Contact</h3>

            <div className="mt-5 space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <span>Kathmandu, Nepal</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>+977 9813760683</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>rabyn900@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row">
          <p>
            © 2026 <span className="font-semibold">BlogApp</span>.
            All rights reserved.
          </p>

          <p>
            Built with ❤️ using React, Redux, TypeScript & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}