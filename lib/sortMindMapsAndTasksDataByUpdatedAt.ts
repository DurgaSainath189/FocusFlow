import { AssignedToMeTaskAndMindMaps } from "@/types/extended";

export const sortMindMapsAndTasksDataByUpdatedAt = (
  data: AssignedToMeTaskAndMindMaps
) => {
  const sortedArray = [...data.mindMaps, ...data.tasks].sort((a, b) => {
    return new Date(b.updated.at).getTime() - new Date(a.updated.at).getTime();
  });

  return sortedArray;
};
