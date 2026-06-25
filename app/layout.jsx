import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppWidget from '../components/WhatsAppWidget';

export const metadata = {
  title: 'FoxRevo | The Wealth Revolution',
  description: "The revolution building Africa's next billionaires.",
  metadataBase: new URL('https://foxrevo.com'),
  openGraph: {
    title: 'FoxRevo | The Wealth Revolution',
    description: "The revolution building Africa's next billionaires.",
    url: 'https://foxrevo.com',
    siteName: 'FoxRevo',
    images: [
      {
        url: '/image001.jpg',
        width: 1200,
        height: 630,
        alt: 'FoxRevo | The Wealth Revolution',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FoxRevo | The Wealth Revolution',
    description: "The revolution building Africa's next billionaires.",
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
