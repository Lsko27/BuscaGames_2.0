import { Card, CardContent } from "./ui/card"

interface CountdownCardsProps {
  params: {
    label: string
    value: string
  }
}

const CountdownCards = ({ params }: CountdownCardsProps) => {
  return (
    <Card className="h-28 w-28 flex-shrink-0 border-2 border-blue-400 bg-slate-950">
      <CardContent className="flex h-full flex-col items-center justify-center">
        <h4 className="text-3xl font-semibold text-white">{params.value}</h4>
        <p className="text-xs text-gray-300">{params.label}</p>
      </CardContent>
    </Card>
  )
}

export default CountdownCards
