// src/app/about/page.tsx
import Link from 'next/link'; // Import Link dari next/link

export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the About Us page for our company profile.</p>
      <p>We are a company dedicated to providing excellent services.</p>
      <Link href="/">Back to Home</Link>
    </div>
  );
} 