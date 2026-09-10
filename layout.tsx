import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'playmates — Games bring people together',
  description: 'A social app for gamers built around gaming taste, identity, content, and connection.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
