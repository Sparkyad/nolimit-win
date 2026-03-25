export const TermsView = () => {
  return (
    <div className="flex items-start mt-5 md:mt-0 md:items-center justify-center min-h-screen  px-5">
      <TermsForm />
    </div>
  );
};

export const TermsForm = () => {
  return (
    <div className="border border-neutral-800 rounded-lg lg:w-1/2 max-h-[85vh] overflow-y-auto p-6 text-sm text-neutral-300 leading-relaxed space-y-4 custom-scrollbar">
      <h1 className="text-xl font-semibold text-neutral-100">
        NoLimit.com Terms of Use
      </h1>
      <p className="text-xs text-neutral-500">
        Last Updated: August 26th, 2025
      </p>
      <h2 className="font-semibold text-neutral-200">Introduction</h2>
      <p>
        These Terms of Use provide the terms and conditions under which you,
        whether personally or on behalf of an entity (“you” or “your”), are
        permitted to use, interact with, or otherwise access the Interfaces or
        Features provided by ML2 Inc. (“the Company,” “we,” “us,” or “our”).
        These Terms of Use, together with any documents and additional terms or
        policies that are appended hereto or that expressly incorporate these
        Terms of Use by reference, as well as our Privacy Policy (collectively,
        the “Terms”), constitute a binding agreement between you and us.
      </p>
      <p>
        These Terms govern (i) all editorial material, data-driven functions,
        and informational resources (the “Content Features”) accessible via
        NoLimit.com (the “Site”) or any associated platform where these Terms
        are displayed (each, an “Interface”) and (ii) software, specifically
        including the decentralized smart contract protocol (the “Protocol”)
        branded as NoLimit (the “Platform”), which users may interact with by
        linking their non-custodial digital wallets through an Interface (the
        “Technology Features” and, collectively with the Content Features, the
        “Features”).
      </p>
      <p>
        The primary objective of the Site is to deliver Content Features,
        consisting of news coverage and insights regarding global affairs. Users
        located within a Restricted Jurisdiction (as specified herein) are
        strictly limited to utilizing the Content Features of the Site or
        Interface and are prohibited from engaging with any other
        functionalities, most notably the Technology Features and the underlying
        Platform.
      </p>
      <p className="font-semibold text-neutral-200">
        IMPORTANT: PLEASE EXAMINE THESE TERMS THOROUGHLY.
      </p>
      <p>
        BY VISITING, INTERACTING WITH, OR UTILIZING THE SITE OR ANY RELATED
        INTERFACE (INCLUDING CONNECTING A DIGITAL WALLET OR ESTABLISHING A SITE
        IDENTIFIER), YOU ACKNOWLEDGE YOUR LEGAL CAPACITY TO ENTER INTO A
        CONTRACT. YOU CONFIRM THAT YOU HAVE READ, COMPREHENDED, AND CONSENTED TO
        BE BOUND BY THESE TERMS, WHICH INCLUDE A MANDATORY ARBITRATION PROVISION
        AND A WAIVER OF CLASS ACTION RIGHTS. IF YOU DISAGREE WITH ANY PART OF
        THESE TERMS, YOU ARE PROHIBITED FROM ACCESSING OR USING ANY INTERFACE OR
        FEATURE.
      </p>
      <p>
        TRADING VIA THE SITE, PLATFORM, OR TECHNOLOGY FEATURES IS STRICTLY
        FORBIDDEN FOR INDIVIDUALS OR ENTITIES RESIDING IN, LOCATED IN,
        INCORPORATED IN, OR MAINTAINING A PRINCIPAL BUSINESS ADDRESS IN THE
        UNITED STATES, UNITED KINGDOM, FRANCE, ONTARIO, SINGAPORE, POLAND,
        THAILAND, AUSTRALIA, BELGIUM, TAIWAN, OR ANY OTHER RESTRICTED TERRITORY
        (COLLECTIVELY, “RESTRICTED PERSONS”).
      </p>
      <p>
        NO EXCEPTIONS ARE PERMITTED. IF YOU ARE A RESTRICTED PERSON, DO NOT
        ATTEMPT TO EXECUTE TRADES ON THE SITE OR PLATFORM. THE USE OF VIRTUAL
        PRIVATE NETWORKS (VPNS) OR SIMILAR MASKING TOOLS TO BYPASS THESE
        GEOGRAPHIC RESTRICTIONS IS EXPRESSLY PROHIBITED.
      </p>
      <h2 className="font-semibold text-neutral-200">The Site and Features</h2>
      <h3 className="font-semibold text-neutral-200">
        Overview of Site Functionality
      </h3>
      <p>
        The Site serves two distinct roles: it provides a news portal for global
        current events (the “Information Site”) and offers a technical interface
        allowing users to independently broadcast messages to the Polygon
        blockchain to trade event-based digital contracts (the “Contracts”).
      </p>
      <p>
        Key Features, including the Platform, were created by Blockratize, Inc.
        (“Blockratize”), a third-party software developer. The Company licenses
        this software from Blockratize. Neither the Company nor Blockratize
        operates as a financial exchange or clearinghouse; consequently, neither
        entity manages or influences your individual on-chain transactions.
      </p>
      <p>
        Any pricing data displayed on the Site regarding Contracts is strictly
        for informational purposes and does not constitute a financial offer, a
        solicitation, or professional investment advice from the Company.
      </p>
      <p>
        While the Site’s display may update based on your inputs, the Company
        never acts on your behalf or under your direction. By using the “Connect
        Wallet” feature, you acknowledge that the Company: (i) does not
        facilitate the transmission of data to blockchain networks, (ii) cannot
        execute or modify your transactions, (iii) has no access to or control
        over your private keys or digital assets, and (iv) never takes custody
        of your funds. Users must exercise extreme caution, as blockchain
        transactions are irreversible. Furthermore, the underlying smart
        contracts and Protocol are open-source and are not owned or controlled
        by the Company or Blockratize.
      </p>
      <p>
        You hold sole responsibility for the security of your Wallet, including
        passwords and recovery phrases. We cannot retrieve lost keys or reverse
        transactions. We assume no liability for losses resulting from your
        wallet management or interactions with immutable protocols.
      </p>
      <p>
        Users must recognize the inherent risks of decentralized finance,
        including code vulnerabilities, phishing, market volatility, and social
        engineering.
      </p>
      <p>
        The Protocol and the Polygon network operate independently of the
        Company and Blockratize. We provide no guarantees regarding the
        network's uptime, security, or performance. We do not manage the
        third-party developers or validators who maintain these networks. All
        network fees (“gas”) associated with your transactions are
        non-refundable and are your exclusive responsibility.
      </p>
      <p>
        We do not control or process transactions via the Platform. The Company
        is not liable for any financial loss, including failed transfers or
        fraudulent activity, resulting from your use of decentralized
        technology.
      </p>
      <h3 className="font-semibold text-neutral-200">
        {" "}
        Your Acknowledgement of Site Information{" "}
      </h3>{" "}
      <p>
        {" "}
        You recognize and agree that all data provided through the Content
        Features and the Site is intended strictly for general informational
        use. While we aim for precision, we provide no assurance that the
        content is comprehensive, current, or free of errors. Consequently, you
        agree that you are not relying on the information presented on the Site
        or any Interface for any decision-making. You expressly (i) waive any
        claims of reliance on the Site's content and (ii) acknowledge that
        neither the Company nor Blockratize shall be held responsible for the
        accuracy or utility of such information.{" "}
      </p>{" "}
      <p>
        {" "}
        Periodically, the Site, Interfaces, or Features may be unavailable or
        non-functional due to various factors, including: (A) hardware failures;
        (B) scheduled maintenance or emergency repairs; (C) unforeseen
        circumstances beyond our control; (D) instabilities or outages in the
        underlying blockchain networks; or (E) service disruptions from
        third-party partners and vendors.{" "}
      </p>{" "}
      <p>
        {" "}
        It is your responsibility to verify any information found on our
        Interfaces independently. You should never base your actions solely on
        the content found on our platform, including articles, data points,
        external links, social media posts (such as on X, Discord, Lens, or
        Farcaster), news feeds, or instructional videos.{" "}
      </p>{" "}
      <h3 className="font-semibold text-neutral-200">
        {" "}
        Disclaimer of Professional and Financial Advice{" "}
      </h3>{" "}
      <p>
        {" "}
        No content available on the Site, any Interface, or through our Features
        constitutes professional or investment advice. The Company assumes no
        fiduciary duties or obligations toward you based on the informational
        resources provided.{" "}
      </p>{" "}
      <p>
        {" "}
        You acknowledge that all insights provided through your use of the Site
        are for educational and informational purposes only and should not be
        treated as expert professional guidance.{" "}
      </p>{" "}
      <p>
        {" "}
        You must not take, or avoid taking, any specific action based on the
        materials we publish, including blog posts, news summaries, third-party
        links, or community discussions on platforms like Discord.{" "}
      </p>{" "}
      <p>
        {" "}
        Prior to making legal, financial, or other significant decisions related
        to our Features, you should consult with a licensed professional
        qualified to provide advice in the relevant field.{" "}
      </p>{" "}
      <p>
        {" "}
        These Terms do not establish any fiduciary relationship between you and
        the Company. Our only obligations to you are those explicitly defined
        within this Agreement.{" "}
      </p>{" "}
      <p>
        {" "}
        Information on the Site shall not be viewed as an offer, solicitation,
        or invitation to (i) trade, dispose of, or underwrite digital assets, or
        (ii) engage in any transaction involving cryptoassets.{" "}
      </p>{" "}
      <p>
        {" "}
        Neither the Company nor Blockratize serves as a financial, legal, tax,
        or trading advisor to any individual or organization.{" "}
      </p>
      <h3 className="font-semibold text-neutral-200">Modifications</h3>
      <h4 className="font-semibold text-neutral-300">To The Terms</h4>
      <p>
        We reserve the right to amend these Terms at any time at our sole
        discretion. Any updates will be published on the Site and relevant
        Interfaces, with the most recent revision date displayed at the top.
      </p>
      <p>
        Revised Terms take effect immediately upon being posted. Your continued
        interaction with any Interface or Feature following these updates
        constitutes your explicit consent to the modified Terms.
      </p>
      <p>
        If you do not consent to the updated Terms, you must immediately cease
        all use of the Interfaces and Features. It is your responsibility to
        monitor the Site regularly for any changes to this Agreement.
      </p>
      <h4 className="font-semibold text-neutral-300">
        To the Site, Interfaces, or Features
      </h4>
      <p>
        We maintain the right to modify, replace, remove, or limit access to the
        Site and its Features at any time without prior notice. This includes
        the right to materially alter or delete any available content or
        information.
      </p>
      <p>
        We may, at our discretion, temporarily or permanently suspend or disable
        the Site or any specific Features for any reason and without advance
        warning.
      </p>
      <p>
        Upon any termination of your access, your right to use our Services ends
        immediately. We assume no liability for any losses you may incur
        resulting from the modification, suspension, or discontinuation of the
        Site or its Features.
      </p>
      <p>
        As the platform evolves, we may choose to overhaul or retire specific
        parts of the technology or content at our sole discretion.
      </p>
      <h3 className="font-semibold text-neutral-200">
        User Responsibilities, Representations & Prohibited Conduct
      </h3>
      <h4 className="font-semibold text-neutral-300">Your Representations</h4>
      <p>
        By accessing the Site or utilizing its Features, you represent and
        warrant the following to the Company:
      </p>
      <p>
        <strong>Legal Capacity.</strong> You are at least 18 years of age and
        possess the legal authority to enter into this Agreement.
      </p>
      <p>
        <strong>Sanctions Compliance.</strong> You are not subject to any
        economic or trade sanctions, nor are you listed as a prohibited party by
        any government authority. You confirm you are not on the OFAC Specially
        Designated Nationals list or any equivalent EU or UK restricted lists.
        You are not operating from a territory subject to comprehensive UN, US,
        EU, or UK sanctions. If your status regarding these sanctions changes,
        you must stop using our Services immediately.
      </p>
      <p>
        <strong>Restricted Jurisdictions.</strong> You are not a citizen or
        resident of, nor are you located in, any territory subject to
        comprehensive US sanctions (such as Iran, North Korea, Cuba, Syria, or
        sanctioned regions of Ukraine). Furthermore, you are prohibited from
        trading Contracts if you are located in the United States, United
        Kingdom, France, Ontario, Singapore, Poland, Thailand, or Taiwan.
      </p>
      <p>
        <strong>Security and Configuration.</strong> You are solely responsible
        for the correct configuration and security of your Wallet and data. This
        includes safeguarding your private keys and any sensitive financial or
        token-related information.
      </p>
      <p>
        <strong>Anti-Circumvention.</strong> You will not use VPNs, proxies, or
        any other anonymization tools to bypass geographic restrictions or other
        limitations applied to the Site and its Features.
      </p>
      <p>
        <strong>Technical Sophistication.</strong> You possess the technical
        knowledge, experience, and professional advice necessary to understand
        the risks of blockchain technology, cryptography, and digital asset
        trading.
      </p>
      <p>
        <strong>Legal Compliance.</strong> Your use of the platform does not
        violate any local or international laws or regulations applicable to you
        or the Company. You agree to adhere to all Applicable Laws and will not
        use our Features to facilitate illegal activity.
      </p>
      <p>
        <strong>Financial Awareness.</strong> Engaging with event-based
        Contracts involves significant financial risk. These products are
        experimental and volatile; transactions are final and irreversible. You
        acknowledge that you may lose the entire amount of cryptoassets supplied
        to a Contract. You should independently assess whether these activities
        align with your financial situation. WE ARE NOT RESPONSIBLE FOR ANY LOSS
        OF FUNDS RESULTING FROM YOUR TRADING ACTIVITY.
      </p>
      <p>
        <strong>Contract Resolution.</strong> The Company does not resolve or
        manage the outcome of any Contracts. All resolutions are handled by the
        UMA Optimistic Oracle according to pre-defined smart contract rules. Any
        disputes regarding contract outcomes must be addressed through the UMA
        dApp protocol, not through the Company.
      </p>
      <h3 className="font-semibold text-neutral-200">
        Your Responsibilities & Prohibited Conduct
      </h3>
      <p>
        You pledge to interact with the Site, any Interface, and the Features
        only in an authorized, ethical, and lawful manner, strictly adhering to
        these Terms and all applicable legal statutes.
      </p>
      <p>By using the platform, you agree to refrain from:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          Violating any local or international regulations through your use of
          the Site or its Features;
        </li>
        <li>Breaching any provision of these Terms;</li>
        <li>Engaging in any unlawful activities;</li>
        <li>
          Exploiting the platform or its Features for any unapproved or
          commercial objectives;
        </li>
        <li>
          Bypassing or attempting to disable security protocols, content
          filters, or access restrictions, including the unauthorized use of
          VPNs;
        </li>
        <li>
          Submitting deceptive, false, or inaccurate information or
          participating in schemes intended to defraud the Company or other
          users;
        </li>
        <li>
          Scraping or harvesting data from the Site or Interfaces for any
          unauthorized purpose;
        </li>
        <li>
          Engaging in market abuse or integrity-violating activities, such as:
          (i) fraud or deception; (ii) front-running; (iii) wash trading; (iv)
          fictitious or pre-arranged transactions; (v) market manipulation or
          cornering; (vi) spoofing; (vii) artificial price-setting; or (viii)
          any other disruptive or abusive trading behavior as determined by the
          Company or Blockratize;
        </li>
        <li>
          Actions that could damage, disable, or overburden the Site's
          infrastructure or interfere with the experience of other users;
        </li>
        <li>
          Using the platform to distribute material that is, at our discretion,
          defamatory, obscene, hateful, discriminatory, or intended to incite
          violence and intolerance;
        </li>
        <li>
          Accessing the Features on behalf of individuals located in Restricted
          Jurisdictions;
        </li>
        <li>
          Attempting to reverse engineer, decompile, or extract the source code
          of any software within the Interfaces, except where explicitly
          permitted by law;
        </li>
        <li>
          Selling, sublicensing, or distributing any portion of the Interfaces
          or Features;
        </li>
        <li>
          Deploying automated bots, crawlers, or data-mining tools to extract
          information from our systems;
        </li>
        <li>
          Copying or monitoring Site content via manual processes for
          unauthorized purposes without our written consent;
        </li>
        <li>
          Transmitting malware, viruses, worms, or other technologically harmful
          code;
        </li>
        <li>
          Attempting to gain unauthorized entry to our servers, databases, or
          connected computer systems; and
        </li>
        <li>
          Launching denial-of-service (DoS) attacks or otherwise disrupting the
          proper operational flow of the Site.
        </li>
      </ul>
      <p>
        If we suspect you have engaged in prohibited conduct, we reserve the
        right to investigate and, at our sole discretion: (i) revoke your access
        to the platform; (ii) exclude you from incentive programs or launches;
        and (iii) take legal action or cooperate with authorities to address
        damages. You also acknowledge that using these Features may have tax
        implications; you are solely responsible for calculating and paying any
        taxes required by your jurisdiction.
      </p>
      <h3 className="font-semibold text-neutral-200">
        Request for Information
      </h3>
      <p>
        The Company or its representatives may occasionally ask for additional
        documentation to verify your identity or confirm you are not a
        Restricted Person. Failure to provide adequate information within the
        requested timeframe may result in the termination of your access or
        exclusion from platform rewards.
      </p>
      <h3 className="font-semibold text-neutral-200">User Feedback</h3>
      <p>
        You may submit suggestions, questions, or inquiries (“Feedback”) through
        our Interfaces. While we appreciate Feedback regarding improvements, we
        are not obligated to review, implement, or release any updates based on
        your submissions.
      </p>
      <p>
        By submitting Feedback, you agree that the Company holds full ownership
        of all resulting rights and interests. You warrant that you own the
        rights to the Feedback you provide and that it does not infringe upon
        the intellectual property of any third party.
      </p>
      <h3 className="font-semibold text-neutral-200">
        Intellectual Property Rights
      </h3>
      <h4 className="font-medium text-neutral-300">Ownership &amp; License</h4>
      <p>
        The Company, Blockratize, or their licensors retain all rights and
        intellectual property interests in the Site, Interfaces, and Features.
        Under these Terms, you are granted a limited, revocable, non-exclusive,
        and non-transferable license to access and use the platform. This
        license exists solely for your personal interaction with the Services.
      </p>
      <p>
        No other rights are granted to you. Note that specific Features or
        third-party integrations may be governed by separate licenses (such as
        MIT or AGPL 3.0). You are responsible for reviewing and complying with
        the specific terms of those third-party licenses.
      </p>
      <h4 className="font-medium text-neutral-300">Reciprocal License</h4>
      <p>
        By engaging with the Site, Interfaces, or Features, you grant the
        Company a limited, non-exclusive, sublicensable, worldwide, and
        royalty-free license to utilize, replicate, modify, and display any
        content or Feedback you provide. This license is granted for our
        business operations, including the maintenance and provision of the
        Services, for as long as necessary.
      </p>
      <p>
        Regarding any Feedback or information you submit through the platform
        (collectively, “Content”), you grant us a perpetual, irrevocable,
        transferable, and fully paid-up license to use, publish, and distribute
        such Content in any medium. This includes the right to create derivative
        works for promotional purposes related to the Platform and its
        affiliates. You warrant that you hold all necessary rights to grant this
        license and that your Content does not infringe upon any third-party
        intellectual property.
      </p>
      <h3 className="font-semibold text-neutral-200">
        Third-Party Content and Services
      </h3>
      <p>
        The Site and Features may integrate with or provide access to
        applications, data, and resources managed by independent third parties
        (“Third-Party Services”).
      </p>
      <p>
        Any links to Third-Party Services are provided solely for your
        convenience. We do not oversee or endorse the content of these external
        sites and accept no liability for any loss or damage resulting from your
        interaction with them. Accessing these services is done at your own risk
        and is governed by the respective third party's terms of use.
      </p>
      <p>
        Your use of Third-Party Services may be subject to separate privacy
        policies and legal agreements. The Company is not responsible for the
        reliability, accuracy, or privacy practices of these external providers.
        We maintain no control over how these entities handle your data or
        content.
      </p>
      <p>
        All interactions with Third-Party Services occur exclusively between you
        and the third party. You agree that the Company is not liable, directly
        or indirectly, for any harm or costs associated with your reliance on
        external services or resources.
      </p>
      <p>
        We do not endorse any products or advertising found on external sites.
        You acknowledge that the Company shall not be held accountable for any
        damages alleged to be caused by goods or services available through
        third-party platforms.
      </p>
      <p>
        We strongly recommend reviewing the legal terms of any Third-Party
        Service before engagement. Integration does not constitute a
        recommendation by the Company.
      </p>
      <h3 className="font-semibold text-neutral-200">Indemnification</h3>
      <p>
        You agree to defend and hold harmless the Company, Blockratize, and
        their respective officers, directors, and employees (the “Company
        Parties”) from any claims, damages, liabilities, and expenses—including
        legal fees—arising from: (i) your use of the Interfaces or Features;
        (ii) your violation of these Terms or applicable law; (iii) disputes
        between you and third parties; (iv) infringement of intellectual
        property rights; and (v) any Feedback you provide.
      </p>
      <p>
        If we are required to respond to legal subpoenas or orders related to
        the activities mentioned above, you agree to reimburse the Company for
        the time and materials expended by our staff and contractors at standard
        hourly rates, in addition to reasonable attorney fees.
      </p>
      <p>
        The Company reserves the right to assume exclusive control over the
        defense and settlement of any matter subject to indemnification by you,
        and you agree to cooperate fully with our legal strategy.
      </p>
      <h3 className="font-semibold text-neutral-200">
        Disclaimers and Limitations of Liability
      </h3>
      <h4 className="font-medium text-neutral-300">
        Site and Features Disclaimer
      </h4>
      <p>
        The Company does not guarantee that the Site or its Features will be
        secure, available, or error-free. The underlying technology is subject
        to rapid change, and we cannot ensure that your access or ability to
        transact will remain uninterrupted. You accept all risks associated with
        the use of these decentralized technologies.
      </p>
      <h4 className="font-medium text-neutral-300">No Warranty</h4>
      <p>
        THE SITE AND FEATURES ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE”
        BASIS. TO THE FULLEST EXTENT PERMITTED BY LAW, THE COMPANY AND
        BLOCKRATIZE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT
        NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
        PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE
        ACCURATE, FREE OF MALWARE, OR THAT YOUR DIGITAL ASSETS WILL BE SECURE
        FROM LOSS OR ALTERATION.
      </p>
      <h3 className="font-semibold text-neutral-200">
        Limitations of Liability
      </h3>
      <p className="uppercase">
        THE COMPANY AND ITS SERVICE PROVIDERS SHALL NOT BE LIABLE FOR ANY
        INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOSS
        OF PROFITS, DATA, OR OPPORTUNITY, EVEN IF WE HAVE BEEN PREVIOUSLY
        ADVISED OF THE POSSIBILITY OF SUCH LOSSES.
      </p>
      <p className="uppercase">
        WE ASSUME NO RESPONSIBILITY FOR DAMAGES ARISING FROM: (i) YOUR INABILITY
        TO ACCESS THE FEATURES DUE TO DOWNTIME, TERMINATION, OR SUSPENSION; (ii)
        THE COST OF REPLACING SERVICES; (iii) ANY FINANCIAL COMMITMENTS MADE
        BASED ON THE TERMS; (iv) UNAUTHORIZED DATA ACCESS OR DELETION; (v)
        FLUCTUATIONS IN CRYPTOASSET VALUE; OR (vi) LOSSES RESULTING FROM
        EXTERNAL HACKS OR TAMPERING.
      </p>
      <p className="uppercase">
        IN NO EVENT SHALL THE TOTAL AGGREGATE LIABILITY OF THE COMPANY UNDER
        THESE TERMS EXCEED ONE HUNDRED DOLLARS ($100).
      </p>
      <h3 className="font-semibold text-neutral-200">
        Governing Law, Dispute Resolution and Class Action Waiver
      </h3>
      <h4 className="font-medium text-neutral-300">Governing Law</h4>
      <p>
        These Terms and any related legal actions are governed by the Nevis
        Arbitration Law and the laws of Nevis, excluding any conflict of laws
        principles. For any Disputes not subject to mandatory arbitration as
        defined in the "Dispute Resolution and Arbitration" section, the
        exclusive venue shall be the courts of Nevis. Both you and the Company
        waive any rights to object to the jurisdiction or venue of such courts.
      </p>
      <h4 className="font-medium text-neutral-300">Dispute Resolution</h4>
      <p>
        Before initiating any formal legal or arbitration proceedings, you agree
        to attempt to resolve the issue through good-faith negotiations. The
        process begins with a written "Initial Notice" detailing the dispute.
        The recipient has twenty days to respond, and both parties must meet and
        confer within forty-five days of the Initial Notice to seek a
        resolution.
      </p>
      <p>
        If no resolution is reached within ninety days of the Initial Notice,
        the parties may mutually agree to mediation or proceed to arbitration as
        outlined in these Terms.
      </p>
      <h4 className="font-medium text-neutral-300">Mandatory Arbitration</h4>
      <p>
        Any controversy or claim arising from these Terms, the Interfaces, or
        the Features—including questions regarding the validity or scope of this
        arbitration agreement—will be settled by arbitration in Panama before a
        single arbitrator. This provision does not prevent either party from
        seeking temporary injunctive relief from a court of competent
        jurisdiction in aid of arbitration.
      </p>
      <p>
        The arbitrator holds sole authority to rule on the enforceability,
        interpretation, and reach of this arbitration agreement.
      </p>
      <p>
        Except as otherwise noted, the arbitrator will decide liability on the
        merits and may grant declaratory or injunctive relief only in favor of
        the individual claimant and only to the extent necessary for that
        individual's specific claim.
      </p>
      <p>
        Any claims for public injunctive relief (relief intended to stop
        unlawful acts threatening the general public) must be decided in a civil
        court rather than arbitration. In such cases, the parties agree to stay
        court proceedings regarding public relief until the individual merits
        are decided in arbitration.
      </p>
      <p className="uppercase font-semibold">
        BY ACCEPTING THESE TERMS, BOTH PARTIES ARE VOLUNTARILY WAIVING THE RIGHT
        TO A JURY TRIAL AND THE RIGHT TO PARTICIPATE IN ANY CLASS-ACTION LAWSUIT
        OR CLASS-WIDE ARBITRATION.
      </p>
      <h3 className="font-semibold text-neutral-200">
        Class Action / Representative Claim Waiver
      </h3>
      <p>
        Arbitration will proceed strictly on an individual basis. Class-wide
        arbitrations and representative actions are strictly prohibited.
      </p>
      <p>
        To the maximum extent permitted by law, you agree that any dispute
        resolution proceedings will be conducted solely in your individual
        capacity and not as a plaintiff or class member in any consolidated,
        representative, or multi-plaintiff action.
      </p>
      <p>
        The arbitrator lacks the authority to aggregate multiple claims or award
        relief to any person or entity not a party to the specific individual
        arbitration. Furthermore, the arbitrator may not oversee any form of
        representative or class proceeding involving you and the Company.
      </p>
      <h3 className="font-semibold text-neutral-200">General Terms</h3>
      <h4 className="font-medium text-neutral-300">Entire Agreement</h4>
      <p>
        These Terms, along with any referenced policies, constitute the complete
        and exclusive agreement between you and the Company. This document
        replaces all prior verbal or written agreements, understandings, or
        communications regarding this subject matter.
      </p>
      <h4 className="font-medium text-neutral-300">
        No Relationships or Assignments
      </h4>
      <p>
        These Terms do not create a partnership, joint venture, or agency
        relationship between you and the Company. You are prohibited from
        representing yourself as an agent or representative of the Company
        beyond your status as a user of the Features.
      </p>
      <p>
        You may not assign or transfer your rights under these Terms to anyone
        else. The Company reserves the right to transfer or assign these Terms,
        in whole or in part, at its discretion. Any unauthorized assignment on
        your part is void. These Terms remain binding for the benefit of
        permitted successors and assigns.
      </p>
      <h4 className="font-medium text-neutral-300">Waiver</h4>
      <p>
        If the Company fails to exercise or enforce any right or provision of
        these Terms, it does not constitute a waiver of that right in the
        future. Any valid waiver must be provided by the Company in writing.
      </p>
      <h4 className="font-medium text-neutral-300">Severability</h4>
      <p>
        If any portion of these Terms is found to be unenforceable or invalid,
        the rest of the Agreement remains in full effect. The invalid section
        will be modified to reflect the original intent; if modification is not
        possible, the section will be removed without affecting the validity of
        the remaining provisions.
      </p>
      <h4 className="font-medium text-neutral-300">Remedies</h4>
      <p>
        The rights and remedies provided to the Company in these Terms are
        cumulative and exist in addition to any other legal or equitable
        remedies available under Applicable Law.
      </p>
      <h2 className="font-semibold text-neutral-200">Contact Us</h2>
      <p>
        For any questions, claims, or formal complaints regarding the Services,
        please reach out to us at{" "}
        <span className="text-neutral-100">hello@nolimit.com</span>.
      </p>
    </div>
  );
};
