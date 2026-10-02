import type { Metadata } from "next";
import Link from "next/link";
import pageStyles from "../page.module.css";
import { SiteFooter, SiteHeader } from "../site-chrome";
import styles from "../legal.module.css";
import { shareMetadata } from "@/lib/share-metadata";

export const metadata: Metadata = {
  title: "Terms of Service · endo",
  ...shareMetadata("Terms of Service · endo"),
};

// Terms of Service, September 2026 revision (endo - Terms of Service_Sept 2026, redline accepted).
export default function TermsPage() {
  return (
    <div className={pageStyles.page}>
      <SiteHeader />

      <main id="top" className={styles.legal}>
        <article>
          <header>
            <h1>endo Services Agreement</h1>
            <p>Endo Sports and Entertainment Inc.</p>
            <p>Last updated: September 16, 2026</p>
          </header>
          <p>This endo Services Agreement (the &quot;Agreement&quot;) is between Endo Sports and Entertainment Inc. (&quot;endo&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;) and the individual or entity that creates an account, starts a trial, signs an Order Form, or otherwise accesses or uses the Services (&quot;You&quot; or &quot;Your&quot;). By creating an account, signing an Order Form or using the Services, You accept and agree to be bound by this Agreement. This Agreement sets forth the terms and conditions that govern Your access to and use of the Services.</p>
          <h2>1. Use of the Services</h2>
          <p>
            <strong>1.1 Services.</strong> We will make the endo services described on our website and in any applicable Order Form (the &quot;Services&quot;) available to You pursuant to this Agreement during the Services Period. &quot;Services Period&quot; means (a) where You have signed an Order Form, the services period stated in that Order Form, including any renewal period; and (b) in all other cases, the period beginning on the date You create an account, including during any free trial we offer, and continuing for as long as Your subscription to the Services remains active; in each case unless earlier terminated in accordance with this Agreement.
          </p>
          <p>
            <strong>1.2 Your Account.</strong> You must register for an account to subscribe to the Services, which requires a username, an email address, a password, and other information relating to your use of the Services. You are responsible for maintaining the confidentiality of your username and password, endo recommends that you use a strong password, that you change it frequently, and that you do not reuse passwords. You agree not to disclose your username or password to any third party. Endo may reject, or require that you change, your username or password. You represent and warrant to endo that you have not misrepresented any information that you have provided to us in connection with your account. You are solely responsible for all activities that occur under your account. If you become aware of any unauthorized use of your account, you must notify endo immediately. It is your responsibility to update or change your account information, as appropriate. Certain features and functionality relating to the Services or the endo Platform (as defined below) may only be available with specific account levels.
          </p>
          <p>
            <strong>1.3 Your Privacy and Personal Information.</strong> For a summary of how endo collects, uses and discloses Personal Information, please see endo’s Privacy Policy available at <Link href="/privacy">www.endodeals.com/privacy</Link>.
          </p>
          <p>
            <strong>1.4 Grant of Access.</strong> Subject to and conditional upon Your continued compliance with the terms and conditions of this Agreement, endo grants you a personal, revocable, non-exclusive, limited, non-sublicensable, non-transferable right to access and use the Services to manage athlete marketing and endorsement partnerships during the Services Period, solely for Your internal business operations and not for any commercial purpose other than for transactions specifically enabled by the functionality of the Services. You may allow Your Users (as defined below) to access and use the Services for this purpose, and You are responsible for their compliance with this Agreement. All content and information available or accessible via your use of the Services is provided for informational purposes only, and You are solely responsible for your use of any such content and information and use it at your own risk.
          </p>
          <p>
            <strong>1.5 Service Updates.</strong> The Services, including any plan-specific features, limits, or trial restrictions, are described on our website and in any applicable Order Form. During the Services Period, we may update the Services to reflect changes in, among other things, laws, regulations, rules, technology, industry practices, patterns of system use, and availability of Third Party Content (as defined below). endo&apos;s updates to the Services will not materially reduce the overall level of performance, functionality, security or availability of the Services during Your then-current Services Period.
          </p>
          <p>
            <strong>1.6 Acceptable Use.</strong> You may not, and may not cause or permit others to:
          </p>
          <p className={styles.item}>(a) make the Services or the content and information available or accessible via your use of the Services available to, or use same for the benefit of, anyone other than Yourself;</p>
          <p className={styles.item}>(b) use the Services to harass any person; cause damage or injury to any person or property; publish any material that is false, defamatory, harassing or obscene; violate privacy rights; promote bigotry, racism, hatred or harm; send unsolicited bulk e-mail, junk mail, spam or chain letters; infringe intellectual or other property rights; sell, manufacture, market and/or distribute any product or service in violation of applicable laws; or otherwise violate applicable laws, ordinances or regulations;</p>
          <p className={styles.item}>(c) perform or disclose any benchmarking or availability testing of the Services;</p>
          <p className={styles.item}>(d) perform or disclose any performance or vulnerability testing of the Services without endo&apos;s prior written approval, or perform or disclose network discovery, port and service identification, vulnerability scanning, password cracking or remote access testing of the Services; or</p>
          <p className={styles.item}>(e) use the Services to perform cyber currency or crypto currency mining</p>
          <p>((a) through (e) collectively, the &quot;Acceptable Use Policy&quot;). In addition to other rights that we have under this Agreement, we have the right to take remedial action if the Acceptable Use Policy is violated, and such remedial action may include removing or disabling access to content or material that violates the Acceptable Use Policy, or suspending or terminating Your access to the Services.</p>
          <h2>2. Fees and Payment Terms</h2>
          <p>
            <strong>2.1 Self-Serve Subscriptions.</strong> Where You subscribe to Services online without an Order Form, You will pay the fees for Your selected plan at checkout and on each renewal of Your subscription thereafter, using the payment method on file. Your subscription will renew automatically at the end of each billing cycle unless cancelled in accordance with this Agreement. You may cancel at any time through Your account settings; cancellation takes effect at the end of Your then-current billing cycle, and no refunds or credits will be issued for the remainder of that cycle.
          </p>
          <p>
            <strong>2.2 Order Form Subscriptions.</strong> Where You have signed an Order Form, the fees, invoicing schedule, payment terms, Services Period and renewal terms set out in that Order Form apply. You commit to the full Services Period stated in the Order Form, and the right to cancel under Section 2.1 does not apply. Fees under an Order Form are payable for the full Services Period and are non-cancellable and non-refundable, except as expressly provided in this Agreement or the Order Form.
          </p>
          <p>
            <strong>2.3 Taxes.</strong> Fees are exclusive of taxes and expenses unless expressly stated otherwise. You will pay any sales, value-added, goods and services, harmonized sales (HST) or other similar taxes imposed by applicable law that we must collect based on the Services You purchase, except for taxes based on endo&apos;s income.
          </p>
          <p>
            <strong>2.4 Late Payment.</strong> Undisputed amounts not paid when due will bear interest at 1.5% per month (18% per year), or the maximum rate permitted by law if lower, and You will reimburse endo&apos;s reasonable costs of collection.
          </p>
          <h2>3. Ownership and Restrictions</h2>
          <p>
            <strong>3.1 endo Intellectual Property.</strong> You acknowledge and agree that, as between You and endo, endo is the sole and exclusive owner of the Services, the endo Platform, and the endo Trademarks (collectively, the &quot;endo Intellectual Property&quot;). We or our licensors retain all ownership and intellectual property rights in and to the endo Intellectual Property, derivative works thereof, and anything developed or delivered by or on behalf of us under this Agreement, excluding Your Content (as defined below). You shall not represent that You have any ownership of, or any proprietary rights in, the endo Intellectual Property, and do not require any rights therein other than the limited grant of access provided in Section 1.4 of this Agreement.
          </p>
          <p>
            <strong>3.2 Your Content.</strong> You or Your licensors retain all ownership of and intellectual property rights in and to Your Content, and are responsible for ensuring (and represent and warrant to endo) that you have all rights necessary in Your Content to authorize its usage in connection with the Services.
          </p>
          <p>
            <strong>3.3 Rights and Responsibilities Respecting Your Content.</strong> You represent and warrant that (a) You have the authority to grant, and do grant, us the right to host, use, process, display and transmit Your Content to provide the Services pursuant to and in accordance with this Agreement, and (b) You have the legal right to share all of Your Content with endo and that such sharing complies with all applicable data protection laws, athlete representation agreements, and brand partnership contracts. You shall comply with all applicable laws regarding the collection, storage and processing of Personal Information.
          </p>
          <p>You have sole responsibility for the accuracy, quality, integrity, legality, reliability, and appropriateness of Your Content, and for obtaining all authorizations, permissions, and rights related to Your Content that may be required by endo to perform the Services, including all necessary authorizations and consents from represented athletes and brand partners.</p>
          <p>
            <strong>3.4 Restrictions.</strong> Except as permitted by this Agreement, You may not, and may not cause or permit others to:
          </p>
          <p className={styles.item}>(a) alter, modify, make derivative works of, disassemble, decompile, reverse engineer, reproduce, republish, download, or copy any part of the endo Platform and/or the Services (including data structures or similar materials produced by programs, and any content or information available or accessible via your use of the Services) other than as permitted by this Agreement;</p>
          <p className={styles.item}>(b) access or use the endo Platform and/or the Services to build or support, directly or indirectly, products or services competitive to endo; or</p>
          <p className={styles.item}>(c) license, sell, transfer, assign, distribute, outsource, permit timesharing or service bureau use of, commercially exploit, or make available the endo Platform and/or the Services to any third party.</p>
          <h2>4. Non-Disclosure</h2>
          <p>
            <strong>4.1 Confidential Information.</strong> During the term of this Agreement, each party (the &quot;Disclosing Party&quot;) may provide the other party (the &quot;Receiving Party&quot;) with information that is confidential (&quot;Confidential Information&quot;). endo&apos;s Confidential Information includes: the terms and pricing of this Agreement and any Order Form; the endo Intellectual Property, including the Valuation Engine methodology, scoring and algorithms; Aggregated Usage Data and market benchmarking data; endo Platform architecture, features and roadmap details; endo&apos;s pricing methodology and business strategies; and all information clearly identified by endo as confidential at the time of disclosure. Your Confidential Information includes: Your Content residing in the Services; Your athlete roster and representation agreements; Your financial information regarding deal values, payment terms and commission structures; Your business operations and marketing strategies; information about Your brand relationships and partnership negotiations; and all information clearly identified by You as confidential at the time of disclosure.
          </p>
          <p>
            <strong>4.2 Exclusions.</strong> Confidential Information does not include information that: (a) is or becomes part of the public domain through no act or omission of the Receiving Party; (b) was in the Receiving Party&apos;s lawful possession prior to the disclosure and was not obtained by the Receiving Party, directly or indirectly, from the Disclosing Party; (c) is lawfully disclosed to the Receiving Party by a third party without restriction on disclosure; or (d) is independently developed by the Receiving Party without use of or reference to the Disclosing Party&apos;s Confidential Information.
          </p>
          <p>
            <strong>4.3 Obligations.</strong> The Receiving Party will not disclose the Disclosing Party&apos;s Confidential Information to any third party, except as permitted in this Section 4, for a period of five (5) years from the date of disclosure; however, endo will protect the confidentiality of Your Content residing in the Services for as long as such information resides in the Services. Each party may disclose Confidential Information only to those employees, agents, professional advisors or subcontractors who need to know it and who are required to protect it against unauthorized disclosure in a manner no less protective than required under this Agreement. Each party may disclose the other party&apos;s Confidential Information in any legal proceeding or to a governmental entity as required by law, subject to Section 4.4.
          </p>
          <p>
            <strong>4.4 Compelled Disclosure.</strong> If the Receiving Party, or anyone to whom it transmits Confidential Information pursuant to this Agreement, becomes legally compelled to disclose any of the Disclosing Party&apos;s Confidential Information, the Receiving Party will, to the extent permitted by law, provide the Disclosing Party with prompt notice so that the Disclosing Party may seek a protective order or other appropriate remedy and/or waive compliance with the provisions of this Agreement. This obligation is particularly important where disclosure involves Personal Information or confidential brand partnership information, as such disclosure may violate representation agreements, partnership contracts or data privacy laws.
          </p>
          <p>
            <strong>4.5 Equitable Relief.</strong> In the event of any actual or anticipated breach of this Section 4, the parties acknowledge that such breach may not be adequately compensated by damages and that the non-breaching party may, in addition to any other remedy or relief, enforce the performance of this Section 4 by way of injunction or specific performance upon application to a court of competent jurisdiction without proof of actual damage. The parties acknowledge that unauthorized disclosure of athlete data or brand partnership information could cause irreparable harm to the parties&apos; business relationships and reputation.
          </p>
          <p>
            <strong>4.6 Ownership of Confidential Information.</strong> The Receiving Party acknowledges that the Disclosing Party retains all right, title and interest in and to all Confidential Information made available or disclosed by the Disclosing Party to the Receiving Party in connection with this Agreement.
          </p>
          <h2>5. Protection of Your Content</h2>
          <p>
            <strong>5.1 Safeguards.</strong> endo shall implement and maintain reasonable administrative, physical and technical safeguards designed to protect Your Content from unauthorized access, use, disclosure, alteration or destruction, including industry-standard secure development practices; however, endo has no obligation, nor any responsibility to any party to review Your Content or Third-Party Content, and we cannot ensure prompt removal of objectionable material after it has been posted and have no liability for any action or inaction regarding transmissions, communications, or content provided by any User or third-party, subject to applicable laws.
          </p>
          <p>
            <strong>5.2 Use of Your Content.</strong> endo shall process Your Content solely for the purpose of providing the Services and in accordance with Your documented instructions as set forth in this Agreement. endo shall not use Your Content for any purpose other than providing the Services unless expressly permitted by this Agreement (such as the creation of Aggregated Usage Data under Section 12).
          </p>
          <p>
            <strong>5.3 Hosting and Sub-processors.</strong> Your Content shall be stored on secure cloud infrastructure. endo may use third-party data processors and cloud service providers to store and process Your Content, provided that such third parties are bound by confidentiality and data protection obligations at least as protective as those in this Agreement.
          </p>
          <p>
            <strong>5.4 Security Incidents.</strong> In the event of any unauthorized access to, or acquisition, disclosure or loss of, Your Content (a &quot;Security Incident&quot;), endo shall:
          </p>
          <p className={styles.item}>(a) notify You without undue delay, and no later than seventy-two (72) hours after becoming aware of the Security Incident;</p>
          <p className={styles.item}>(b) provide You with sufficient information about the Security Incident to allow You to meet any data breach notification obligations You may have;</p>
          <p className={styles.item}>(c) take reasonable steps to mitigate the effects of, and minimize any damage resulting from, the Security Incident; and</p>
          <p className={styles.item}>(d) cooperate with You in any investigation of the Security Incident.</p>
          <p>
            <strong>5.5 Your Warranties.</strong> You represent and warrant that You have the legal right to share all of Your Content with endo and that such sharing complies with all applicable data protection laws, athlete representation agreements and brand partnership contracts. You shall comply with all applicable laws regarding the collection, storage and processing of athlete personal data and marketing partnership information.
          </p>
          <p>
            <strong>5.6 Sensitive Data.</strong> Unless expressly required by the Services for athlete profile management (if such Services are part of your subscription to the Services), You shall ensure that Your Content does not contain any of the following:
          </p>
          <p className={styles.item}>(a) social insurance numbers, social security numbers, passport numbers, driver&apos;s licence numbers or similar government identifiers (except as minimally necessary for payment processing and tax compliance);</p>
          <p className={styles.item}>(b) full credit or debit card numbers (other than the truncated last four digits);</p>
          <p className={styles.item}>(c) athlete medical information, injury details or health records;</p>
          <p className={styles.item}>(d) information about athletes under the age of sixteen (16) without proper parental or guardian consent and legal authorization; or</p>
          <p className={styles.item}>(e) any other information that falls within the definition of &quot;special categories of data&quot;, &quot;sensitive data&quot; or &quot;sensitive personal information&quot; under applicable data protection laws.</p>
          <p>
            <strong>5.7 Compliance with Laws.</strong> You shall use the endo Platform and the Services in compliance with this Agreement and all applicable local, provincial, state, federal and foreign laws, including without limitation those related to:
          </p>
          <p className={styles.item}>(a) athlete representation and agency regulations;</p>
          <p className={styles.item}>(b) professional sports league collective bargaining agreements and players&apos; association rules;</p>
          <p className={styles.item}>(c) name, image and likeness (NIL) regulations for collegiate athletes, where applicable;</p>
          <p className={styles.item}>(d) advertising and endorsement disclosure requirements, including the Competition Act (Canada), the Canadian Code of Advertising Standards and the U.S. Federal Trade Commission Endorsement Guides;</p>
          <p className={styles.item}>(e) data privacy laws, including the Personal Information Protection and Electronic Documents Act (PIPEDA) and other provincial privacy laws in Canada, the EU General Data Protection Regulation (GDPR), and applicable U.S. state privacy laws, as may be applicable; and</p>
          <p className={styles.item}>(f) employment and independent contractor classification laws.</p>
          <h2>6. Third-Party Services and Integrations</h2>
          <p>
            <strong>6.1 Third-Party Services.</strong> You acknowledge and agree that the Services may operate on, with or using application programming interfaces (APIs) and/or other websites, platforms, content, products, services and information operated or provided by third parties (collectively, &quot;Third-Party Services&quot;), including without limitation:
          </p>
          <p className={styles.item}>(a) social media platforms (such as Instagram, X (formerly Twitter), TikTok, YouTube and Facebook) for engagement data retrieval;</p>
          <p className={styles.item}>(b) calendar services (such as Google Calendar and Outlook) for deliverable deadline synchronization;</p>
          <p className={styles.item}>(c) communication platforms for notification delivery;</p>
          <p className={styles.item}>(d) cloud storage services for contract and creative asset management; and</p>
          <p className={styles.item}>(e) payment processing and invoicing integrations.</p>
          <p>
            <strong>6.2 No Responsibility for Third-Party Services or Content.</strong> Integrations with Third-Party Services may be provided by endo as part of the endo Platform functionality. Except as expressly provided in this Agreement, endo is not responsible for the operation of any Third-Party Services, nor for the availability or operation of the Services to the extent such availability and operation depend upon Third-Party Services, nor for any Third-Party Content that may be accessible via the Services or the endo Platform. You use Third-Party Services and Third-Party Content at your own risk, and endo does not make any representations or warranties with respect to Third-Party Services, Third-Party Content, or any third-party providers.
          </p>
          <p>
            <strong>6.3 Your Relationship with Third Parties.</strong> Any exchange of data or other interaction between You and a third-party provider is solely between You and that third-party provider and is governed by that third-party&apos;s terms and conditions. You are responsible for maintaining the accounts, authorizations and API access with Third-Party Services required for endo Platform integrations. All ownership and intellectual property rights in and to Third-Party Content, and Your use of such content, are subject to and governed by the separate third party terms applicable between You and the relevant third party.
          </p>
          <h2>7. Indemnification</h2>
          <p>
            <strong>7.1 By You.</strong> You will indemnify, defend and hold harmless endo and its directors, officers, employees, affiliates, agents, contractors, suppliers and licensors from and against any third-party claims arising from or in connection with:
          </p>
          <p className={styles.item}>(a) Your breach of this Agreement, Your use of the endo Platform or the Services other than as permitted pursuant to this Agreement, or Your violation of applicable laws, including without limitation athlete representation regulations, data privacy laws or sports marketing compliance requirements;</p>
          <p className={styles.item}>(b) Your negligence or wilful misconduct;</p>
          <p className={styles.item}>(c) Your breach of confidentiality or other contractual obligations applicable to You; or</p>
          <p className={styles.item}>(d) Your violation of any proprietary, privacy or intellectual property rights through Your use of the Services, the endo Platform, or Your Content, including without limitation the unauthorized use or disclosure of the name, image, likeness, or confidential information of any individual;</p>
          <p>
            <strong>7.2 By endo.</strong> endo will indemnify, defend and hold harmless You and Your directors, officers, employees, affiliates, agents, contractors, suppliers and licensors from and against any third-party claims directly arising from the infringement of any third-party intellectual property or proprietary rights by the endo Platform.
          </p>
          <p>
            <strong>7.3 Conditions and Exclusions.</strong> Each indemnifying party&apos;s obligations under this Section 7 are conditional upon the indemnified party providing the indemnifying party with: (a) prompt written notice of any claim; (b) the option to assume sole control over the defence and settlement of the claim; and (c) reasonable information and assistance in connection with that defence and settlement. endo&apos;s obligations under Section 7.2 do not apply to the extent that the endo Platform is:
          </p>
          <p className={styles.item}>(i) modified or customized in accordance with Your specifications;</p>
          <p className={styles.item}>(ii) modified or customized by You after delivery by endo;</p>
          <p className={styles.item}>(iii) combined with other products, processes or materials not provided by endo, where the alleged losses arise from or relate to such combination;</p>
          <p className={styles.item}>(iv) the subject of allegedly infringing activity that You continue after being notified of it, or after being informed of modifications that would have avoided the alleged infringement; or</p>
          <p className={styles.item}>(v) used by You other than in accordance with this Agreement.</p>
          <h2>8. Warranties, Disclaimers and Exclusive Remedies</h2>
          <p>
            <strong>8.1 Warranties.</strong> Each party represents that it has validly entered into this Agreement and that it has the power and authority to do so. We warrant that during the Services Period we will perform the Services using commercially reasonable care and skill and in all material respects as described in this Agreement. If the Services provided to You are not performed as warranted, You must promptly provide us with written notice describing the deficiency in the Services (including, as applicable, the service request number under which You notified us of the deficiency).
          </p>
          <p>
            <strong>8.2 Disclaimer.</strong> Except as expressly provided in Section 8.1, the Services and the endo Platform are provided &quot;as is&quot; and &quot;as available&quot;, and may include errors, omissions or other inaccuracies. Your access to and use of the Services and the endo Platform is at Your own risk. To the maximum extent permitted by law, endo disclaims all other warranties, representations, covenants, conditions and other terms (express, implied, statutory or otherwise) in connection with the Services and the endo Platform, including without limitation any warranties or conditions of: merchantability or fitness for a particular purpose; accuracy, completeness or reliability of deal valuation estimates, market benchmarks or athlete engagement metrics; uninterrupted or error-free operation of the endo Platform; security from unauthorized access or malicious code; compatibility with all third-party services or social media platforms; and achievement of specific partnership outcomes, deal values or athlete performance results.
          </p>
          <p>
            <strong>8.3 Valuation Outputs.</strong> endo makes no representation or warranty that the Valuation Engine or market benchmarking features will result in optimal pricing for any specific partnership, and does not guarantee the accuracy of valuation outputs. All valuations are estimates based on available data and should be reviewed by You before use in negotiations.
          </p>
          <p>
            <strong>8.4 Exclusive Remedy.</strong> Subject to any rights You may have under Section 10.3, Your sole and exclusive remedy for dissatisfaction with the Services or the endo Platform is to stop using them.
          </p>
          <h2>9. Limitation of Liability</h2>
          <p>
            <strong>9.1</strong> IN NO EVENT WILL ENDO OR ITS AFFILIATES BE LIABLE FOR ANY INDIRECT, CONSEQUENTIAL, INCIDENTAL, SPECIAL, PUNITIVE OR EXEMPLARY DAMAGES, OR ANY LOSS OF REVENUE, PROFITS (EXCLUDING FEES UNDER THIS AGREEMENT), SALES, DATA, DATA USE, GOODWILL OR REPUTATION.
          </p>
          <p>
            <strong>9.2</strong> IN NO EVENT SHALL THE AGGREGATE LIABILITY OF ENDO ARISING OUT OF OR RELATED TO THIS AGREEMENT, WHETHER IN CONTRACT, TORT OR OTHERWISE, EXCEED THE TOTAL AMOUNTS ACTUALLY PAID BY YOU FOR THE SERVICES GIVING RISE TO THE LIABILITY DURING THE SIX (6) MONTHS IMMEDIATELY PRECEDING THE DATE OF THE EVENT GIVING RISE TO SUCH LIABILITY.
          </p>
          <h2>10. Term and Termination</h2>
          <p>
            <strong>10.1 Term.</strong> This Agreement remains in effect for the Services Period, or, where no Order Form applies, for as long as You maintain an active account or subscription, in each case unless earlier terminated in accordance with this Agreement.
          </p>
          <p>
            <strong>10.2 Suspension.</strong> We may suspend Your and/or Your Users&apos; access to, or use of, the Services if we believe that: (a) there is a significant threat to the functionality, security, integrity or availability of the Services or any content, data or applications in the Services; (b) You or Your Users are accessing or using the Services to commit an illegal act; (c) there is a violation of the Acceptable Use Policy or this Agreement; or (d) You provided false account or payment information, Your payment method is refused, or undisputed fees under an Order Form are overdue. When reasonably practicable and lawfully permitted, we will provide You with advance notice of any such suspension. We will use reasonable efforts to re-establish the Services promptly after we determine that the issue causing the suspension has been resolved. During any suspension period, we will make Your Content (as it existed on the suspension date) available to You. Any suspension under this Section shall not excuse You from Your payment obligations.
          </p>
          <p>
            <strong>10.3 Termination for Cause.</strong> In addition to any right You may have to cancel a self-serve subscription under Section 2.1, either party may terminate this Agreement immediately by written notice to the other party if:
          </p>
          <p className={styles.item}>(a) the other party is in material breach of any provision of this Agreement and fails to cure that breach within thirty (30) days of receiving written notice of it;</p>
          <p className={styles.item}>(b) the other party is in material breach of Section 4 (Nondisclosure) or Section 5 (Protection of Your Content), and written notice of the breach has been provided to that party;</p>
          <p className={styles.item}>(c) the other party becomes the subject of a voluntary petition in bankruptcy or any voluntary proceeding relating to insolvency, receivership, liquidation or assignment for the benefit of creditors; or</p>
          <p className={styles.item}>(d) the other party becomes the subject of an involuntary petition in bankruptcy or any involuntary proceeding relating to insolvency, receivership, liquidation or assignment for the benefit of creditors, and that petition or proceeding is not dismissed within ninety (90) days of filing.</p>
          <p>
            <strong>10.4 Effect of Termination.</strong> Upon termination or expiry of this Agreement, Your access to the endo Platform and the Services will end, and You shall pay all outstanding fees owed through the effective date of termination (or, where endo terminates under Section 10.3 for Your breach, all fees for the remainder of the Services Period under any Order Form). For thirty (30) days after termination or expiry (the &quot;Export Period&quot;), endo will, on Your written request, make Your Content available to You for export in a commonly used format. After the Export Period, endo may delete Your Content, except to the extent endo is required to retain it under applicable law, and except that endo may retain Aggregated Usage Data. Each party shall return or destroy all other Confidential Information of the other party in its possession, except as required to be retained under applicable law.
          </p>
          <p>
            <strong>10.5 Survival.</strong> All provisions of this Agreement that by their nature should survive termination shall survive, including without limitation: Fees and Payment Terms (Section 2); Ownership and Restrictions (Section 3); Nondisclosure (Section 4); Protection of Your Content (Section 5); Indemnification (Section 7); Warranties, Disclaimers and Exclusive Remedies (Section 8); Limitation of Liability (Section 9); Effect of Termination (Section 10.4); Aggregated Usage Data (Section 12); and General Provisions (Section 14).
          </p>
          <h2>11. Assignment</h2>
          <p>
            <strong>11.1</strong> You may not assign this Agreement, or give or transfer the Services or any interest in the Services to another individual or entity, without endo&apos;s prior written consent.
          </p>
          <h2>12. Aggregated Usage Data and Artificial Intelligence</h2>
          <p>
            <strong>12.1</strong> endo may derive from the use and operation of the Services aggregated and anonymized data, including engagement metrics, deal valuation benchmarks, market rates, deliverable completion rates, payment cycles and other performance data, that does not identify any specific athlete, brand or agency (&quot;Aggregated Usage Data&quot;).
          </p>
          <p>
            <strong>12.2</strong> endo may use and disclose Aggregated Usage Data to analyze and improve the Services, develop market intelligence, enhance the Valuation Engine and for other lawful business purposes, provided that such data is sufficiently anonymized to prevent identification of You, Your represented athletes and Your specific brand partners.
          </p>
          <p>
            <strong>12.3</strong> The endo Platform and the Services use artificial intelligence models, machine learning and large language models. Such models, and the weighting systems, algorithms, decision trees, specifications, parameters, methods, methodologies, techniques, procedures and processes used and created by endo are integrated within the endo Platform and the Services (collectively, the “AI Models”). Use of the AI Models may provide You the right to submit prompts, instructions or other inputs to the AI Models (the “AI Inputs”), which may generate suggestions, answers, responses, feedback, insights, information or other outputs (the “AI Outputs”). Without limiting Section 8.2, endo: (a) expressly disclaims and provides no representations, warranties or covenants in relation to the AI Outputs, or use thereof, including any and implied warranties and conditions of fitness for a particular purposes, merchantability, non-infringement, title, completeness or accuracy; and (b) will have no liability or indemnification obligations for any loss, harm, damage or claim arising out of or in connection with the AI Outputs, or reliance by you or any other person on the AI Outputs.
          </p>
          <h2>13. Notice</h2>
          <p>
            <strong>13.1</strong> All notices to endo must be sent to admin@endodeals.com, and all notices to You must be sent to the email address set out in the applicable Order Form or, if none, the email address provided at signup, or in each case to such other email address as either party may designate in writing to the other in accordance with this Section.
          </p>
          <p>
            <strong>13.2</strong> Notice will be treated as given on receipt, as confirmed by written or electronic records. For notices regarding Security Incidents or other urgent matters, endo may also provide notice by telephone or other immediate communication method, to be followed by written confirmation.
          </p>
          <h2>14. General Provisions</h2>
          <p>
            <strong>14.1 Entire Agreement and Order of Precedence.</strong> This Agreement, together with any Order Form, contains the entire agreement between endo and You with respect to its subject matter and supersedes all prior or contemporaneous understandings, agreements or representations, whether written or oral, regarding that subject matter. If there is any conflict between an Order Form and this Agreement, the Order Form governs to the extent of the conflict, including with respect to the Services Period, fees, payment terms, renewal and cancellation.
          </p>
          <p>
            <strong>14.2 Governing Law.</strong> This Agreement is governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein, without reference to conflicts of laws principles. The parties attorn to the exclusive jurisdiction of the courts located in Toronto, Ontario.
          </p>
          <p>
            <strong>14.3 Force Majeure.</strong> endo will not be deemed to be in breach of this Agreement for any failure or delay in performance caused by reasons beyond its reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, pandemics, strikes, or shortages of transportation, facilities, fuel, energy, labour or materials.
          </p>
          <p>
            <strong>14.4 Changes to this Agreement.</strong> We may update or modify this Agreement from time to time. We will provide notice of material changes by posting the revised Agreement on our website and/or notifying You by email, and the revised terms will take effect on the date stated in that notice. Your continued use of the Services after that date constitutes Your acceptance of the revised Agreement. If You do not agree to a material change, Your sole remedy is to cancel Your subscription before the change takes effect. Where You have signed an Order Form, no change will modify the fees, Services Period or other terms set out in that Order Form, or materially reduce Your rights under this Agreement, until the start of the next renewal period, unless You agree in writing.
          </p>
          <p>
            <strong>14.5 Waiver.</strong> No waiver of any provision of this Agreement shall be effective unless in writing and signed by the waiving party. Any failure by either party to enforce any provision of this Agreement shall not constitute a waiver of that or any other provision.
          </p>
          <p>
            <strong>14.6 Relationship of the Parties.</strong> The parties are independent contractors. No agency, partnership, joint venture or employment relationship is created as a result of this Agreement, and neither party has any authority of any kind to bind the other in any respect.
          </p>
          <p>
            <strong>14.7 Limitation Period.</strong> Except for actions for non-payment or breach of endo&apos;s proprietary rights, no action, regardless of form, arising out of or relating to this Agreement may be brought by either party more than twelve (12) months after the cause of action has accrued, to the extent permitted by applicable law.
          </p>
          <p>
            <strong>14.8 Severability.</strong> If any provision of this Agreement is held to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that this Agreement shall otherwise remain in full force and effect and enforceable.
          </p>
          <p>
            <strong>14.9 Publicity.</strong> Neither party shall issue any press release or make any public statement regarding this Agreement without the prior written consent of the other party, except as required by law. However, unless otherwise agreed in an Order Form, endo may identify You as a customer of endo and may use Your name and logo in endo&apos;s customer lists, marketing materials and website.
          </p>
          <p>
            <strong>14.10 Export Controls.</strong> You shall comply with all applicable export and import control laws and regulations in Your use of the Services and shall not export, re-export or transfer the Services or any related technical data in violation of such laws and regulations.
          </p>
          <h2>15. Definitions</h2>
          <p>
            <strong>15.1</strong> &quot;endo Platform&quot; means the endo application and any right, title and interest in and to each of the following used or embedded in the endo Platform or otherwise owned by or in the name of endo or any of its affiliates: software, algorithms (including the Valuation Engine), data processing methodologies, engagement rate calculations, deal benchmarking systems, databases, user interfaces, equipment, tools, instructions, templates, systems, formulae, processes, methods, know-how, trade secrets, analysis, designs, reports, technical and functional information, specifications, research and development, inventions, discoveries, developments, concepts, ideas, Confidential Information of endo and other technology of endo, whether or not any of the foregoing are patentable or registrable under patent or similar laws or are protected by copyright law.
          </p>
          <p>
            <strong>15.2</strong> &quot;endo Trademarks&quot; means any trademark, logo, word mark or other indicia of endo, including without limitation &quot;endo&quot;, &quot;endodeals&quot;, and the endo logo.
          </p>
          <p>
            <strong>15.3</strong> &quot;Customer Data&quot; means Personal Information, contact details and biographical data; marketing contract terms, financial details and performance obligations; brand partner information and relationship history; social media engagement data and performance metrics; deliverable content, creative briefs and approval communications; and payment information and financial transaction records.
          </p>
          <p>
            <strong>15.4</strong> &quot;Order Form&quot; means an ordering document or order form for the Services signed by You and endo that references this Agreement.
          </p>
          <p>
            <strong>15.5</strong> &quot;Personal Information&quot; means information about an identifiable individual.
          </p>
          <p>
            <strong>15.6</strong> &quot;Third Party Content&quot; means all software, data, text, images, audio, video, photographs and other content and material, in any format, obtained or derived from third party sources outside of endo that You may access through, within or in conjunction with Your use of the Services. Examples of Third Party Content include data feeds from social network services, RSS feeds from blog posts, dictionaries and marketing data. Third Party Content includes third-party sourced materials accessed or obtained through Your use of the Services or any endo-provided tools.
          </p>
          <p>
            <strong>15.7</strong> &quot;Users&quot; means those employees, contractors and end users, as applicable, authorized by You or on Your behalf to use the Services in accordance with this Agreement. For Services that are specifically designed to allow Your clients, agents, customers, suppliers or other third parties to access the Services to interact with You, such third parties will be considered &quot;Users&quot; subject to the terms of this Agreement.
          </p>
          <p>
            <strong>15.8</strong> &quot;Valuation Engine&quot; means endo&apos;s proprietary athlete endorsement valuation methodology, scoring system and related algorithms used or embedded in the endo Platform, including the endodeals platform and scores, and any deal valuation, benchmarking or pricing outputs generated by them.
          </p>
          <p>
            <strong>15.9</strong> &quot;Your Content&quot; means all software, data, Customer Data (including Personal Information), text, images, audio, video, photographs, non-endo or third party applications, and other content and material, in any format, provided by You or any of Your Users that is uploaded to, stored in, or run on or through, the Services. The Services, endo-provided software, other endo products and services, the endo Intellectual Property, and all derivative works of any of them, do not fall within the meaning of &quot;Your Content&quot;. Your Content includes any Third Party Content that is brought by You into the Services through Your use of the Services or any endo-provided tools.
          </p>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
