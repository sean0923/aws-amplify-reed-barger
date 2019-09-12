import React from 'react';

interface Props {
  errors: { message: string }[];
}
const Error: React.FC<Props> = ({ errors }) => {
  return (
    <pre className="error">
      {errors.map((err, idx) => {
        return <div key={idx}>{err.message}</div>;
      })}
    </pre>
  );
};

export default Error;
