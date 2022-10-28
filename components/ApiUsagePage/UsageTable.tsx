import { Table } from "@mantine/core";
import { ApiUsageRecord } from "@prisma/client";
import { FC } from "react";

type Props = {
  usageList: ApiUsageRecord[];
};

const UsageTable: FC<Props> = ({ usageList }) => {
  const rows = usageList.map((element) => (
    <tr key={element.id}>
      <td>{`${new Date(element.called_at)}`}</td>
      <td>{element.api_name}</td>
      <td>{element.called_by}</td>
    </tr>
  ));
  return (
    <Table>
      <thead>
        <tr>
          <th>Created At</th>
          <th>API Name</th>
          <th>Called By</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default UsageTable;
