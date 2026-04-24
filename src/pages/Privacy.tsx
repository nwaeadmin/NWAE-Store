import LegalLayout from "@/components/LegalLayout";

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" updated="Last updated: April 24, 2026">
      <p>
        This Privacy Policy describes how Laplace ("we", "us", "our") collects,
        uses, and protects your personal information when you use our website,
        products, and services (the "Services"). By using the Services, you
        agree to the collection and use of information in accordance with this
        policy.
      </p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li>
          <strong>Account information:</strong> email address, username, and
          password hash.
        </li>
        <li>
          <strong>Order information:</strong> products purchased, transaction
          IDs, and timestamps.
        </li>
        <li>
          <strong>Payment information:</strong> handled directly by our payment
          providers — we do not store full card numbers.
        </li>
        <li>
          <strong>Technical information:</strong> IP address, browser, device,
          and basic usage analytics.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Process orders and deliver licenses;</li>
        <li>Provide customer support and respond to your messages;</li>
        <li>Improve our Services and develop new features;</li>
        <li>Detect and prevent fraud, abuse, and chargebacks;</li>
        <li>Comply with legal obligations.</li>
      </ul>

      <h2>3. Sharing of Information</h2>
      <p>
        We do not sell your personal information. We share information only
        with trusted third parties that help us operate the Services, such as
        payment processors, email providers, and hosting services, and only to
        the extent necessary to deliver the Services. We may disclose
        information when required by law or to protect our rights.
      </p>

      <h2>4. Cookies</h2>
      <p>
        We use a small number of essential cookies to keep you logged in and to
        keep your cart working. Optional analytics cookies, if enabled, are
        used to understand how the Services are used so we can improve them.
        You can control cookies through your browser settings.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        We retain personal information for as long as your account is active or
        as needed to comply with our legal obligations and resolve disputes.
        You can request deletion of your account at any time by contacting
        support.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        Depending on where you live, you may have the right to access,
        correct, port, or delete your personal data, as well as to object to
        certain processing. To exercise these rights, contact us through the
        Discord support channel.
      </p>

      <h2>7. Security</h2>
      <p>
        We use industry-standard security measures including encryption in
        transit (HTTPS), secure payment providers, and access controls to
        protect your information. No internet service is 100% secure, but we
        work hard to keep yours safe.
      </p>

      <h2>8. Children</h2>
      <p>
        Our Services are not directed at children under 18 and we do not
        knowingly collect personal information from minors. If you believe a
        minor has provided us with personal data, please contact us so we can
        delete it.
      </p>

      <h2>9. Changes</h2>
      <p>
        We may update this Privacy Policy from time to time. The "Last
        updated" date at the top reflects the latest version. Material changes
        will be communicated via the Services or by email.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions or requests? Reach us via our Discord support channel or via
        the <a href="/contact">Contact</a> page.
      </p>
    </LegalLayout>
  );
}
