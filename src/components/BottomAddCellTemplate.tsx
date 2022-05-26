import * as React from "react";
import {
    CellTemplate,
    Cell,
    Compatible,
    Uncertain,
    UncertainCompatible,
    isNavigationKey,
    getCellProperty,
    isAlphaNumericKey,
    keyCodes, Id
} from "@silevis/reactgrid";
import {FaChevronDown} from "react-icons/fa";

// import "./flag-cell-style.css";

export interface BottomCell extends Cell {
    type: 'header';
    text: string;

}

export class BottomCellTemplate implements CellTemplate<BottomCell> {
    getCompatibleCell(uncertainCell: Uncertain<BottomCell>): Compatible<BottomCell> {
        const text = getCellProperty(uncertainCell, "text", "string");
        const value = parseFloat(text);
        return {...uncertainCell, text, value};
    }

    render(
        cell: Compatible<any>,
        isInEditMode: boolean,
        onCellChanged: (cell: Compatible<any>, commit: boolean) => void
    ): React.ReactNode {

        return (
            <div
                className="flex items-center justify-between bg-green-300 text-grey-400 w-full"
            >

                {
                    cell.icon !== undefined
                        ?
                        (<>
                            <div className="btn btn-ghost btn-circle" onClick={()=>{cell.change(cell)}}>
                                {cell.icon}
                            </div>
                        </>)
                        :
                        (
                            <>
                            </>

                        )
                }


            </div>
        );
    }
}
