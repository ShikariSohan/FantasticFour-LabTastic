import { Table, Group, ActionIcon } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons";

const mockData = [
  {
    name: "John Doe",
    email: "john@gmail.com",
    totalAttendance: 20,
    totalAbsent: 2,
    addedOn: "2021-05-01",
  },
  {
    name: "John Doe",
    email: "john@gmail.com",
    totalAttendance: 20,
    totalAbsent: 2,
    addedOn: "2021-05-01",
  },
  {
    name: "Muhit Mahmud al farhan bin al Rahman",
    email: "john@gmail.com",
    totalAttendance: 20,
    totalAbsent: 2,
    addedOn: "2021-05-01",
  },
  {
    name: "John Doe",
    email: "john@gmail.com",
    totalAttendance: 20,
    totalAbsent: 2,
    addedOn: "2021-05-01",
  },
  {
    name: "John Doe",
    email: "john@gmail.com",
    totalAttendance: 20,
    totalAbsent: 2,
    addedOn: "2021-05-01",
  },
  {
    name: "John Doe",
    email: "john@gmail.com",
    totalAttendance: 20,
    totalAbsent: 2,
    addedOn: "2021-05-01",
  },
  {
    name: "John Doe",
    email: "john@gmail.com",
    totalAttendance: 20,
    totalAbsent: 2,
    addedOn: "2021-05-01",
  },
];

export default function StudentTable(props) {
  const ths = (
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Total Marks Obtain</th>
      <th>Total lab Attended</th>
    </tr>
  );

  const rows = props.students.map((element) => (
    <tr key={element.mail}>
      <td>{element.name}</td>
      <td>{element.email}</td>
      <td>20</td>
      <td>2</td>
    </tr>
  ));
  return (
    <Table
      striped
      highlightOnHover
      withBorder
      withColumnBorders
      captionSide="top"
      horizontalSpacing="xs"
      verticalSpacing="xs"
      fontSize="xs"
    >
      <caption>Student List</caption>
      <thead>{ths}</thead>
      <tbody>{rows}</tbody>
      <tfoot>{ths}</tfoot>
    </Table>
  );
}
// mock data for table name , registratin no , total attendance , total absent , added on
