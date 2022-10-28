import { Table } from "@mantine/core";
import { FC } from "react";

type ApiUsageRecord = {
  id: string;
  api_name: string;
  called_at: Date;
  called_by: string;
};

type Props = {
  usageList: ApiUsageRecord[];
};

const UsageTable: FC<Props> = ({ usageList }) => {
  const rows = usageList.map((api) => {
    const api_name = "https://www.test.com/api/" + api.api_name;
    const date = new Date(api.called_at);
    const dateFormatted = `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`;
    return (
      <tr key={api.id}>
        <td>{api_name}</td>
        <td>{dateFormatted}</td>
        <td>{api.called_by}</td>
      </tr>
    );
  });
  return (
    <Table>
      <thead>
        <tr>
          <th>API Name</th>
          <th>Created At</th>
          <th>Called By</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default UsageTable;
