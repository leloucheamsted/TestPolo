import * as React from "react";
import {ReactGrid, Column, Row, CellChange, TextCell, NumberCell, CheckboxCell, DropdownCell} from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import {FlagCellTemplate} from "./components/HeaderCellTemplate";
import {FaLink, FaPlus, FaTag, FaTextHeight, FaToggleOff} from "react-icons/fa";
import {IoMdAddCircleOutline} from "react-icons/io";
import {BottomCellTemplate} from "./components/BottomAddCellTemplate";
import toggle from "./components/toggle.js";

interface Item {
    id: number;
    checked: boolean;
    text: string;
    url: string;
    ss: string;
    isOpen: boolean,

}

interface HeaderRow extends Row {

    rowId: string;
    cells: any

}

interface BottomRow extends Row {
    rowId: string;
    cells: any
}

const getPeople = (): Item[] => [
    {id: 0, checked: true, text: "Jonatha Tagne", url: "https://google.com", ss: "LOW",isOpen: false},
    {id: 1, checked: false, text: "Goldman Richard", url: "https://google.com", ss: "MEDIUM",isOpen: false},
    {id: 2, checked: true, text: "Goldman Antoine", url: "https://google.com", ss: "HIGH",isOpen: false},
    {id: 3, checked: true, text: "Jonatha Tagne", url: "https://google.com", ss: "LOW",isOpen: false},
    {id: 4, checked: false, text: "Goldman Richard", url: "https://google.com", ss: "MEDIUM",isOpen: false},
    {id: 5, checked: true, text: "Goldman Antoine", url: "https://google.com", ss: "HIGH",isOpen: false},
    {id: 6, checked: true, text: "Jonatha Tagne", url: "https://google.com", ss: "LOW",isOpen: false},
    {id: 7, checked: false, text: "Goldman Richard", url: "https://google.com", ss: "MEDIUM",isOpen: false},
    {id: 8, checked: true, text: "Goldman Antoine", url: "https://google.com", ss: "HIGH",isOpen: false},
    {id: 9, checked: true, text: "Jonatha Tagne", url: "https://google.com", ss: "LOW",isOpen: false},
    {id: 10, checked: false, text: "Goldman Richard", url: "https://google.com", ss: "MEDIUM",isOpen: false},
    {id: 11, checked: true, text: "Goldman Antoine", url: "https://google.com", ss: "HIGH",isOpen: false},
];

const getColumns = (): Column[] => [
    {columnId: "id", width: 50},
    {columnId: "bool", width: 150},
    {columnId: "text", width: 150},
    {columnId: "url", width: 150},
    {columnId: "ss", width: 150}
];

const headerRow: HeaderRow = {
    rowId: "header",
    cells: [
        {type: "header", text: ""},
        {type: "header", text: "Boolean", icon: <FaToggleOff/>},
        {type: "header", text: "Text", icon: <FaTextHeight/>},
        {type: "header", text: "URL", icon: <FaLink/>},
        {type: "header", text: "Single Select", icon: <FaTag/>}
    ]
};



type SelectType = {
    label: string
    value: string
}

const selectOptions=(): SelectType[] => [
    {label: "Low", value: "LOW"},
    {label: "Medium", value: "MEDIUM"},
    {label: "High", value: "HIGH"},
]


const applyChanges = (
    changes: CellChange<TextCell | NumberCell | CheckboxCell | DropdownCell>[],
    prevDetails: Item[],
    getEmptyDataRow: () => Item
  ): Item[] => {
    changes.forEach((change) => {
      const dataRowId = change.rowId as number;
      const fieldName = change.columnId as keyof Item;
      let dataRow = prevDetails.find((d) => d.id === dataRowId);
      if (!dataRow) {
        dataRow = getEmptyDataRow();
        prevDetails.push(dataRow);
      }
      if (change.type === "text" && typeof dataRow[fieldName] === "string") {
        dataRow[fieldName] = change.newCell.text as never;
      } else if (
        change.type === "number" &&
        typeof dataRow[fieldName] === "number"
      ) {
        dataRow[fieldName] = change.newCell.value as never;
      } else if (
        change.type === "checkbox" &&
        typeof dataRow[fieldName] === "boolean"
      ) {
        dataRow[fieldName] = change.newCell.checked as never;
      } else if (change.type === "dropdown") {
        dataRow[fieldName] = change.newCell.inputValue as never;
        // CHANGED: set the isOpen property to the value received.
        dataRow.isOpen = change.newCell.isOpen as never;
      } else {
        console.log("ERROR", change.type, dataRow[fieldName]);
      }
    });
    return [...prevDetails];
  };

const applyChangesToPeople = (
    changes: CellChange<TextCell>[],
    prevPeople: Item[]
  ): Item[] => {
    changes.forEach((change) => {
      const personIndex = change.rowId;
      const fieldName = change.columnId;
      prevPeople[personIndex][fieldName] = change.newCell.text;
    });
    return [...prevPeople];
  };
  function App() {

    const [people, setPeople] = React.useState <Item[]>(getPeople());

    const columns = getColumns();



    //add a new row
    var addRow = (): void => {
    var people = getPeople();
    var newId = people[people.length - 1].id + 1;
    const newPerson = {
        id: newId,
        checked: false,
        text: "",
        url: "",
        ss: "",
        isOpen: false
    };
    people.push(newPerson);
    setPeople(people);
    console.log(newId);
};


    const bottomRow: BottomRow = {
        rowId: "bottom",
        cells: [
            {icon: <IoMdAddCircleOutline height={10} width={10}/>, type: "bottom", text: "", change: (cell: CellChange) => { addRow()}},
            {type: "text", text: ""},
            {type: "text", text: ""},
            {type: "text", text: ""},
            {type: "text", text: ""},
        ]
    }


    const getRows = (people: Item[]): Row[] => [
        headerRow,
        ...people.map <Row>((item, idx) => ({
            rowId: idx,
            cells: [
                {type: "number", value: item.id},
                {type: "checkbox", checked: item.checked,values: item.checked},
                {type: "text", text: item.text},
                {type: "email", text: item.url},
                {type: "dropdown", selectedValue: item.ss, inputValue: item.ss, isOpen: item.isOpen, 
                values: selectOptions().map((p) => ({ label: p.label, value: p.value })),
               
            }
            ]
        })),
        bottomRow
    ];
    const rows = getRows(people);
    const getEmpty = (): Item => ({
        id: people.length + 1,
        checked: false,
        text: "",
        url: "",
        ss: "",
        isOpen: false
      });
      const handleChanges = (changes: CellChange<TextCell>[]) => {
        setPeople((prevPeople) => applyChanges(changes, prevPeople, getEmpty));
      };
    
    
    return (
        <div className="flex h-screen justify-center items-center">
            <ReactGrid
                rows={rows}
                columns={columns}
                onChanges={handleChanges}
                onCellsChanged={handleChanges}
                customCellTemplates={{header: new FlagCellTemplate(), bottom: new BottomCellTemplate()}}
                enableRangeSelection={true}
                enableRowSelection
                enableColumnSelection
                enableFillHandle
            />
        </div>)
}

export default App