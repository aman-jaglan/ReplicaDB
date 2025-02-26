
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DataTableProps {
  headers: string[];
  rows: string[][];
  maxRows?: number;
}

const DataTable = ({ headers, rows, maxRows = 100 }: DataTableProps) => {
  const displayRows = maxRows ? rows.slice(0, maxRows) : rows;

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} className="font-semibold">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayRows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>
                  {cell || <span className="text-muted-foreground italic">null</span>}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {rows.length > maxRows && (
        <div className="p-3 text-xs text-center text-muted-foreground border-t border-border">
          Showing {maxRows} of {rows.length} rows
        </div>
      )}
    </div>
  );
};

export default DataTable;
