import React, { useEffect, useState } from "react";

const Company = ({ PageName, CRUDdata }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setContent(`Content for ${PageName}`);
    };

    fetchData();
  }, [PageName]);

  console.log(CRUDdata);

  return (
    <div>
      <h2>{`Route: ${PageName}`}</h2>
      <p>{content}</p>
    </div>
  );
};

export default Company;
