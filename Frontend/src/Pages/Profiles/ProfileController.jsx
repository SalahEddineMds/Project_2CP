import { useOutletContext, useParams } from 'react-router-dom';
import CPLayout from './Chercheur/CPLayout';
import AdminPLayout from './Admin/AdminPLayout';

export default function ProfileController() {
  const { userInfo } = useOutletContext();
  const { id } = useParams();
  return userInfo?.type === 'Admin' && id == 'me' ? (
    <AdminPLayout />
  ) : (
    <CPLayout />
  );
}
