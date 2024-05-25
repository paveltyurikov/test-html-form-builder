const Debug = ({ value }: { value: unknown }) => {
  return (
    <div>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
};

export default Debug;
