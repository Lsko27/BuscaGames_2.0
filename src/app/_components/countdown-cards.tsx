import { Card, CardContent } from "./ui/card";

interface CountdownCardsProps {
  params: {
    label: string;
    value: string;
  };
}

const CountdownCards = ({ params }: CountdownCardsProps) => {
  return (
    <Card className="w-28 h-28 flex-shrink-0 bg-slate-950 border-blue-400 border-2">
      <CardContent className="flex flex-col items-center justify-center h-full">
        <h4 className="text-3xl text-white font-semibold">{params.value}</h4>
        <p className="text-xs text-gray-300">{params.label}</p>
      </CardContent>
    </Card>
  );
};

export default CountdownCards;
