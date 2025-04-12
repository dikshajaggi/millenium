import React from 'react';
import {
    currentDate,
    companyName,
    contactAddress,
    contactEmail,
    contactNumber,
    companyWebsiteUrl
} from "../../assests/static";

const TermsConditions = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
                Terms & Conditions
            </h1>

            <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700">
                <p><strong>Last Updated: {currentDate}</strong></p>

                <p>
                    Welcome to <strong>{companyName}</strong>! By accessing or using our website <a href={companyWebsiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{companyWebsiteUrl}</a>, you agree to comply with and be bound by these Terms & Conditions. Please read them carefully.
                </p>

                <h3>1. General</h3>
                <p>
                    These Terms & Conditions ("Terms") govern your use of our website and the purchase of any products. By accessing our site or purchasing products, you agree to these Terms.
                </p>

                <h3>2. Product Information</h3>
                <p>
                    We strive to ensure that product descriptions, images, and pricing are accurate. However, we do not warrant that product descriptions or other content is error-free. In case of inaccuracies, we reserve the right to correct them.
                </p>

                <h3>3. Ordering & Payment</h3>
                <ul>
                    <li><strong>Ordering:</strong> All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order at any time.</li>
                    <li><strong>Payment:</strong> Payment can be made using credit/debit cards, PayPal, or other methods as indicated on the site.</li>
                </ul>

                <h3>4. Shipping & Delivery</h3>
                <ul>
                    <li><strong>Shipping:</strong> We ship within India and abroad. Shipping charges and estimated delivery times will be displayed at checkout.</li>
                    <li><strong>International Shipping:</strong> Customers are responsible for customs duties, taxes, and import regulations in their country.</li>
                </ul>

                <h3>5. Limitation of Liability</h3>
                <ul>
                    <li>We are not liable for any indirect, incidental, or consequential damages arising from the use of our products.</li>
                    <li><strong>Medical Disclaimer:</strong> Our products are intended for use as directed by a qualified dental professional. We do not provide medical advice, diagnosis, or treatment.</li>
                </ul>

                <h3>6. User Responsibilities</h3>
                <p>
                    You agree not to misuse our website by knowingly introducing viruses, attempting unauthorized access, or engaging in fraudulent activities.
                </p>

                <h3>7. Intellectual Property</h3>
                <p>
                    All content, including text, images, logos, and trademarks, is owned by <strong>{companyName}</strong> and is protected by applicable intellectual property laws.
                </p>

                <h3>8. Modifications to Terms</h3>
                <p>
                    We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Continued use of the site constitutes acceptance of the revised Terms.
                </p>

                <h3>9. Governing Law</h3>
                <p>
                    These Terms are governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
                </p>

                <h3>10. Contact Information</h3>
                <p>For any questions regarding these Terms & Conditions, please contact us:</p>
                <ul>
                    <li><strong>Email:</strong> <a href={`mailto:${contactEmail}`} className="text-blue-600 underline">{contactEmail}</a></li>
                    <li><strong>Phone:</strong> {contactNumber}</li>
                    <li><strong>Address:</strong> {contactAddress}</li>
                </ul>

                <p>
                    By using our website or purchasing products, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.
                </p>
            </div>
        </div>
    );
};

export default TermsConditions;
