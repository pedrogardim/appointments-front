import { useEffect, useState } from "react";
import clsx from "clsx";
import { User } from "@/types/user";
import { useLazyGetTattooistsQuery } from "@/services";

interface TattooistSelectorProps {
  tattooist?: User;
  onSelect: (tattoist: User) => void;
}

const TattooistSelector = ({ tattooist, onSelect }: TattooistSelectorProps) => {
  const [getTattooists, { data, isLoading }] = useLazyGetTattooistsQuery();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const debounced = setTimeout(() => {
      getTattooists({ search: searchValue, pageSize: 5 });
    }, 350);

    return () => clearTimeout(debounced);
  }, [searchValue]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="dropdown">
      {tattooist && (
        <img
          src={tattooist.profilePicUrl}
          alt="avatar"
          className="rounded-full h-8 w-8 absolute top-2 left-2 pointer-events-none"
        />
      )}
      <input
        className={clsx("input input-bordered", tattooist && "pl-12")}
        placeholder={tattooist?.firstName || "Pick a tattooist"}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <ul
        className="dropdown-content flex flex-col flex-nowrap z-[1] menu p-2 shadow bg-base-100 rounded-box w-full h-64 overflow-y-scroll"
        tabIndex={0}
      >
        {data &&
          data.map((e) => (
            <li key={e.id} onClick={() => onSelect(e)}>
              <a className="flex items-center">
                <img
                  src={e.profilePicUrl}
                  alt="avatar"
                  className="rounded-full h-8 w-8 pointer-events-none"
                />
                {`${e.firstName} ${e.lastName}`}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TattooistSelector;
