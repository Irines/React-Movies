import { TableContext } from "context/tableContext";
import React, { useContext } from "react";
import "./table.sass";

const Table = () => {
    const { data, setTableData } = useContext(TableContext);

    const toggleCategory = (index) => {
        console.log("index", index);
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
                    </tr>
                </thead>
                <tbody>
                    {data.map((category, categoryIndex) => (
                        <React.Fragment key={categoryIndex}>
                            <tr>
                                <td onClick={() => toggleCategory(categoryIndex)}>{category.name}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={category.selected}
                                        onChange={() => selectCategory(categoryIndex)}
                                    />
                                </td>
                                <td>{category.description}</td>
                                <td>
                                    <span onClick={() => deleteCategory(categoryIndex)}>🗑️</span>
                                </td>
                            </tr>
                            {category.expanded &&
                                category.films.map((film, filmIndex) => (
                                    <tr key={filmIndex}>
                                        <td>{film.name}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={film.selected}
                                                onChange={() => selectMovies(categoryIndex, filmIndex)}
                                            />
                                        </td>
                                        <td>{film.description}</td>
                                        <td>
                                            <span onClick={() => deleteFilm(categoryIndex, filmIndex)}>🗑️</span>
                                        </td>
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
