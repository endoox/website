import type { Metadata } from "next";
import pageStyles from "../page.module.css";
import { SiteFooter, SiteHeader } from "../site-chrome";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy — endo",
  openGraph: { title: "Privacy Policy — endo", url: "./", siteName: "endo", type: "website" },
  twitter: { card: "summary", title: "Privacy Policy — endo" },
};

// From https://www.endodeals.com/privacy, with brand capitalization normalized to "endo".
export default function PrivacyPage() {
  return (
    <div className={pageStyles.page}>
      <SiteHeader />

      <main id="top" className={styles.legal}>
        <article>
          <header>
            <h1>Privacy Policy</h1>
            <p>endo Sports and Entertainment Inc.</p>
            <p>Effective Date: June 26, 2025</p>
          </header>
          <p>endo Sports and Entertainment Inc. (&quot;endo,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides an endorsement and athlete marketing partnership management platform built for sports agencies (the &quot;Services&quot;). This Privacy Policy describes how we collect, use, store, and protect information in connection with your use of the Services.</p>
          <p>By creating an account or using the Services, you accept and agree to this Privacy Policy.</p>
          <h2>1. Information We Collect</h2>
          <h3>1.1 Customer Data You Provide</h3>
          <p>When you use the Services, you may provide us with information defined in our Terms of Service as &quot;Customer Data,&quot; which includes:</p>
          <ul>
            <li>Athlete personal information, contact details, and biographical data</li>
            <li>Marketing contract terms, financial details, and performance obligations</li>
            <li>Brand partner information and relationship history</li>
            <li>Social media engagement data and performance metrics</li>
            <li>Deliverable content, creative briefs, and approval communications</li>
            <li>Payment information and financial transaction records</li>
          </ul>
          <h3>1.2 Content You Upload (&quot;Your Content&quot;)</h3>
          <p>The Services allow you and your authorized users to store and process data including software, Customer Data (including Personal Information), text, images, audio, video, photographs, and other materials (&quot;Your Content&quot;). You are solely responsible for the accuracy, quality, integrity, legality, reliability, and appropriateness of Your Content, and for obtaining all rights related to Your Content, including all necessary consents from represented athletes and brand partners.</p>
          <h3>1.3 Third-Party Content and Integrations</h3>
          <p>You may access Third Party Content through the endo Platform, including data feeds from social network services and marketing data. Examples of connected third-party platforms include:</p>
          <ul>
            <li>Social media platforms (Instagram, Twitter, TikTok, YouTube, Facebook) — for engagement data retrieval</li>
            <li>Calendar services (Google Calendar, Outlook) — for deliverable deadline synchronization</li>
            <li>Communication platforms — for notification delivery</li>
            <li>Cloud storage services — for contract and creative asset management</li>
          </ul>
          <p>All ownership and intellectual property rights in Third Party Content and its use is governed by separate third-party terms between you and the applicable third party. Any exchange of data between you and a third-party provider is solely between you and such third party.</p>
          <h3>1.4 Analytics Data</h3>
          <p>We may use Google Analytics or similar tools to collect anonymized usage data about how the platform is accessed and used. This data is used solely to analyze and improve the Services. You may opt out of Google Analytics by using the Google Analytics Opt-out Browser Add-on available at tools.google.com/dlpage/gaoptout.</p>
          <h2>2. How We Use Your Information</h2>
          <p>endo processes Your Content solely for the purpose of providing the Services and in accordance with your documented instructions as set forth in the Terms of Service. endo shall not use Your Content for any purpose other than providing the Services, except as follows:</p>
          <h3>2.1 Aggregated Usage Data</h3>
          <p>endo may derive from the use and operation of the Services aggregated and anonymized data (&quot;Aggregated Usage Data&quot;), including:</p>
          <ul>
            <li>Athlete engagement metrics and performance benchmarks</li>
            <li>Deal valuation benchmarks and market pricing data</li>
            <li>Market rates for endorsement and sponsorship deals</li>
            <li>Deliverable completion rates</li>
            <li>Payment cycles and deal structure data</li>
            <li>Other partnership performance data</li>
          </ul>
          <p>Aggregated Usage Data does not identify any specific athlete, brand, or agency. All data is sufficiently anonymized to prevent identification of you, your represented athletes, or your specific brand partners.</p>
          <p>endo may package and disclose Aggregated Usage Data for market intelligence purposes and other lawful business purposes, including sharing with third parties. Any such disclosure will be in anonymized, aggregated form only and will not identify or be attributable to any specific athlete, agency, or brand partner.</p>
          <h2>3. How We Store and Protect Your Information</h2>
          <h3>3.1 Security Measures</h3>
          <p>endo implements and maintains reasonable administrative and technical safeguards designed to protect Your Content from unauthorized access, use, disclosure, alteration, or destruction. Such measures include secure development practices.</p>
          <h3>3.2 Cloud Infrastructure and Subprocessors</h3>
          <p>Your Content is stored on secure cloud infrastructure. endo may use third-party data processors and cloud service providers to store and process Your Content, provided that such third parties are bound by confidentiality and data protection obligations at least as protective as those in the Terms of Service.</p>
          <h3>3.3 Security Incidents</h3>
          <p>In the event of any unauthorized access to, or acquisition, disclosure, or loss of Your Content (&quot;Security Incident&quot;), endo will:</p>
          <ul>
            <li>Notify you without undue delay and no later than 72 hours after becoming aware of the Security Incident</li>
            <li>Provide you with sufficient information about the Security Incident to allow you to meet any data breach notification obligations you may have</li>
            <li>Take reasonable steps to mitigate the effects and minimize any damage resulting from the Security Incident</li>
            <li>Cooperate with you in any investigation of the Security Incident</li>
          </ul>
          <h2>4. Sensitive Data Restrictions</h2>
          <p>Unless expressly required by the Services for athlete profile management, you shall ensure that Your Content does not contain any of the following categories of sensitive data:</p>
          <ul>
            <li>Social security numbers, passport numbers, driver&apos;s license numbers, or similar government identifiers (except as minimally necessary for payment processing and tax compliance)</li>
            <li>Full credit or debit card numbers (other than the truncated last four digits)</li>
            <li>Athlete medical information, injury details, or health records</li>
            <li>Information about athletes under the age of 16 without proper parental consent and legal authorization</li>
            <li>Any other information that falls within the definition of &quot;special categories of data,&quot; &quot;sensitive data,&quot; or &quot;sensitive personal information&quot; under applicable data protection laws</li>
          </ul>
          <h2>5. Applicable Laws and Compliance</h2>
          <p>You shall use the Services in compliance with all applicable laws, including those related to:</p>
          <ul>
            <li>Athlete representation and agency regulations</li>
            <li>Professional sports league collective bargaining agreements and player association rules</li>
            <li>NIL (Name, Image, Likeness) regulations for collegiate athletes where applicable</li>
            <li>Advertising standards and FTC endorsement disclosure requirements</li>
            <li>Data privacy laws including PIPEDA (Canada), GDPR (EU), and applicable state privacy laws</li>
            <li>Employment and independent contractor classification laws</li>
          </ul>
          <p>You represent and warrant that you have the legal right to share all Your Content with endo and that such sharing complies with all applicable data protection laws, athlete representation agreements, and brand partnership contracts.</p>
          <h2>6. Your Privacy Rights</h2>
          <p>Depending on your jurisdiction, you may have rights regarding your personal information, including the right to access, correct, or request deletion of your data. To exercise any such rights, please contact us at admin@endodeals.com. We will respond in accordance with applicable law, including PIPEDA (Canada), GDPR (EU), and applicable U.S. state privacy laws.</p>
          <h2>7. Data Retention and Termination</h2>
          <p>endo may retain or delete Your Content following termination of your account, in its discretion, except to the extent endo is required to retain or delete such data under applicable law. endo may retain Aggregated Usage Data that has been sufficiently anonymized.</p>
          <p>Each party shall return or destroy all Confidential Information of the other party in its possession upon termination, except as required to be retained under applicable law.</p>
          <h2>8. Governing Law</h2>
          <p>This Privacy Policy is governed by the laws of the Province of Ontario, applicable therein, without reference to conflicts of laws principles.</p>
          <h2>9. Changes to This Policy</h2>
          <p>We may update or modify this Privacy Policy from time to time. We will provide notice of material changes by posting the revised Policy on our website and/or notifying you by email, and the revised terms will take effect on the date stated in that notice. Your continued use of the Services after that date constitutes your acceptance of the revised Policy.</p>
          <h2>10. Contact Us</h2>
          <p>All notices and inquiries regarding this Privacy Policy must be sent to:</p>
          <p>endo Sports and Entertainment Inc.<br />Email: admin@endodeals.com</p>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
