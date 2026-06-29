export const metadata = {
  title: "Privacy Policy | Admission Path 4u",
  description:
    "Privacy Policy for Admission Path 4u. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight text-[#27465B] mb-2">
        Privacy Policy
      </h1>
      <p className="text-gray-500 mb-8">Last Updated: January 18, 2024</p>

      <div className="prose prose-gray max-w-none">
        <p className="lead text-lg text-gray-700 mb-6">
          At **Admission Path 4u**, we value your privacy and are committed to
          protecting your personal data. This Privacy Policy explains how we
          collect, use, disclosure, and safeguard your information when you
          visit our website.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            1. Information We Collect
          </h2>
          <p className="mb-4 text-gray-600">
            We may collect information about you in a variety of ways. The
            information we may collect on the Site includes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>
              <strong>Personal Data:</strong> Personally identifiable
              information, such as your name, shipping address, email address,
              and telephone number, that you voluntarily give to us when you
              register with the Site or when you choose to participate in
              various activities related to the Site.
            </li>
            <li>
              <strong>Derivative Data:</strong> Information our servers
              automatically collect when you access the Site, such as your IP
              address, your browser type, your operating system, your access
              times, and the pages you have viewed directly before and after
              accessing the Site.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            2. Use of Your Information
          </h2>
          <p className="mb-4 text-gray-600">
            Having accurate information about you permits us to provide you with
            a smooth, efficient, and customized experience. Specifically, we may
            use information collected about you via the Site to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Assist you in finding colleges and courses.</li>
            <li>Connect you with counselors or educational institutions.</li>
            <li>Email you regarding your account or order.</li>
            <li>
              Fulfill and manage purchases, orders, payments, and other
              transactions related to the Site.
            </li>
            <li>
              Generate a personal profile about you to make future visits to the
              Site more personalized.
            </li>
            <li>
              Monitor and analyze usage and trends to improve your experience
              with the Site.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            3. Disclosure of Your Information
          </h2>
          <p className="mb-4 text-gray-600">
            We may share information we have collected about you in certain
            situations. Your information may be disclosed as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>
              <strong>By Law or to Protect Rights:</strong> If we believe the
              release of information about you is necessary to respond to legal
              process, to investigate or remedy potential violations of our
              policies, or to protect the rights, property, and safety of
              others, we may share your information as permitted or required by
              any applicable law, rule, or regulation.
            </li>
            <li>
              <strong>Third-Party Service Providers:</strong> We may share your
              information with third parties that perform services for us or on
              our behalf, including payment processing, data analysis, email
              delivery, hosting services, customer service, and marketing
              assistance.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            4. Security of Your Information
          </h2>
          <p className="text-gray-600">
            We use administrative, technical, and physical security measures to
            help protect your personal information. While we have taken
            reasonable steps to secure the personal information you provide to
            us, please be aware that despite our efforts, no security measures
            are perfect or impenetrable, and no method of data transmission can
            be guaranteed against any interception or other type of misuse.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            5. Contact Us
          </h2>
          <p className="text-gray-600 mb-2">
            If you have questions or comments about this Privacy Policy, please
            contact us at:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
            <p className="font-semibold text-gray-900">Admission Path 4u</p>
            <p className="text-gray-600">GF-090, Migsun Galleria, Sector 27</p>
            <p className="text-gray-600">
              Greater Noida, Uttar Pradesh - 201306
            </p>
            <p className="text-gray-600 mt-2">
              Email: info@admissionpath4u.com
            </p>
            <p className="text-gray-600">Phone: +91 96505 01173</p>
          </div>
        </section>
      </div>
    </div>
  );
}
