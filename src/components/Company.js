import React, { useEffect, useState } from "react";

const Company = ({ name }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    // You can fetch data or perform any logic specific to each route here
    // For example, fetch data based on the 'name' prop
    // Update 'content' state accordingly

    // Sample logic:
    const fetchData = async () => {
      // Perform data fetching or any specific logic based on the 'name' prop
      // For now, let's just set some content based on the 'name'
      setContent(`Content for ${name}`);
    };

    fetchData();
  }, [name]);

  return (
    <div>
      <h2>{`Route: ${name}`}</h2>
      <p>{content}</p>
      {/* Add your specific content or components for each dynamic route */}
    </div>
  );
};

export default Company;
