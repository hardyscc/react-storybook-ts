import { Table } from "antd";
import { ColumnProps, CompareFn } from "antd/lib/table";
import React from "react";

interface Person {
  key: string;
  name: string;
  gender: string;
  age: number;
  address: string;
}

const initData: Person[] = [
  {
    key: "1",
    name: "Boran",
    gender: "male",
    age: 12,
    address: "New York"
  },
  {
    key: "2",
    name: "JayChou",
    gender: "male",
    age: 38,
    address: "TaiWan"
  },
  {
    key: "3",
    name: "Lee",
    gender: "female",
    age: 22,
    address: "BeiJing"
  },
  {
    key: "4",
    name: "ChouTan",
    gender: "male",
    age: 31,
    address: "HangZhou"
  },
  {
    key: "5",
    name: "AiTing",
    gender: "female",
    age: 22,
    address: "Xi’An"
  }
];

const nameComp: CompareFn<Person> = (a: Person, b: Person) =>
  a.name.localeCompare(b.name);

const genderComp: CompareFn<Person> = (a: Person, b: Person) =>
  a.gender.localeCompare(b.gender);

const getCompByName = (dataIndex: string): CompareFn<Person> => {
  switch (dataIndex) {
    case "name":
      return nameComp;
    case "gender":
      return genderComp;
    default:
      throw Error("error");
  }
};

interface Props {}

interface State {
  data: Person[];
  columns: ColumnProps<Person>[];
  compFunctions: CompareFn<Person>[];
}

export class MultiColumnsSort extends React.Component<Props, State> {
  multipleSorter: CompareFn<Person>;
  handleHeaderCell: (props: ColumnProps<Person>) => any;

  constructor(props: Props) {
    super(props);

    const that = this;

    this.multipleSorter = (a: Person, b: Person) => {
      for (const compFn of that.state.compFunctions) {
        const result = compFn(a, b);
        if (result !== 0) {
          return result;
        }
      }
      return 0;
    };

    this.handleHeaderCell = (props: ColumnProps<Person>) => {
      return {
        onClick: () => {
          const compFn = getCompByName(props.dataIndex!);
          const compFunctions = that.state.compFunctions;
          if (compFunctions[0] !== compFn) {
            compFunctions.unshift(compFn);
          }
          that.setState({ compFunctions: compFunctions.slice(0, 2) });
        }
      };
    };

    this.state = {
      data: initData,
      columns: [
        {
          title: "Key",
          dataIndex: "key"
        },
        {
          title: "Name",
          dataIndex: "name",
          sortDirections: ["ascend"],
          sorter: this.multipleSorter,
          onHeaderCell: this.handleHeaderCell
        },
        {
          title: "Gender",
          dataIndex: "gender",
          sortDirections: ["ascend"],
          sorter: this.multipleSorter,
          onHeaderCell: this.handleHeaderCell
        },
        {
          title: "Age",
          dataIndex: "age"
        },
        {
          title: "Address",
          dataIndex: "address"
        }
      ],
      compFunctions: []
    };
  }

  render() {
    return (
      <Table<Person>
        size="small"
        columns={this.state.columns}
        pagination={false}
        dataSource={this.state.data}
        bordered
      />
    );
  }
}
