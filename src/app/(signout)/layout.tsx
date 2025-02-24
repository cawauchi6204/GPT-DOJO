import Layout from '@/components/layout/Layout';

export default function SignoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout hideHeader>{children}</Layout>;
}
