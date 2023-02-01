import { useEffect, useState } from "react";
import Button from "../button/Button";
import Loader from "../loader/Loader";
import "./Settings.scss";

const Settings = ({ closeSettings }) => {
  const localSettings = JSON.parse(localStorage.getItem("settings"));
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    numberOfQuestions: localSettings?.numberOfQuestions,
    category: localSettings?.category,
    difficulty: localSettings?.difficulty,
    type: localSettings?.type,
  });

  const optionsDifficulty = [
    { value: "any", label: "Any Difficulty" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  const optionsType = [
    { value: "any", label: "Any Type" },
    { value: "multiple", label: "Multiple Choice" },
    { value: "boolean", label: "True / False" },
  ];

  const saveSettings = (event) => {
    event.preventDefault();
    closeSettings();
  };

  const handleChange = (name, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://opentdb.com/api_category.php")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong!");
      })
      .then((data) => setCategories(data.trivia_categories));
    setIsLoading(false);
  }, []);

  return (
    <section className="settings">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="page-title">Settings</h1>
          <div className="settings-form">
            <form onSubmit={saveSettings}>
              <label>
                Number of Questions
                <input
                  type="number"
                  name="numberOfQuestions"
                  max="50"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  value={settings.numberOfQuestions}
                />
              </label>
              <label>
                Select Category
                <select
                  name="category"
                  value={settings.category}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                >
                  <option value="any">Any Category</option>
                  {categories.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Select Difficulty
                <select
                  name="difficulty"
                  defaultValue={settings.difficulty}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                >
                  {optionsDifficulty.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Select Type
                <select
                  name="type"
                  defaultValue={settings.type}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                >
                  {optionsType.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <Button type="submit">Save</Button>
            </form>
          </div>
        </>
      )}
    </section>
  );
};

export default Settings;
