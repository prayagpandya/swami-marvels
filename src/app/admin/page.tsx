import { Admin } from '../../components/pages/Admin';

export const metadata = {
  title: 'Swami Marvels Admin',
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {
  return <Admin />;
}
