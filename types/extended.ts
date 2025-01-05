import {
  MindMap,
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
  date?: {
    id: string;
    from: Date | undefined;
    to: Date | undefined;
  };
  savedTask?: savedTask[];
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
}
