import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppWidget from '../components/WhatsAppWidget';

export const metadata = {
  title: 'FoxRevo | Skills Monetization & Client Acquisition Playbook',
  description: "Learn the exact mechanics of client acquisition, positioning, and skill monetization to build a real freelance or VA operation.",
  metadataBase: new URL('https://foxrevo.com'),
  openGraph: {
    title: 'FoxRevo | Skills Monetization & Client Acquisition Playbook',
    description: "Learn the exact mechanics of client acquisition, positioning, and skill monetization to build a real freelance or VA operation.",
    url: 'https://foxrevo.com',
    siteName: 'FoxRevo',
    images: [
      {
        url: '/image001.jpg',
        width: 1200,
        height: 630,
        alt: 'FoxRevo | Skills Monetization',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FoxRevo | Skills Monetization & Client Acquisition Playbook',
    description: "Learn the exact mechanics of client acquisition, positioning, and skill monetization to build a real freelance or VA operation.",
    images: ['/image001.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <Navbar />
        <main className="main-content">
          {children}
        </main>
        <WhatsAppWidget />
        <Footer />
      </body>
    </html>
  );
}
