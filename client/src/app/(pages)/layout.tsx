import Header from "@/components/common/Client/Header";
import Footer from "@/components/common/FooterClient";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Header/>
      {children}
    <Footer/>
    </>
  );
}
