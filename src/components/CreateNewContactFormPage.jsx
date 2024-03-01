import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateNewContactFormPage() {
  const URL = `https://boolean-api-server.fly.dev/llllllll-l/contact`;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    street: "",
    gender: "",
    email: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.firstName === "") {
      throw new Error("First name connot be empty");
    } else if (formData.lastName === "") {
      throw new Error("Surname cannot be empty");
    } else if (formData.city === "") {
      throw new Error("Citu cannot be empty");
    } else if (formData.street === "") {
      throw new Error("Street cannot be empty");
    } else if (formData.gender === "") {
      throw new Error("Gender cannot be empty");
    } else if (formData.email === "") {
      throw new Error("Email cannot be empty");
    }
    try {
      const req = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!req.ok) {
        console.log(`HTTP ERROR!, status code: ${req.status}`);
      }

      const res = await req.json();
      console.log("response: ", res);
    } catch (er) {
      console.log("OBS!!! Something went wrong with POST contact: ", er);
    }
    navigate("/");
  };

  const handleInputChange = (event) => {
    const { name, type, value, checked } = event.target;
    console.log(name, type, value, checked);
    if (name !== undefined) {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <form className="create-contact-form" onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          name="firstName"
          type="text"
          placeholder="Anders"
          onChange={handleInputChange}
          value={formData.firstName}
        />
      </label>
      <label>
        Surname:
        <input
          name="lastName"
          type="text"
          placeholder="Andersson"
          onChange={handleInputChange}
          value={formData.lastName}
        />
      </label>
      <label>
        Gender:
        <input
          name="gender"
          type="text"
          placeholder="male"
          onChange={handleInputChange}
          value={formData.gender}
        />
      </label>
      <label>
        Email:
        <input
          name="email"
          type="text"
          placeholder="temp@tempsson@example.com"
          onChange={handleInputChange}
          value={formData.email}
        />
      </label>
      <label>
        City:
        <input
          name="city"
          type="text"
          placeholder="Karlskrona"
          onChange={handleInputChange}
          value={formData.city}
        />
      </label>
      <label>
        Street:
        <input
          name="street"
          type="text"
          placeholder="Street"
          onChange={handleInputChange}
          value={formData.street}
        />
      </label>
      <input className="form__dubmit" type="submit" value="Save" />
    </form>
  );
}

export default CreateNewContactFormPage;
