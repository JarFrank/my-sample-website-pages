import { CustomInspectorModeTags } from "../../types";

type Props = {
  title: string;
  tags: CustomInspectorModeTags;
};

export const Title = (props: Props) => {
  const { title } = props;
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h1 {...props.tags} className="text-4xl font-bold text-center">
        {title}
      </h1>
    </div>
  );
};
