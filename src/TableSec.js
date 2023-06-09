import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Modal, Input, Form, Select, Switch } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  PlusCircleTwoTone,
  MinusCircleTwoTone,
} from "@ant-design/icons";
import { createPath } from "react-router-dom";

export default function TableSec() {
  const divStyle = {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "50px",
  };
  const [table1Data, setTable1Data] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [beingEdited, setBeingEdited] = useState(null);
  const [alreadySelectedKeys, setAlreadySelectedKeys] = useState(["2"]);
  const [editKey, setEditKey] = useState("");
  const [form] = Form.useForm();
  const table1Column = [
    {
      key: "1",
      title: "Order",
      dataIndex: "id",
      filters: [{ text: "10", value: 10 }],
      onFilter: (value, record) => {
        return record.id === value;
      },
    },
    {
      key: "2",
      title: "User ID",
      dataIndex: "userId",
      sorter: (rec1, rec2) => {
        return rec1.userId > rec2.userId;
      },
    },
    {
      key: "3",
      title: "Status",
      dataIndex: "completed",
      render: (completed) => {
        return <p>{completed ? "Complete" : "In Progress"}</p>;
      },
      filters: [
        { text: "Complete", value: true },
        { text: "In Progress", value: false },
      ],
      onFilter: (value, record) => {
        return record.completed === value;
      },
    },
    {
      key: "4",
      title: "Title",
      dataIndex: "title",
      render: (title) => {
        return <p>{title.slice(0, 20)}...</p>;
      },
    },
  ];
  const [table2Data, setTable2Data] = useState([
    {
      key: 1,
      id: 1,
      name: "Sorbon",
      email: "Sorbon@gmail.com",
      grade: "A",
    },
    {
      key: 2,
      id: 2,
      name: "Somon",
      email: "Somon@gmail.com",
      grade: "B",
    },
    {
      key: 3,
      id: 3,
      name: "Ismoil",
      email: "Ismoil@gmail.com",
      grade: "C",
    },
    {
      key: 4,
      id: 4,
      name: "Umed",
      email: "Umed@gmail.com",
      grade: "A",
    },
    {
      key: 5,
      id: 5,
      name: "Bakha",
      email: "Bakha@gmail.com",
      grade: "B",
    },
    {
      key: 6,
      id: 6,
      name: "Buzurg",
      email: "Buzurg@gmail.com",
      grade: "C",
    },
  ]);
  const table2Column = [
    {
      key: "1",
      title: "Student ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Student Name",
      dataIndex: "name",
      render: (text, record) => {
        if (record.key === editKey) {
          return (
            <Form.Item name="name">
              <Input />
            </Form.Item>
          );
        } else {
          return text;
        }
      },
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="search names"
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              value={selectedKeys[0]}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="primary"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined style={{ fontSize: "1.2rem" }} />;
      },
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      key: "3",
      title: "Student Email",
      dataIndex: "email",
      render: (text, record) => {
        if (record.key === editKey) {
          return (
            <Form.Item name="email">
              <Input />
            </Form.Item>
          );
        } else {
          return text;
        }
      },
    },
    {
      key: "4",
      title: "Student Grade",
      dataIndex: "grade",
      render: (tag) => {
        const color = tag.includes("A")
          ? "green"
          : tag.includes("B")
          ? "blue"
          : "red";
        return <Tag color={color}>{tag}</Tag>;
      },
    },
    {
      key: "5",
      title: "Actions",
      render: (rec) => {
        return (
          <>
            <DeleteOutlined
              style={{ color: "red", fontSize: "1.2rem", cursor: "pointer" }}
              onClick={() => deleteStudent(rec)}
            />
            <EditOutlined
              style={{
                color: "darkblue",
                marginLeft: "20px",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
              onClick={() => onEditStudent(rec)}
            />
          </>
        );
      },
    },
    {
      key: "6",
      title: "Actions",
      render: (rec) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setEditKey(rec.key);
                form.setFieldsValue({
                  name: rec.name,
                  email: rec.email,
                });
              }}
            >
              EditRow
            </Button>
            <Button type="link" htmlType="submit">
              SaveRow
            </Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await res.json();
      const newData = data.map((item, index) => {
        return { key: index, ...item };
      });
      setTable1Data(newData.slice(0, 50));
      setLoading(false);
    };

    fetchData();
  }, []);

  const AddingNewStudent = () => {
    const names = [
      "John",
      "Jane",
      "Jack",
      "Jill",
      "Islom",
      "Ali",
      "Nasim",
      "Shohin",
      "Farukh",
      "Kahor",
      "Iso",
      "Muso",
      "Barot",
      "Sator",
      "Jovid",
      "Parviz",
      "Jonibek",
      "Jurabek",
      "Jahongir",
      "Azam",
    ];
    const grades = ["A", "B", "C"];
    const randomName = Math.floor(Math.random() * 20);
    const randomGrade = Math.floor(Math.random() * 3);
    const name = names[randomName];
    const grade = grades[randomGrade];
    const newStudent = {
      key: table2Data.length ? table2Data[table2Data.length - 1].key + 1 : 1,
      id: table2Data.length ? table2Data[table2Data.length - 1].key + 1 : 1,
      name: name,
      email: name + "@gmail.com",
      grade: grade,
    };
    setTable2Data((prev) => [...prev, newStudent]);
  };

  const deleteStudent = (rec) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setTable2Data((prev) => prev.filter((s) => s.id !== rec.id));
      },
    });
  };

  const onEditStudent = (rec) => {
    setIsEditing(true);
    setBeingEdited(rec);
  };

  const onFinish = (val) => {
    if (!editKey) return;
    const updatedData = [...table2Data];
    updatedData.splice(editKey - 1, 1, {
      ...updatedData[editKey - 1],
      key: editKey,
      name: val.name,
      email: val.email,
    });
    setTable2Data(updatedData);
    setEditKey(null);
  };

  return (
    <div style={divStyle}>
      <Table
        dataSource={table1Data}
        columns={table1Column}
        loading={loading}
        pagination={{
          pageSize: 5,
          total: 50,
          hideOnSinglePage: true,
          onChange: (page) => {
            // it consoles the page number:
            console.log(page);
          },
        }}
        rowSelection={{
          type: "checkbox",
          onSelect: (rec) => {
            console.log(rec);
          },
          hideSelectAll: true,
        }}
      ></Table>
      <div>
        <Button
          onClick={AddingNewStudent}
          style={{ width: "100%", margin: "0 auto" }}
        >
          Add a new Student
        </Button>
        <Form form={form} onFinish={onFinish}>
          <Table
            dataSource={table2Data}
            columns={table2Column}
            rowSelection={{
              type: "checkbox",
              selectedRowKeys: alreadySelectedKeys,
              onChange: (rec) => {
                setAlreadySelectedKeys(rec);
              },
              onSelect: (rec) => {
                console.log(rec);
              },
              getCheckboxProps: (rec) => ({
                disabled: rec.grade === "D",
              }),
              selections: [
                Table.SELECTION_NONE,
                Table.SELECTION_ALL,
                Table.SELECTION_INVERT,
                {
                  key: "even",
                  text: "Select Even Rows",
                  onSelect: (allKeys) => {
                    const selectedKeys = allKeys.filter((key) => {
                      return key % 2 === 0;
                    });
                    setAlreadySelectedKeys(selectedKeys);
                  },
                },
                {
                  key: "A grade",
                  text: "A - grade Owners",
                  onSelect: (records) => {
                    const AHavers = records.filter((key) => {
                      return table2Data.find(
                        (each) => each.key === key && each.grade === "A"
                      );
                    });
                    setAlreadySelectedKeys(AHavers);
                  },
                },
              ],
            }}
            pagination={{
              pageSize: 15,
              hideOnSinglePage: true,
            }}
          ></Table>
        </Form>
        <Modal
          title="Edit Student"
          open={isEditing}
          okText="Save"
          onCancel={() => {
            setIsEditing(false);
            setBeingEdited(null);
          }}
          onOk={() => {
            setTable2Data((prev) => {
              return prev.map((s) => {
                if (s.id === beingEdited.id) return beingEdited;
                return s;
              });
            });
            setIsEditing(false);
            setBeingEdited(null);
          }}
        >
          <Input
            value={beingEdited?.name}
            onChange={(e) => {
              setBeingEdited((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
          />
          <Input
            value={beingEdited?.email}
            onChange={(e) => {
              setBeingEdited((prev) => {
                return { ...prev, email: e.target.value };
              });
            }}
          />
          <Input
            value={beingEdited?.grade}
            onChange={(e) => {
              setBeingEdited((prev) => {
                return { ...prev, grade: e.target.value };
              });
            }}
          />
        </Modal>
      </div>
      <ExpandableTable />
      <HorizontalTable />
      <SortByColumn />
    </div>
  );
}

const ExpandableTable = () => {
  const [searchedVal, setSearchedVal] = useState("");
  const style = {
    width: "70%",
  };
  const columns = [
    {
      key: 1,
      title: "Name",
      dataIndex: "name",
      filteredValue: [searchedVal],
      onFilter: (val, rec) => {
        return (
          String(rec.name).toLowerCase().includes(val.toLowerCase()) ||
          String(rec.age).toLowerCase().includes(val.toLowerCase()) ||
          String(rec.address).toLowerCase().includes(val.toLowerCase())
        );
      },
    },
    {
      key: 2,
      title: "Age",
      dataIndex: "age",
      render: (index, text) => {
        if (index === 25) {
          return <div style={{ color: "red" }}>{text.age}</div>;
        }
        return text.age;
      },
    },
    {
      key: 3,
      title: "Address",
      dataIndex: "address",
    },
  ];
  const data = [];
  for (let i = 1; i < 10; i++) {
    data.push({
      key: i,
      name: "Name " + i,
      age: 20 + i,
      address: "Address " + i,
      desc: "Description " + i,
    });
  }

  return (
    <div style={style}>
      <h4 style={{ color: "red", textAlign: "center" }}>Expandable Table</h4>
      <Input.Search
        placeholder="Search only names column..."
        onSearch={(val) => {
          setSearchedVal(val);
        }}
        onChange={(e) => {
          setSearchedVal(e.target.value);
        }}
      />
      <Table
        caption={"Expandable Table"}
        columns={columns}
        dataSource={data}
        expandable={{
          rowExpandable: (rec) => rec.age < 28,
          expandedRowRender: (rec) => {
            if (rec.age === 25) {
              return <NestedTable />;
            }
            return <p>{rec.desc}</p>;
          },
          defaultExpandAllRows: false,
          defaultExpandedRowKeys: [5],
          expandRowByClick: true,
          /* expandIcon: ({ expanded, onExpand, record }) => {
          if (record.age >= 28) return null;
          return expanded ? (
            <MinusCircleTwoTone
              onClick={(e) => {
                onExpand(record, e);
              }}
            />
          ) : (
            <PlusCircleTwoTone
              onClick={(e) => {
                onExpand(record, e);
              }}
            />
          );
        }, */
        }}
      />
    </div>
  );
};

const NestedTable = () => {
  const columns = [
    { key: 1, title: "Company Name", dataIndex: "compName" },
    { key: 2, title: "Company Revune", dataIndex: "compRevune" },
  ];
  const data = [];
  for (let a = 5; a < 10; a++) {
    data.push({
      key: a,
      compName: "Name " + a,
      compRevune: "Revune " + a,
    });
  }

  return <Table columns={columns} dataSource={data} />;
};

const HorizontalTable = () => {
  const columns = [];
  const data = [];
  for (let c = 0; c < 20; c++) {
    columns.push({
      key: c,
      title: `Column ${c + 1}`,
      dataIndex: `col_${c + 1}`,
      fixed: c === 0 ? "left" : c === 19 ? "right" : null,
    });
  }
  for (let d = 0; d < 50; d++) {
    const rowData = {};
    rowData["key"] = d;
    for (let c = 0; c < 20; c++) {
      rowData[`col_${c + 1}`] = `R${d + 1}C${c + 1}`;
    }
    data.push(rowData);
  }

  return (
    <div>
      <h4 style={{ color: "red", textAlign: "center" }}>Horizontal Table</h4>
      <Table
        style={{ maxWidth: "800px" }}
        scroll={{ x: true, y: "500px", scrollToFirstRowOnChange: true }}
        columns={columns}
        dataSource={data}
        caption={"Horizontal Table"}
        pagination={{
          pageSize: 25,
          hideOnSinglePage: true,
        }}
      ></Table>
    </div>
  );
};

const SortByColumn = () => {
  const TableStyle = {
    width: "35vw",
  };
  const columns = [
    {
      key: 1,
      title: "Name",
      dataIndex: "name",
    },
    {
      key: 2,
      title: "Age",
      dataIndex: "age",
    },
  ];
  const [data, setData] = useState([
    { name: "Ismoil", age: 25 },
    { name: "Sorbon", age: 26 },
    { name: "Buzurg", age: 24 },
    { name: "Umed", age: 20 },
    { name: "Somon", age: 23 },
  ]);
  const [ascending, setAscending] = useState(true);

  const onFilterChange = (filter) => {
    const sortedData = [...data];
    if (filter === "name") {
      sortedData.sort((a, b) =>
        a.name > b.name ? 1 : a.name === b.name ? 0 : -1
      );
    } else if (filter === "age") {
      sortedData.sort((a, b) => a.age - b.age);
    }
    setData(sortedData);
  };

  const updatedData = ascending ? [...data] : [...data].reverse();

  return (
    <div>
      <span style={{ marginRight: "10px" }}>Filter: </span>
      <Select placeholder="Filter" onChange={onFilterChange}>
        <Select.Option value="name">Name</Select.Option>
        <Select.Option value="age">Age</Select.Option>
      </Select>
      <Switch
        style={{ marginLeft: "10px" }}
        checkedChildren="Asc"
        unCheckedChildren="Desc"
        defaultChecked={ascending}
        onChange={setAscending}
      />
      <Table
        caption="Filtering Table"
        style={TableStyle}
        columns={columns}
        dataSource={updatedData}
      />
      ;
    </div>
  );
};
