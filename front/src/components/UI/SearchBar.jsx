import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const { VITE_BASE_URL } = import.meta.env;

export const SearchBar = () => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);

    const fetchData = (value) => {
        fetch(`${VITE_BASE_URL}/search`)
            .then((response) => response.json())
            .then((json) => {
                const searchArray = json.search || [];
                let filteredResults = [];

                searchArray.forEach((searchItem) => {
                    // Filtrar proyectos
                    if (searchItem.projects) {
                        const filteredProjects = searchItem.projects.filter(
                            (project) =>
                                project.project_title
                                    .toLowerCase()
                                    .includes(value.toLowerCase())
                        );
                        filteredResults = filteredResults.concat(
                            filteredProjects.map((project) => ({
                                type: 'project',
                                ...project,
                            }))
                        );
                    }

                    // Filtrar preguntas
                    if (searchItem.questions) {
                        const filteredQuestions = searchItem.questions.filter(
                            (question) =>
                                question.question_title
                                    .toLowerCase()
                                    .includes(value.toLowerCase())
                        );
                        filteredResults = filteredResults.concat(
                            filteredQuestions.map((question) => ({
                                type: 'question',
                                ...question,
                            }))
                        );
                    }

                    // Filtrar compañías
                    if (searchItem.companies) {
                        const filteredCompanies = searchItem.companies.filter(
                            (company) =>
                                company.company_name
                                    .toLowerCase()
                                    .includes(value.toLowerCase())
                        );
                        filteredResults = filteredResults.concat(
                            filteredCompanies.map((company) => ({
                                type: 'company',
                                ...company,
                            }))
                        );
                    }
                });

                setResults(filteredResults);
                console.log(filteredResults);
            });
    };

    const handleChange = (value) => {
        setInput(value);
        if (value) {
            fetchData(value);
        } else {
            setResults([]);
        }
    };

    return (
        <div className="search">
            <div className="bg-white px-2 max-w-full rounded  h-1 py-4 flex items-center m-1">
                <FaSearch className="m-2 text-[#829821]" />
                <input
                    className="m-2 focus:outline-none"
                    placeholder="Escribe para buscar..."
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                />
            </div>
            <div className=" bg-white w-full absolute  rounded-[10px] mt-px max-h-[300px] max-w-[30%] overflow-auto shadow-[#829821]">
                {input && results.length > 0
                    ? results.map((result, index) => (
                          <div key={index}>
                              {result.type === 'project' && (
                                  <>
                                      <Link
                                          to={`/project/${result.project_id}`}
                                      >
                                          Proyecto: {result.project_title}
                                      </Link>
                                  </>
                              )}
                              {result.type === 'question' && (
                                  <>
                                      <Link
                                          to={`/question/${result.question_id}`}
                                      >
                                          Pregunta:{result.question_title}
                                      </Link>
                                  </>
                              )}
                              {result.type === 'company' && (
                                  <>
                                      <h3>Compañia: {result.company_name}</h3>
                                  </>
                              )}
                          </div>
                      ))
                    : input && <p>No hay resultados</p>}
            </div>
        </div>
    );
};
