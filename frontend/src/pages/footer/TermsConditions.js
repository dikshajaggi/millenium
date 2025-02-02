import React from 'react'
import { currentDate, companyName, contactAddress, contactEmail, contactNumber, companyWebsiteUrl } from "../../assests/static"

const TermsConditions = () => {
    return (
        <div>
            <h1>Terms & Conditions</h1>
            <div>
                ## Terms & Conditions

                **Last Updated: {currentDate}**

                Welcome to {companyName}! By accessing or using our website {companyWebsiteUrl}, you agree to comply with and be bound by these Terms & Conditions. Please read them carefully.

                ### 1. General
                These Terms & Conditions ("Terms") govern your use of our website and the purchase of any products. By accessing our site or purchasing products, you agree to these Terms.

                ### 2. Product Information
                We strive to ensure that product descriptions, images, and pricing are accurate. However, we do not warrant that product descriptions or other content is error-free. In case of inaccuracies, we reserve the right to correct them.

                ### 3. Ordering & Payment
                - **Ordering**: All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order at any time.
                - **Payment**: Payment can be made using credit/debit cards, PayPal, or other methods as indicated on the site.

                ### 4. Shipping & Delivery
                - **Shipping**: We ship within India and abroad. Shipping charges and estimated delivery times will be displayed at checkout.
                - **International Shipping**: Customers are responsible for customs duties, taxes, and import regulations in their country.

                ### 5. Limitation of Liability
                - We are not liable for any indirect, incidental, or consequential damages arising from the use of our products.
                - **Medical Disclaimer**: Our products are intended for use as directed by a qualified dental professional. We do not provide medical advice, diagnosis, or treatment.

                ### 6. User Responsibilities
                - You agree not to misuse our website by knowingly introducing viruses, attempting unauthorized access, or engaging in fraudulent activities.

                ### 7. Intellectual Property
                - All content, including text, images, logos, and trademarks, is owned by {companyName} and is protected by applicable intellectual property laws.

                ### 8. Modifications to Terms
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Continued use of the site constitutes acceptance of the revised Terms.

                ### 9. Governing Law
                These Terms are governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.

                ### 10. Contact Information
                For any questions regarding these Terms & Conditions, please contact us:

                Email: {contactEmail}
                Phone: {contactNumber}
                Address: {contactAddress}

                By using our website or purchasing products, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.

            </div>
        </div>
    )
}

export default TermsConditions
