import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [comment, setComment] = useState("");
  const [tandc, setTandc] = useState("");

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    fetch("http://localhost:8080/Users")
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      });
  };

  console.log(data, "target");

  const handleEdit = (index) => {
    setId(index);
    const editData = data[index];
    //  console.log(editData , "editData")
    setName(editData.name);
    setCountry(editData.country);
    setComment(editData.comment);
    setTandc(editData.tandc);
    setData(data);
  };
  const handleCancel = () => {
    setId(null);
  };

  const handleSave = (index) => {
    const editData = data[index];
    editData.name = name;
    editData.country = country;
    editData.comment = comment;
    editData.tandc = tandc;
    setData(data);
    setId(null);
  };

  const handleDelete=(index) => {
    data.splice(index,1)
    setData([...data]);
  }
  return (
    <div className="App">
      {data.map((data, index) => {
        return (
          <div
            style={{
              width: "50rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <p>
              {id !== index ? (
                data.name
              ) : (
                <input value={name} onChange={(e) => setName(e.target.value)} />
              )}
            </p>
            <p>
              {id !== index ? (
                data.country
              ) : (
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              )}
            </p>
            <p>
              {id !== index ? (
                data.comment
              ) : (
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              )}
            </p>
            <p>
              {id !== index ? (
                data.tandc.toString()
              ) : (
                <input
                  value={tandc}
                  onChange={(e) => setTandc(e.target.value)}
                />
              )}
            </p>

            {id === index ? (
              <>
                <button onClick={() => handleSave(index)}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default App;
