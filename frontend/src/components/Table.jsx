import Button from "./Button";

export default function Table({ columns, data, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            {columns.map((col) => (
              <th key={col.key} className="py-3 px-6 text-left">
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="py-3 px-6 text-center">Ações</th>
            )}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.map((row) => (
            <tr
              key={row._id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              {columns.map((col) => (
                <td key={col.key} className="py-3 px-6 text-left whitespace-nowrap">
                  {row[col.key]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center gap-2">
                    {onEdit && (
                      <Button onClick={() => onEdit(row)} className="text-blue-600 hover:underline p-0">
                        ✏️
                      </Button>
                    )}
                    {onDelete && (
                      <Button onClick={() => onDelete(row._id)} className="text-red-600 hover:underline p-0">
                        🗑️
                      </Button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
