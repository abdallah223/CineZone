import { useState } from "react";
import styles from "./Dropdown.module.css";

const Dropdown = ({ options, defaultLabel = "Select an Option", onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    // Find the option that matches the defaultLabel or null
    options.find((option) => option.label === defaultLabel) || null
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);

    // Call the onChange prop with the selected option
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdownToggle} onClick={toggleDropdown}>
        <span className={styles.dropdownLabel}>
          {selectedOption ? selectedOption.label : defaultLabel}
        </span>
        <svg
          className={`${styles.dropdownArrow} ${
            isOpen ? styles.dropdownArrowOpen : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.dropdownOption} ${
                selectedOption && selectedOption.value === option.value
                  ? styles.selected
                  : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
