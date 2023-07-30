import { TableContext } from "context/tableContext";
import "./home.sass";
import Table from "./table";
import { useMemo, useState } from "react";

const defaultTableData = [
    {
        name: "Category Adventure",
        description: "Action in all its forms defines the genre: fights, chases, risk, danger, explosions, bullets, stunts, and disaster.",
        films: [
            { name: "Indiana Jones", selected: false, description:"Daredevil archaeologist Indiana Jones races against time to retrieve a legendary dial that can change the course of history." }, 
            { name: "Jurassic Park", selected: false, description:"A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose." }
        ],
        expanded: false,
        selected: false
    },
    {
        name: "Category Superhero",
        description: " The premise is that a majority of the movie features action, which a subgenre can define further as martial arts or military action, for example.",
        films: [
            { name: "Batman", selected: false, description:"When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement." }, 
            { name: "Wonder Woman", selected: false, description:"When a pilot crashes and tells of conflict in the outside world, Diana, an Amazonian warrior in training, leaves home to fight a war, discovering her full powers and false destiny." }, 
            { name: "Spiderman", selected: false, description:"Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero." }
        ],
        expanded: false,
        selected: false,
    },
];

function Home() {
    const [data, setTableData] = useState(defaultTableData);
    const value = useMemo(() => ({ data, setTableData }), [data]);

    return (
        <TableContext.Provider value={value}>
            {useMemo(
                () => (
                    <>
                        <div className="home">Check the movies list: </div>
                        <Table />
                    </>
                ),
                []
            )}
        </TableContext.Provider>
    );
}

export default Home;
