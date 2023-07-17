type Props = {
  title: string;
};

export const Title = ({ title }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h1 className="text-4xl font-bold text-center">{title}</h1>
    </div>
  );
};
