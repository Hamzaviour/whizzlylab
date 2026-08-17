import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "Privacy Policy — Whizzly Lab",
  description:
    "Whizzly Lab privacy policy. Learn how we collect, use, and protect your personal data. Based in Lahore, Pakistan.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[hsl(260_87%_3%)] text-foreground">
      <PageNavbar />

      <section className="px-4 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Privacy Policy" },
            ]}
          />

          <h1
            className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}
          >
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-foreground/40">
            Last updated: August 2026
          </p>

          <div className="mt-10 space-y-8 text-base leading-relaxed text-hero-sub/80">
            <div>
              <h2 className="text-lg font-semibold text-white">
                1. Information We Collect
              </h2>
              <p className="mt-2">
                We collect information you provide directly, such as your name,
                email address, and project details when you contact us through
                our forms or scheduling pages. We also automatically collect
                certain information when you visit our site, including your IP
                address, browser type, and pages viewed.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                2. How We Use Your Information
              </h2>
              <p className="mt-2">
                We use the information we collect to respond to your inquiries,
                provide our services, improve our website, and communicate with
                you about updates and relevant offerings. We never sell your
                personal data to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                3. Data Storage &amp; Security
              </h2>
              <p className="mt-2">
                Your data is stored securely and is only accessible to our team.
                We implement industry-standard security measures to protect your
                information. When you share project details, we treat them as
                confidential and may sign NDAs upon request.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                4. Cookies &amp; Analytics
              </h2>
              <p className="mt-2">
                We use cookies and similar technologies to improve your
                experience and analyze site usage. You can control cookie
                preferences through your browser settings.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                5. Your Rights
              </h2>
              <p className="mt-2">
                You have the right to access, correct, or delete your personal
                data at any time. Contact us at{" "}
                <Link
                  href="mailto:whizzlylab@gmail.com"
                  className="text-foreground underline underline-offset-4 hover:text-white"
                >
                  whizzlylab@gmail.com
                </Link>{" "}
                for any data-related requests.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                6. Contact
              </h2>
              <p className="mt-2">
                Whizzly Lab
                <br />
                Plot 377, Shahbaz Block Mustafa Town
                <br />
                Lahore, Pakistan
                <br />
                <Link
                  href="mailto:whizzlylab@gmail.com"
                  className="text-foreground underline underline-offset-4 hover:text-white"
                >
                  whizzlylab@gmail.com
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-foreground/60 transition hover:text-foreground"
            >
              ← Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
