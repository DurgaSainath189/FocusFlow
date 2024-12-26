import { Card, CardContent } from "../ui/card";
import { Container } from "./container/Container";
import { Header } from "./header/Header";

export const Editor = () => {
  return (
    <Card>
      <CardContent className="py-4 sm:py-6">
        <Header />
        <Container />
      </CardContent>
    </Card>
  );
};
