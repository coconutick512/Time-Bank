import { useDispatch } from 'react-redux';
export const UserProfileForm = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<UserAnceta>({
    avatar: '',
    skilltoshares: [],
    skillstolearn: [],
    competency: '',
    time: '',
    about: '',
  });
  const handleChange = (field: keyof UserAnceta, value: any) => {
};
