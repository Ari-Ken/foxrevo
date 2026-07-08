import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppWidget from '../components/WhatsAppWidget';

export const metadata = {
  title: 'FoxRevo | The Wealth System for African Builders',
  description: "The system designed to help you stop trading time for money and start building compounding wealth. Sourced from the documented wisdom of Aliko Dangote, Elon Musk, Warren Buffett, and Robert Kiyosaki.",
  metadataBase: new URL('https://foxrevo.com'),
  openGraph: {
    title: 'FoxRevo | The Wealth System for African Builders',
    description: "The system designed to help you stop trading time for money and start building compounding wealth. Sourced from the documented wisdom of Aliko Dangote, Elon Musk, Warren Buffett, and Robert Kiyosaki.",
    url: 'https://foxrevo.com',
    siteName: 'FoxRevo',
    images: [
      {
        url: '/image001.jpg',
        width: 1200,
        height: 630,
        alt: 'FoxRevo | The Wealth System for African Builders',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FoxRevo | The Wealth System for African Builders',
    description: "The system designed to help you stop trading time for money and start building compounding wealth. Sourced from the documented wisdom of Aliko Dangote, Elon Musk, Warren Buffett, and Robert Kiyosaki.",
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
