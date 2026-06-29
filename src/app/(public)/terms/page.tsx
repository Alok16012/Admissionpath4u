export const metadata = {
  title: "Terms of Service | Admission Path 4u",
  description:
    "Terms of Service for Admission Path 4u. Please read these terms carefully before using our website.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight text-[#1d4ed8] mb-2">
        Terms of Service
      </h1>
      <p className="text-gray-500 mb-8">Last Updated: January 18, 2024</p>

      <div className="prose prose-gray max-w-none">
        <p className="lead text-lg text-gray-700 mb-6">
          Welcome to **Admission Path 4u**. By accessing or using our website,
          you agree to be bound by these Terms of Service. If you disagree with
          any part of these terms, you may not access the service.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            1. Use of Website
          </h2>
          <p className="mb-4 text-gray-600">
            You are granted a limited license to access and make personal use of
            this website. You are not allowed to download or modify it, or any
            portion of it, except with express written consent.
          </p>
          <p className="text-gray-600">
            This license does not include any resale or commercial use of this
            site or its contents; any collection and use of any product
            listings, descriptions, or prices; any derivative use of this site
            or its contents.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            2. Intellectual Property
          </h2>
          <p className="text-gray-600">
            All content included on this site, such as text, graphics, logos,
            button icons, images, audio clips, digital downloads, data
            compilations, and software, is the property of Admission Path 4u or
            its content suppliers and protected by international copyright laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            3. User Accounts
          </h2>
          <p className="text-gray-600">
            If you use this site, you are responsible for maintaining the
            confidentiality of your account and password and for restricting
            access to your computer, and you agree to accept responsibility for
            all activities that occur under your account or password.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            4. Limitation of Liability
          </h2>
          <p className="text-gray-600">
            In no event shall Admission Path 4u, nor its directors, employees,
            partners, agents, suppliers, or affiliates, be liable for any
            indirect, incidental, special, consequential or punitive damages,
            including without limitation, loss of profits, data, use, goodwill,
            or other intangible losses, resulting from your access to or use of
            or inability to access or use the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            5. Educational Information
          </h2>
          <p className="text-gray-600">
            While we strive to provide accurate and up-to-date information
            regarding colleges, exams, and admission processes, we do not
            warrant the completeness or accuracy of this information. Students
            are advised to verify details with the respective institutions
            directly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            6. Changes to Terms
          </h2>
          <p className="text-gray-600">
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material we will try to
            provide at least 30 days notice prior to any new terms taking
            effect. What constitutes a material change will be determined at our
            sole discretion.
          </p>
        </section>
      </div>
    </div>
  );
}
