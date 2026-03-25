export const PrivacyPolicyView = () => {
  return (
    <div className="flex items-start mt-5 md:mt-0 md:items-center justify-center min-h-screen  px-5">
      <PrivacyForm />
    </div>
  );
};

export const PrivacyForm = () => {
  return (
    <div className="border border-neutral-800 rounded-lg lg:w-1/2 max-h-[85vh] overflow-y-auto p-6 text-sm text-neutral-300 leading-relaxed space-y-4 custom-scrollbar">
      <h3 className="text-xl font-semibold text-neutral-100">PRIVACY POLICY</h3>
      <p className="font-light">Last Updated: January 11, 2022</p>
      <h3 className="font-semibold text-neutral-200">1. Introduction</h3>
      <p>
        This website-hosted user interface (this “Interface”) is made available
        by ML2 Inc., a corporation organized and existing under the laws of
        Nevis (the “Company”, “us”, “we”, or “our”).
      </p>
      <p>
        {" "}
        This Privacy Policy (the “Policy”) outlines our practices regarding the
        availability of the Interface and our methods for collecting, utilizing,
        managing, and sharing data obtained from our users (each, a "user",
        “you”, or “your”) via the Company’s digital platforms. This includes the
        Interface, web and mobile applications, and all related sites connected
        to the Interface by us or our affiliates (the “Site”). This Policy also
        covers all data gathered through our Site or acquired in relation to our
        products, Services, content, tools, and functionalities (collectively
        with the Site, the “Services”). We encourage you to review this Policy
        thoroughly, as we are dedicated to safeguarding your privacy in
        accordance with these terms.{" "}
      </p>{" "}
      <p>
        {" "}
        We recognize you may have inquiries concerning this Policy, specifically
        regarding the collection and application of your personal data. For any
        privacy concerns or related questions, please contact us at
        legal@nolimit.com. Use of our Services is governed by our Terms of
        Services (“Terms”), which, combined with this Privacy Policy, form your
        legal contract with us (the “Agreement”). If you disagree with any part
        of this Policy, you must refrain from using our Site.{" "}
      </p>{" "}
      <p>
        {" "}
        Your use of our Services signifies your acceptance of this Policy. By
        (i) visiting or interacting with the Services, (ii) creating an account
        or purchasing any Services, or (iii) clicking “accept,” “agree,” “OK,”
        or similar prompts regarding our Terms, you acknowledge and agree to be
        legally bound by the conditions set forth in this Policy.{" "}
      </p>{" "}
      <p>
        {" "}
        To maintain the Site and deliver our Services, we may gather or receive
        specific details about you and your engagement with our platforms. You
        hereby grant us permission to collect and receive this information for
        the purposes of operating the Site and providing the Services.{" "}
      </p>
      <h3 className="font-semibold text-neutral-200">
        2. Scope of Coverage
      </h3>{" "}
      <p>
        {" "}
        This Policy pertains to data gathered during your interaction with the
        Site and our Services. It does not extend to information collected
        through offline channels or via other platforms, including those
        operated by third parties or affiliates. In this document, "personal
        information" refers to data that identifies a specific individual. This
        definition excludes anonymized or aggregated datasets that cannot be
        traced back to a user. Please note that information you provide may
        occasionally include the personal details of third parties.{" "}
      </p>{" "}
      <p>
        {" "}
        Data Acquisition and Usage When navigating the Site, we automatically
        record your IP address, browser specifications, and browsing activity.
        We may also monitor geolocation data. Acceptance of these data
        collection practices is a prerequisite for using our Services.{" "}
      </p>{" "}
      <span>Sources of Information:</span>{" "}
      <ul className="list-disc p-4 flex flex-col gap-3">
        {" "}
        <li>Direct submissions provided by you;</li>{" "}
        <li>
          {" "}
          Automated tracking during your visit, including usage patterns, IP
          logging, and data retrieved via Cookies and similar technologies; and{" "}
        </li>{" "}
        <li>
          {" "}
          External sources, such as business affiliates, service providers
          (e.g., Metamask), or integrated networks where you have granted access
          permissions.{" "}
        </li>{" "}
        <span>
          {" "}
          Account holders may be asked to provide the following:{" "}
        </span>{" "}
        <li>
          {" "}
          Identity Data. Information that identifies you personally, such as
          your full name, residential address, email, phone number, and date of
          birth. Providing this demographic and interest-based data is
          voluntary, though withholding it may limit access to certain Services.{" "}
        </li>{" "}
        <li>
          {" "}
          Technical Logs. Data generated automatically by our servers, including
          operating system details, access timestamps, and referral URLs, to
          understand how you connect to our infrastructure.{" "}
        </li>{" "}
        <li>
          {" "}
          Payment Details. To facilitate transactions, we may require banking
          credentials, card numbers, or routing information. By using these
          features, you permit our third-party payment processors and wallet
          integrations (like MetaMask) to handle this data under their own
          privacy guidelines.{" "}
        </li>{" "}
        <li>
          {" "}
          Mobile Analytics. When using handheld devices, we capture hardware
          identifiers, location data, and language settings. We may also collect
          your phone number if provided directly.{" "}
        </li>{" "}
        <li>
          {" "}
          Precise Location. We utilize GPS, Wi-Fi, and cellular data to
          determine your coordinates for security, risk assessment, and fraud
          prevention{" "}
        </li>{" "}
        <li>
          {" "}
          Communication History. We maintain records of your inquiries and
          emails sent to us, retaining them for the duration required by legal
          mandates.{" "}
        </li>{" "}
        <li>
          {" "}
          Research Participation. Any data or feedback provided through
          voluntary surveys may be stored for analysis.{" "}
        </li>{" "}
      </ul>{" "}
      <p>
        {" "}
        To ensure a protected environment, we may request supplemental
        documentation—such as government IDs, passports, or utility bills—to
        authenticate your identity and satisfy regulatory compliance standards.{" "}
      </p>{" "}
      <p>
        {" "}
        Furthermore, we may gather data through other touchpoints, such as
        interactions with our support staff or during specific promotional
        events not explicitly listed above.{" "}
      </p>
      <h3 className="font-semibold text-neutral-200">
        {" "}
        3. Minor Protection and Age Requirements{" "}
      </h3>{" "}
      <p>
        {" "}
        Our platform is not designed for individuals under the age of 18. We
        prohibit anyone under this age from submitting personal data to the
        Site. Should we discover that we have inadvertently gathered information
        from a minor, we will delete that data immediately, except where
        retention is required by law. If you suspect we have received
        information regarding a person under 18, please reach out to us via the
        contact details provided in this Policy.{" "}
      </p>{" "}
      <h3 className="font-semibold text-neutral-200">
        {" "}
        Tracking Technologies and Cookie Usage{" "}
      </h3>{" "}
      <p>
        {" "}
        Cookies are minor data files stored on your device's storage. When you
        engage with our Site or Services, we and our authorized service
        providers may employ cookies and similar monitoring tools (collectively,
        "Cookies"). These tools help us identify you, tailor content and
        marketing, evaluate promotional success, conduct detailed analytics,
        prevent fraudulent activity, and maintain a secure environment for all
        users.{" "}
      </p>{" "}
      <p>
        {" "}
        While most web browsers accept cookies automatically, you have the
        option to modify your settings to block or delete them. Please be aware
        that certain features of our Services rely on these technologies to
        function. Consequently, disabling Cookies may restrict your access to
        parts of the Services or prevent them from working entirely.{" "}
      </p>{" "}
      <p>
        {" "}
        Our Site may also utilize web beacons (also known as pixel tags or clear
        gifs) to track user traffic and gather site-related statistics, such as
        measuring the popularity of specific content or ensuring server
        stability. While web beacons cannot be disabled directly, restricting
        Cookies or setting your browser to alert you to new cookies can often
        neutralize their tracking capabilities.{" "}
      </p>{" "}
      <p>
        {" "}
        Do Not Track: "Do Not Track" (“DNT”) is a browser feature intended to
        signal your preference against third-party tracking. While you can
        toggle this in your browser settings, our systems do not currently
        acknowledge or respond to DNT signals.{" "}
      </p>
      <h3 className="font-semibold text-neutral-200">
        {" "}
        Utilization of Your Information{" "}
      </h3>{" "}
      <p>
        {" "}
        Processing your data accurately enables us to deliver a seamless,
        productive, and personalized user experience. Specifically, the data we
        collect via the Site may be used to:{" "}
      </p>{" "}
      <ul className="list-disc p-4 flex flex-col gap-3">
        {" "}
        <li>
          Manage and facilitate contests, giveaways, and promotional events;
        </li>{" "}
        <li>
          {" "}
          Verify data integrity and validate information through reputable
          third-party sources;{" "}
        </li>{" "}
        <li>
          {" "}
          Generate aggregated statistical reports and analysis for internal
          assessment or partner collaboration;{" "}
        </li>{" "}
        <li>
          {" "}
          Communicate with you regarding your account status, service usage, or
          specific inquiries;{" "}
        </li>{" "}
        <li>
          {" "}
          Establish and maintain your user profile to tailor your future
          interactions with our platform;{" "}
        </li>{" "}
        <li>
          {" "}
          Refine, evaluate, and enhance the overall quality, content, and
          interface of our Services;{" "}
        </li>{" "}
        <li>
          Provide requested Services and dedicated technical support;
        </li>{" "}
        <li>
          Facilitate direct interaction between users within the platform;
        </li>{" "}
        <li>
          {" "}
          Optimize the operational performance of our Site in pursuit of our
          legitimate interests, including:{" "}
        </li>{" "}
        <li>
          {" "}
          Identifying security vulnerabilities, preventing cyberattacks or
          illegal activities, and assisting in legal proceedings against
          offenders;{" "}
        </li>{" "}
        <li>
          {" "}
          Analyzing user engagement levels and delivering contextually relevant
          advertisements;{" "}
        </li>{" "}
        <li>
          {" "}
          Conducting research aimed at technological innovation and
          proof-of-concept testing;{" "}
        </li>{" "}
        <li>
          {" "}
          Developing and testing new security protocols or service features to
          boost reliability and resilience;{" "}
        </li>{" "}
        <li>Implementing systemic updates and feature enhancements;</li>{" "}
        <li>Designing and launching next-generation products;</li>{" "}
        <li>Maintaining rigorous internal quality assurance standards;</li>{" "}
        <li>
          Confirming user identity to mitigate the risk of financial fraud;
        </li>{" "}
        <li>
          {" "}
          Performing diagnostic debugging to resolve technical issues affecting
          core functionality;{" "}
        </li>{" "}
        <li>Upholding our contractual policies and legal terms; and</li>{" "}
        <li>
          {" "}
          Adhering to regulatory requirements, protecting public safety, or
          defending vital interests.{" "}
        </li>{" "}
        <li>
          {" "}
          Address any other specific objective for which you explicitly provided
          the information;{" "}
        </li>{" "}
        <li>
          {" "}
          Strengthen site security and, where geolocation is enabled, provide
          localized content, search results, and offers;{" "}
        </li>{" "}
        <li>
          {" "}
          Track usage patterns to identify areas for user experience
          improvement;{" "}
        </li>{" "}
        <li>
          Alert you about critical updates or changes to our platform;
        </li>{" "}
        <li>
          Execute various duties as mandated by applicable legal frameworks;
        </li>{" "}
        <li>
          {" "}
          Utilize risk-assessment tools to identify and block prohibited or
          suspicious activities;{" "}
        </li>{" "}
        <li>
          {" "}
          Execute financial transactions and issue notifications regarding your
          billing or network status;{" "}
        </li>{" "}
        <li>
          Support the continuous delivery and expansion of our offerings;
        </li>{" "}
        <li>
          {" "}
          Distribute newsletters, digital coupons, and targeted marketing
          materials related to our ecosystem;{" "}
        </li>{" "}
        <li>
          {" "}
          Solicit user feedback, settle disputes, manage fee collection, and
          resolve technical hurdles; and{" "}
        </li>{" "}
        <li>
          {" "}
          Fulfill customer service requests and respond to personal
          correspondence.{" "}
        </li>{" "}
      </ul>{" "}
      <p>
        {" "}
        As previously mentioned, we may process your data for any other purpose
        disclosed at the time of collection. We may also utilize your
        information to display targeted advertisements for our partners. While
        we do not share personal identifiers for this purpose without consent,
        your engagement with an ad may lead the advertiser to infer that you fit
        their target demographic.{" "}
      </p>{" "}
      <p>
        {" "}
        Furthermore, you grant us authorization to use and distribute
        information in the following circumstances:{" "}
      </p>{" "}
      <ul className="list-disc p-4 flex flex-col gap-3">
        {" "}
        <li>
          {" "}
          We may occasionally share data with external companies whose products
          might interest you. Depending on your jurisdiction, you may have the
          right to opt out of such sharing. To do so, email legal@nolimit.com
          with the subject "Privacy Policy." We may require identity
          verification before processing this request.{" "}
        </li>{" "}
        <li>
          {" "}
          Information will be accessed and shared as necessary to honor our
          contract with you, provide support, and resolve service-related
          questions;{" "}
        </li>{" "}
        <li>
          {" "}
          We may hire third-party specialists to handle tasks like marketing
          assistance or technical operations. Notably, we utilize professional
          cloud hosting services for data storage and configuration management;{" "}
        </li>{" "}
        <li>
          {" "}
          To better understand our market, we analyze anonymized or aggregated
          data to improve our business operations. This data does not reveal
          your identity and may be shared with partners, affiliates, or for
          other lawful business purposes;{" "}
        </li>{" "}
        <li>
          {" "}
          Data may be shared across our corporate structure, including with
          parent companies, subsidiaries, and entities under common ownership;{" "}
        </li>{" "}
        <li>
          {" "}
          In the event of a merger, acquisition, asset sale, or bankruptcy, your
          information may be among the assets transferred to a successor entity;
          and{" "}
        </li>{" "}
        <li>
          {" "}
          We may disclose information to: (i) comply with national security or
          law enforcement requests, (ii) satisfy legal mandates or court orders,
          or (iii) protect the rights, safety, and property of our company or
          the public.{" "}
        </li>{" "}
      </ul>{" "}
      <p>
        {" "}
        If we plan to use your data in a way not covered by this Policy, we will
        notify you before or during the collection process. Regarding Protection
        and Storage: We prioritize your data security but acknowledge that no
        digital transmission is entirely immune to risk. We employ
        administrative and technical safeguards—including firewalls, encryption,
        and restricted employee access—to defend your information. However, we
        cannot guarantee absolute security against unauthorized breaches. We
        encourage you to protect your credentials and never share passwords. All
        data transmission is conducted at your own risk.{" "}
      </p>
      <h3 className="font-semibold text-neutral-200">
        8. How We Share Personal Information with Other Parties
      </h3>
      <p>
        We may share your information with our business partners to offer you
        certain products, Services, and promotions. We may also use third-party
        advertising companies to serve ads when you visit the Site. These
        companies may use information about your visits to the Site and other
        websites that are contained in web cookies in order to provide
        advertisements about goods and Services of interest to you.
      </p>
      <p>
        We do not control third parties’ collection or use of your information
        to serve interest-based advertising. However, these third parties may
        provide you with ways to choose not to have your information collected
        or used in this way.
      </p>
      <p>
        Some personal information is public information (this may include your
        web3-enabled wallet’s public address, username, profile photo, profile
        first and last name, month, and year of account creation, and public
        transactions in which you've been involved), and may be seen by anyone
        on the Internet due to the nature of the blockchain, whether or not they
        have an account with us. Public information may also be seen, accessed,
        reshared or downloaded through APIs, SDKs, or third-party Services that
        integrate with our products.
      </p>
      <p>We may share your personal information with:</p>
      <ul className="list-disc p-4 flex flex-col gap-3">
        <li>
          Law enforcement, government officials, or other third parties if we
          are compelled to do so by a subpoena, court order or similar legal
          procedure, when it is necessary to do so to comply with law, or where
          the disclosure of personal information is reasonably necessary to
          prevent physical harm or financial loss, to report suspected illegal
          activity, or to investigate violations of the Terms of Services, or as
          otherwise required by law.
        </li>
        <li>
          Third-party Services providers who assist us in providing the Services
          to you or who provide fraud detection or similar Services on our or
          any vendor’s behalf.
        </li>
        <li>
          Other third parties with your consent or at your direction to do so,
          including if you authorize an account connection with a third-party
          account or platform:
        </li>
        <li>
          For the purposes of this Policy, an "account connection" with such a
          third party is a connection you authorize or enable between your
          account and a payment instrument, or platform that you lawfully
          control or own. When you authorize such a connection, we may exchange
          your personal information and other information directly with such
          third-party. Examples of account connections include, without
          limitation: linking your account to a social media account or social
          messaging Services; connecting your account to a third-party data
          aggregation or financial Services company, if you provide such company
          with your account log-in credentials; or using your account to make
          payments to a merchant or allowing a merchant to charge your account.
        </li>
        <li>
          If you connect your account to other financial accounts, directly or
          through a third-party Services provider, we may have access to your
          account balance and account and transactional information, such as
          purchases and funds transfers. If you choose to create an account
          connection, we may receive information from the third party about you
          and your use of the third-party’s Services. For example, if you
          connect your account to a social media account, we will receive
          personal information from the social media provider via the account
          connection. We will use all such information that we receive from a
          third-party via an account connection in a manner consistent with this
          Policy.
        </li>
        <li>
          Information that we share with a third-party based on an account
          connection will be used and disclosed in accordance with the
          third-party’s privacy practices. Before authorizing an account
          connection, you should review the privacy notice of any third party
          that will gain access to your personal information as part of the
          account connection.
        </li>
      </ul>
      <p>
        We will not disclose your credit card number or bank account number to
        anyone except with your express, written permission or if we are
        required to do so to comply with a subpoena or other legal process. We
        do not send your personal information to third-party social networks
        unless you have specifically requested or authorized us to do so. When
        you broadcast information to such third-party social networks, such
        information is no longer under our control and is subject to the terms
        of use and privacy policies maintained by such third parties.
      </p>
      <h3 className="font-semibold text-neutral-200">
        9. External Connections
      </h3>
      <p>
        Our Services may feature links to—or permit integration with—independent
        third-party platforms, applications, or websites. We maintain no
        oversight over the data collection practices of these external entities.
        We advise our users to remain vigilant when departing our platform and
        to examine the privacy disclosures of any third-party service that
        gathers personal data. Information shared with third parties falls
        outside the scope of this Policy, and we cannot verify the security or
        confidentiality of such exchanges.
      </p>
      <p>
        Furthermore, third parties might employ Cookies, web beacons, or
        alternative tracking tools to monitor your activity while you use our
        Services. This data may be linked to your identity or used to profile
        your online behavior across various sites over time. These entities
        typically utilize such insights to deliver interest-based marketing or
        tailored content. We do not govern these tracking technologies or their
        application. For inquiries regarding specific advertisements or content,
        please contact the relevant provider. You are responsible for directly
        managing your communication preferences with these third parties if you
        wish to opt out of their correspondence.
      </p>
      <h3 className="font-semibold text-neutral-200">
        10. Analytical Services and Retargeting
      </h3>
      <p>
        We may engage third-party analytics providers (such as Google Analytics)
        to assess your interaction with the Services, generate activity reports,
        gather demographic insights, and evaluate performance metrics. These
        providers utilize cookies and pixel tags to facilitate data analysis.
        For example, web beacons may be used to track site navigation and email
        engagement, helping us measure the impact of our marketing efforts and
        compile statistical usage data.
      </p>
      <p>
        By utilizing our Services, you grant consent, as permitted by law, for
        these analytical entities to process your data according to the
        objectives stipulated in this Privacy Policy.
      </p>
      <p>
        To learn more about these providers or to explore available opt-out
        mechanisms, please visit the links provided below. Note that opting out
        of certain analytical services may impact the functional depth of our
        platform.
      </p>
      <p>
        • For Google Analytics, visit:
        [https://www.google.com/analytics](https://www.google.com/analytics).
        This service monitors and reports on website traffic, sharing insights
        with other Google services to personalize advertisements within its
        network. Review Google’s privacy standards here:
        [https://policies.google.com/privacy?hl=en](https://policies.google.com/privacy?hl=en),
        and their data protection guidelines here:
        [https://support.google.com/analytics/answer/6004245](https://support.google.com/analytics/answer/6004245)
      </p>
      <p>
        We also utilize retargeting services to display ads on third-party sites
        to previous visitors of our platform. These providers use tracking
        technologies to serve advertisements based on your past interactions
        with us. Any data gathered through these methods is governed by this
        Policy. By using our Services, you consent to this data processing by
        remarketing providers. For opt-out information, please consult the
        respective provider links:
      </p>
      <h3 className="font-semibold text-neutral-200">
        11. Managing Personal Communications
      </h3>
      <p>
        Registered users can review, modify, or delete their personal details
        via the Site's settings or by emailing legal@nolimit.com with the
        subject “Privacy Policy.” We may require identity verification before
        executing requests to access or alter your data records.
      </p>
      <p>
        You may also opt out of marketing materials by clicking the
        “Unsubscribe” link in any promotional email or by contacting us at
        legal@nolimit.com with the subject “Unsubscribe from Marketing.” Please
        note that transactional or administrative messages essential to account
        management cannot be disabled. While we make every effort to update our
        databases promptly in accordance with law, complete removal of all
        historical data remnants may not always be feasible.
      </p>
      <h3 className="font-semibold text-neutral-200">
        12. International Data Transfers
      </h3>
      <p>
        Your information may be moved to—and stored on—servers located outside
        your home jurisdiction, where privacy laws may be less stringent. By
        engaging with our Services, you acknowledge that your data may be
        transferred globally. In such cases, local authorities or law
        enforcement in those jurisdictions may be granted access to your
        information under their respective legal frameworks.
      </p>
      <p>
        We are committed to taking reasonable measures to ensure your data is
        handled securely and in alignment with this Policy. Transfers will only
        occur to organizations or countries that demonstrate adequate safeguards
        regarding the protection of personal information.
      </p>
      <h3 className="font-semibold text-neutral-200">
        13. Your Privacy Rights
      </h3>
      <p>
        Depending on your place of residence, you may hold specific rights over
        your personal data. If certain rights listed below are not mandated by
        law in your jurisdiction, we reserve the right to grant them at our sole
        discretion.
      </p>
      <p>
        These rights are not absolute and may be limited if (a) the law requires
        us to do so; (b) it would infringe upon the privacy of others; (c) it is
        necessary to protect our legal interests; or (d) the request is deemed
        unreasonable. We will verify your identity before fulfilling any
        requests.
      </p>
      <ol className="list-decimal p-4 flex flex-col gap-4">
        <li>
          <strong>Right of Access.</strong> You may request a copy of the
          information we hold about you by contacting legal@nolimit.com.
        </li>

        <li>
          <strong>Right to Rectification.</strong> If your data is inaccurate or
          incomplete, you can request an update by emailing legal@nolimit.com
          with the subject line “Correction or Rectification.”
        </li>

        <li>
          <strong>Right to Object.</strong> You may object to the processing of
          your data by contacting us. If we cannot accommodate the objection, we
          will explain why, allowing you to decide whether to withdraw consent
          or pursue other options. Use the subject line “Object to Processing.”
        </li>

        <li>
          <strong>Right to Restriction.</strong> You can request that we limit
          how we process your information. Please specify your requirements in
          an email with the subject “Restrict Processing.”
        </li>

        <li>
          <strong>Right to Portability.</strong> You have the right to receive
          your data in a structured, machine-readable format. Submit your
          request via legal@nolimit.com with the subject “Portability /
          Personal Information.”
        </li>

        <li>
          <strong>Right to Withdraw Consent.</strong> Where processing is based
          on consent, you may revoke it at any time by emailing “WITHDRAW
          CONSENT” to our legal team. We will stop processing your data upon
          confirmation.
        </li>

        <li>
          <strong>Right to Erasure.</strong> To have your data permanently
          removed from our systems, email legal@nolimit.com with the subject
          “Erasure / Personal Data Deletion.” We will notify you once the
          deletion is complete.
        </li>
      </ol>
      <p>
        Residents of the UK, EEA, Switzerland, or Brazil also maintain the right
        to file a complaint with their local data protection authority regarding
        our processing practices.
      </p>
      <h3 className="font-semibold text-neutral-200">
        {" "}
        14. Data Restitution and Removal{" "}
      </h3>{" "}
      <p>
        {" "}
        Upon receiving your formal request, we will make every effort to: (i)
        provide you with all personal data processed during your use of the
        Services in a structured, standard, and machine-readable format,
        followed by the removal of all current records and backups; or, (ii)
        permanently destroy and erase all personal information processed in
        relation to the Services, including any physical media, digital
        materials, copies, and archived backups.{" "}
      </p>{" "}
      <h3 className="font-semibold text-neutral-200">
        {" "}
        18. Amendments to this Policy{" "}
      </h3>{" "}
      <p>
        {" "}
        We reserve the right to modify this Policy at our discretion. When
        updates occur, the revision date at the beginning of this document will
        be updated. We advise users to visit this page regularly to stay
        informed of our data handling practices. You acknowledge and concur that
        it is your obligation to review this Privacy Policy frequently to remain
        aware of any changes. Your continued interaction with the Site after
        amendments are published constitutes your legal acceptance of the
        revised terms. If you find any part of this Policy unacceptable, you
        must discontinue your use of the Site.{" "}
      </p>{" "}
      <h3 className="font-semibold text-neutral-200">19. Governing Law</h3>{" "}
      <p>
        {" "}
        The Services and the Site are operated by us from Panama. These
        offerings are not intended to subject the Company to the legal
        requirements or judicial authority of any country, state, or territory
        outside of Panama.{" "}
      </p>{" "}
      <h3 className="font-semibold text-neutral-200">Contact Us</h3>{" "}
      <p>
        {" "}
        For inquiries, feedback, or concerns regarding the details of this
        Policy, please reach out to our legal department via email at
        legal@nolimit.com.{" "}
      </p>
    </div>
  );
};
