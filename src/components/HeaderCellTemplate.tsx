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

export interface FlagCell extends Cell {
    type: 'header';
    text: string;
}

export class FlagCellTemplate implements CellTemplate<FlagCell> {
    getCompatibleCell(uncertainCell: Uncertain<FlagCell>): Compatible<FlagCell> {
        const text = getCellProperty(uncertainCell, "text", "string");
        const value = parseFloat(text);
        return {...uncertainCell, text, value};
    }

    handleKeyDown(
        cell: Compatible<FlagCell>,
        keyCode: number,
        ctrl: boolean,
        shift: boolean,
        alt: boolean
    ): { cell: Compatible<FlagCell>; enableEditMode: boolean } {
        if (!ctrl && !alt && isAlphaNumericKey(keyCode))
            return {cell, enableEditMode: true};
        return {
            cell,
            enableEditMode: keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER
        };
    }

    update(
        cell: Compatible<FlagCell>,
        cellToMerge: UncertainCompatible<FlagCell>
    ): Compatible<FlagCell> {
        return this.getCompatibleCell({...cell, text: cellToMerge.text});
    }

    render(
        cell: Compatible<any>,
        isInEditMode: boolean,
        onCellChanged: (cell: Compatible<any>, commit: boolean) => void
    ): React.ReactNode {


        return (
            <div
                className="flex items-center justify-between text-grey-400 w-full"
            >

                {
                    cell.text !== ""
                        ?
                        (<>
                            <div className="flex items-center">
                                {cell.icon}
                            </div>
                            <div>{cell.text}</div>
                            <div className="justify-end">
                                <FaChevronDown/>
                            </div>
                        </>)
                        :
                        (
                            <>
                                <input type="checkbox" className="checkbox checkbox-primary"/>
                            </>

                        )
                }


            </div>
        );
    }
}
