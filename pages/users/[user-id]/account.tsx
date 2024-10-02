import {
  UserContextProvider,
  useUser,
} from "@/components/users/singleUserContext";
import UserDataForm from "@/components/users/userDataForm";

export default function Account() {
  const { user } = useUser();

  return (
    <UserContextProvider>
      <UserDataForm user={user!} />
    </UserContextProvider>
  );
}
