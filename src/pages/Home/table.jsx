import { TableContext } from "context/tableContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./table.sass";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const Table = () => {
    const { data, setTableData } = useContext(TableContext);

    const [editingRow, setEditingRow] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const tableRef = useRef(null);

    // Init. with the first row focused
    useEffect(() => {
      if (tableRef.current) {
        tableRef.current.focus();
      }
    }, []);

    const handleEditCategoryDescription = (categoryIndex, description) => {
        updateCategoryDescription(categoryIndex, description);
        setEditingRow(null);
        setEditingField(null);
    };

    const handleEditCategoryName = (categoryIndex, name) => {
        updateCategoryName(categoryIndex, name);
        setEditingRow(null);
        setEditingField(null);
    };

    const handleEditFilmName = (categoryIndex, filmIndex, name) => {
        updateFilmName(categoryIndex, filmIndex, name);
        setEditingRow(null);
        setEditingField(null);
    };

    const handleEditFilmDescription = (categoryIndex, filmIndex, description) => {
        updateFilmDescription(categoryIndex, filmIndex, description);
        setEditingRow(null);
        setEditingField(null);
    };

    const updateCategoryDescription = (categoryIndex, newDescription) => {
        setTableData((prevData) => {
            const newData = [...prevData];
            newData[categoryIndex].description = newDescription;
            return newData;
        });
    };

    const updateFilmName = (categoryIndex, filmIndex, newName) => {
        setTableData((prevData) => {
            const newData = [...prevData];
            newData[categoryIndex].films[filmIndex].name = newName;
            return newData;
        });
    };

    const updateFilmDescription = (categoryIndex, filmIndex, newDescription) => {
        setTableData((prevData) => {
            const newData = [...prevData];
            newData[categoryIndex].films[filmIndex].description = newDescription;
            return newData;
        });
    };

    const updateCategoryName = (categoryIndex, newName) => {
        setTableData((prevData) => {
            const newData = [...prevData];
            newData[categoryIndex].name = newName;
            return newData;
        });
    };

    const toggleCategory = (index) => {
        setTableData((prevData) => {
            const newData = [...prevData];
            newData[index].expanded = !newData[index].expanded;
            return newData;
        });
    };

    const deleteCategory = (index) => {
        setTableData((prevData) => prevData.filter((_, i) => i !== index));
    };

    const deleteFilm = (categoryIndex, filmIndex) => {
        setTableData((prevData) => {
            const newData = [...prevData];
            newData[categoryIndex].films.splice(filmIndex, 1);
            return newData;
        });
    };

    const selectCategory = (index) => {
        setTableData((prevData) => {
            const newData = [...prevData];
            newData[index].selected = !newData[index].selected;
            return newData;
        });
    };

    const selectMovies = (categoryIndex, filmIndex) => {
        setTableData((prevData) => {
            const newData = [...prevData];
            newData[categoryIndex].films[filmIndex].selected = !newData[categoryIndex].films[filmIndex].selected;
            return newData;
        });
    };

    const handleKeyDown = (event, categoryIndex, filmIndex) => {
      const rowIndex = event.target.parentElement.rowIndex;
      const rowCount = data.length;

      if (!editingRow) {
        const { key } = event;
    
        if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'ArrowLeft' || key === 'ArrowRight') {
          event.preventDefault(); // Prevents scrolling

          switch (event.key) {
            case 'ArrowDown':
              if (rowIndex < rowCount - 1) {
                if (categoryIndex === null) {
                  tableRef.current?.rows[rowIndex + 1]?.cells[0]?.children[0]?.focus();
                } else {
                  const filmCount = data[categoryIndex]?.films?.length || 0;
                  if (filmIndex === null || filmIndex === filmCount - 1) {
                    tableRef.current?.rows[rowIndex + 1]?.cells[0]?.children[0]?.focus();
                  } else {
                    tableRef.current?.rows[rowIndex]?.cells[filmIndex + 1]?.children[0]?.focus();
                  }
                }
              }
              break;
            case 'ArrowUp':
              if (rowIndex > 1) {
                if (categoryIndex === null) {
                  tableRef.current?.rows[rowIndex - 1]?.cells[0]?.children[0]?.focus();
                } else {
                  const filmCount = data[categoryIndex]?.films?.length || 0;
                  if (filmIndex === null || filmIndex === 0) {
                    tableRef.current?.rows[rowIndex - 1]?.cells[0]?.children[0]?.focus();
                  } else {
                    tableRef.current?.rows[rowIndex]?.cells[filmIndex - 1]?.children[0]?.focus();
                  }
                }
              }
              break;
            case 'ArrowLeft':
              if (filmIndex !== null && filmIndex > 0) {
                tableRef.current?.rows[rowIndex]?.cells[filmIndex - 1]?.children[0]?.focus();
              }
              break;
            case 'ArrowRight':
              if (categoryIndex !== null) {
                const filmCount = data[categoryIndex]?.films?.length || 0;
                if (filmIndex === null || filmIndex < filmCount - 1) {
                  tableRef.current?.rows[rowIndex]?.cells[filmIndex + 1]?.children[0]?.focus();
                }
              }
              break;
            default:
              break;
          }
        }
      }
    };    

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Checkbox</th>
                        <th>Description</th>
                        <th>Delete</th>
                        <th>Expand</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((category, categoryIndex) => (
                        <React.Fragment key={categoryIndex}>
                            <tr>
                                <td>

                                        {editingRow === categoryIndex && editingField === "name" ? (
                                            <input
                                                type="text"
                                                value={category.name}
                                                onChange={(e) => updateCategoryName(categoryIndex, e.target.value)}
                                                onBlur={() => handleEditCategoryName(categoryIndex, category.name)}
                                                autoFocus
                                            />
                                        ) : (
                                            <span
                                                onClick={() => {
                                                    setEditingRow(categoryIndex);
                                                    setEditingField("name");
                                                }}
                                                tabIndex={0}
                                                onKeyDown={(event) => handleKeyDown(event, categoryIndex, 0)}
                                            >
                                                {category.name}
                                            </span>
                                        )}
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={category.selected}
                                        onChange={() => selectCategory(categoryIndex)}
                                    />
                                </td>
                                <td>
                                    {editingRow === categoryIndex && editingField === "description" ? (
                                        <input
                                            type="text"
                                            value={category.description}
                                            onChange={(e) => updateCategoryDescription(categoryIndex, e.target.value)}
                                            onBlur={() =>
                                                handleEditCategoryDescription(categoryIndex, category.description)
                                            }
                                            autoFocus
                                        />
                                    ) : (
                                        <span
                                            onClick={() => {
                                                setEditingRow(categoryIndex);
                                                setEditingField("description");
                                            }}
                                            tabIndex={0} 
                                            onKeyDown={(event) => handleKeyDown(event, categoryIndex, 0)}
                                        >
                                            {category.description}
                                        </span>
                                    )}
                                </td>
                                <td>
                                    <span onClick={() => deleteCategory(categoryIndex)}>🗑️</span>
                                </td>
                                <td onClick={() => toggleCategory(categoryIndex)}>
                                    {!category.expanded ? (
                                        <AddCircleOutlineIcon color="disabled" />
                                    ) : (
                                        <RemoveCircleOutlineIcon color="disabled" />
                                    )}
                                </td>
                            </tr>
                            {category.expanded &&
                                category.films.map((film, filmIndex) => (
                                    <tr key={filmIndex}>
                                        <td>
                                            {editingRow === categoryIndex &&
                                            editingField === `filmName_${filmIndex}` ? (
                                                <input
                                                    type="text"
                                                    value={film.name}
                                                    onChange={(e) =>
                                                        updateFilmName(categoryIndex, filmIndex, e.target.value)
                                                    }
                                                    onBlur={() =>
                                                        handleEditFilmName(categoryIndex, filmIndex, film.name)
                                                    }
                                                    autoFocus
                                                />
                                            ) : (
                                                <span
                                                    onClick={() => {
                                                        setEditingRow(categoryIndex);
                                                        setEditingField(`filmName_${filmIndex}`);
                                                    }}
                                                    tabIndex={0} // tabindex to make field focusable
                                                    onKeyDown={(event) =>
                                                        handleKeyDown(event, categoryIndex, filmIndex)
                                                    }
                                                >
                                                    {film.name}
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={film.selected}
                                                onChange={() => selectMovies(categoryIndex, filmIndex)}
                                            />
                                        </td>
                                        <td>
                                            {editingRow === categoryIndex &&
                                            editingField === `filmDescription_${filmIndex}` ? (
                                                <input
                                                    type="text"
                                                    value={film.description}
                                                    onChange={(e) =>
                                                        updateFilmDescription(categoryIndex, filmIndex, e.target.value)
                                                    }
                                                    onBlur={() =>
                                                        handleEditFilmDescription(
                                                            categoryIndex,
                                                            filmIndex,
                                                            film.description
                                                        )
                                                    }
                                                    autoFocus
                                                />
                                            ) : (
                                                <span
                                                    onClick={() => {
                                                        setEditingRow(categoryIndex);
                                                        setEditingField(`filmDescription_${filmIndex}`);
                                                    }}
                                                    tabIndex={0} // tabindex to make field focusable
                                                    onKeyDown={(event) =>
                                                        handleKeyDown(event, categoryIndex, filmIndex)
                                                    }
                                                >
                                                    {film.description}
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <span onClick={() => deleteFilm(categoryIndex, filmIndex)}>🗑️</span>
                                        </td>
                                        <td></td>
                                    </tr>
                                ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
