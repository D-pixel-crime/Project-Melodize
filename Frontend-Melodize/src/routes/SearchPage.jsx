import { useState } from "react";
import TextInput from "../components/shared/TextInput";
import CommonContainer from "../containers/CommonContainer";
import { Icon } from "@iconify/react";

const SearchPage = () => {
  const [query, setQuery] = useState("");

  return (
    <CommonContainer>
      <div className="w-full flex flex-col justify-evenly items-end px-16">
        <TextInput
          label={"Search"}
          placeholder={"Enter Song You Want To Listen To"}
          value={query}
          setValue={setQuery}
          otherThanLoginPage={true}
        />
        <button
          className="h-full mb-1 text-lg"
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          <Icon icon="ri:search-line" />
        </button>
      </div>
      <div></div>
    </CommonContainer>
  );
};
export default SearchPage;
