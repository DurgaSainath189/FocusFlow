import { Card, CardContent } from "../ui/card";
import { Container } from "./container/Container";
import { Title } from "./title/Title";

export const Editor = () => {
  return (
    <Card>
      <CardContent className="py-4 sm:py-6">
        <Title />
        <Container />
      </CardContent>
    </Card>
  );
};
