import {
  ColumnDetails,
  Operation as OperationDetails,
  TableItemActions,
} from "index";
import { useEffect, Dispatch, SetStateAction } from "react";
import Checkbox from "./Checkbox";

function Header({ details }: { details: ColumnDetails }) {
  return (
    <th
      key={details.title}
      className="px-4 py-2 border font-semibold text-left"
    >
      {details.title}
    </th>
  );
}

function Row({
  columns,
  data,
  actions,
  setState,
}: {
  columns: ColumnDetails[];
  data: any;
  actions: any[];
  setState: Dispatch<SetStateAction<string[]>>;
}) {
  return (
    <tr className="border">
      {columns.map((column) =>
        column.hidden ? null : column.dataIndex.includes("checker") ? (
          <td
            key={column.title}
            className="flex flex-col items-center justify-center py-4"
          >
            <Checkbox
              setState={setState}
              propVal={{ ...data }}
              name="checked"
            />
          </td>
        ) : (
          <td key={column.title} className="px-4 py-2 border">{`${
            data[column.dataIndex]
          }`}</td>
        )
      )}
      <td className="px-4 py-2 border">
        {actions.map((action) => action.render({ ...data }))}
      </td>
    </tr>
  );
}

type TableProps = {
  columns: Array<ColumnDetails>;
  dataSource: Array<any>;
  operations?: Array<OperationDetails>;
  actions?: Array<TableItemActions>;
  setState: Dispatch<SetStateAction<string[]>>;
};

export default function Table({
  columns,
  dataSource,
  operations,
  actions,
  setState,
}: TableProps) {
  useEffect(() => {
    console.log(dataSource, "refresh");
  }, [dataSource]);

  return (
    <div className=" text-center shrink p-4 gap-4">
      {operations?.length ? (
        <div className="flex flex-row-reverse gap-6">
          {operations?.map((operation) => operation.render())}
        </div>
      ) : null}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            {columns.map((column) =>
              column.hidden ? null : (
                <Header key={column.title} details={column} />
              )
            )}
            <th className="px-4 py-2 border font-semibold text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {dataSource.map((data, index) => (
            <Row
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              columns={columns}
              data={data}
              actions={actions ?? []}
              setState={setState}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

Table.defaultProps = {
  operations: [],
  actions: [],
};
