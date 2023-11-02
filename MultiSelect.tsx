import React, { useState, useEffect } from "react";
import data from "./assets/items.json";
import SearchIcon from "./assets/SearchIcon";

interface Category {
  id: number;
  name: string;
}

const MultiSelect: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Category[]>([]);

  useEffect(() => {
    const transformedData = data.data.map((item, index) => ({
      id: index,
      name: item,
    }));
    setCategories(transformedData);
    setSearchResults(transformedData);
  }, []);

  useEffect(() => {
    const savedSelectedCategories = localStorage.getItem("selectedCategories");
    if (savedSelectedCategories) {
      setSelectedCategories(JSON.parse(savedSelectedCategories));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "selectedCategories",
      JSON.stringify(selectedCategories)
    );
  }, [selectedCategories]);

  useEffect(() => {
    localStorage.setItem(
      "selectedCategories",
      JSON.stringify(selectedCategories)
    );
  }, [selectedCategories]);

  const handleCategorySelect = (id: number) => {
    setSelectedCategories((prevSelectedCategories) => {
      let newSelectedCategories = [];

      if (prevSelectedCategories.includes(id)) {
        newSelectedCategories = prevSelectedCategories.filter(
          (categoryId) => categoryId !== id
        );
      } else {
        newSelectedCategories = [...prevSelectedCategories, id];
      }

      localStorage.setItem(
        "selectedCategories",
        JSON.stringify(newSelectedCategories)
      );

      return newSelectedCategories;
    });
  };

  const handleSearch = () => {
    const filteredCategories = categories.filter((cat) =>
      cat.name.includes(searchTerm)
    );
    setSearchResults(filteredCategories);
  };

  const selectedCategoryItems = categories.filter((cat) =>
    selectedCategories.includes(cat.id)
  );

  return (
    <div
      style={{
        maxWidth: "200px",
        margin: "0 auto",
        padding: "10px",
        border: "1px solid #ccc",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <span>Kategoriler</span>
      <div style={{ position: "relative", width: "100%", marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="kategori ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "175px", paddingRight: "24px" }}
        />
        <SearchIcon
          style={{
            position: "absolute",
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
          }}
        />
      </div>

      <div style={{ maxHeight: "250px", overflowY: "auto", marginTop: "10px" }}>
        {selectedCategoryItems.map((cat) => (
          <CategoryItem
            key={cat.id}
            category={cat}
            selected={true}
            onSelect={handleCategorySelect}
          />
        ))}
        {searchResults.map((cat) => (
          <CategoryItem
            key={cat.id}
            category={cat}
            selected={selectedCategories.includes(cat.id)}
            onSelect={handleCategorySelect}
          />
        ))}
      </div>
      <button
        onClick={handleSearch}
        style={{
          marginTop: "10px",
          width: "100%",
          border: "none",
          backgroundColor: "#0275ff",
          color: "#fff",
        }}
      >
        Ara
      </button>
    </div>
  );
};

interface CategoryItemProps {
  category: Category;
  selected: boolean;
  onSelect: (id: number) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  selected,
  onSelect,
}) => {
  return (
    <div style={{ marginBottom: "5px", color: selected ? "blue" : "black" }}>
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onSelect(category.id)}
      />
      {category.name}
    </div>
  );
};

export default MultiSelect;
