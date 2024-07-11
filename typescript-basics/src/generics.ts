interface Iauthor {
  id: number;
  username: string;
}

interface Icategory {
  id: number;
  title: string;
}

interface Ipost {
  id: number;
  title: string;
  description: string;
  extra: Iauthor[] | Icategory[];
}

//* What if in the future the items have increased and fetching data is lot more.

interface IpostBetter<T> {
  id: number;
  title: string;
  description: string;
  extra: T[];
}

const testme: IpostBetter<String> = {
  id: 1,
  title: "string",
  description: "string",
  extra: ["str1", "str2", "str3"],
};

// ! Advanced Element Checking Methods

// * Making the Interface Even comples for datas ot item passing
interface IpostEvenBetter<T extends object> {
  id: number;
  title: string;
  description: string;
  extra: T[];
}

const testme2: IpostBetter<{ id: number; username: string }> = {
  id: 1,
  title: "string",
  description: "string",
  extra: [{ id: 10, username: "babu" }],
};

//* Another Method About Above
const testme3: IpostBetter<Iauthor> = {
  id: 1,
  title: "string",
  description: "string",
  extra: [{ id: 10, username: "babu" }],
};

const testme4: IpostBetter<Icategory> = {
  id: 1,
  title: "string",
  description: "string",
  extra: [{ id: 100, title: "cat" }],
};
