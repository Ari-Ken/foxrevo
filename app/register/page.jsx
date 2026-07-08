import { redirect } from 'next/navigation';

export default function RegisterRedirectPage() {
  redirect('/?scroll=register');
  return null;
}
