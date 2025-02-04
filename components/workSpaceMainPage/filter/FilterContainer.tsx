"use client";

import { Filter } from "./Filter";
import { Clear } from "./Clear";
import { useFilterByUsersAndTagsInWorkspace } from "@/context/FilterByUsersAndTagsInWorkspace";
import { ActiveFilteredUser } from "./activeFilteredUsersandTags/ActiveFilteredUser";
import { ActiveFilteredTag } from "./activeFilteredUsersandTags/ActiveFilteredTag";

interface Props {
  sessionUserId: string;
}

export const FilterContainer = ({ sessionUserId }: Props) => {
  const { filterAssignedUsers, filterTags } =
    useFilterByUsersAndTagsInWorkspace();

  return (
    <div className="flex w-full flex-wrap pb-4 gap-2">
      <Filter sessionUserId={sessionUserId} />
      {filterAssignedUsers.map((user) => (
        <ActiveFilteredUser
          key={user.id}
          id={user.id}
          image={user.image}
          username={user.username}
        />
      ))}
      {filterTags.map((tag) => (
        <ActiveFilteredTag tag={tag} key={tag.id} />
      ))}
      {(filterAssignedUsers.length > 0 || filterTags.length > 0) && <Clear />}
    </div>
  );
};
