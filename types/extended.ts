import {
  MindMap,
  savedMindMaps,
  savedTask,
  Tag,
  Task,
  UserPermission,
  Workspace,
} from "@prisma/client";

export interface SubscriptionUser {
  userRole: UserPermission;
  user: {
    id: string;
    image?: string | null;
    username: string;
  };
}

export interface SettingsWorkspace extends Workspace {
  subscribers: SubscriptionUser[];
}

export interface ShortTask {
  id: string;
  emoji: string;
  title: string;
}

export interface ExtendedTask extends Task {
  tags: Tag[];
  taskDate?: {
    id: string;
    from: Date | undefined;
    to: Date | undefined;
  };
  savedTask?: savedTask[];
  creator: UserInfo;
  updatedBy: UserInfo;
}

export interface ShortMindMap {
  id: string;
  title: string;
}

export interface WorkspaceShortcuts extends Workspace {
  tasks: ShortTask[];
  mindMaps: ShortMindMap[];
}

export interface ExtendedMindMap extends MindMap {
  tags: Tag[];
  savedMindMaps?: savedMindMaps[];
  creator: UserInfo;
  updatedBy: UserInfo;
}

export interface UserInfo {
  id: string;
  username: string;
  image?: string | null;
  name?: string | null;
  surname?: string | null;
}

export interface AssignedToTaskUser {
  user: {
    id: string;
    image: string | null;
    username: string;
    assignedToTask: {
      userId: string;
    }[];
  };
}

export interface UsersAssignedToTaskInfo extends Workspace {
  subscribers: AssignedToTaskUser[];
}

export interface AssignedToMindMapUser {
  user: {
    id: string;
    image: string | null;
    username: string;
    assignedToMindMap: {
      userId: string;
    }[];
  };
}

export interface UsersAssignedToMindMapInfo extends Workspace {
  subscribers: AssignedToMindMapUser[];
}