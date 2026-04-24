import LegalLayout from "@/components/LegalLayout";

export default function Refund() {
  return (
    <LegalLayout title="Refund Policy" updated="Last updated: April 24, 2026">
      <p>
        Because our products are digital and delivered automatically and
        instantly to your dashboard, all sales are final by default. We
        understand that things can go wrong, so we have a clear, fair process
        for the cases where a refund is appropriate.
      </p>

      <h2>1. When We Will Issue a Refund</h2>
      <ul>
        <li>
          The product is non-functional and our support team confirms the issue
          cannot be resolved within a reasonable time;
        </li>
        <li>
          You were charged twice for the same order due to a payment processor
          error;
        </li>
        <li>
          A clear and verifiable error on our side prevented you from receiving
          the product you paid for.
        </li>
      </ul>

      <h2>2. When We Will Not Issue a Refund</h2>
      <ul>
        <li>You changed your mind after the product was delivered;</li>
        <li>
          You did not read the product description, requirements, or
          compatibility notes before purchase;
        </li>
        <li>
          You purchased the wrong plan or duration;
        </li>
        <li>
          Your account was suspended due to a violation of the{" "}
          <a href="/terms">Terms of Service</a>;
        </li>
        <li>
          You filed a chargeback before contacting our support team.
        </li>
      </ul>

      <h2>3. How to Request a Refund</h2>
      <ol>
        <li>Open a support ticket on our Discord;</li>
        <li>Provide your order ID, email, and a short description of the issue;</li>
        <li>
          Our team will respond within 24 hours and walk you through any
          troubleshooting steps;
        </li>
        <li>
          If a refund is approved, it will be issued to the original payment
          method within 5–10 business days, depending on your provider.
        </li>
      </ol>

      <h2>4. Chargebacks</h2>
      <p>
        Filing a chargeback before contacting our support team is a violation
        of our Terms and will result in immediate suspension of your account
        and revocation of any associated licenses, in addition to any fees
        incurred. We always prefer to fix the problem first.
      </p>

      <h2>5. Contact</h2>
      <p>
        For any refund-related question, reach out via our Discord support
        channel or the <a href="/contact">Contact</a> page.
      </p>
    </LegalLayout>
  );
}
