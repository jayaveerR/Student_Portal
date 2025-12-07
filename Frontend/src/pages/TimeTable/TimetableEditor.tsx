import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import "./TimetablePrint.css";

/**
 * Simple timetable editor supporting:
 * - add/remove row/column
 * - select multiple cells
 * - merge selected cells (rectangular selection only)
 * - split a merged cell (basic)
 *
 * Not a full spreadsheet engine (edge cases like complex overlapping merges need extra logic).
 */

interface Cell {
    id: string;
    text: string;
    rowSpan: number;
    colSpan: number;
    hidden: boolean;
    r: number;
    c: number;
    isVertical?: boolean;
}

const makeCell = (r: number, c: number): Cell => ({
    id: `${r}-${c}-${uuid().slice(0, 6)}`,
    text: "",
    rowSpan: 1,
    colSpan: 1,
    hidden: false,
    r,
    c,
    isVertical: false,
});



const createGrid = (rows: number, cols: number): Cell[][] => {
    const grid: Cell[][] = [];
    for (let r = 0; r < rows; r++) {
        const row: Cell[] = [];
        for (let c = 0; c < cols; c++) row.push(makeCell(r, c));
        grid.push(row);
    }
    return grid;
};

interface TimetableEditorProps {
    initialRows?: number;
    initialCols?: number;
    initialData?: Cell[][];
    onChange?: (data: Cell[][]) => void;
}

