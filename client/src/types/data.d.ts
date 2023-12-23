interface User {
  id: string;
  name: string | null;
  username: string;
  email: string;
  phone: string | null;
  groupIds: string[];
  created_at: string;
  updated_at: string;
}
interface Group {
  adminId: string;
  icon: null | string;
  id: string;
  isGroup: boolean;
  members: User[];
  memberIds: string[];
  name: null | string;
  lastMessage: string | null;
  lastMessageBy: string | null;
  updated_at: string;
  created_at: string;
}

type Status = SEEN | DELIVERED | SEND;

interface Message {
  id: string;
  message: string | null;
  image: string | null;
  file: string | null;
  status: Status;
  created_at: string;
  updated_at: string;
  userId: string;
  user: User?;
  groupId: string;
  group: Group?;
}
