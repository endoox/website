import type { Metadata } from "next";
import pageStyles from "../page.module.css";
import { SiteFooter, SiteHeader } from "../site-chrome";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms of Service · endo",
  openGraph: { title: "Terms of Service · endo", url: "./", siteName: "endo", type: "website" },
  twitter: { card: "summary", title: "Terms of Service · endo" },
};

// From https://www.endodeals.com/terms, with brand capitalization normalized to "endo".
export default function TermsPage() {
  return (
    <div className={pageStyles.page}>
      <SiteHeader />

      <main id="top" className={styles.legal}>
        <article>
          <header>
            <h1>endo Services Agreement</h1>
            <p>endo Sports and Entertainment Inc.</p>
            <p>Terms of Service — Version V1.1 (v1.1-2026-06)</p>
          </header>
          <p>This endo Services Agreement (the &quot;Agreement&quot;) is between endo Sports and Entertainment Inc. (&quot;endo&quot;) and the individual or entity that creates an account, starts a trial, or otherwise accesses or uses the Services (&quot;You&quot; or &quot;Your&quot;). By creating an account or using the Services, You accept and agree to be bound by this Agreement. This Agreement sets forth the terms and conditions that govern Your access to and use of the Services.</p>
          <h2>1. Use of the Services</h2>
          <p>
            <strong>1.1 Services.</strong> We will make the endo services described on our website (the &quot;Services&quot;) available to You pursuant to this Agreement. You have the non-exclusive, worldwide, limited, nonsublicensable, nontransferable right to access and use the Services to manage athlete marketing partnerships during the Services Period, solely for Your internal business operations. You may allow Your Users (as defined below) to use the Services for this purpose, and You are responsible for their compliance with this Agreement. &quot;Services Period&quot; means the period beginning on the date You create an account, including during any free trial we offer, and continuing for as long as Your subscription remains active, unless earlier terminated in accordance with this Agreement.
          </p>
          <p>
            <strong>1.2</strong> The Services, including any plan-specific features, limits, or trial restrictions, are described on our website. During the Services Period, we may update the Services to reflect changes in, among other things, laws, regulations, rules, technology, industry practices, patterns of system use, and availability of Third Party Content (as defined below). endo updates to the Services will not materially reduce the level of performance, functionality, security or availability of the Services during Your then-current Services Period.
          </p>
          <p>
            <strong>1.3</strong> You may not, and may not cause or permit others to: (a) use the Services to harass any person; cause damage or injury to any person or property; publish any material that is false, defamatory, harassing or obscene; violate privacy rights; promote bigotry, racism, hatred or harm; send unsolicited bulk e-mail, junk mail, spam or chain letters; infringe intellectual or other property rights; sell, manufacture, market and/or distribute any product or service in violation of applicable laws; or otherwise violate applicable laws, ordinances or regulations; (b) perform or disclose any benchmarking or availability testing of the Services; (c) perform or disclose any performance or vulnerability testing of the Services without endo&apos;s prior written approval, or perform or disclose network discovery, port and service identification, vulnerability scanning, password cracking or remote access testing of the Services; or (d) use the Services to perform cyber currency or crypto currency mining ((a) through (d) collectively, the &quot;Acceptable Use Policy&quot;). In addition to other rights that we have under this Agreement, we have the right to take remedial action if the Acceptable Use Policy is violated, and such remedial action may include removing or disabling access to material that violates the policy, or suspending or terminating Your access to the Services.
          </p>
          <h2>2. Fees and Payment Terms</h2>
          <p>
            <strong>2.1 Fees and Billing.</strong> You will pay the fees for Your selected plan at checkout and on each renewal of Your subscription thereafter, using the payment method on file. Your subscription will renew automatically at the end of each billing cycle unless cancelled. You may cancel at any time through Your account settings; cancellation takes effect at the end of Your then-current billing cycle, and no refunds or credits will be issued for the remainder of that cycle. You will pay any sales, value-added, or other similar taxes imposed by applicable law that we must collect based on the Services You purchase, except for taxes based on endo&apos;s income. Fees are exclusive of such taxes and expenses unless expressly stated otherwise.
          </p>
          <h2>3. Ownership and Restrictions</h2>
          <p>
            <strong>3.1</strong> You acknowledge and agree that endo is the sole and exclusive owner of the Services, the endo application (the &quot;endo Platform&quot;), the endo Technology, and the endo Trademarks (collectively, the &quot;endo Intellectual Property&quot;). You shall not represent that You have any ownership and/or any proprietary rights to, the endo Intellectual Property.
          </p>
          <p>
            <strong>3.2</strong> You or Your licensors retain all ownership and intellectual property rights in and to Your Content (as defined below). We or our licensors retain all ownership and intellectual property rights in and to the endo Intellectual Property, derivative works thereof, and anything developed or delivered by or on behalf of us under this Agreement.
          </p>
          <p>
            <strong>3.3</strong> You may have access to Third Party Content through use of the endo Platform and/or the Services. All ownership and intellectual property rights in and to Third Party Content and the use of such content is governed by separate third party terms between You and the third party.
          </p>
          <p>
            <strong>3.4</strong> You have the authority to and do grant us the right to host, use, process, display and transmit Your Content to provide the Services pursuant to and in accordance with this Agreement. You have sole responsibility for the accuracy, quality, integrity, legality, reliability, and appropriateness of Your Content, and for obtaining all rights related to Your Content, including all necessary consents from represented athletes and brand partners, required by endo to perform the Services.
          </p>
          <p>
            <strong>3.5</strong> Except as permitted by this Agreement You may not, and may not cause or permit others to: (a) modify, make derivative works of, disassemble, decompile, reverse engineer, reproduce, republish, download, or copy any part of the endo Platform and/or the Services (including data structures or similar materials produced by programs); (b) access or use the endo Platform and/or the Services to build or support, directly or indirectly, products or services competitive to endo; or (c) license, sell, transfer, assign, distribute, outsource, permit timesharing or service bureau use of, commercially exploit, or make available the endo Platform and/or the Services to any third party.
          </p>
          <h2>4. Nondisclosure</h2>
          <p>
            <strong>4.1</strong> During the period this Agreement is in effect each party (&quot;Disclosing Party&quot;) may provide the other party (&quot;Receiving Party&quot;) information that is confidential (&quot;Confidential Information&quot;). Confidential Information of endo shall be terms and pricing under the Agreement, endo Intellectual Property, including the Deal Valuation Engine methodology and algorithms, Aggregated Usage Data and market benchmarking data, endo Platform architecture, features, and roadmap details, pricing methodology and business strategies and all information clearly identified as confidential at the time of disclosure. Your Confidential Information shall be Your Content residing in the Services, Your athlete roster and representation agreements, financial information regarding deal values, payment terms, and commission structures, Your business operations and marketing strategies, information about Your brand relationships and partnership negotiations and all information clearly identified as confidential at the time of disclosure.
          </p>
          <p>
            <strong>4.2</strong> A party&apos;s Confidential Information shall not include information that: (a) is or becomes a part of the public domain through no act or omission of the other party; (b) was in the other party&apos;s lawful possession prior to the disclosure and had not been obtained by the other party either directly or indirectly from the disclosing party; (c) is lawfully disclosed to the other party by a third party without restriction on the disclosure; or (d) is independently developed by the other party.
          </p>
          <p>
            <strong>4.3</strong> Each party agrees not to disclose the other party&apos;s Confidential Information to any third party other than as set forth in the following sentence for a period of five years from the date of the disclosing party&apos;s disclosure of the Confidential Information to the receiving party; however, we will protect the confidentiality of Your Content residing in the Services for as long as such information resides in the Services. Each party may disclose Confidential Information only to those employees, agents or subcontractors who are required to protect it against unauthorized disclosure in a manner no less protective than required under this Agreement, and each party may disclose the other party&apos;s Confidential Information in any legal proceeding or to a governmental entity as required by law.
          </p>
          <p>
            <strong>4.4</strong> In the event that the Receiving Party or anyone to whom it transmits Confidential Information pursuant to this Agreement becomes legally compelled to disclose any of the Confidential Information of the Disclosing Party, the Receiving Party will, to the extent permitted by law, provide the Disclosing Party with prompt notice so that it may seek a protective order or other appropriate remedy and/or waive compliance with the provisions of this Agreement. This obligation is particularly important where disclosure involves athlete Personal Information or brand partnership confidential information, as such disclosure may violate representation agreements, partnership contracts, or data privacy laws.
          </p>
          <p>
            <strong>4.5</strong> In the event of any actual or anticipated breach of this Section 4, the parties acknowledge that such breach may not be able to be adequately compensated for by damages and that the non-defaulting party may, in addition to any other remedy or relief, enforce the performance of this Section 4 by way of injunction or specific performance upon application to a court of competent jurisdiction without proof of actual damage. The parties acknowledge that unauthorized disclosure of athlete data or brand partnership information could cause irreparable harm to the parties business relationships and reputation.
          </p>
          <p>
            <strong>4.6</strong> The Receiving Party acknowledges that the Disclosing Party shall retain all right, title and interest in and to all confidential information made available or disclosed by such Disclosing Party to the Receiving Party in connection with this Agreement.
          </p>
          <h2>5. Protection of Your Content</h2>
          <p>
            <strong>5.1</strong> endo shall implement and maintain reasonable administrative, and technical safeguards designed to protect Your Content from unauthorized access, use, disclosure, alteration, or destruction. Such measures shall include all secure development practices.
          </p>
          <p>
            <strong>5.2</strong> endo shall process Your Content solely for the purpose of providing the Services and in accordance with Your documented instructions as set forth in this Agreement. endo shall not use Your Content for any purpose other than providing the Services unless expressly permitted by this Agreement (such as the creation of Aggregated Usage Data as defined in Section 12).
          </p>
          <p>
            <strong>5.3</strong> Your Content shall be stored on secure cloud infrastructure. endo may use third-party data processors and cloud service providers to store and process Your Content, provided that such third parties are bound by confidentiality and data protection obligations at least as protective as those in this Agreement.
          </p>
          <p>
            <strong>5.4</strong> In the event of any unauthorized access to, or acquisition, disclosure, or loss of Your Content (&quot;Security Incident&quot;), endo shall: Notify You without undue delay and no later than 72 hours after becoming aware of the Security Incident; Provide You with sufficient information about the Security Incident to allow You to meet any data breach notification obligations You may have; Take reasonable steps to mitigate the effects and minimize any damage resulting from the Security Incident; Cooperate with You in any investigation of the Security Incident.
          </p>
          <p>
            <strong>5.5</strong> You represent and warrant that You have the legal right to share all Your Content with endo and that such sharing complies with all applicable data protection laws, athlete representation agreements, and brand partnership contracts. You shall comply with all applicable laws regarding the collection, storage, and processing of athlete personal data and marketing partnership information.
          </p>
          <p>
            <strong>5.6</strong> Unless expressly required by the Services for athlete profile management, You shall ensure that Your Content does not contain any of the following categories of sensitive data: Social security numbers, passport numbers, driver&apos;s license numbers, or similar government identifiers (except as minimally necessary for payment processing and tax compliance); Full credit or debit card numbers (other than the truncated last four digits); Athlete medical information, injury details, or health records; Information about athletes under the age of 16 without proper parental consent and legal authorization; any other information that falls within the definition of &quot;special categories of data,&quot; &quot;sensitive data&quot; or &quot;sensitive personal information&quot; under applicable data protection laws.
          </p>
          <p>
            <strong>5.7</strong> You shall use the endo Platform and/or Services in compliance with this Agreement and all applicable local, Provincial, Federal and foreign laws, including those related to: Athlete representation and agency regulations; Professional sports league collective bargaining agreements and player association rules; NIL (Name, Image, Likeness) regulations for collegiate athletes where applicable; Advertising standards and FTC endorsement disclosure requirements; Data privacy laws including PIPEDA (Canada), GDPR (EU), and state privacy law; Employment and independent contractor classification laws.
          </p>
          <h2>6. Third-Party Services and Integrations</h2>
          <p>
            <strong>6.1</strong> You acknowledge and agree that the Services may operate on, with or using application programming interfaces (APIs) and/or other third parties&apos; websites, platforms, content, products, services, and information operated or provided by third parties (collectively, &quot;Third-Party Services&quot;), including without limitation: Social media platforms (Instagram, Twitter, TikTok, YouTube, Facebook) for engagement data retrieval; Calendar services (Google Calendar, Outlook) for deliverable deadline synchronization; Communication platforms for notification delivery; Cloud storage services for contract and creative asset management; Payment processing and invoicing integrations.
          </p>
          <p>
            <strong>6.2</strong> Integrations to such Third-Party Services may be provided by endo as part of the endo Platform functionality. Except as expressly provided in this Agreement, endo is not responsible for the operation of any Third-Party Services nor the availability or operation of the Services to the extent such availability and operation is dependent upon Third-Party Services. endo does not make any representations or warranties with respect to Third-Party Services or any third-party providers.
          </p>
          <p>
            <strong>6.3</strong> Any exchange of data or other interaction between You and a third-party provider is solely between You and such third-party provider and is governed by such third party&apos;s terms and conditions. You are responsible for maintaining necessary accounts, authorizations, and API access with Third-Party Services required for Platform integrations.
          </p>
          <h2>7. Indemnification</h2>
          <p>
            <strong>7.1</strong> You will indemnify, defend and hold harmless endo and its directors, officers, employees, affiliates, agents, contractors, suppliers and licensors with respect to any third-party claims arising from or in connection with: Your breach of this Agreement, or violation of applicable laws, including athlete representation regulations, data privacy laws, or sports marketing compliance requirements; Your negligence or willful misconduct; Claims by athletes represented by You regarding unauthorized use of their data, name, image, or likeness; Claims by brand partners regarding breach of partnership agreements or confidentiality obligations; Your violation of any third-party intellectual property rights through use of the Services.
          </p>
          <p>
            <strong>7.2</strong> endo will indemnify, defend and hold harmless You and Your directors, officers, employees, affiliates, agents, contractors, suppliers and licensors with respect to any third-party claims arising from or in connection with the infringement, violation or misappropriation (or the alleged infringement, violation or misappropriation) of any third-party intellectual property or proprietary rights by the endo Platform or Services as provided by endo.
          </p>
          <p>
            <strong>7.3</strong> Each indemnifying party&apos;s indemnification obligations hereunder shall be conditioned upon the indemnified party providing the indemnifying party with: Prompt written notice of any claim; The option to assume sole control over the defense and settlement of any claim; and Reasonable information and assistance in connection with such defense and settlement. The foregoing obligations of endo do not apply with respect to the Services or any information, technology, materials or data to the extent: Not created or provided by endo (including without limitation Your Content); Made in whole or in part in accordance to Your specifications; Modified after delivery by endo; Combined with other products, processes or materials not provided by endo (where the alleged losses arise from or relate to such combination); Where You continue allegedly infringing activity after being notified thereof or after being informed of modifications that would have avoided the alleged infringement; or Your use of the Services is not strictly in accordance herewith.
          </p>
          <h2>8. Warranties, Disclaimers and Exclusive Remedies</h2>
          <p>
            <strong>8.1</strong> Each party represents that it has validly entered into this Agreement and that it has the power and authority to do so. We warrant that during the Services Period we will perform the Services using commercially reasonable care and skill and in all material respects. If the Services provided to You were not performed as warranted, You must promptly provide us with a written notice that describes the deficiency in the Services (including, as applicable, the service request number notifying us of the deficiency in the Services).
          </p>
          <p>
            <strong>8.2</strong> The Services are provided &quot;as is&quot; and &quot;as available&quot;, and may include errors, omissions, or other inaccuracies. Your access to and use of the Services is at Your own risk. endo disclaims all warranties, representations, covenants, conditions and other terms (express, implied, statutory or otherwise) in connection with the Services and the endo Platform. Without limiting the generality of the foregoing, endo disclaims any warranties of: Merchantability for a particular purpose; accuracy, completeness, or reliability of deal valuation estimates, market benchmarks, or athlete engagement metrics; uninterrupted or error-free operation of the platform; security from unauthorized access or malicious code; compatibility with all third-party services or social media platforms; achievement of specific partnership outcomes, deal values, or athlete performance results.
          </p>
          <p>
            <strong>8.3</strong> endo makes no representation or warranty that the Deal Valuation Engine or market benchmarking features will result in optimal pricing for any specific partnership or guarantee the accuracy of valuation outputs. All deal valuations are estimates based on available data and should be reviewed by You before use in negotiations.
          </p>
          <p>
            <strong>8.4</strong> Your sole and exclusive remedy for dissatisfaction with the Services or the endo Platform is to stop using them.
          </p>
          <h2>9. Limitation of Liability</h2>
          <p>
            <strong>9.1</strong> IN NO EVENT WILL EITHER PARTY OR ITS AFFILIATES BE LIABLE FOR ANY INDIRECT, CONSEQUENTIAL, INCIDENTAL, SPECIAL, PUNITIVE, OR EXEMPLARY DAMAGES, OR ANY LOSS OF REVENUE, PROFITS (EXCLUDING FEES UNDER THIS AGREEMENT), SALES, DATA, DATA USE, GOODWILL, OR REPUTATION.
          </p>
          <p>
            <strong>9.2</strong> IN NO EVENT SHALL THE AGGREGATE LIABILITY OF endo ARISING OUT OF OR RELATED TO THIS AGREEMENT, WHETHER IN CONTRACT, TORT, OR OTHERWISE, EXCEED THE TOTAL AMOUNTS ACTUALLY PAID FOR THE SERVICES GIVING RISE TO THE LIABILITY DURING THE SIX (6) MONTHS IMMEDIATELY PRECEDING THE DATE OF THE EVENT GIVING RISE TO SUCH LIABILITY.
          </p>
          <h2>10. Term and Termination</h2>
          <p>
            <strong>10.1</strong> This Agreement remains in effect for as long as You maintain an active account or subscription, unless earlier terminated in accordance with this Agreement.
          </p>
          <p>
            <strong>10.2</strong> We may suspend Your and/or Your Users&apos; access to, or use of, the Services if we believe that (a) there is a significant threat to the functionality, security, integrity, or availability of the Services or any content, data, or applications in the Services; (b) You or Your Users are accessing or using the Services to commit an illegal act; (c) there is a violation of the Acceptable Use Policy; or (d) You provided false account or payment information or Your digital payment method is refused. When reasonably practicable and lawfully permitted, we will provide You with advance notice of any such suspension. We will use reasonable efforts to re-establish the Services promptly after we determine that the issue causing the suspension has been resolved. During any suspension period, we will make Your Content (as it existed on the suspension date) available to You. Any suspension under this Section shall not excuse You from Your payment obligations.
          </p>
          <p>
            <strong>10.3</strong> In addition to Your right to cancel Your subscription under Section 2.1, either party may terminate this Agreement immediately by written notice to the other party if: The other party is in material breach of any provision of this Agreement and fails to cure such breach within thirty (30) days of receipt of written notice of the same; The other party is in material breach of Section 4 (Nondisclosure), or Section 5 (Protection of Your Content), and written notice has been provided to the other party advising of same; The other party becomes the subject of a voluntary petition in bankruptcy or any voluntary proceeding relating to insolvency, receivership, liquidation, or proceeding for the benefit of creditors; or The other party becomes the subject of an involuntary petition in bankruptcy or any involuntary proceeding for the benefit of creditors, if such petition or proceeding is not dismissed within 90 days of filing.
          </p>
          <p>
            <strong>10.4</strong> Upon termination of this Agreement, Your access to the endo Platform and Services shall immediately be terminated and You shall pay all outstanding Fees owed through the effective date of termination. endo may retain or delete Your Content following termination, in its discretion, except to the extent endo is required to retain or delete such data under applicable law, and except that endo may retain Aggregated Usage Data that has been sufficiently anonymized. Each party shall return or destroy all other Confidential Information of the other party in its possession, except as required to be retained under applicable law.
          </p>
          <p>
            <strong>10.5</strong> All provisions of this Agreement that by their nature should survive termination shall survive termination, including without limitation: Fees and Payment (Section 2); Ownership and Restrictions (Section 3); Nondisclosure (Section 4); Protection of Your Content (Section 5); Indemnification (Section 7); Warranty, Disclaimers and Exclusive Remedies (Section 8); Limitations of liability (Section 9); Aggregated Usage Data (Section 12); General provisions (Section 14).
          </p>
          <h2>11. Assignment</h2>
          <p>
            <strong>11.1</strong> You may not assign this Agreement or give or transfer the Services or any interest in the Services to another individual or entity.
          </p>
          <h2>12. Aggregated Usage Data</h2>
          <p>
            <strong>12.1</strong> endo may derive from the use and operation of the Services aggregated and anonymized data including athlete engagement metrics, deal valuation benchmarks, market rates, deliverable completion rates, payment cycles, and other partnership performance data that does not identify any specific athlete, brand, or agency (&quot;Aggregated Usage Data&quot;).
          </p>
          <p>
            <strong>12.2</strong> endo may use and disclose Aggregated Usage Data to analyze and improve the Services, develop market intelligence, enhance the Deal Valuation Engine, and for other lawful business purposes, provided that such data is sufficiently anonymized to prevent identification of You, Your represented athletes, or Your specific brand partners.
          </p>
          <h2>13. Notice</h2>
          <p>
            <strong>13.1</strong> All notices to endo must be sent to admin@endodeals.com, and all notices to You must be sent to the email address set forth in the applicable signup, or in each case, at such other email address as may be given in writing by either party to the other in accordance with this Section.
          </p>
          <p>
            <strong>13.2</strong> Notice will be treated as given on receipt, as confirmed by written or electronic records. For notices regarding security incidents, data breaches, or other urgent matters, endo may also provide notice by telephone or other immediate communication method, to be followed by written confirmation.
          </p>
          <h2>14. General Provisions</h2>
          <p>
            <strong>14.1</strong> This Agreement contains the entire agreement between endo and You with respect to the subject matter hereof and supersedes all prior or contemporaneous understandings, agreements, or representations, whether written or oral, regarding such subject matter.
          </p>
          <p>
            <strong>14.2</strong> This Agreement is governed by the laws of the Province of Ontario, applicable therein, without reference to conflicts of laws principles.
          </p>
          <p>
            <strong>14.3</strong> endo will not be deemed to be in breach of this Agreement for any failure or delay in performance caused by reasons beyond its reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, pandemics, strikes, or shortages of transportation, facilities, fuel, energy, labor or materials.
          </p>
          <p>
            <strong>14.4</strong> We may update or modify this Agreement from time to time. We will provide notice of material changes by posting the revised Agreement on our website and/or notifying You by email, and the revised terms will take effect on the date stated in that notice. Your continued use of the Services after that date constitutes Your acceptance of the revised Agreement. If You do not agree to a material change, Your sole remedy is to cancel Your subscription before the change takes effect. No waiver of any provision of this Agreement shall be effective unless in writing and signed by the waiving party. Any failure by either party to enforce any provision of this Agreement shall not constitute a waiver by such party thereof or of any other provision.
          </p>
          <p>
            <strong>14.5</strong> endo is an independent contractor and each party agrees that no agency, partnership, joint venture, or employment relationship is created as a result of this Agreement and neither party has any authority of any kind to bind the other in any respect.
          </p>
          <p>
            <strong>14.6</strong> Except for actions for nonpayment or breach of endo&apos;s proprietary rights, no action, regardless of form, arising out of or relating to this Agreement may be brought by either party more than twelve (12) months after the cause of action has accrued.
          </p>
          <p>
            <strong>14.7</strong> If any provision of this Agreement is held to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that this Agreement shall otherwise remain in full force and effect and enforceable.
          </p>
          <p>
            <strong>14.8</strong> Neither party shall issue any press release or make any public statement regarding this Agreement without the prior written consent of the other party, except as may be required by law. However, endo may identify You as a customer of endo and may use Your name and logo in endo&apos;s customer lists, marketing materials, and website.
          </p>
          <p>
            <strong>14.9</strong> You shall comply with all applicable export and import control laws and regulations in its use of the Services and shall not export, re-export, or transfer the Services or any related technical data in violation of such laws and regulations.
          </p>
          <h2>15. Agreement Definitions</h2>
          <p>
            <strong>15.1</strong> &quot;endo Technology&quot; shall mean any right, title and interest in and to each of the following owned by or in the name of endo or any of its affiliates: software, algorithms (including the Deal Valuation Engine algorithms), data processing methodologies, engagement rate calculations, deal benchmarking systems, databases, user interfaces, equipment, tools, instructions, templates, systems, formulae, processes, methods, know how, trade secrets, analysis, designs, reports, technical and functional information, specifications, research and development, inventions, discoveries, developments, concepts, ideas, Confidential Information and other technology, whether or not any of the foregoing are patentable or registrable under patent or similar laws or are protected by copyright law.
          </p>
          <p>
            <strong>15.2</strong> &quot;endo Trademarks&quot; shall mean any trademark, logo, word mark or other indicia of endo, including, without limitation, &quot;endo&quot;, and the endo logo.
          </p>
          <p>
            <strong>15.3</strong> &quot;Customer Data&quot; means, athlete personal information, contact details, and biographical data, marketing contract terms, financial details, and performance obligations, brand partner information and relationship history, social media engagement data and performance metrics, deliverable content, creative briefs, and approval communications, payment information and financial transaction records.
          </p>
          <p>
            <strong>15.4</strong> &quot;Personal Information&quot; means information about an identifiable individual.
          </p>
          <p>
            <strong>15.5</strong> &quot;Third Party Content&quot; means all software, data, text, images, audio, video, photographs and other content and material, in any format, that are obtained or derived from third party sources outside of endo that You may access through, within, or in conjunction with Your use of, the Services. Examples of Third Party Content include data feeds from social network services, rss feeds from blog posts, dictionaries, and marketing data. Third Party Content includes third-party sourced materials accessed or obtained by Your use of the Services or any endo-provided tools.
          </p>
          <p>
            <strong>15.6</strong> &quot;Users&quot; means, for Services, those employees, contractors, and end users, as applicable, authorized by You or on Your behalf to use the Services in accordance with this Agreement. For Services that are specifically designed to allow Your clients, agents, customers, suppliers or other third parties to access the Services to interact with You, such third parties will be considered &quot;Users&quot; subject to the terms of this Agreement.
          </p>
          <p>
            <strong>15.7</strong> &quot;Your Content&quot; means all software, data, Customer Data (including Personal Information), text, images, audio, video, photographs, non-endo or third party applications, and other content and material, in any format, provided by You or any of Your Users that is stored in, or run on or through, the Services. Services under this Agreement, endo-provided Software, other endo products and services, and endo intellectual property, and all derivative works thereof, do not fall within the meaning of the term &quot;Your Content.&quot; Your Content includes any Third Party Content that is brought by You into the Services by Your use of the Services or any endo-provided tools.
          </p>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
