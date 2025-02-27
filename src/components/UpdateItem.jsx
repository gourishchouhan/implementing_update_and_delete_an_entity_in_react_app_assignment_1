import { useState, useEffect } from "react";

const UpdateItem = ({ item }) => {
    const [formData, setFormData] = useState({ name: "", status: "" });
    
    useEffect(() => {
        if (item) {
            setFormData({ name: item.name, status: item.status });
        }
    }, [item]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://${import.meta.env.VITE_API_URI}/doors/${item.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert("Item updated successfully!");
            } else {
                alert("Failed to update item");
            }
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </label>
            <label>
                Status:
                <input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Update</button>
        </form>
    );
};

export default UpdateItem;