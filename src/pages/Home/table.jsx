import { TableContext } from "context/tableContext";
import React, { useContext, useState } from "react";
import "./table.sass";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const Table = () => {
    const { data, setTableData } = useContext(TableContext);

    const [editingRow, setEditingRow] = useState(null);
    const [editingField, setEditingField] = useState(null);

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
                                {/* <td onClick={() => toggleCategory(categoryIndex)}>{category.name}</td> */}
                                <td>
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
                                            >
                                                {category.name}
                                            </span>
                                        )}
                                    </td>
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
