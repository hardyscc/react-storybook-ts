import Table, { ColumnProps } from "antd/lib/table";
import "antd/lib/table/style";
import React from "react";
import ReactDragListView from "react-drag-listview";

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

const initColumns: ColumnProps<Person>[] = [
  {
    title: "Key",
    dataIndex: "key"
  },
  {
    title: "Name",
    dataIndex: "name"
  },
  {
    title: "Gender",
    dataIndex: "gender"
  },
  {
    title: "Age",
    dataIndex: "age"
  },
  {
    title: "Address",
    dataIndex: "address"
  }
];

interface Props {}

interface State {
  data: Person[];
  columns: ColumnProps<Person>[];
}

export class DraggableColumn extends React.Component<Props, State> {
  dragProps: object;

  constructor(props: Props) {
    super(props);

    this.state = {
      data: initData,
      columns: initColumns
    };

    const that = this;
    this.dragProps = {
      onDragEnd(fromIndex: number, toIndex: number) {
        const columns = that.state.columns;
        const item = columns.splice(fromIndex, 1)[0];
        columns.splice(toIndex, 0, item);
        that.setState({
          columns
        });
      },
      nodeSelector: "th"
    };
  }

  render() {
    return (
      <ReactDragListView.DragColumn {...this.dragProps}>
        <Table<Person>
          size="small"
          columns={this.state.columns}
          pagination={false}
          dataSource={this.state.data}
          bordered
        />
      </ReactDragListView.DragColumn>
    );
  }
}
