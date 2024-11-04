import { bevan } from '@/app/ui/fonts';
import '@/app/ui/global.css';
import Header from '@/app/ui/header/header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={bevan.variable}>
        < Header />
        {children}
      </body>
    </html>
  );
}