export default function TimetableEditor({ initialRows = 5, initialCols = 6, initialData, onChange }: TimetableEditorProps) {
    const [grid, setGrid] = useState<Cell[][]>(() => {
        if (Array.isArray(initialData) && initialData.length > 0) {
            return initialData;
        }
        return createGrid(initialRows, initialCols);
    });
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [lastAction, setLastAction] = useState<string | null>(null);

    // Sync initialData if it changes (and is valid)
    // We use a ref to prevent loop when the change came from this component
    const isInternalChange = React.useRef(false);

    useEffect(() => {
        if (isInternalChange.current) {
            isInternalChange.current = false;
            return;
        }
        if (Array.isArray(initialData) && initialData.length > 0) {
            setGrid(initialData);
        }
    }, [initialData]);

    // Notify parent of changes
    useEffect(() => {
        if (onChange) {
            isInternalChange.current = true;
            onChange(grid);
        }
    }, [grid, onChange]);

    const findCellPos = (id: string) => {
        for (let r = 0; r < grid.length; r++) {
            for (let c = 0; c < grid[r].length; c++) {
                if (grid[r][c].id === id) return { r, c, cell: grid[r][c] };
            }
        }
        return null;
    };

    const toggleSelect = (cell: Cell) => {
        const newSel = new Set(selected);
        if (newSel.has(cell.id)) newSel.delete(cell.id);
        else newSel.add(cell.id);
        setSelected(newSel);
    };

    const clearSelection = () => setSelected(new Set());

    // Add a new empty row at end
    const addRow = () => {
        const rows = grid.length;
        const cols = grid[0]?.length || 0;
        const newRow: Cell[] = [];
        for (let c = 0; c < cols; c++) newRow.push(makeCell(rows, c));
        setGrid((g) => [...g, newRow]);
        setLastAction("addRow");
    };

    // Add a new column at end
    const addCol = () => {
        setGrid((g) => g.map((row, r) => [...row, makeCell(r, row.length)]));
        setLastAction("addCol");
    };

    // Remove last row (simple)
    const removeRow = () => {
        if (grid.length <= 1) return;
        setGrid((g) => g.slice(0, g.length - 1));
        clearSelection();
        setLastAction("removeRow");
    };

    // Remove last column (simple)
    const removeCol = () => {
        if (grid[0].length <= 1) return;
        setGrid((g) => g.map((row) => row.slice(0, row.length - 1)));
        clearSelection();
        setLastAction("removeCol");
        toast.success("Column removed");
    };



    // Simple rectangular merge
    const mergeSelected = () => {
        if (selected.size < 2) {
            toast.warning("Select 2 or more cells to merge (rectangular).");
            return;
        }

        // Map selected ids to positions
        const positions = Array.from(selected).map((id) => findCellPos(id)).filter(Boolean) as { r: number, c: number, cell: Cell }[];
        if (positions.length !== selected.size) {
            toast.error("Selection contains hidden/invalid cells.");
            return;
        }

        // Determine bounding rectangle
        const rs = positions.map((p) => p.r);
        const cs = positions.map((p) => p.c);
        const rMin = Math.min(...rs), rMax = Math.max(...rs);
        const cMin = Math.min(...cs), cMax = Math.max(...cs);

        // Check all cells in rectangle are selected (to prevent L-shape merges)
        for (let r = rMin; r <= rMax; r++) {
            for (let c = cMin; c <= cMax; c++) {
                if (!selected.has(grid[r][c].id)) {
                    toast.warning("Please select a full rectangle of cells to merge.");
                    return;
                }
            }
        }

        setGrid((g) => {
            const newG = g.map((row) => row.map((cell) => ({ ...cell })));

            // set top-left cell spans
            const top = newG[rMin][cMin];
            top.rowSpan = rMax - rMin + 1;
            top.colSpan = cMax - cMin + 1;

            // hide other cells
            for (let r = rMin; r <= rMax; r++) {
                for (let c = cMin; c <= cMax; c++) {
                    if (!(r === rMin && c === cMin)) {
                        newG[r][c].hidden = true;
                    }
                }
            }
            return newG;
        });

        clearSelection();
        setLastAction("merge");
        toast.success("Cells merged");
    };

    // Split a merged cell (if selected single merged cell)
    const splitSelected = () => {
        if (selected.size !== 1) {
            toast.warning("Select the merged cell to split.");
            return;
        }
        const id = Array.from(selected)[0];
        const pos = findCellPos(id);
        if (!pos) return;
        const { r, c, cell } = pos;
        if (cell.rowSpan === 1 && cell.colSpan === 1) {
            toast.info("Cell is not merged.");
            return;
        }

        setGrid((g) => {
            const newG = g.map((row) => row.map((cell) => ({ ...cell })));
            // clear spans on top-left
            const top = newG[r][c];
            const rs = top.rowSpan;
            const cs = top.colSpan;
            top.rowSpan = 1;
            top.colSpan = 1;

            // unhide covered cells and reset them to new simple cells
            for (let rr = r; rr < r + rs; rr++) {
                for (let cc = c; cc < c + cs; cc++) {
                    if (rr === r && cc === c) continue;
                    newG[rr][cc] = makeCell(rr, cc); // fresh cell (loses previous text)
                }
            }
            return newG;
        });

        clearSelection();
        setLastAction("split");
    };

    // Toggle vertical text for selected cells
    const toggleVertical = () => {
        if (selected.size === 0) return;
        setGrid((g) =>
            g.map((row) =>
                row.map((cell) => {
                    if (selected.has(cell.id)) {
                        return { ...cell, isVertical: !cell.isVertical };
                    }
                    return cell;
                })
            )
        );
        setLastAction("toggleVertical");
    };

    // Edit cell text (inline)
    const updateCellText = (cellId: string, newText: string) => {
        setGrid((g) =>
            g.map((row) =>
                row.map((cell) => (cell.id === cellId ? { ...cell, text: newText } : cell))
            )
        );
    };

    return (
        <div className="p-4 w-full max-w-full overflow-hidden print:overflow-visible print:max-w-none">
            <div className="mb-3 flex gap-2 flex-wrap print:hidden">
                <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={addRow}>Add Row</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={addCol}>Add Col</button>
                <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={removeRow}>Remove Row</button>
                <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={removeCol}>Remove Col</button>
                <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={mergeSelected}>Merge Selected</button>
                <button className="px-3 py-1 bg-yellow-500 text-white rounded" onClick={splitSelected}>Split Selected</button>
                <button className="px-3 py-1 bg-purple-600 text-white rounded" onClick={toggleVertical}>Vertical Text</button>
                <button className="px-3 py-1 bg-gray-300 rounded" onClick={clearSelection}>Clear Selection</button>
                <div className="ml-auto text-sm text-gray-600">
                    Selected: {selected.size} • Last: {lastAction ?? "—"}
                </div>
            </div>

            <div className="overflow-auto border-2 border-black rounded">
                <table className="w-full border-collapse table-fixed">
                    <tbody>
                        {grid.map((row, r) => (
                            <tr key={`row-${r}`} className="h-[25px] md:h-[30px] print:h-[36px]">
                                {row.map((cell, c) => {
                                    if (cell.hidden) return null;
                                    const isSelected = selected.has(cell.id);
                                    return (
                                        <td
                                            key={cell.id}
                                            rowSpan={cell.rowSpan}
                                            colSpan={cell.colSpan}
                                            className={`border md:border-2 border-black p-0.5 md:p-1 min-w-[70px] md:min-w-[100px] print:min-w-0 h-[25px] md:h-[30px] max-h-[25px] md:max-h-[30px] print:h-[36px] print:max-h-[36px] ${isSelected ? "ring-2 ring-offset-1 ring-blue-400" : ""}`}
                                            style={{ verticalAlign: 'middle' }}
                                        >
                                            <div className="relative w-full h-full flex items-center justify-center">
                                                <button
                                                    onClick={() => toggleSelect(cell)}
                                                    className={`absolute top-0 left-0 text-[8px] md:text-[10px] px-0.5 md:px-1 py-0 rounded print:hidden ${isSelected ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                                                >
                                                    {isSelected ? "Sel" : "•"}
                                                </button>

                                                <div
                                                    contentEditable
                                                    suppressContentEditableWarning
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') e.preventDefault();
                                                    }}
                                                    onBlur={(e) => updateCellText(cell.id, e.target.innerText)}
                                                    style={{
                                                        writingMode: cell.isVertical ? 'vertical-lr' : undefined,
                                                        textOrientation: cell.isVertical ? 'upright' : undefined,
                                                        letterSpacing: cell.isVertical ? '1px' : undefined
                                                    }}
                                                    className={`outline-none text-center flex items-center justify-center w-full font-bold leading-none whitespace-nowrap overflow-hidden print:text-xs text-[9px] md:text-[11px] ${cell.text && cell.text.length > 15 ? 'text-[7px] md:text-[8px] print:text-[10px]' : ''}`}
                                                >
                                                    {cell.text}
                                                </div>
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
