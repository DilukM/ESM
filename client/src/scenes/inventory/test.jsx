import React from "react";
import { useGetItemsInQuery } from "../../state/itemsApi";

const TestItemsInComponent = () => {
  const { data, error, isLoading } = useGetItemsInQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Items In</h1>
      <ul>
        {data?.map(
          (item) => (
            (<li key={item.id}>{item.itemName}</li>),
            (<li key={item.id}>{item.donorId}</li>)
          )
        )}
      </ul>
    </div>
  );
};

export default TestItemsInComponent;
