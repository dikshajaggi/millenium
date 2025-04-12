export const currentDate = "Sat Feb 03 2025"
export const companyName = "Dwarka Orthodontics"
export const contactAddress = "Dwarka, New Delhi, India"
export const contactEmail = "riteshjaggi@dwarkaorthodontics.com"
export const contactNumber = "+91 9811704446"
export const companyWebsiteUrl = "info@dwarkaorthodontics.com"
export const contactMessage = "Hello"; // replace with the desired message
export const whatsappUrl = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    ? `https://wa.me/${contactNumber}?text=${encodeURIComponent(contactMessage)}`
    : `https://web.whatsapp.com/send?phone=${contactNumber}&text=${encodeURIComponent(contactMessage)}`;
export const fbPageUrl = "https://www.facebook.com/millenium.orthodontics";
export const instaPageUrl = "https://www.instagram.com/dwarkaorthodontics/?igsh=MWJydDdjdzU0ZmN2bg%3D%3D#";
