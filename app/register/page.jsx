import { redirect } from 'next/navigation';

export default function RegisterRedirectPage() {
  redirect('/admission');
  return null;
}
